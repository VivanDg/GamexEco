"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, cartCount } from "@/modules/cart/store";

export function CartButton() {
  const items = useCart((s) => s.items);
  const open = useCart((s) => s.open);
  const count = cartCount(items);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Carrito (${count})`}
      onClick={open}
      className="relative text-header-foreground hover:bg-white/10 hover:text-header-foreground"
    >
      <ShoppingCart className="size-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold text-brand-foreground">
          {count}
        </span>
      )}
    </Button>
  );
}
