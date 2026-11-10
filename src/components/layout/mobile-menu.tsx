"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { primaryNav } from "./nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="-ml-3 grid size-11 place-items-center"
      >
        <MenuIcon />
      </button>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-50 flex flex-col bg-paper"
      >
        <div className="flex h-header items-center justify-between border-b px-gutter">
          <span className="eyebrow">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="-mr-3 grid size-11 place-items-center"
          >
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Primary" className="flex-1 overflow-y-auto px-gutter py-8">
          <ul>
            {primaryNav.map((item) => (
              <li key={item.href} className="rule-b">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-5 text-title font-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="stack mt-10">
            {["Stores", "Client services", "My account"].map((l) => (
              <li key={l}>
                <Link href="#" className="link-muted">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
