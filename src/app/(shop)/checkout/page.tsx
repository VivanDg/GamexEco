"use client";

import * as React from "react";
import Link from "next/link";
import {
  Check,
  CreditCard,
  MapPin,
  PackageCheck,
  ShoppingCart,
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

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const [step, setStep] = React.useState(1);
  const subtotal = cartSubtotalUSD(items);
  const shipping = subtotal > 200 ? 0 : SHIPPING_USD;
  const total = subtotal + shipping;

  // Carrito vacío y aún no confirmado
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

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 font-heading text-2xl font-bold uppercase tracking-wide">
        Checkout
      </h1>

      {/* Stepper */}
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
            Tu pedido <span className="font-semibold text-foreground">GMX-100261</span>{" "}
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
            {step === 1 && <ShippingForm />}
            {step === 2 && <PaymentForm />}

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
              <Button
                className="bg-brand text-brand-foreground hover:bg-brand/90"
                onClick={() => {
                  if (step === 2) clear();
                  setStep(step + 1);
                }}
              >
                {step === 2 ? "Confirmar pedido" : "Continuar"}
              </Button>
            </div>
          </div>

          {/* Resumen */}
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
              <span>{shipping === 0 ? "Gratis" : dualPrice(shipping).usd}</span>
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

function ShippingForm() {
  return (
    <Card className="space-y-5 p-6">
      <h2 className="font-heading text-lg font-bold">Datos de envío</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Nombres y apellidos" placeholder="Brayan Vargas" />
        <Field id="doc" label="DNI / RUC" placeholder="70123456" />
        <Field id="phone" label="Teléfono" placeholder="+51 987 654 321" />
        <Field id="email" label="Correo" placeholder="correo@ejemplo.com" />
        <div className="space-y-1.5">
          <Label>Departamento</Label>
          <Select defaultValue="lima">
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
        <Field id="city" label="Distrito / Ciudad" placeholder="San Borja" />
        <div className="sm:col-span-2">
          <Field id="address" label="Dirección" placeholder="Av. Tecnología 1234" />
        </div>
        <div className="sm:col-span-2">
          <Field
            id="ref"
            label="Referencia (opcional)"
            placeholder="Frente al parque"
          />
        </div>
      </div>
    </Card>
  );
}

function PaymentForm() {
  return (
    <Card className="space-y-5 p-6">
      <h2 className="font-heading text-lg font-bold">Método de pago</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {["Tarjeta", "Yape / Plin", "Transferencia"].map((m, i) => (
          <label
            key={m}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm",
              i === 0 && "border-brand bg-brand/5",
            )}
          >
            <input
              type="radio"
              name="pay"
              defaultChecked={i === 0}
              className="accent-[var(--brand)]"
            />
            {m}
          </label>
        ))}
      </div>
      <Separator />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field
            id="card"
            label="Número de tarjeta"
            placeholder="4242 4242 4242 4242"
          />
        </div>
        <Field id="exp" label="Vencimiento" placeholder="MM/AA" />
        <Field id="cvv" label="CVV" placeholder="123" />
        <div className="sm:col-span-2">
          <Field id="holder" label="Titular" placeholder="BRAYAN VARGAS" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        * Pago simulado — sin procesamiento real (Fase 1, solo UI).
      </p>
    </Card>
  );
}
