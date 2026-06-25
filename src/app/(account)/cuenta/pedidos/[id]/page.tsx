import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductImage } from "@/components/product-image";
import { OrderStatusBadge } from "@/modules/account/components/order-status-badge";
import { orderById, orderFlow, orderStatusLabels, orders } from "@/lib/mock/orders";
import { dualPrice, cn } from "@/lib/utils";

export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

export default async function PedidoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = orderById(id);
  if (!order) notFound();

  const currentIdx =
    order.status === "cancelado"
      ? -1
      : orderFlow.indexOf(order.status);

  return (
    <div className="space-y-6">
      <Link
        href="/cuenta/pedidos"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brand"
      >
        <ArrowLeft className="size-4" /> Volver a mis pedidos
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">{order.code}</h1>
          <p className="text-sm text-muted-foreground">
            Realizado el{" "}
            {new Date(order.createdAt).toLocaleDateString("es-PE", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Timeline de seguimiento */}
      {currentIdx >= 0 && (
        <Card className="p-6">
          <h2 className="mb-5 font-heading text-lg font-bold">Seguimiento</h2>
          <ol className="flex flex-col gap-0 sm:flex-row sm:items-start">
            {orderFlow.map((status, i) => {
              const done = i <= currentIdx;
              const isLast = i === orderFlow.length - 1;
              return (
                <li
                  key={status}
                  className="relative flex flex-1 gap-3 pb-6 sm:flex-col sm:items-center sm:gap-2 sm:pb-0 sm:text-center"
                >
                  <div className="z-10 flex flex-col items-center sm:contents">
                    <div
                      className={cn(
                        "grid size-9 place-items-center rounded-full border-2",
                        done
                          ? "border-brand bg-brand text-brand-foreground"
                          : "border-border bg-card text-muted-foreground",
                      )}
                    >
                      {done ? <Check className="size-4" /> : i + 1}
                    </div>
                  </div>
                  {/* Conector */}
                  {!isLast && (
                    <span
                      className={cn(
                        "absolute left-4 top-9 h-full w-0.5 sm:left-1/2 sm:top-4 sm:h-0.5 sm:w-full",
                        i < currentIdx ? "bg-brand" : "bg-border",
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "pt-1 text-sm font-medium",
                      done ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {orderStatusLabels[status]}
                  </span>
                </li>
              );
            })}
          </ol>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Productos */}
        <Card className="divide-y p-0">
          {order.items.map((item) => (
            <div key={item.productId} className="flex gap-4 p-4">
              <ProductImage name={item.name} className="size-16 shrink-0" label="" />
              <div className="flex flex-1 items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">
                    {item.sku}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Cantidad: {item.quantity}
                  </div>
                </div>
                <div className="font-heading font-bold text-price">
                  {dualPrice(item.priceUSD * item.quantity).usd}
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* Resumen + envío */}
        <div className="space-y-4">
          <Card className="space-y-3 p-5">
            <h2 className="font-heading text-lg font-bold">Resumen</h2>
            <Row label="Subtotal" value={dualPrice(order.subtotalUSD).usd} />
            <Row
              label="Envío"
              value={
                order.shippingUSD === 0
                  ? "Gratis"
                  : dualPrice(order.shippingUSD).usd
              }
            />
            <Separator />
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-heading text-lg font-bold text-price">
                {dualPrice(order.totalUSD).usd}
              </span>
            </div>
          </Card>

          {order.shipping && (
            <Card className="space-y-2 p-5 text-sm">
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
                <MapPin className="size-4 text-brand" /> Envío
              </h2>
              <p className="font-medium">{order.shipping.fullName}</p>
              <p className="text-muted-foreground">{order.shipping.phone}</p>
              <p className="text-muted-foreground">
                {order.shipping.address}, {order.shipping.city},{" "}
                {order.shipping.region}
              </p>
              {order.shipping.reference && (
                <p className="text-muted-foreground">
                  Ref: {order.shipping.reference}
                </p>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
