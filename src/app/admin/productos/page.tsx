import { InventoryTable } from "@/modules/admin/components/inventory-table";
import { products } from "@/lib/mock/products";

export default function AdminProductosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold uppercase tracking-wide">
          Inventario
        </h1>
        <p className="text-sm text-muted-foreground">
          Gestiona precios y stock de los productos
        </p>
      </div>
      <InventoryTable initial={products} />
    </div>
  );
}
