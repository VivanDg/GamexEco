import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Términos y condiciones, políticas de envío, garantía y privacidad de Gamex.",
};

const sections = [
  {
    title: "Términos y condiciones",
    content: [
      "Al realizar una compra en Gamex aceptas los presentes términos y condiciones. Todos los precios están expresados en dólares americanos (USD) e incluyen IGV.",
      "Nos reservamos el derecho de modificar precios, promociones y disponibilidad sin previo aviso. Las imágenes de los productos son referenciales.",
      "La venta de productos está sujeta a disponibilidad de stock. En caso de que un producto no esté disponible después de realizada la compra, te contactaremos para coordinar la devolución o cambio.",
    ],
  },
  {
    title: "Política de envíos",
    content: [
      "Realizamos envíos a todo el Perú a través de agencias de transporte. El costo de envío se calcula al momento del checkout según el destino.",
      "Los pedidos se despachan en un plazo de 24 a 72 horas hábiles después de la confirmación del pago. Los tiempos de entrega dependen de la ubicación.",
      "No nos hacemos responsables por retrasos ocasionados por la agencia de transporte o por datos incorrectos proporcionados por el cliente.",
    ],
  },
  {
    title: "Garantía y devoluciones",
    content: [
      "Todos nuestros productos cuentan con garantía oficial del fabricante. El plazo de garantía varía según la marca y el tipo de producto.",
      "Para hacer efectiva la garantía, el producto debe presentarse en su empaque original con todos los accesorios incluidos.",
      "No se aceptan devoluciones por cambio de opinión una vez que el producto ha sido abierto o usado. Los reclamos por fallas de fábrica se canalizan a través de la garantía oficial.",
    ],
  },
  {
    title: "Política de privacidad",
    content: [
      "Tus datos personales son recopilados únicamente para procesar tu pedido y mejorar tu experiencia de compra. No compartimos tu información con terceros sin tu consentimiento.",
      "Al registrarte en Gamex aceptas el tratamiento de tus datos conforme a la Ley de Protección de Datos Personales (Ley N° 29733).",
      "Puedes solicitar la eliminación de tus datos en cualquier momento escribiéndonos a contacto@gamex.pe.",
    ],
  },
  {
    title: "Medios de pago",
    content: [
      "Aceptamos pagos con tarjeta de crédito/débito, Yape y transferencia bancaria. Todos los pagos se procesan de forma segura.",
      "Los pagos con transferencia deben ser acreditados dentro de las 24 horas siguientes a la generación del pedido para no perder la reserva de stock.",
    ],
  },
];

export default function PoliticasPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold">Términos y condiciones</h1>
      <p className="mt-2 text-muted-foreground">
        Políticas de venta, envío, garantía y privacidad de Gamex.
      </p>

      <div className="mt-10 space-y-10">
        {sections.map((s) => (
          <section key={s.title} className="space-y-3">
            <h2 className="font-heading text-xl font-semibold">{s.title}</h2>
            {s.content.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted-foreground">{p}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
