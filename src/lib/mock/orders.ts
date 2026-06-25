import type { Order, OrderStatus } from "@/lib/types";

export const orderStatusLabels: Record<OrderStatus, string> = {
  pendiente: "Pendiente",
  pagado: "Pagado",
  preparando: "Preparando",
  enviado: "Enviado",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

/** Orden cronológico del flujo para el timeline de seguimiento. */
export const orderFlow: OrderStatus[] = [
  "pendiente",
  "pagado",
  "preparando",
  "enviado",
  "entregado",
];

export const orders: Order[] = [
  {
    id: "o-1",
    code: "GMX-100245",
    createdAt: "2026-06-18T14:30:00.000Z",
    status: "enviado",
    customerName: "Brayan Vargas",
    items: [
      {
        productId: "p-7",
        name: "MSI GeForce RTX 5070 Ventus 3X 12GB",
        sku: "PN:RTX5070-VENTUS3X",
        priceUSD: 649,
        quantity: 1,
      },
      {
        productId: "p-12",
        name: "Fuente Sharkoon Rebel P15 850W",
        sku: "PN:SHARKOON-REBELP15-850",
        priceUSD: 139.9,
        quantity: 1,
      },
    ],
    subtotalUSD: 788.9,
    shippingUSD: 0,
    totalUSD: 788.9,
    shipping: {
      fullName: "Brayan Vargas",
      phone: "+51 987 654 321",
      document: "70123456",
      region: "Lima",
      city: "Lima",
      address: "Av. Tecnología 1234, San Borja",
      reference: "Frente al parque",
    },
  },
  {
    id: "o-2",
    code: "GMX-100231",
    createdAt: "2026-06-10T09:15:00.000Z",
    status: "entregado",
    customerName: "Brayan Vargas",
    items: [
      {
        productId: "p-1",
        name: "Memoria 16GB DDR5 Corsair Vengeance 6000MHz",
        sku: "PN:CMK16GX5M1E6000Z36",
        priceUSD: 246.5,
        quantity: 2,
      },
    ],
    subtotalUSD: 493,
    shippingUSD: 8,
    totalUSD: 501,
  },
  {
    id: "o-3",
    code: "GMX-100260",
    createdAt: "2026-06-22T17:45:00.000Z",
    status: "pendiente",
    customerName: "Brayan Vargas",
    items: [
      {
        productId: "p-16",
        name: 'Monitor MSI MAG 274QRF 27" 2K 180Hz',
        sku: "PN:MSI-MAG274QRF",
        priceUSD: 329,
        quantity: 1,
      },
      {
        productId: "p-17",
        name: "Teclado Corsair K70 RGB PRO",
        sku: "PN:CORSAIR-K70-RGB",
        priceUSD: 159,
        quantity: 1,
      },
    ],
    subtotalUSD: 488,
    shippingUSD: 8,
    totalUSD: 496,
  },
];

export const orderById = (id: string) => orders.find((o) => o.id === id);

/** Pedidos recientes para el dashboard admin (más nuevos primero). */
export const recentOrders = [...orders].sort(
  (a, b) => b.createdAt.localeCompare(a.createdAt),
);
