import Image from "next/image";
import type { ProductDetail } from "@/lib/catalog-types";

// Sample data has one photo per product, so the gallery shows the full shot
// plus two zoomed detail crops of it. With real data, pass distinct images.
const views = [
  { label: "Full view", position: "50% 50%", scale: 1 },
  { label: "Detail, upper", position: "35% 30%", scale: 1.9 },
  { label: "Detail, lower", position: "65% 70%", scale: 1.9 },
] as const;

export function ProductGallery({ product }: { product: ProductDetail }) {
  return (
    <ul
      aria-label={`${product.name} images`}
      className="flex snap-x snap-mandatory overflow-x-auto scrollbar-none gap-grid lg:grid lg:grid-cols-2 lg:overflow-visible"
    >
      {views.map((v, i) => (
        <li
          key={v.label}
          className={`w-full shrink-0 snap-start lg:w-auto ${i === 0 ? "lg:col-span-2" : ""}`}
        >
          <div
            className={`media ${i === 0 ? "aspect-[4/5] lg:aspect-[5/6]" : "aspect-[4/5]"}`}
          >
            <Image
              src={product.image}
              alt={i === 0 ? product.alt : `${product.alt} (${v.label.toLowerCase()})`}
              fill
              preload={i === 0}
              sizes={
                i === 0
                  ? "(min-width: 1024px) 55vw, 100vw"
                  : "(min-width: 1024px) 28vw, 100vw"
              }
              className="object-cover"
              style={{
                objectPosition: v.position,
                transform: v.scale === 1 ? undefined : `scale(${v.scale})`,
                transformOrigin: v.position,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
