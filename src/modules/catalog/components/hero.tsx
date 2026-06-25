"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Slide {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  cta: string;
  href: string;
  glow: string; // CSS background para el degradado de fondo
}

const slides: Slide[] = [
  {
    badge: "Powered by Gamex",
    title: "Arma tu setup",
    highlight: "de alto rendimiento",
    subtitle: "Componentes, periféricos y PCs gaming con stock real.",
    cta: "Ver catálogo",
    href: "/productos",
    glow: "radial-gradient(60% 90% at 78% 30%, oklch(0.45 0.18 300 / 0.6), transparent 60%), radial-gradient(55% 80% at 18% 80%, oklch(0.5 0.2 25 / 0.5), transparent 60%)",
  },
  {
    badge: "Tarjetas de Video",
    title: "Nueva serie",
    highlight: "GeForce RTX 50",
    subtitle: "Ray tracing y DLSS de última generación ya disponibles.",
    cta: "Ver tarjetas RTX",
    href: "/productos?cat=tarjetas-video",
    glow: "radial-gradient(60% 90% at 75% 35%, oklch(0.5 0.2 145 / 0.5), transparent 60%), radial-gradient(55% 80% at 20% 75%, oklch(0.45 0.18 250 / 0.55), transparent 60%)",
  },
  {
    badge: "Memorias DDR5",
    title: "Más velocidad",
    highlight: "hasta 6400 MHz",
    subtitle: "Corsair, Kingston Fury y G.Skill con perfiles XMP / EXPO.",
    cta: "Ver memorias",
    href: "/productos?cat=memorias-ram",
    glow: "radial-gradient(60% 90% at 72% 30%, oklch(0.5 0.2 25 / 0.55), transparent 60%), radial-gradient(55% 80% at 22% 80%, oklch(0.45 0.18 320 / 0.5), transparent 60%)",
  },
];

const DURATION = 5000;

export function Hero() {
  const [active, setActive] = React.useState(0);
  const count = slides.length;

  const go = React.useCallback(
    (dir: number) => setActive((i) => (i + dir + count) % count),
    [count],
  );

  React.useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % count), DURATION);
    return () => clearInterval(id);
  }, [count, active]);

  return (
    <section className="relative overflow-hidden bg-header text-header-foreground">
      <div className="relative mx-auto flex h-[320px] max-w-7xl items-center px-4 sm:h-[400px]">
        {slides.map((slide, i) => (
          <div
            key={i}
            aria-hidden={i !== active}
            className={cn(
              "absolute inset-0 flex items-center px-4 transition-opacity duration-700",
              i === active ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: slide.glow }}
            />
            <div className="relative max-w-xl space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest">
                {slide.badge}
              </span>
              <h1 className="font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                {slide.title}{" "}
                <span className="text-brand">{slide.highlight}</span>
              </h1>
              <p className="max-w-md text-sm text-header-foreground/70">
                {slide.subtitle}
              </p>
              <Button
                className="bg-brand text-brand-foreground hover:bg-brand/90"
                nativeButton={false}
                render={<Link href={slide.href} />}
              >
                {slide.cta} <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        ))}

        {/* Controles */}
        <button
          type="button"
          aria-label="Anterior"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-header-foreground backdrop-blur transition hover:bg-brand"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-header-foreground backdrop-blur transition hover:bg-brand"
        >
          <ChevronRight className="size-5" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir al slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-6 bg-brand" : "w-2.5 bg-white/30",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
