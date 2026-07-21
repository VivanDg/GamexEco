import { NextResponse } from "next/server";
import { paymentAPI } from "@/lib/mercadopago/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.type === "payment") {
      const paymentId = body.data.id;
      const payment = await paymentAPI.get({ id: paymentId });

      const externalReference = payment.external_reference;
      if (!externalReference) {
        return NextResponse.json({ error: "No external reference" }, { status: 400 });
      }

      const mpStatus = payment.status;
      let paymentStatus: "PAGADO" | "FALLIDO" | "PENDIENTE" = "PENDIENTE";
      let orderStatus: "PAGADO" | "CANCELADO" | "PENDIENTE" = "PENDIENTE";

      if (mpStatus === "approved") {
        paymentStatus = "PAGADO";
        orderStatus = "PAGADO";
      } else if (["rejected", "cancelled", "refunded", "charged_back"].includes(mpStatus ?? "")) {
        paymentStatus = "FALLIDO";
        orderStatus = "CANCELADO";
      }

      await db.payment.updateMany({
        where: { orderId: externalReference, provider: "MERCADO_PAGO" },
        data: {
          status: paymentStatus,
          externalStatus: mpStatus ?? null,
          payload: body,
        },
      });

      if (orderStatus !== "PENDIENTE") {
        await db.order.update({
          where: { id: externalReference },
          data: { status: orderStatus },
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
