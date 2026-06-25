import { NextResponse } from "next/server";
import { getPayments } from "@/lib/data";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = url.searchParams.has("limit")
    ? Number(url.searchParams.get("limit"))
    : undefined;
  const payments = await getPayments(limit);
  return NextResponse.json(payments);
}
