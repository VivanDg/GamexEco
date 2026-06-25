import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ChevronRight, ShieldCheck, Truck } from "lucide-react";

export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ProductImage } from "@/components/product-image";
import { ProductPurchase } from "@/modules/catalog/components/product-purchase";
import { ProductRow } from "@/modules/catalog/components/product-row";
import { getProductDetail } from "@/lib/api";
import { dualPrice } from "@/lib/utils";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProductDetail(slug);
  if (!data?.product) notFound();

  const product = data.product;
  const price = dualPrice(product.priceUSD);
  const related = data.related;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-brand">
          Inicio
        </Link>
        <ChevronRight className="size-4" />
        <Link
          href={`/productos?cat=${product.categoryId}`}
          className="hover:text-brand"
        >
          {product.category?.name ?? product.categoryName ?? product.categoryId}
        </Link>
        <ChevronRight className="size-4" />
        <span className="line-clamp-1 text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Galería */}
        <div className="space-y-3">
          <ProductImage
            name={product.name}
            src={product.images?.[0]}
            className="aspect-square w-full"
            label="GAMEX"
          />
          <div className="grid grid-cols-4 gap-3">
            {product.images?.slice(0, 4).map((img, i) => (
              <ProductImage
                key={i}
                name={`${product.name}-${i}`}
                src={img}
                className="aspect-square w-full cursor-pointer ring-offset-2 hover:ring-2 hover:ring-brand"
                label=""
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {product.isNew && (
              <Badge className="bg-blue-600 text-white hover:bg-blue-600">
                NUEVO
              </Badge>
            )}
            <span className="text-sm text-muted-foreground">
              Marca:{" "}
              <span className="font-medium uppercase text-foreground">
                {product.brand?.name ?? product.brandName ?? product.brandId}
              </span>
            </span>
          </div>

          <h1 className="font-heading text-2xl font-bold leading-tight md:text-3xl">
            {product.name}
          </h1>
          <p className="font-mono text-xs text-muted-foreground">{product.sku}</p>

          <div className="space-y-1">
            <div className="font-heading text-3xl font-bold text-price">
              {price.usd}
            </div>
            <div className="text-muted-foreground">({price.pen})</div>
          </div>

          <div className="text-sm">
            {product.onRequest ? (
              <span className="font-medium text-amber-500">
                Consultar disponibilidad
              </span>
            ) : product.stock > 0 ? (
              <span className="inline-flex items-center gap-1 font-medium text-emerald-500">
                <Check className="size-4" /> En stock
                {product.stock <= 20 && ` (${product.stock} unid.)`}
              </span>
            ) : (
              <span className="font-medium text-destructive">Sin stock</span>
            )}
          </div>

          <ProductPurchase product={product} />

          <Separator />

          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Truck className="size-5 text-brand" /> Envío a todo el país
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="size-5 text-brand" /> Garantía oficial
            </div>
          </div>
        </div>
      </div>

      {/* Detalle / specs */}
      <Tabs defaultValue="specs" className="mt-12">
        <TabsList>
          <TabsTrigger value="specs">Especificaciones</TabsTrigger>
          <TabsTrigger value="desc">Descripción</TabsTrigger>
        </TabsList>
        <TabsContent value="specs" className="pt-4">
          {product.specs?.length ? (
            <div className="max-w-2xl overflow-hidden rounded-lg border">
              {product.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={`grid grid-cols-2 gap-4 px-4 py-3 text-sm ${
                    i % 2 ? "bg-muted/40" : ""
                  }`}
                >
                  <span className="font-medium text-muted-foreground">
                    {s.label}
                  </span>
                  <span>{s.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Sin especificaciones registradas.
            </p>
          )}
        </TabsContent>
        <TabsContent value="desc" className="max-w-2xl pt-4 text-muted-foreground">
          {product.description ??
            "Producto original con garantía oficial Gamex."}
        </TabsContent>
      </Tabs>

      {related.length > 0 && (
        <div className="mt-8">
          <ProductRow title="Productos relacionados" products={related} />
        </div>
      )}
    </div>
  );
}
