import { ProductCard } from "@/components/ui/product-card";
import type { Product } from "@/lib/catalog-types";
import { SectionHeading } from "./section-heading";

export function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="new-title" className="container-site pb-section">
      <SectionHeading
        id="new-title"
        eyebrow="Just landed"
        title="New arrivals"
        href="/new"
      />
      <div className="grid grid-cols-2 gap-grid md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export function Bestsellers({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="best-title" className="pb-section">
      <div className="container-site">
        <SectionHeading
          id="best-title"
          eyebrow="Most wanted"
          title="Client favourites"
          href="/bestsellers"
        />
      </div>
      <div className="container-site">
        <ul className="rail">
          {products.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} sizes="(min-width: 1024px) 25vw, 70vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
