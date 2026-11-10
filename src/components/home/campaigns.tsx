import Image from "next/image";
import Link from "next/link";
import { editorial } from "@/data/catalog";

const campaigns = [
  {
    eyebrow: editorial.eyebrow,
    title: editorial.title,
    body: editorial.body,
    cta: editorial.cta,
    image: editorial.image,
    alt: editorial.alt,
  },
  {
    eyebrow: "Craft",
    title: "Made by hand, made to last",
    body: "Inside the ateliers where each piece is cut, stitched and finished by one maker.",
    cta: { label: "Discover the craft", href: "/craftsmanship" },
    image: editorial.imageSecondary,
    alt: "",
  },
];

export function Campaigns() {
  return (
    <section aria-label="Editorial" className="pb-section">
      <div className="on-inverse container-site grid gap-grid md:grid-cols-2">
        {campaigns.map((c, i) => (
          <article
            key={c.title}
            className="media relative isolate aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5]"
          >
            <Image
              src={c.image}
              alt={c.alt}
              fill
              sizes="(min-width: 1440px) 700px, (min-width: 768px) 50vw, 100vw"
              className="-z-20 object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 via-50% to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 text-on-inverse sm:p-10">
              <p className="eyebrow">{c.eyebrow}</p>
              <h2 className="mt-3 max-w-[16ch] text-headline">{c.title}</h2>
              <p className="mt-3 hidden max-w-sm text-body text-on-inverse/90 sm:block">
                {c.body}
              </p>
              <Link
                href={c.cta.href}
                className={`mt-6 btn ${i === 0 ? "btn-primary" : "btn-secondary"}`}
              >
                {c.cta.label}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
