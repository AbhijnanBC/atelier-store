// Static storefront content (hero, collections strip, editorial).
// Products and categories live in Postgres; see src/lib/catalog-queries.ts.

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}`;

export type Collection = {
  slug: string;
  title: string;
  image: string;
  alt: string;
};

export const heroImage = {
  src: img("1485968579580-b6d095142e6e", 2000),
  alt: "",
};

export const collections: Collection[] = [
  {
    slug: "women",
    title: "Women",
    image: img("1566174053879-31528523f8ae"),
    alt: "Model in a deep plum off-the-shoulder gown against a violet backdrop",
  },
  {
    slug: "men",
    title: "Men",
    image: img("1507679799987-c73779587ccf"),
    alt: "Man in a navy suit adjusting his jacket",
  },
  {
    slug: "bags",
    title: "Bags",
    image: img("1584917865442-de89df76afd3"),
    alt: "Structured red leather top-handle bag on a display plinth",
  },
  {
    slug: "shoes",
    title: "Shoes",
    image: img("1543163521-1bf539c55dd2"),
    alt: "Floral stiletto heels posed against a blue wall",
  },
];

export const editorial = {
  eyebrow: "The Autumn Edit",
  title: "Layers for the city",
  body: "Soft tailoring, fluid coats and quiet colour, cut for movement from morning to night.",
  cta: { label: "Explore the edit", href: "/collections/autumn" },
  image: img("1539109136881-3be0616acf4b", 1400),
  alt: "",
  imageSecondary: img("1441986300917-64674bd600d8", 1400),
};
