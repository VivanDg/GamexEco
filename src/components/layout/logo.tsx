import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 select-none", className)}
      aria-label="Gamex inicio"
    >
      <span className="grid size-9 place-items-center rounded-md bg-brand font-heading text-lg font-bold text-brand-foreground shadow-sm">
        G
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-xl font-bold tracking-wide text-header-foreground">
          GAMEX
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-brand">
          Tech · Gaming
        </span>
      </span>
    </Link>
  );
}
