"use client";

import * as React from "react";
import Link from "next/link";
import {
  Check,
  CreditCard,
  MapPin,
  PackageCheck,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart, cartSubtotalUSD } from "@/modules/cart/store";
import { dualPrice, cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Envío", icon: MapPin },
  { id: 2, label: "Pago", icon: CreditCard },
  { id: 3, label: "Confirmación", icon: PackageCheck },
];

const SHIPPING_USD = 8;

type ShippingData = {
  fullName: string;
  document: string;
  phone: string;
  email: string;
  region: string;
  city: string;
  address: string;
  reference: string;
};

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const [step, setStep] = React.useState(1);
  const [shipping, setShipping] = React.useState<ShippingData | null>(null);
  const [orderCode, setOrderCode] = React.useState("");
  const [orderId, setOrderId] = React.useState("");
  const [creating, setCreating] = React.useState(false);
  const [error, setError] = React.useState("");

  const subtotal = cartSubtotalUSD(items);
  const shippingCost = subtotal > 200 ? 0 : SHIPPING_USD;
  const total = subtotal + shippingCost;

  if (items.length === 0 && step < 3) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
        <ShoppingCart className="size-16 text-muted-foreground/40" />
        <h1 className="font-heading text-2xl font-bold">No hay nada que pagar</h1>
        <Button
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          render={<Link href="/productos" />}
        >
          Explorar catálogo
        </Button>
      </div>
    );
  }

  const handleConfirmOrder = async () => {
    if (!shipping) return;
    setCreating(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            sku: i.product.sku,
            priceUSD: i.product.priceUSD,
            quantity: i.quantity,
          })),
          shipping,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Error al crear la orden");
      }

      setOrderId(data.orderId);
      setOrderCode(data.code);
      clear();

      if (data.initPoint) {
        window.location.href = data.initPoint;
      } else {
        setStep(3);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar el pago");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 font-heading text-2xl font-bold uppercase tracking-wide">
        Checkout
      </h1>

      <div className="mb-8 flex items-center">
        {STEPS.map((s, i) => {
          const done = step > s.id;
          const active = step === s.id;
          return (
            <React.Fragment key={s.id}>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "grid size-9 place-items-center rounded-full border-2 text-sm font-semibold",
                    done && "border-brand bg-brand text-brand-foreground",
                    active && "border-brand text-brand",
                    !done && !active && "border-border text-muted-foreground",
                  )}
                >
                  {done ? <Check className="size-4" /> : s.id}
                </div>
                <span
                  className={cn(
                    "hidden text-sm font-medium sm:block",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-3 h-0.5 flex-1",
                    step > s.id ? "bg-brand" : "bg-border",
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {step === 3 ? (
        <Card className="mx-auto max-w-xl space-y-4 p-8 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/15">
            <PackageCheck className="size-8 text-emerald-500" />
          </div>
          <h2 className="font-heading text-2xl font-bold">¡Pedido confirmado!</h2>
          <p className="text-muted-foreground">
            Tu pedido <span className="font-semibold text-foreground">{orderCode || "GMX-100261"}</span>{" "}
            fue registrado. Te enviaremos las novedades por correo.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button
              className="bg-brand text-brand-foreground hover:bg-brand/90"
              render={<Link href="/cuenta/pedidos" />}
            >
              Ver mis pedidos
            </Button>
            <Button variant="outline" render={<Link href="/productos" />}>
              Seguir comprando
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            {step === 1 && <ShippingForm onNext={(data) => { setShipping(data); setStep(2); }} />}
            {step === 2 && shipping && (
              <div className="space-y-4">
                <Card className="space-y-4 p-6">
                  <h2 className="font-heading text-lg font-bold">Confirmar pedido</h2>
                  <p className="text-sm text-muted-foreground">
                    Vas a pagar <strong>{dualPrice(total).usd}</strong> con Mercado Pago.
                    Serás redirigido a Mercado Pago para completar el pago.
                  </p>

                  {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}
                </Card>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Atrás
                </Button>
              ) : (
                <Button variant="outline" render={<Link href="/carrito" />}>
                  Volver al carrito
                </Button>
              )}
              {step === 2 && (
                <Button
                  className="bg-brand text-brand-foreground hover:bg-brand/90"
                  disabled={creating}
                  onClick={handleConfirmOrder}
                >
                  {creating ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    `Pagar con Mercado Pago`
                  )}
                </Button>
              )}
            </div>
          </div>

          <Card className="sticky top-36 h-fit space-y-3 p-5">
            <h2 className="font-heading text-lg font-bold">Tu pedido</h2>
            <div className="max-h-56 space-y-2 overflow-y-auto">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between gap-2 text-sm">
                  <span className="line-clamp-1 text-muted-foreground">
                    {quantity}× {product.name}
                  </span>
                  <span className="shrink-0 font-medium">
                    {dualPrice(product.priceUSD * quantity).usd}
                  </span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{dualPrice(subtotal).usd}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Envío</span>
              <span>{shippingCost === 0 ? "Gratis" : dualPrice(shippingCost).usd}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-heading text-lg font-bold text-price">
                {dualPrice(total).usd}
              </span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function Field({
  id,
  label,
  ...props
}: { id: string; label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
    </div>
  );
}

function ShippingForm({ onNext }: { onNext: (data: ShippingData) => void }) {
  const [data, setData] = React.useState<ShippingData>({
    fullName: "",
    document: "",
    phone: "",
    email: "",
    region: "lima",
    city: "",
    address: "",
    reference: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.fullName || !data.document || !data.phone || !data.email || !data.city || !data.address) return;
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="space-y-5 p-6">
        <h2 className="font-heading text-lg font-bold">Datos de envío</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="name" label="Nombres y apellidos" required placeholder="Brayan Vargas"
            value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })} />
          <Field id="doc" label="DNI / RUC" required placeholder="70123456"
            value={data.document} onChange={(e) => setData({ ...data, document: e.target.value })} />
          <Field id="phone" label="Teléfono" required placeholder="+51 987 654 321"
            value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
          <Field id="email" label="Correo" required type="email" placeholder="correo@ejemplo.com"
            value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
          <div className="space-y-1.5">
            <Label>Departamento</Label>
            <Select value={data.region} onValueChange={(v) => setData({ ...data, region: v ?? "lima" })}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lima">Lima</SelectItem>
                <SelectItem value="arequipa">Arequipa</SelectItem>
                <SelectItem value="cusco">Cusco</SelectItem>
                <SelectItem value="piura">Piura</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Field id="city" label="Distrito / Ciudad" required placeholder="San Borja"
            value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })} />
          <div className="sm:col-span-2">
            <Field id="address" label="Dirección" required placeholder="Av. Tecnología 1234"
              value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Field id="ref" label="Referencia (opcional)" placeholder="Frente al parque"
              value={data.reference} onChange={(e) => setData({ ...data, reference: e.target.value })} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="bg-brand text-brand-foreground hover:bg-brand/90">
            Ir a pagar
          </Button>
        </div>
      </Card>
    </form>
  );
}
