import { CheckCircle2, Clock, RotateCcw } from "lucide-react";
import { StatCard } from "@/modules/admin/components/stat-card";
import { PaymentsTable } from "@/modules/admin/components/payments-table";
import { recentPayments } from "@/lib/mock/payments";
import { dualPrice } from "@/lib/utils";

export default function AdminPagosPage() {
  const collected = recentPayments
    .filter((p) => p.status === "pagado")
    .reduce((a, p) => a + p.amountUSD, 0);
  const pending = recentPayments
    .filter((p) => p.status === "pendiente")
    .reduce((a, p) => a + p.amountUSD, 0);
  const refunded = recentPayments
    .filter((p) => p.status === "reembolsado")
    .reduce((a, p) => a + p.amountUSD, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold uppercase tracking-wide">
          Pagos
        </h1>
        <p className="text-sm text-muted-foreground">
          Transacciones y conciliación de pagos
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Recaudado"
          value={dualPrice(collected).usd}
          hint={dualPrice(collected).pen}
          icon={CheckCircle2}
          accent="emerald"
        />
        <StatCard
          label="Pendiente"
          value={dualPrice(pending).usd}
          hint={dualPrice(pending).pen}
          icon={Clock}
          accent="amber"
        />
        <StatCard
          label="Reembolsado"
          value={dualPrice(refunded).usd}
          hint={dualPrice(refunded).pen}
          icon={RotateCcw}
          accent="sky"
        />
      </div>

      <PaymentsTable initial={recentPayments} />
    </div>
  );
}
