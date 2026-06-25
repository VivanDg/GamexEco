import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/data";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}
