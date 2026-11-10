"use client";

import { useState } from "react";
import { HeartIcon } from "@/components/ui/icons";
import { stockState } from "@/lib/stock";

export function BuyBox({
  name,
  sizes,
  stockQuantity,
  madeToOrder,
}: {
  name: string;
  sizes?: string[];
  stockQuantity: number;
  madeToOrder: boolean;
}) {
  const [size, setSize] = useState<string | null>(
    sizes && sizes.length === 1 ? sizes[0] : null,
  );
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(
    null,
  );
  const soldOut = stockState({ stockQuantity, madeToOrder }) === "sold_out";

  function addToBag() {
    if (sizes && !size) {
      setMessage({ text: "Please select a size.", error: true });
      return;
    }
    // Cart is not built yet; this is a placeholder confirmation.
    setMessage({ text: `${name}${size ? ` (${size})` : ""} added to your bag.` });
  }

  return (
    <div className="stack [--stack:1.5rem]">
      {sizes && (
        <fieldset disabled={soldOut}>
          <legend className="eyebrow mb-3">Size</legend>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-5">
            {sizes.map((s) => (
              <label key={s} className="relative">
                <input
                  type="radio"
                  name="size"
                  value={s}
                  checked={size === s}
                  onChange={() => {
                    setSize(s);
                    setMessage(null);
                  }}
                  className="peer sr-only"
                />
                <span className="grid h-12 cursor-pointer place-items-center border border-line-strong text-small transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink peer-disabled:cursor-not-allowed peer-disabled:text-subtle hover:border-ink">
                  {s}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="stack [--stack:0.75rem]">
        {soldOut ? (
          <>
            <button type="button" className="btn btn-primary btn-block" disabled>
              Sold out
            </button>
            <button type="button" className="btn btn-secondary btn-block">
              Notify me when available
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={addToBag}
            className="btn btn-primary btn-block"
          >
            Add to bag
          </button>
        )}
        <button type="button" className="btn btn-secondary btn-block">
          <HeartIcon width={16} height={16} />
          Add to wishlist
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`text-small ${message?.error ? "text-sale" : "text-success"} ${message ? "" : "hidden"}`}
      >
        {message?.text}
      </p>
    </div>
  );
}
