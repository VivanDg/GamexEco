import Link from "next/link";
import {
  CreditCard,
  Globe,
  MessageCircle,
  Send,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Logo } from "./logo";

const columns = [
  {
    title: "Productos",
    links: [
      { label: "Procesadores", href: "/productos?cat=procesadores" },
      { label: "Tarjetas de Video", href: "/productos?cat=tarjetas-video" },
      { label: "Memorias RAM", href: "/productos?cat=memorias-ram" },
      { label: "Monitores", href: "/productos?cat=monitores" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { label: "Centro de ayuda", href: "#" },
      { label: "Garantías", href: "#" },
      { label: "Estado de mi pedido", href: "/cuenta/pedidos" },
      { label: "Contáctanos", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre Gamex", href: "/nosotros" },
      { label: "Tiendas", href: "#" },
      { label: "Trabaja con nosotros", href: "#" },
      { label: "Términos y condiciones", href: "/politicas" },
    ],
  },
];

const perks = [
  { icon: Truck, title: "Envíos a todo el país", desc: "Despacho en 24-72h" },
  { icon: ShieldCheck, title: "Garantía oficial", desc: "Productos originales" },
  { icon: CreditCard, title: "Pago seguro", desc: "Tarjeta, Yape y transferencia" },
];

export function SiteFooter() {
  return (
    <footer className="mt-12 bg-header text-header-foreground">
      <div className="mx-auto grid max-w-7xl gap-4 border-b border-white/10 px-4 py-6 sm:grid-cols-3">
        {perks.map((p) => (
          <div key={p.title} className="flex items-center justify-center gap-3">
            <p.icon className="size-8 shrink-0 text-brand" />
            <div>
              <div className="text-sm font-semibold">{p.title}</div>
              <div className="text-xs text-header-foreground/60">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-header-foreground/60">
            Tu tienda de hardware, componentes y periféricos gaming. Precios
            competitivos y stock real.
          </p>
          <div className="flex gap-2">
            {[MessageCircle, Globe, Send].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid size-9 place-items-center rounded-md bg-white/10 hover:bg-brand"
                aria-label="Red social"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="space-y-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide">
              {col.title}
            </h4>
            <ul className="space-y-2 text-sm text-header-foreground/60">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-header-foreground/50">
        © {new Date().getFullYear()} Gamex. Todos los derechos reservados.
      </div>
    </footer>
  );
}
