import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/modules/account/components/order-status-badge";
import { orders } from "@/lib/mock/orders";
import { dualPrice } from "@/lib/utils";

export default function PedidosPage() {
  const list = [...orders].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold uppercase tracking-wide">
        Mis pedidos
      </h1>

      {list.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 p-12 text-center">
          <Package className="size-12 text-muted-foreground/40" />
          <p className="text-muted-foreground">Aún no tienes pedidos.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {list.map((order) => (
            <Card key={order.id} className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold">{order.code}</span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("es-PE", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {order.items.length} producto
                    {order.items.length !== 1 && "s"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-heading text-lg font-bold text-price">
                      {dualPrice(order.totalUSD).usd}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {dualPrice(order.totalUSD).pen}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    render={<Link href={`/cuenta/pedidos/${order.id}`} />}
                  >
                    Ver detalle <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
