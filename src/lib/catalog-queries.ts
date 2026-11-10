import { and, asc, desc, eq, inArray, ne, notInArray, or } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { categories, productImages, products } from "@/db/schema";
import type { Product, ProductDetail } from "@/lib/catalog-types";

// Every query is cached and tagged "products"; call revalidateTag("products")
// (or updateTag in a server action) after changing catalogue rows.

const withRelations = {
  category: { with: { parent: true as const } },
  images: { orderBy: [asc(productImages.position)] },
};

type Row = NonNullable<
  Awaited<ReturnType<typeof db.query.products.findFirst<{ with: typeof withRelations }>>>
>;

function toProduct(row: Row): Product {
  const { category } = row;
  const image = row.images[0];
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: category.parent
      ? `${category.parent.name} · ${category.name}`
      : category.name,
    price: row.priceCents / 100,
    ...(row.compareAtCents ? { compareAtPrice: row.compareAtCents / 100 } : {}),
    image: image.url,
    alt: image.alt,
    ...(row.badge ? { badge: row.badge } : {}),
  };
}

function toDetail(row: Row): ProductDetail {
  return {
    ...toProduct(row),
    sku: row.sku,
    description: row.description,
    details: row.details,
    ...(row.sizes ? { sizes: row.sizes } : {}),
    ...(row.colour ? { colour: row.colour } : {}),
    ...(row.care ? { care: row.care } : {}),
    stockQuantity: row.stockQuantity,
    madeToOrder: row.madeToOrder,
    ...(row.stockDetail ? { stockDetail: row.stockDetail } : {}),
  };
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  const rows = await db.query.products.findMany({
    with: withRelations,
    orderBy: [desc(products.createdAt), asc(products.slug)],
    limit,
  });
  return rows.map(toProduct);
}

export async function getBestsellers(limit = 5): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  const rows = await db.query.products.findMany({
    with: withRelations,
    where: eq(products.isBestseller, true),
    orderBy: [desc(products.createdAt), asc(products.slug)],
    limit,
  });
  return rows.map(toProduct);
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetail | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  const row = await db.query.products.findFirst({
    with: withRelations,
    where: eq(products.slug, slug),
  });
  return row ? toDetail(row) : undefined;
}

export async function getProductSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  const rows = await db
    .select({ slug: products.slug })
    .from(products)
    .orderBy(desc(products.createdAt), asc(products.slug));
  return rows.map((r) => r.slug);
}

/** Other products, same top-level category first, excluding the current one. */
export async function getRelatedProducts(
  slug: string,
  limit = 5,
): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const current = await db.query.products.findFirst({
    columns: { categoryId: true },
    with: { category: { columns: { id: true, parentId: true } } },
    where: eq(products.slug, slug),
  });
  if (!current) return [];

  const topId = current.category.parentId ?? current.category.id;
  const group = await db
    .select({ id: categories.id })
    .from(categories)
    .where(or(eq(categories.id, topId), eq(categories.parentId, topId)));
  const groupIds = group.map((g) => g.id);

  const order = [desc(products.createdAt), asc(products.slug)];
  const same = await db.query.products.findMany({
    with: withRelations,
    where: and(ne(products.slug, slug), inArray(products.categoryId, groupIds)),
    orderBy: order,
    limit,
  });
  const rest =
    same.length < limit
      ? await db.query.products.findMany({
          with: withRelations,
          where: and(
            ne(products.slug, slug),
            notInArray(products.categoryId, groupIds),
          ),
          orderBy: order,
          limit: limit - same.length,
        })
      : [];
  return [...same, ...rest].map(toProduct);
}
