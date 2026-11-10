import Link from "next/link";

export function SectionHeading({
  id,
  eyebrow,
  title,
  href,
  linkLabel = "View all",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
      <div>
        {eyebrow && <p className="eyebrow mb-3 text-mute">{eyebrow}</p>}
        <h2 id={id} className="text-headline">
          {title}
        </h2>
      </div>
      {href && (
        <Link href={href} className="link eyebrow shrink-0">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
