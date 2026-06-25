import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./product-card";
import type { Product } from "@/lib/types";

export function ProductRow({
  title,
  products,
  moreHref,
}: {
  title: string;
  products: Product[];
  moreHref?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold uppercase tracking-wide sm:text-2xl">
          {title}
        </h2>
        {moreHref && (
          <Link
            href={moreHref}
            className="flex items-center gap-1 text-sm font-medium text-brand hover:underline"
          >
            Ver más <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.slice(0, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
