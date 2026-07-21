import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createPreference } from "@/lib/mercadopago/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, shipping } = body as {
      items: { productId: string; name: string; sku: string; priceUSD: number; quantity: number }[];
      shipping: { fullName: string; phone: string; document: string; region: string; city: string; address: string; reference?: string };
    };

    if (!items?.length) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
    }

    const subtotalUSD = items.reduce((s, i) => s + i.priceUSD * i.quantity, 0);
    const shippingUSD = subtotalUSD > 200 ? 0 : 8;
    const totalUSD = subtotalUSD + shippingUSD;

    const user = await db.user.findFirst({
      where: { role: "CLIENTE", status: "ACTIVO" },
      orderBy: { createdAt: "asc" },
    });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const orderCount = await db.order.count();
    const code = `GMX-${100300 + orderCount + 1}`;

    const order = await db.order.create({
      data: {
        code,
        userId: user.id,
        status: "PENDIENTE",
        subtotalUSD,
        shippingUSD,
        totalUSD,
        items: {
          create: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            sku: i.sku,
            priceUSD: i.priceUSD,
            quantity: i.quantity,
          })),
        },
        shipping: {
          create: {
            fullName: shipping.fullName,
            phone: shipping.phone,
            document: shipping.document,
            region: shipping.region,
            city: shipping.city,
            address: shipping.address,
            reference: shipping.reference,
          },
        },
      },
      include: { items: true },
    });

    const preference = await createPreference({
      items: items.map((i) => ({
        id: i.productId,
        title: i.name,
        quantity: i.quantity,
        unit_price: i.priceUSD,
      })),
      externalReference: order.id,
    });

    await db.payment.create({
      data: {
        code: `PAY-${100300 + orderCount + 1}`,
        orderId: order.id,
        method: "TARJETA",
        provider: "MERCADO_PAGO",
        amountUSD: totalUSD,
        status: "PENDIENTE",
        externalId: preference.id,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      code: order.code,
      preferenceId: preference.id,
      initPoint: preference.initPoint,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Error al procesar el checkout" }, { status: 500 });
  }
}
