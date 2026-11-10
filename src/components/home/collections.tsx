import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/catalog";
import { SectionHeading } from "./section-heading";

export function Collections() {
  return (
    <section aria-labelledby="collections-title" className="section-y">
      <div className="container-site">
        <SectionHeading
          id="collections-title"
          eyebrow="Discover"
          title="Shop by collection"
        />
      </div>
      <ul className="container-site grid grid-cols-2 gap-grid lg:grid-cols-4">
        {collections.map((c) => (
          <li key={c.slug}>
            <Link href={`/${c.slug}`} className="card-product group block">
              <div className="media aspect-editorial">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1440px) 350px, (min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-luxe)] group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="eyebrow link-nav !pb-0 pt-4">{c.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
