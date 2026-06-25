import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/data";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(order);
}
