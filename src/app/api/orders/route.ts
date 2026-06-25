import { NextResponse } from "next/server";
import { getOrders } from "@/lib/data";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const currentUser = url.searchParams.get("currentUser") === "1";
  const limit = url.searchParams.has("limit")
    ? Number(url.searchParams.get("limit"))
    : undefined;
  const orders = await getOrders({ currentUser, limit });
  return NextResponse.json(orders);
}
