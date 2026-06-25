import Link from "next/link";
import {
  AlertTriangle,
  DollarSign,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatCard } from "@/modules/admin/components/stat-card";
import { OrderStatusBadge } from "@/modules/account/components/order-status-badge";
import { PaymentStatusBadge } from "@/modules/admin/components/payment-status-badge";
import { paymentMethodLabels } from "@/lib/mock/payments";
import { dualPrice } from "@/lib/utils";
import { getOrders, getPayments, getProducts, getUsers } from "@/lib/data";

const LOW_STOCK = 15;

export default async function AdminDashboard() {
  const [orders, payments, products, users] = await Promise.all([
    getOrders({ limit: 10 }),
    getPayments(10),
    getProducts({ limit: 100 }),
    getUsers(),
  ]);

  const now = Date.now();
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
  const recentOrders = orders.filter((o) => {
    try {
      return now - new Date(o.createdAt).getTime() <= THIRTY_DAYS;
    } catch {
      return false;
    }
  });

  const collected = payments
    .filter((p) => p.status === "pagado")
    .reduce((a, p) => a + p.amountUSD, 0);
  const lowStock = products.filter((p) => !p.onRequest && p.stock <= LOW_STOCK);
  const clients = users.filter((u) => u.role === "cliente");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold uppercase tracking-wide">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Resumen general de Gamex
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Recaudado"
          value={dualPrice(collected).usd}
          hint={dualPrice(collected).pen}
          icon={DollarSign}
          accent="emerald"
        />
        <StatCard
          label="Pedidos"
          value={String(recentOrders.length)}
          hint="Últimos 30 días"
          icon={ShoppingBag}
          accent="sky"
        />
        <StatCard
          label="Usuarios"
          value={String(users.length)}
          hint={`${clients.length} clientes`}
          icon={Users}
          accent="brand"
        />
        <StatCard
          label="Stock bajo"
          value={String(lowStock.length)}
          hint={`≤ ${LOW_STOCK} unidades`}
          icon={AlertTriangle}
          accent="amber"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* Pedidos recientes */}
        <Card className="p-0">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-heading text-lg font-bold">Pedidos recientes</h2>
            <Button variant="ghost" size="sm" render={<Link href="/admin/pedidos" />}>
              Ver todos
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.code}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {o.customerName}
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge status={o.status} />
                  </TableCell>
                  <TableCell className="text-right font-medium text-price">
                    {dualPrice(o.totalUSD).usd}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Stock bajo */}
        <Card className="p-0">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-heading text-lg font-bold">Stock bajo</h2>
            <Button
              variant="ghost"
              size="sm"
              render={<Link href="/admin/productos" />}
            >
              Inventario
            </Button>
          </div>
          <div className="divide-y">
            {lowStock.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">
                Todo el stock está en niveles saludables.
              </p>
            ) : (
              lowStock.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-3 p-4"
                >
                  <div className="min-w-0">
                    <div className="line-clamp-1 text-sm font-medium">
                      {p.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {p.brand?.name ?? p.brandName ?? "Marca"}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-md bg-amber-500/15 px-2 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    {p.stock} u.
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Pagos recientes */}
      <Card className="p-0">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-heading text-lg font-bold">Pagos recientes</h2>
          <Button variant="ghost" size="sm" render={<Link href="/admin/pagos" />}>
            Ver todos
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transacción</TableHead>
              <TableHead className="hidden sm:table-cell">Pedido</TableHead>
              <TableHead className="hidden md:table-cell">Método</TableHead>
              <TableHead className="text-right">Monto</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.slice(0, 5).map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.code}</TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">
                  {p.orderCode}
                </TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {paymentMethodLabels[p.method]}
                </TableCell>
                <TableCell className="text-right font-medium text-price">
                  {dualPrice(p.amountUSD).usd}
                </TableCell>
                <TableCell>
                  <PaymentStatusBadge status={p.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
