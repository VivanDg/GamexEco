import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Tipo de cambio referencial USD -> PEN (solo para la UI de la Fase 1). */
export const USD_TO_PEN = 3.45;

/** Formatea un precio en dólares. Ej: 246.5 -> "$ 246,50" */
export function formatUSD(value: number): string {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
  })
    .format(value)
    .replace("$", "$ ");
}

/** Formatea un precio en soles. Ej: 850.43 -> "S/ 850,43" */
export function formatPEN(value: number): string {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(value);
}

/** Precio dual (USD + S/) como en la referencia. */
export function dualPrice(usd: number): { usd: string; pen: string } {
  return { usd: formatUSD(usd), pen: formatPEN(usd * USD_TO_PEN) };
}
