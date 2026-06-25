import { OrdersTable } from "@/modules/admin/components/orders-table";
import { recentOrders } from "@/lib/mock/orders";

export default function AdminPedidosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold uppercase tracking-wide">
          Pedidos
        </h1>
        <p className="text-sm text-muted-foreground">
          Administra y actualiza el estado de los pedidos
        </p>
      </div>
      <OrdersTable initial={recentOrders} />
    </div>
  );
}
