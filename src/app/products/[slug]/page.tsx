import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/product/buy-box";
import { ProductGallery } from "@/components/product/product-gallery";
import { Accordion } from "@/components/product/product-accordion";
import { StockStatus } from "@/components/product/stock-status";
import { SectionHeading } from "@/components/home/section-heading";
import { ProductCard } from "@/components/ui/product-card";
import {
  getProductBySlug,
  getProductSlugs,
  getRelatedProducts,
} from "@/lib/catalog-queries";
import { formatPrice } from "@/lib/format";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found | Atelier" };
  return {
    title: `${product.name} | Atelier`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = product.category.split(" · ");
  const related = await getRelatedProducts(product.slug);

  return (
    <>
      <nav aria-label="Breadcrumb" className="container-site py-5">
        <ol className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 text-mute">
          <li>
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
          </li>
          {category.map((c) => (
            <li key={c} className="flex items-center gap-2">
              <span aria-hidden>/</span>
              <Link
                href={`/${c.toLowerCase()}`}
                className="hover:text-ink"
              >
                {c}
              </Link>
            </li>
          ))}
          <li aria-current="page" className="flex items-center gap-2 text-ink">
            <span aria-hidden>/</span>
            <span className="truncate">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="container-site grid gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_30rem]">
        <ProductGallery product={product} />

        <section
          aria-labelledby="product-title"
          className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start"
        >
          <div className="stack [--stack:1.25rem]">
            <div>
              <p className="eyebrow text-mute">{product.category}</p>
              {product.badge && (
                <span className="badge mt-4">{product.badge}</span>
              )}
              <h1 id="product-title" className="mt-4 text-headline">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center justify-between gap-4 border-y py-4">
              <p className="text-title">
                {product.compareAtPrice ? (
                  <>
                    <span className="text-sale">{formatPrice(product.price)}</span>{" "}
                    <s className="text-mute">
                      {formatPrice(product.compareAtPrice)}
                    </s>
                  </>
                ) : (
                  formatPrice(product.price)
                )}
              </p>
              <StockStatus
                stockQuantity={product.stockQuantity}
                madeToOrder={product.madeToOrder}
                stockDetail={product.stockDetail}
              />
            </div>

            <p className="text-body text-ink-soft">{product.description}</p>

            <BuyBox
              name={product.name}
              sizes={product.sizes}
              stockQuantity={product.stockQuantity}
              madeToOrder={product.madeToOrder}
            />

            <div className="rule mt-4">
              <Accordion title="Product details" defaultOpen>
                <ul className="stack [--stack:0.5rem]">
                  {product.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                  {product.colour && (
                    <li className="text-mute">Colour: {product.colour}</li>
                  )}
                  <li className="text-mute">Style code: {product.sku}</li>
                </ul>
              </Accordion>
              {product.care && (
                <Accordion title="Care">
                  <p>{product.care}</p>
                </Accordion>
              )}
              <Accordion title="Delivery & returns">
                <p>
                  Complimentary standard delivery in 2–4 working days. Return or
                  exchange within 30 days, free of charge.
                </p>
              </Accordion>
              <Accordion title="Client services">
                <p>
                  Questions about fit or care? Our advisors are available seven
                  days a week by phone, email or chat.
                </p>
              </Accordion>
            </div>
          </div>
        </section>
      </div>

      <section aria-labelledby="related-title" className="section-y">
        <div className="container-site">
          <SectionHeading
            id="related-title"
            eyebrow="Complete the look"
            title="You may also like"
          />
          <ul className="rail">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard
                  product={p}
                  sizes="(min-width: 1024px) 25vw, 70vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
