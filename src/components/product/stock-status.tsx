import { stockCopy, stockState, stockTone, type StockInput } from "@/lib/stock";

export function StockStatus(stock: StockInput) {
  const state = stockState(stock);
  return (
    <p className="flex items-center gap-2 text-small">
      <span aria-hidden className={`size-2 rounded-full ${stockTone[state]}`} />
      <span className={state === "low_stock" ? "text-sale" : undefined}>
        {stockCopy(stock)}
      </span>
    </p>
  );
}
