"use client";

import * as React from "react";
import { QuantityStepper } from "@/modules/cart/components/quantity-stepper";
import { AddToCartButton } from "./add-to-cart-button";
import type { Product } from "@/lib/types";

export function ProductPurchase({ product }: { product: Product }) {
  const [qty, setQty] = React.useState(1);
  const disabled = product.onRequest || product.stock <= 0;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {!disabled && (
        <QuantityStepper
          value={qty}
          onChange={setQty}
          max={Math.max(1, product.stock)}
        />
      )}
      <AddToCartButton product={product} quantity={qty} size="lg" />
    </div>
  );
}
