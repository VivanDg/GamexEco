import type { Payment, PaymentMethod, PaymentStatus } from "@/lib/types";

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  tarjeta: "Tarjeta",
  yape: "Yape / Plin",
  transferencia: "Transferencia",
};

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  pagado: "Pagado",
  pendiente: "Pendiente",
  reembolsado: "Reembolsado",
  fallido: "Fallido",
};

export const payments: Payment[] = [
  {
    id: "pay-1",
    code: "PAY-50245",
    orderCode: "GMX-100245",
    customerName: "Brayan Vargas",
    method: "tarjeta",
    amountUSD: 788.9,
    status: "pagado",
    createdAt: "2026-06-18T14:31:00.000Z",
  },
  {
    id: "pay-2",
    code: "PAY-50231",
    orderCode: "GMX-100231",
    customerName: "Brayan Vargas",
    method: "yape",
    amountUSD: 501,
    status: "pagado",
    createdAt: "2026-06-10T09:16:00.000Z",
  },
  {
    id: "pay-3",
    code: "PAY-50260",
    orderCode: "GMX-100260",
    customerName: "Brayan Vargas",
    method: "transferencia",
    amountUSD: 496,
    status: "pendiente",
    createdAt: "2026-06-22T17:46:00.000Z",
  },
  {
    id: "pay-4",
    code: "PAY-50218",
    orderCode: "GMX-100218",
    customerName: "Lucía Fernández",
    method: "tarjeta",
    amountUSD: 329,
    status: "reembolsado",
    createdAt: "2026-06-05T11:20:00.000Z",
  },
  {
    id: "pay-5",
    code: "PAY-50205",
    orderCode: "GMX-100205",
    customerName: "Diego Ramírez",
    method: "tarjeta",
    amountUSD: 159,
    status: "fallido",
    createdAt: "2026-06-02T19:05:00.000Z",
  },
  {
    id: "pay-6",
    code: "PAY-50262",
    orderCode: "GMX-100262",
    customerName: "Andrea Salas",
    method: "yape",
    amountUSD: 246.5,
    status: "pagado",
    createdAt: "2026-06-23T08:40:00.000Z",
  },
];

export const recentPayments = [...payments].sort((a, b) =>
  b.createdAt.localeCompare(a.createdAt),
);
