import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/catalog-types";
import { HeartIcon } from "./icons";

export function ProductCard({
  product,
  sizes = "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
}: {
  product: Product;
  sizes?: string;
}) {
  return (
    <article className="card-product group relative">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="media aspect-product">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes={sizes}
            className="object-cover"
          />
          {product.badge && (
            <span className="badge absolute left-3 top-3">{product.badge}</span>
          )}
        </div>
        <div className="card-product__body">
          <p className="eyebrow text-mute">{product.category}</p>
          <h3 className="card-product__name mt-2 font-normal">{product.name}</h3>
          <p className="card-product__price">
            {product.compareAtPrice ? (
              <>
                <span className="text-sale">{formatPrice(product.price)}</span>{" "}
                <s className="text-mute">{formatPrice(product.compareAtPrice)}</s>
              </>
            ) : (
              formatPrice(product.price)
            )}
          </p>
        </div>
      </Link>
      <button
        type="button"
        aria-label={`Add ${product.name} to wishlist`}
        className="absolute right-2 top-2 grid size-10 place-items-center text-ink transition-opacity lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
      >
        <HeartIcon />
      </button>
    </article>
  );
}
