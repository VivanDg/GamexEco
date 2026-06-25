/**
 * Tipos de dominio de Gamex.
 *
 * Estas formas se diseñan para mapear directamente al futuro modelo Prisma
 * (Fase 2). En la Fase 1 solo se usan para alimentar la UI con datos mock.
 */

export type ID = string;

export interface Brand {
  id: ID;
  name: string;
  slug: string;
  /** Logo mostrado en la tira de marcas. */
  logo?: string;
}

export interface Category {
  id: ID;
  name: string;
  slug: string;
  /** Categoría padre para construir el mega-menú. */
  parentId?: ID | null;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: ID;
  /** Part Number / SKU (ej: "PN:CMK16GX5M1E6000Z36"). */
  sku: string;
  name: string;
  slug: string;
  brandId: ID;
  categoryId: ID;
  /** Precio en USD; el precio en S/ se deriva en la UI. */
  priceUSD: number;
  /** Unidades disponibles. */
  stock: number;
  images: string[];
  description?: string;
  specs?: ProductSpec[];
  isNew?: boolean;
  featured?: boolean;
  brand?: Brand;
  category?: Category;
  /** Nombre de marca obtenido desde la API. */
  brandName?: string;
  /** Nombre de categoría obtenido desde la API. */
  categoryName?: string;
  /** "Consultar disponibilidad" en la referencia. */
  onRequest?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | "pendiente"
  | "pagado"
  | "preparando"
  | "enviado"
  | "entregado"
  | "cancelado";

export interface OrderItem {
  productId: ID;
  name: string;
  sku: string;
  priceUSD: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  document: string;
  region: string;
  city: string;
  address: string;
  reference?: string;
}

export interface Order {
  id: ID;
  /** Código visible al cliente (ej: "GMX-100245"). */
  code: string;
  /** ISO date string. */
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotalUSD: number;
  shippingUSD: number;
  totalUSD: number;
  customerName: string;
  shipping?: ShippingAddress;
}

export interface User {
  id: ID;
  name: string;
  email: string;
  phone?: string;
  document?: string;
  role: "cliente" | "admin";
  /** Estado de la cuenta (vista de administración). */
  status?: "activo" | "inactivo";
  /** ISO date string del registro. */
  createdAt?: string;
  /** Pedidos realizados (resumen para la tabla admin). */
  ordersCount?: number;
  /** Total gastado en USD (resumen para la tabla admin). */
  totalSpentUSD?: number;
}

export type PaymentMethod = "tarjeta" | "yape" | "transferencia";

export type PaymentStatus =
  | "pagado"
  | "pendiente"
  | "reembolsado"
  | "fallido";

export interface Payment {
  id: ID;
  /** Código visible (ej: "PAY-50231"). */
  code: string;
  /** Pedido asociado (ej: "GMX-100245"). */
  orderCode: string;
  customerName: string;
  method: PaymentMethod;
  amountUSD: number;
  status: PaymentStatus;
  /** ISO date string. */
  createdAt: string;
}
