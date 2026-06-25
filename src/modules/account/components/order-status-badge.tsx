import { Badge } from "@/components/ui/badge";
import { orderStatusLabels } from "@/lib/mock/orders";
import type { OrderStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<OrderStatus, string> = {
  pendiente: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  pagado: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  preparando: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  enviado: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  entregado: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  cancelado: "bg-destructive/15 text-destructive",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge
      variant="secondary"
      className={cn("border-transparent font-medium", styles[status])}
    >
      {orderStatusLabels[status]}
    </Badge>
  );
}
