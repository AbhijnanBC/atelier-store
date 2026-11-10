// Seed data for the catalogue (moved from the former src/data/*.ts files).
// Order matters: index 0 is the newest product (see SEED_EPOCH in seed.ts).

export type SeedCategory = {
  slug: string;
  name: string;
  parent?: string; // parent slug
  position: number;
};

export const seedCategories: SeedCategory[] = [
  {
    "slug": "women",
    "name": "Women",
    "position": 0
  },
  {
    "slug": "men",
    "name": "Men",
    "position": 1
  },
  {
    "slug": "bags",
    "name": "Bags",
    "position": 2
  },
  {
    "slug": "accessories",
    "name": "Accessories",
    "position": 3
  },
  {
    "slug": "women-outerwear",
    "name": "Outerwear",
    "parent": "women",
    "position": 0
  },
  {
    "slug": "women-knitwear",
    "name": "Knitwear",
    "parent": "women",
    "position": 1
  },
  {
    "slug": "women-shoes",
    "name": "Shoes",
    "parent": "women",
    "position": 2
  },
  {
    "slug": "men-outerwear",
    "name": "Outerwear",
    "parent": "men",
    "position": 0
  },
  {
    "slug": "men-knitwear",
    "name": "Knitwear",
    "parent": "men",
    "position": 1
  },
  {
    "slug": "men-shirts",
    "name": "Shirts",
    "parent": "men",
    "position": 2
  },
  {
    "slug": "men-shoes",
    "name": "Shoes",
    "parent": "men",
    "position": 3
  }
];

export type SeedProduct = {
  slug: string;
  sku: string;
  name: string;
  category: string; // category slug
  description: string;
  details: string[];
  sizes: string[] | null;
  colour: string;
  priceCents: number;
  compareAtCents: number | null; // original price when on sale
  care: string;
  badge: "New" | "Limited" | null;
  stockQuantity: number;
  imageUrl: string;
  imageAlt: string;
  isBestseller: boolean;
};

