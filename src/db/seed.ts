// Idempotent catalogue seed: `npm run db:seed`. Safe to re-run; rows are
// upserted by slug. Uses the Neon HTTP driver, so no transactions.
import { eq, sql } from "drizzle-orm";
import { db } from "./index";
import { categories, productImages, products } from "./schema";
import { seedCategories, seedProducts } from "./seed-data";

// Fixed anchor so re-seeding never reorders the storefront lists.
// seedProducts[0] is the newest product, one day older per index after it.
const SEED_EPOCH = Date.UTC(2026, 9, 1);
const DAY = 86_400_000;

async function seedCategoryTree() {
  const ids = new Map<string, string>();
  // Parents first so children can reference their ids.
  for (const parentFirst of [true, false]) {
    for (const c of seedCategories.filter((c) => !c.parent === parentFirst)) {
      const [row] = await db
        .insert(categories)
        .values({
          slug: c.slug,
          name: c.name,
          position: c.position,
          parentId: c.parent ? ids.get(c.parent) : null,
        })
        .onConflictDoUpdate({
          target: categories.slug,
          set: {
            name: c.name,
            position: c.position,
            parentId: c.parent ? ids.get(c.parent) : null,
          },
        })
        .returning({ id: categories.id });
      ids.set(c.slug, row.id);
    }
  }
  return ids;
}

async function main() {
  const categoryIds = await seedCategoryTree();

  for (const [i, p] of seedProducts.entries()) {
    const categoryId = categoryIds.get(p.category);
    if (!categoryId) throw new Error(`Unknown category "${p.category}"`);

    const values = {
      categoryId,
      slug: p.slug,
      sku: p.sku,
      name: p.name,
      description: p.description,
      details: p.details,
      sizes: p.sizes,
      colour: p.colour,
      priceCents: p.priceCents,
      compareAtCents: p.compareAtCents,
      care: p.care,
      badge: p.badge,
      isBestseller: p.isBestseller,
      stockQuantity: p.stockQuantity,
      madeToOrder: false,
      stockDetail: null,
      createdAt: new Date(SEED_EPOCH - i * DAY),
    };
    const [row] = await db
      .insert(products)
      .values(values)
      .onConflictDoUpdate({ target: products.slug, set: values })
      .returning({ id: products.id });

    await db
      .insert(productImages)
      .values({ productId: row.id, url: p.imageUrl, alt: p.imageAlt, position: 0 })
      .onConflictDoUpdate({
        target: [productImages.productId, productImages.position],
        set: { url: p.imageUrl, alt: p.imageAlt },
      });
  }

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products)
    .where(eq(products.isBestseller, true));
  console.log(
    `Seeded ${seedCategories.length} categories and ${seedProducts.length} products (${count} bestsellers).`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
