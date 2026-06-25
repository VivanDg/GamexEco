"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { topCategories, categories } from "@/lib/mock/categories";
import { brands } from "@/lib/mock/brands";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function useSetParam() {
  const router = useRouter();
  const params = useSearchParams();
  return (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null || next.get(key) === value) next.delete(key);
    else next.set(key, value);
    router.push(`/productos?${next.toString()}`);
  };
}

function Option({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent",
        active && "bg-accent font-medium text-brand",
      )}
    >
      {children}
    </button>
  );
}

export function FilterSidebar() {
  const params = useSearchParams();
  const set = useSetParam();
  const activeCat = params.get("cat");
  const activeBrand = params.get("marca");
  const inStock = params.get("stock") === "1";

  // Categorías navegables: top-level + componentes
  const catList = [
    ...topCategories,
    ...categories.filter((c) => c.parentId === "c-componentes"),
  ];

  return (
    <aside className="space-y-5">
      <div>
        <h3 className="mb-2 font-heading text-sm font-semibold uppercase tracking-wide">
          Categorías
        </h3>
        <div className="space-y-0.5">
          <Option active={!activeCat} onClick={() => set("cat", null)}>
            Todas
          </Option>
          {catList.map((c) => (
            <Option
              key={c.id}
              active={activeCat === c.slug}
              onClick={() => set("cat", c.slug)}
            >
              {c.name}
            </Option>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-2 font-heading text-sm font-semibold uppercase tracking-wide">
          Marcas
        </h3>
        <div className="max-h-64 space-y-0.5 overflow-y-auto pr-1">
          <Option active={!activeBrand} onClick={() => set("marca", null)}>
            Todas
          </Option>
          {brands.map((b) => (
            <Option
              key={b.id}
              active={activeBrand === b.slug}
              onClick={() => set("marca", b.slug)}
            >
              {b.name}
            </Option>
          ))}
        </div>
      </div>

      <Separator />

      <label className="flex cursor-pointer items-center gap-2 px-2">
        <input
          type="checkbox"
          checked={inStock}
          onChange={() => set("stock", inStock ? null : "1")}
          className="size-4 accent-[var(--brand)]"
        />
        <Label className="cursor-pointer">Solo con stock</Label>
      </label>
    </aside>
  );
}
