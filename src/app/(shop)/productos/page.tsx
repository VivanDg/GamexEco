import { Suspense } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/modules/catalog/components/product-card";
import { FilterSidebar } from "@/modules/catalog/components/filter-sidebar";
import { SortSelect } from "@/modules/catalog/components/sort-select";
import { getBrands, getCategories, getProducts, activeFilterLabel } from "@/lib/data";

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const filters = {
    q: typeof sp.q === "string" ? sp.q : undefined,
    cat: typeof sp.cat === "string" ? sp.cat : undefined,
    marca: typeof sp.marca === "string" ? sp.marca : undefined,
    stock: typeof sp.stock === "string" ? sp.stock === "1" : undefined,
    sort: typeof sp.sort === "string" ? sp.sort : undefined,
  };
  const [categories, brands, list] = await Promise.all([
    getCategories(),
    getBrands(),
    getProducts(filters),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold uppercase tracking-wide">
            {activeFilterLabel(filters, categories, brands)}
          </h1>
          <p className="text-sm text-muted-foreground">
            {list.length} producto{list.length !== 1 && "s"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Filtros en móvil */}
          <Sheet>
            <SheetTrigger
              render={<Button variant="outline" className="lg:hidden" />}
            >
              <SlidersHorizontal className="size-4" /> Filtros
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="font-heading">Filtros</SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-6">
                <Suspense>
                  <FilterSidebar />
                </Suspense>
              </div>
            </SheetContent>
          </Sheet>
          <Suspense>
            <SortSelect />
          </Suspense>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <div className="hidden lg:block">
          <Suspense>
            <FilterSidebar />
          </Suspense>
        </div>

        <div>
          {list.length === 0 ? (
            <div className="rounded-lg border border-dashed py-20 text-center text-muted-foreground">
              No se encontraron productos con esos filtros.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {list.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
