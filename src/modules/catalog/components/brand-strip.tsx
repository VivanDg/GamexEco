import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { Brand } from "@/lib/types";

export function BrandStrip({ brands }: { brands: Brand[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {brands.map((brand) => (
          <Link key={brand.id} href={`/productos?marca=${brand.slug}`}>
            <Card className="flex h-20 w-40 shrink-0 items-center justify-center px-4 transition-colors hover:border-brand">
              <span className="font-heading text-lg font-semibold uppercase tracking-wide text-muted-foreground">
                {brand.name}
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
