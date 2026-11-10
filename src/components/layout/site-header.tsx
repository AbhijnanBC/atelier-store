import Link from "next/link";
import { BagIcon, SearchIcon, UserIcon } from "@/components/ui/icons";
import { MobileMenu } from "./mobile-menu";
import { primaryNav } from "./nav";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Atelier, home"
      className={`font-display text-[1.25rem] font-light uppercase tracking-[0.35em] sm:text-[1.5rem] ${className}`}
    >
      Atelier
    </Link>
  );
}

export function SiteHeader() {
  return (
    <>
      <div className="bg-inverse text-on-inverse">
        <p className="eyebrow container-site py-3 text-center">
          Complimentary delivery and returns on every order
        </p>
      </div>
      <header className="sticky top-0 z-40 border-b bg-paper">
        <div className="container-site grid h-header grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center">
            <MobileMenu />
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex gap-8">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-nav">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Logo />

          <div className="flex items-center justify-end gap-1 lg:gap-6">
            <Link
              href="/search"
              aria-label="Search"
              className="grid size-11 place-items-center lg:flex lg:size-auto lg:gap-2"
            >
              <SearchIcon />
              <span className="link-nav hidden lg:inline">Search</span>
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden size-11 place-items-center sm:grid lg:flex lg:size-auto lg:gap-2"
            >
              <UserIcon />
              <span className="link-nav hidden lg:inline">Account</span>
            </Link>
            <Link
              href="/cart"
              aria-label="Shopping bag"
              className="-mr-3 grid size-11 place-items-center lg:mr-0 lg:flex lg:size-auto lg:gap-2"
            >
              <BagIcon />
              <span className="link-nav hidden lg:inline">Bag (0)</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