export const seedProducts: SeedProduct[] = [
  {
    "slug": "noir-leather-biker-jacket",
    "sku": "AT-2041-BLK",
    "name": "Noir leather biker jacket",
    "category": "women-outerwear",
    "description": "A cropped biker jacket in supple lambskin, cut close to the body with an asymmetric zip and quilted shoulders.",
    "details": [
      "100% lambskin leather, cotton lining",
      "Asymmetric zip closure, two zip pockets",
      "Made in Italy",
      "Specialist leather clean only"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceCents": 245000,
    "badge": "New",
    "stockQuantity": 14,
    "imageUrl": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900",
    "imageAlt": "Black leather biker jacket laid flat",
    "isBestseller": false,
    "colour": "Black",
    "compareAtCents": null,
    "care": "Specialist leather clean only. Store on a wide hanger."
  },
  {
    "slug": "russet-bomber-jacket",
    "sku": "AT-1182-RUS",
    "name": "Russet satin bomber jacket",
    "category": "men-outerwear",
    "description": "A lightweight satin bomber in a warm russet tone, finished with ribbed trims and a clean, unlined interior.",
    "details": [
      "Recycled satin shell, ribbed cuffs and hem",
      "Zip front, two welt pockets",
      "Regular fit",
      "Machine wash cold"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceCents": 118000,
    "badge": null,
    "stockQuantity": 22,
    "imageUrl": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900",
    "imageAlt": "Rust-colored bomber jacket held on a hanger",
    "isBestseller": false,
    "colour": "Russet",
    "compareAtCents": null,
    "care": "Machine wash cold, line dry."
  },
  {
    "slug": "heavyweight-crewneck",
    "sku": "AT-0420-WHT",
    "name": "Heavyweight cotton crewneck",
    "category": "men-knitwear",
    "description": "A boxy crewneck in dense brushed cotton jersey that softens with every wash. Cut for an easy, slightly oversized fit.",
    "details": [
      "100% organic cotton, 480 gsm",
      "Oversized fit",
      "Made in Portugal",
      "Machine wash cold, tumble dry low"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceCents": 42000,
    "badge": null,
    "stockQuantity": 40,
    "imageUrl": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900",
    "imageAlt": "White crewneck sweatshirt laid flat",
    "isBestseller": false,
    "colour": "White",
    "compareAtCents": 52000,
    "care": "Machine wash cold, tumble dry low."
  },
  {
    "slug": "ivory-fringe-poncho",
    "sku": "AT-0760-IVY",
    "name": "Ivory fringed knit poncho",
    "category": "women-knitwear",
    "description": "A hand-finished knit poncho with a V-neck and long fringe, light enough to layer over tailoring or a simple tee.",
    "details": [
      "70% cotton, 30% linen",
      "One size, relaxed drape",
      "Hand-finished fringe",
      "Hand wash cold, dry flat"
    ],
    "sizes": [
      "One size"
    ],
    "priceCents": 76000,
    "badge": "New",
    "stockQuantity": 3,
    "imageUrl": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900",
    "imageAlt": "Cream knitted poncho with fringe on a wooden hanger",
    "isBestseller": false,
    "colour": "Ivory",
    "compareAtCents": null,
    "care": "Hand wash cold, dry flat."
  },
  {
    "slug": "amber-wicker-top-handle",
    "sku": "AT-1890-AMB",
    "name": "Amber wicker top-handle bag",
    "category": "bags",
    "description": "A structured top-handle bag pairing woven wicker with smooth vegetable-tanned leather and a polished turn-lock.",
    "details": [
      "Woven wicker with calf leather trim",
      "Single top handle, detachable shoulder strap",
      "Cotton twill lining, one interior pocket",
      "24 × 20 × 11 cm"
    ],
    "sizes": null,
    "priceCents": 189000,
    "badge": null,
    "stockQuantity": 9,
    "imageUrl": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900",
    "imageAlt": "Tan leather and wicker top-handle bag",
    "isBestseller": false,
    "colour": "Amber",
    "compareAtCents": null,
    "care": "Wipe with a soft dry cloth. Keep away from moisture."
  },
  {
    "slug": "teal-flap-satchel",
    "sku": "AT-1350-TEL",
    "name": "Teal grained leather satchel",
    "category": "bags",
    "description": "A compact satchel in grained leather with a gold-tone clasp. Roomy enough for the day, refined enough for the evening.",
    "details": [
      "Grained calf leather, gold-tone hardware",
      "Top handle and removable crossbody strap",
      "Suede lining",
      "26 × 18 × 10 cm"
    ],
    "sizes": null,
    "priceCents": 135000,
    "badge": "Limited",
    "stockQuantity": 2,
    "imageUrl": "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900",
    "imageAlt": "Teal leather satchel with a gold clasp",
    "isBestseller": false,
    "colour": "Teal",
    "compareAtCents": null,
    "care": "Wipe with a soft dry cloth; condition the leather occasionally."
  },
  {
    "slug": "classic-acetate-sunglasses",
    "sku": "AT-0340-BLK",
    "name": "Classic acetate sunglasses",
    "category": "accessories",
    "description": "Timeless black acetate frames with a gently angled shape, finished by hand and fitted with UV-protective lenses.",
    "details": [
      "Bio-acetate frame, UV400 lenses",
      "Includes case and cleaning cloth",
      "Lens width 52 mm, bridge 18 mm",
      "Made in Italy"
    ],
    "sizes": null,
    "priceCents": 34000,
    "badge": null,
    "stockQuantity": 31,
    "imageUrl": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900",
    "imageAlt": "Black acetate sunglasses on a white surface",
    "isBestseller": false,
    "colour": "Black",
    "compareAtCents": null,
    "care": "Clean with the supplied cloth and store in the case."
  },
  {
    "slug": "chambray-work-shirt",
    "sku": "AT-0295-CHM",
    "name": "Washed chambray work shirt",
    "category": "men-shirts",
    "description": "A washed chambray shirt with a soft collar and chest pocket, made to be worn open over a tee or buttoned to the top.",
    "details": [
      "100% cotton chambray",
      "Regular fit, button front",
      "Garment washed for softness",
      "Machine wash cold"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceCents": 29500,
    "badge": null,
    "stockQuantity": 17,
    "imageUrl": "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=900",
    "imageAlt": "Light blue chambray shirt draped over a chair",
    "isBestseller": false,
    "colour": "Chambray blue",
    "compareAtCents": 36500,
    "care": "Machine wash cold."
  },
  {
    "slug": "slim-leather-strap-watch",
    "sku": "AT-0680-TPE",
    "name": "Slim leather strap watch",
    "category": "accessories",
    "description": "A minimal 36 mm watch with a white dial, slim case and taupe leather strap. Quartz movement, sapphire-coated crystal.",
    "details": [
      "Stainless steel case, 36 mm",
      "Calf leather strap, quick-release",
      "Water resistant to 30 m",
      "Two-year warranty"
    ],
    "sizes": null,
    "priceCents": 68000,
    "badge": null,
    "stockQuantity": 12,
    "imageUrl": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900",
    "imageAlt": "Minimal watch with a taupe leather strap held between fingers",
    "isBestseller": true,
    "colour": "Taupe",
    "compareAtCents": null,
    "care": "Wipe with a soft dry cloth. Avoid prolonged exposure to water."
  },
  {
    "slug": "everyday-nylon-backpack",
    "sku": "AT-0540-NVY",
    "name": "Everyday nylon backpack",
    "category": "bags",
    "description": "A clean-lined backpack in water-repellent recycled nylon with a padded laptop sleeve and tonal webbing.",
    "details": [
      "Recycled water-repellent nylon",
      "Padded 15\" laptop compartment",
      "Two zip pockets, adjustable straps",
      "42 × 30 × 14 cm"
    ],
    "sizes": null,
    "priceCents": 54000,
    "badge": null,
    "stockQuantity": 5,
    "imageUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900",
    "imageAlt": "Navy backpack on a light grey background",
    "isBestseller": true,
    "colour": "Navy",
    "compareAtCents": 64000,
    "care": "Spot clean with a damp cloth and air dry."
  },
  {
    "slug": "printed-stiletto-pump",
    "sku": "AT-0890-FLR",
    "name": "Printed stiletto pump",
    "category": "women-shoes",
    "description": "A pointed stiletto pump in a hand-painted floral print. Produced in a limited run and finished with a leather sole.",
    "details": [
      "Printed satin upper, leather lining and sole",
      "95 mm heel",
      "Made in Italy",
      "Limited edition"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "priceCents": 89000,
    "badge": "Limited",
    "stockQuantity": 0,
    "imageUrl": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900",
    "imageAlt": "Floral stiletto heels",
    "isBestseller": true,
    "colour": "Floral print",
    "compareAtCents": null,
    "care": "Wipe clean with a soft dry cloth."
  },
  {
    "slug": "carmine-top-handle-bag",
    "sku": "AT-2100-CRM",
    "name": "Carmine top-handle bag",
    "category": "bags",
    "description": "Our signature top-handle bag in high-shine carmine leather, with a sculpted lock closure and a roomy structured interior.",
    "details": [
      "Glazed calf leather, palladium-tone hardware",
      "Top handle, detachable strap",
      "Microfibre lining, two interior pockets",
      "28 × 21 × 12 cm"
    ],
    "sizes": null,
    "priceCents": 210000,
    "badge": null,
    "stockQuantity": 4,
    "imageUrl": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900",
    "imageAlt": "Red structured handbag",
    "isBestseller": true,
    "colour": "Carmine",
    "compareAtCents": null,
    "care": "Wipe with a soft dry cloth."
  },
  {
    "slug": "minimal-leather-sneaker",
    "sku": "AT-0520-WHT",
    "name": "Minimal leather sneaker",
    "category": "men-shoes",
    "description": "A low-profile court sneaker in smooth white leather on a durable rubber sole. Clean, quiet, and easy to wear every day.",
    "details": [
      "Calf leather upper, rubber cupsole",
      "Lace-up, padded collar",
      "Made in Portugal",
      "Wipe clean with a damp cloth"
    ],
    "sizes": [
      "40",
      "41",
      "42",
      "43",
      "44",
      "45"
    ],
    "priceCents": 52000,
    "badge": null,
    "stockQuantity": 26,
    "imageUrl": "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900",
    "imageAlt": "White sneakers beside folded trousers and a watch",
    "isBestseller": true,
    "colour": "White",
    "compareAtCents": null,
    "care": "Wipe clean with a damp cloth."
  }
];
