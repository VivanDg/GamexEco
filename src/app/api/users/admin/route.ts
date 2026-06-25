import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/data";

export async function GET() {
  const adminUser = await getAdminUser();
  if (!adminUser) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(adminUser);
}
