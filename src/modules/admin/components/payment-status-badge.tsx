import { Badge } from "@/components/ui/badge";
import { paymentStatusLabels } from "@/lib/mock/payments";
import type { PaymentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<PaymentStatus, string> = {
  pagado: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  pendiente: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  reembolsado: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  fallido: "bg-destructive/15 text-destructive",
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <Badge
      variant="secondary"
      className={cn("border-transparent font-medium", styles[status])}
    >
      {paymentStatusLabels[status]}
    </Badge>
  );
}
