import { NextResponse } from "next/server";
import { getProducts } from "@/lib/data";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams;
  const filters = {
    q: q.get("q") ?? undefined,
    cat: q.get("cat") ?? undefined,
    marca: q.get("marca") ?? undefined,
    stock: q.get("stock") === "1",
    featured: q.get("featured") === "1",
    isNew: q.get("new") === "1",
    sort: q.get("sort") ?? undefined,
    limit: q.has("limit") ? Number(q.get("limit")) : undefined,
  };

  const products = await getProducts(filters);
  return NextResponse.json(products);
}
