import Link from "next/link";
import { Logo } from "./site-header";

const columns = [
  {
    title: "Client services",
    links: ["Contact us", "Shipping", "Returns & exchanges", "Care guide", "FAQ"],
  },
  {
    title: "The house",
    links: ["Our story", "Craftsmanship", "Sustainability", "Careers", "Press"],
  },
  {
    title: "Boutiques",
    links: ["Store locator", "Book an appointment", "Private shopping"],
  },
  {
    title: "Legal",
    links: ["Terms of sale", "Privacy policy", "Cookie settings", "Accessibility"],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-section border-t">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="eyebrow mb-5">{col.title}</h2>
            <ul className="stack [--stack:0.75rem]">
              {col.links.map((l) => (
                <li key={l}>
                  <Link href="#" className="link-muted">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="rule">
        <div className="container-site flex flex-col items-start justify-between gap-6 py-8 sm:flex-row sm:items-center">
          <Logo />
          <p className="text-small text-mute">
            United States · English · USD &nbsp;|&nbsp; © Atelier. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
