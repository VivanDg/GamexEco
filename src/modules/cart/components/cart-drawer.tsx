"use client";

import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductImage } from "@/components/product-image";
import { QuantityStepper } from "./quantity-stepper";
import { useCart, cartCount, cartSubtotalUSD } from "@/modules/cart/store";
import { dualPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, setOpen, setQuantity, remove } = useCart();
  const count = cartCount(items);
  const subtotal = cartSubtotalUSD(items);
  const price = dualPrice(subtotal);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2 font-heading">
            <ShoppingCart className="size-5 text-brand" />
            Tu carrito
            <span className="text-muted-foreground">({count})</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <ShoppingCart className="size-12 text-muted-foreground/40" />
            <p className="text-muted-foreground">Tu carrito está vacío.</p>
            <Button
              variant="outline"
              render={<Link href="/productos" />}
              onClick={() => setOpen(false)}
            >
              Explorar productos
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4">
              {items.map(({ product, quantity }) => {
                const line = dualPrice(product.priceUSD * quantity);
                return (
                  <div key={product.id} className="flex gap-3 py-4">
                    <ProductImage
                      name={product.name}
                      src={product.images?.[0]}
                      className="size-20 shrink-0"
                      label=""
                    />
                    <div className="flex flex-1 flex-col gap-1">
                      <Link
                        href={`/productos/${product.slug}`}
                        onClick={() => setOpen(false)}
                        className="line-clamp-2 text-sm font-medium hover:text-brand"
                      >
                        {product.name}
                      </Link>
                      <span className="text-sm font-semibold text-price">
                        {line.usd}
                      </span>
                      <div className="mt-auto flex items-center justify-between">
                        <QuantityStepper
                          value={quantity}
                          onChange={(q) => setQuantity(product.id, q)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Eliminar"
                          className="size-8 text-muted-foreground hover:text-destructive"
                          onClick={() => remove(product.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <SheetFooter className="border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <div className="text-right">
                  <div className="font-heading text-lg font-bold text-price">
                    {price.usd}
                  </div>
                  <div className="text-xs text-muted-foreground">{price.pen}</div>
                </div>
              </div>
              <Separator />
              <Button
                size="lg"
                className="bg-brand text-brand-foreground hover:bg-brand/90"
                render={<Link href="/checkout" />}
                onClick={() => setOpen(false)}
              >
                Finalizar compra
              </Button>
              <Button
                variant="outline"
                render={<Link href="/carrito" />}
                onClick={() => setOpen(false)}
              >
                Ver carrito
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
