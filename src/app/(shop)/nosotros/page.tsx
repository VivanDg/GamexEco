import type { Metadata } from "next";
import { ShieldCheck, Truck, HeadphonesIcon, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Gamex",
  description: "Conoce más sobre Gamex, tu tienda de hardware y periféricos gaming.",
};

const values = [
  { icon: ShieldCheck, title: "Productos originales", desc: "Trabajamos con marcas oficiales y distribuidores autorizados." },
  { icon: Truck, title: "Envíos rápidos", desc: "Despachamos a todo el Perú con delivery en 24–72 horas." },
  { icon: HeadphonesIcon, title: "Soporte técnico", desc: "Te acompañamos antes, durante y después de tu compra." },
  { icon: Users, title: "Comunidad gamer", desc: "Conectamos con jugadores y entusiastas del hardware." },
];

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold">Sobre Gamex</h1>
      <p className="mt-2 text-muted-foreground">
        Tu tienda especializada en hardware, componentes y periféricos gaming en Perú.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="font-heading text-xl font-semibold">¿Quiénes somos?</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Gamex nació con la misión de ofrecer a la comunidad gamer y entusiasta del hardware
          una experiencia de compra confiable, rápida y con stock real. Nos apasiona la tecnología
          y trabajamos cada día para traer los mejores componentes, periféricos y equipos del mercado.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Contamos con alianzas directas con marcas como Corsair, MSI, ASUS, INNO3D, Kingston,
          G.Skill y muchas más, garantizando productos originales con garantía oficial.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-heading text-xl font-semibold">Nuestros valores</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="flex items-start gap-3 rounded-lg border p-4">
              <v.icon className="mt-0.5 size-5 shrink-0 text-brand" />
              <div>
                <h3 className="text-sm font-semibold">{v.title}</h3>
                <p className="text-xs text-muted-foreground">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
