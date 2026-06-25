import { Hero } from "@/modules/catalog/components/hero";
import { BrandStrip } from "@/modules/catalog/components/brand-strip";
import { ProductRow } from "@/modules/catalog/components/product-row";
import { getBrands, getProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const brands = await getBrands();
  const newArrivals = await getProducts({ isNew: true, limit: 5 });
  const gpus = await getProducts({ cat: "tarjetas-video", limit: 5 });

  return (
    <>
      <Hero />
      <BrandStrip brands={brands} />
      <ProductRow
        title="Nuevos ingresos"
        products={newArrivals}
        moreHref="/productos"
      />
      <ProductRow
        title="Tarjetas de video RTX"
        products={gpus}
        moreHref="/productos?cat=tarjetas-video"
      />
    </>
  );
}
