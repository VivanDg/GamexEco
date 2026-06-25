"use client";

import Link from "next/link";
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductImage } from "@/components/product-image";
import { QuantityStepper } from "@/modules/cart/components/quantity-stepper";
import { useCart, cartSubtotalUSD, cartCount } from "@/modules/cart/store";
import { dualPrice } from "@/lib/utils";

const SHIPPING_USD = 8;

export default function CartPage() {
  const { items, setQuantity, remove, clear } = useCart();
  const subtotal = cartSubtotalUSD(items);
  const shipping = items.length === 0 || subtotal > 200 ? 0 : SHIPPING_USD;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
        <ShoppingCart className="size-16 text-muted-foreground/40" />
        <h1 className="font-heading text-2xl font-bold">Tu carrito está vacío</h1>
        <p className="text-muted-foreground">
          Agrega productos para continuar con tu compra.
        </p>
        <Button
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          render={<Link href="/productos" />}
        >
          Explorar catálogo
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 font-heading text-2xl font-bold uppercase tracking-wide">
        Carrito ({cartCount(items)})
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <div className="space-y-4">
          {items.map(({ product, quantity }) => {
            const line = dualPrice(product.priceUSD * quantity);
            return (
              <Card key={product.id} className="flex gap-4 p-4">
                <ProductImage
                  name={product.name}
                  src={product.images?.[0]}
                  className="size-24 shrink-0"
                  label=""
                />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/productos/${product.slug}`}
                      className="line-clamp-2 text-sm font-medium hover:text-brand"
                    >
                      {product.name}
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Eliminar"
                      className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => remove(product.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <QuantityStepper
                      value={quantity}
                      onChange={(q) => setQuantity(product.id, q)}
                    />
                    <div className="text-right">
                      <div className="font-heading font-bold text-price">
                        {line.usd}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {line.pen}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}

          <Button
            variant="ghost"
            className="text-muted-foreground"
            onClick={clear}
          >
            <Trash2 className="size-4" /> Vaciar carrito
          </Button>
        </div>

        {/* Resumen */}
        <div>
          <Card className="sticky top-36 space-y-4 p-5">
            <h2 className="font-heading text-lg font-bold">Resumen</h2>
            <div className="space-y-2 text-sm">
              <Row label="Subtotal" value={dualPrice(subtotal).usd} />
              <Row
                label="Envío"
                value={shipping === 0 ? "Gratis" : dualPrice(shipping).usd}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <div className="text-right">
                <div className="font-heading text-xl font-bold text-price">
                  {dualPrice(total).usd}
                </div>
                <div className="text-xs text-muted-foreground">
                  {dualPrice(total).pen}
                </div>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
              render={<Link href="/checkout" />}
            >
              Ir a pagar <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full"
              render={<Link href="/productos" />}
            >
              Seguir comprando
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
