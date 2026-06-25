"use client";

import { ShoppingCart, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/modules/cart/store";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  product,
  quantity = 1,
  className,
  size = "default",
  full,
}: {
  product: Product;
  quantity?: number;
  className?: string;
  size?: "sm" | "default" | "lg";
  full?: boolean;
}) {
  const add = useCart((s) => s.add);
  const disabled = product.onRequest || product.stock <= 0;

  if (disabled) {
    return (
      <Button
        size={size}
        variant="outline"
        disabled
        className={cn(full && "w-full", className)}
      >
        {product.onRequest ? "Consultar disponibilidad" : "Sin stock"}
      </Button>
    );
  }

  return (
    <Button
      size={size}
      className={cn(
        "bg-brand text-brand-foreground hover:bg-brand/90",
        full && "w-full",
        className,
      )}
      onClick={() => {
        add(product, quantity);
        toast.success("Agregado al carrito", {
          description: product.name,
          icon: <Check className="size-4" />,
        });
      }}
    >
      <ShoppingCart className="size-4" />
      Agregar
    </Button>
  );
}
