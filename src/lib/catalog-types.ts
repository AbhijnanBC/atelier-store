export type Product = {
  id: string;
  slug: string;
  name: string;
  /** Display label: "Women · Outerwear" for a child category, "Bags" for a top-level one. */
  category: string;
  /** Whole currency units (DB stores cents). */
  price: number;
  /** Original whole-unit price when on sale. */
  compareAtPrice?: number;
  image: string;
  alt: string;
  badge?: "New" | "Limited";
};

export type ProductDetail = Product & {
  sku: string;
  description: string;
  details: string[];
  sizes?: string[];
  colour?: string;
  care?: string;
  stockQuantity: number;
  madeToOrder: boolean;
  stockDetail?: string;
};
