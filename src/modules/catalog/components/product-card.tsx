import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/product-image";
import { AddToCartButton } from "./add-to-cart-button";
import { dualPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const price = dualPrice(product.priceUSD);
  const brand = product.brand?.name ?? product.brandName ?? "Marca";

  return (
    <Card className="card-top-accent group flex h-full flex-col gap-0 overflow-hidden p-0 transition-shadow hover:shadow-lg">
      <Link
        href={`/productos/${product.slug}`}
        className="relative block p-4 pt-5"
      >
        <div className="absolute left-3 top-3 z-10 flex gap-1">
          {product.isNew && (
            <Badge className="bg-blue-600 text-white hover:bg-blue-600">
              NUEVO
            </Badge>
          )}
          {product.onRequest && (
            <Badge variant="secondary" className="text-[10px]">
              CONSULTAR
            </Badge>
          )}
        </div>
        <ProductImage
          name={product.name}
          src={product.images?.[0]}
          className="aspect-square w-full"
          label="GAMEX"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 px-4 pb-4">
        <Link
          href={`/productos/${product.slug}`}
          className="line-clamp-3 min-h-[3.6em] text-sm font-medium leading-snug hover:text-brand"
        >
          {product.name}
        </Link>

        <div className="mt-auto space-y-0.5">
          <div className="font-heading text-lg font-bold text-price">
            {price.usd}
          </div>
          <div className="text-xs text-muted-foreground">({price.pen})</div>
        </div>

        <div className="text-xs text-muted-foreground">
          <div>
            Stock:{" "}
            <span className="font-medium text-foreground">
              {product.onRequest
                ? "A pedido"
                : product.stock > 20
                  ? ">20"
                  : product.stock}
            </span>
          </div>
          <div>
            Marca:{" "}
            <span className="font-medium uppercase text-foreground">
              {brand}
            </span>
          </div>
        </div>

        <AddToCartButton product={product} size="sm" full className="mt-1" />
      </div>
    </Card>
  );
}
