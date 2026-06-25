import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  accent?: "brand" | "emerald" | "amber" | "sky";
}) {
  const accentClass = {
    brand: "bg-brand/15 text-brand",
    emerald: "bg-emerald-500/15 text-emerald-500",
    amber: "bg-amber-500/15 text-amber-500",
    sky: "bg-sky-500/15 text-sky-500",
  }[accent ?? "brand"];

  return (
    <Card className="flex flex-row items-center gap-4 p-5">
      <div className={cn("grid size-12 shrink-0 place-items-center rounded-lg", accentClass)}>
        <Icon className="size-6" />
      </div>
      <div className="min-w-0">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="font-heading text-2xl font-bold">{value}</div>
        {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
      </div>
    </Card>
  );
}
