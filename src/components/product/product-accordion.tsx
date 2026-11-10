import type { ReactNode } from "react";

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group rule-b">
      <summary className="eyebrow flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
        {title}
        <span
          aria-hidden
          className="text-title font-light leading-none transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pb-6 text-small text-ink-soft">{children}</div>
    </details>
  );
}
