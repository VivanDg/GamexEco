import { NextResponse } from "next/server";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const related = await getRelatedProducts(product.id, product.category.id, 4);
  return NextResponse.json({ product, related });
}
