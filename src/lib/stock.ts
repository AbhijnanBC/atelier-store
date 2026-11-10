export type StockState =
  | "in_stock"
  | "low_stock"
  | "made_to_order"
  | "sold_out";

export const LOW_STOCK_THRESHOLD = 5;

export type StockInput = {
  stockQuantity: number;
  madeToOrder: boolean;
  stockDetail?: string | null;
};

export function stockState(row: StockInput): StockState {
  if (row.madeToOrder) return "made_to_order";
  if (row.stockQuantity <= 0) return "sold_out";
  if (row.stockQuantity <= LOW_STOCK_THRESHOLD) return "low_stock";
  return "in_stock";
}

/** Editorial `stockDetail` wins; otherwise copy is derived from the state. */
export function stockCopy(row: StockInput): string {
  if (row.stockDetail) return row.stockDetail;
  switch (stockState(row)) {
    case "sold_out":
      return "Sold out";
    case "low_stock":
      return `Only ${row.stockQuantity} left`;
    case "made_to_order":
      return "Made to order";
    default:
      return "In stock";
  }
}

/** Tailwind classes for the status dot. */
export const stockTone: Record<StockState, string> = {
  in_stock: "bg-success",
  low_stock: "bg-sale",
  made_to_order: "bg-success",
  sold_out: "bg-subtle",
};
