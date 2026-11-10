import Image from "next/image";
import Link from "next/link";
import { heroImage } from "@/data/catalog";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="on-inverse relative isolate min-h-[34rem] h-[calc(100svh-7rem)] max-h-[56rem] overflow-hidden bg-surface"
    >
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-[50%_30%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/30 via-50% to-black/5"
      />
      <div className="container-site flex h-full flex-col justify-end pb-10 text-on-inverse sm:pb-16">
        <p className="eyebrow">Autumn / Winter</p>
        <h1
          id="hero-title"
          className="mt-4 max-w-[14ch] text-display"
        >
          The new season, tailored
        </h1>
        <p className="mt-4 max-w-md text-body text-on-inverse/90">
          Considered silhouettes in wool, leather and silk, made to be worn for
          years.
        </p>
        <div className="cluster mt-8">
          <Link href="/women" className="btn btn-primary">
            Shop women
          </Link>
          <Link href="/men" className="btn btn-secondary">
            Shop men
          </Link>
        </div>
      </div>
    </section>
  );
}
