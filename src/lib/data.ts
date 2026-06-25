import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import type { Brand, Category, Order, Payment, Product, User } from "@/lib/types";

export type ProductFilters = {
  q?: string;
  cat?: string;
  marca?: string;
  stock?: boolean;
  sort?: string;
  featured?: boolean;
  isNew?: boolean;
  limit?: number;
};

const mapProduct = (
  product: Prisma.ProductGetPayload<{
    include: { brand: true; category: true; images: true };
  }>,
): Product & { brand: Brand; category: Category } => ({
  id: product.id,
  sku: product.sku,
  name: product.name,
  slug: product.slug,
  brandId: product.brandId,
  categoryId: product.categoryId,
  priceUSD: Number(product.priceUSD),
  stock: product.stock,
  images: product.images.map((image) => image.url),
  description: product.description ?? undefined,
  specs: Array.isArray(product.specs) ? (product.specs as unknown as { label: string; value: string }[]) : undefined,
  isNew: product.isNew ?? undefined,
  featured: product.featured ?? undefined,
  onRequest: product.onRequest ?? undefined,
  brand: {
    id: product.brand.id,
    name: product.brand.name,
    slug: product.brand.slug,
    logo: product.brand.logo ?? undefined,
  },
  category: {
    id: product.category.id,
    name: product.category.name,
    slug: product.category.slug,
    parentId: product.category.parentId ?? undefined,
  },
});

export function activeFilterLabel(
  filters: ProductFilters,
  categories: Category[],
  brands: Brand[],
) {
  if (filters.q) return `Resultados para “${filters.q}”`;
  if (filters.cat)
    return categories.find((c) => c.slug === filters.cat)?.name ?? "Productos";
  if (filters.marca)
    return brands.find((b) => b.slug === filters.marca)?.name ?? "Productos";
  return "Todos los productos";
}

export async function getBrands(): Promise<Brand[]> {
  const brands = await db.brand.findMany({ orderBy: { name: "asc" } });
  return brands.map((brand) => ({
    id: brand.id,
    name: brand.name,
    slug: brand.slug,
    logo: brand.logo ?? undefined,
  }));
}

export async function getCategories(): Promise<Category[]> {
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });
  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    parentId: category.parentId ?? undefined,
  }));
}

export async function getProducts(filters: ProductFilters = {}) {
  const where: Prisma.ProductWhereInput = {};

  if (filters.q) {
    where.OR = [
      { name: { contains: filters.q, mode: "insensitive" } },
      { sku: { contains: filters.q, mode: "insensitive" } },
    ];
  }

  if (filters.cat) {
    where.category = { slug: filters.cat };
  }

  if (filters.marca) {
    where.brand = { slug: filters.marca };
  }

  if (filters.stock) {
    where.stock = { gt: 0 };
    where.onRequest = false;
  }

  if (filters.featured) {
    where.featured = true;
  }

  if (filters.isNew) {
    where.isNew = true;
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput[] = [];
  switch (filters.sort) {
    case "precio-asc":
      orderBy.push({ priceUSD: "asc" });
      break;
    case "precio-desc":
      orderBy.push({ priceUSD: "desc" });
      break;
    case "nombre":
      orderBy.push({ name: "asc" });
      break;
    default:
      orderBy.push({ name: "asc" });
  }

  const products = await db.product.findMany({
    where,
    include: {
      brand: true,
      category: true,
      images: true,
    },
    orderBy,
    take: filters.limit,
  });

  return products.map(mapProduct);
}

export async function getProductBySlug(slug: string) {
  const product = await db.product.findUnique({
    where: { slug },
    include: {
      brand: true,
      category: true,
      images: true,
    },
  });

  if (!product) return null;
  return mapProduct(product);
}

export async function getRelatedProducts(productId: string, categoryId: string, limit = 4) {
  const related = await db.product.findMany({
    where: {
      categoryId,
      id: { not: productId },
    },
    include: {
      brand: true,
      category: true,
      images: true,
    },
    take: limit,
  });
  return related.map(mapProduct);
}

export async function getProductSlugs() {
  const products = await db.product.findMany({ select: { slug: true } });
  return products.map((product) => product.slug);
}

export async function getUsers() {
  const users = await db.user.findMany({
    include: { _count: { select: { orders: true } } },
    orderBy: { createdAt: "desc" },
  });

  const orderTotals = await db.order.groupBy({
    by: ["userId"],
    _sum: { totalUSD: true },
  });

  const totalsByUser = orderTotals.reduce<Record<string, number>>((acc, total) => {
    acc[total.userId] = Number(total._sum.totalUSD ?? 0);
    return acc;
  }, {});

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone ?? undefined,
    document: user.document ?? undefined,
    role: user.role === "ADMIN" ? "admin" : "cliente",
    status: user.status === "ACTIVO" ? "activo" : "inactivo",
    createdAt: user.createdAt.toISOString(),
    ordersCount: user._count.orders,
    totalSpentUSD: totalsByUser[user.id] ?? 0,
  }));
}

export async function getCurrentUser() {
  const user = await db.user.findFirst({
    where: { role: "CLIENTE", status: "ACTIVO" },
    orderBy: { createdAt: "asc" },
  });
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone ?? undefined,
    document: user.document ?? undefined,
    role: "cliente" as const,
  };
}

export async function getAdminUser() {
  const user = await db.user.findFirst({
    where: { role: "ADMIN" },
    orderBy: { createdAt: "asc" },
  });
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: "admin" as const,
    status: user.status === "ACTIVO" ? "activo" : "inactivo",
    createdAt: user.createdAt.toISOString(),
  };
}

export async function getOrders(options: {
  userId?: string;
  currentUser?: boolean;
  limit?: number;
} = {}) {
  const where: Prisma.OrderWhereInput = {};

  if (options.currentUser) {
    const currentUser = await db.user.findFirst({
      where: { role: "CLIENTE", status: "ACTIVO" },
      orderBy: { createdAt: "asc" },
    });
    if (!currentUser) return [];
    where.userId = currentUser.id;
  }

  if (options.userId) {
    where.userId = options.userId;
  }

  const orders = await db.order.findMany({
    where,
    include: {
      items: true,
      shipping: true,
      user: true,
    },
    orderBy: { createdAt: "desc" },
    take: options.limit,
  });

  return orders.map((order) => ({
    id: order.id,
    code: order.code,
    createdAt: order.createdAt.toISOString(),
    status: order.status.toLowerCase() as Order["status"],
    items: order.items.map((item) => ({
      productId: item.productId ?? "",
      name: item.name,
      sku: item.sku,
      priceUSD: Number(item.priceUSD),
      quantity: item.quantity,
    })),
    subtotalUSD: Number(order.subtotalUSD),
    shippingUSD: Number(order.shippingUSD),
    totalUSD: Number(order.totalUSD),
    customerName: order.user.name,
    shipping: order.shipping
      ? {
          fullName: order.shipping.fullName,
          phone: order.shipping.phone,
          document: order.shipping.document,
          region: order.shipping.region,
          city: order.shipping.city,
          address: order.shipping.address,
          reference: order.shipping.reference ?? undefined,
        }
      : undefined,
  }));
}

export async function getOrderById(id: string) {
  const order = await db.order.findUnique({
    where: { id },
    include: {
      items: true,
      shipping: true,
      user: true,
    },
  });

  if (!order) return null;

  return {
    id: order.id,
    code: order.code,
    createdAt: order.createdAt.toISOString(),
    status: order.status.toLowerCase() as Order["status"],
    items: order.items.map((item) => ({
      productId: item.productId ?? "",
      name: item.name,
      sku: item.sku,
      priceUSD: Number(item.priceUSD),
      quantity: item.quantity,
    })),
    subtotalUSD: Number(order.subtotalUSD),
    shippingUSD: Number(order.shippingUSD),
    totalUSD: Number(order.totalUSD),
    customerName: order.user.name,
    shipping: order.shipping
      ? {
          fullName: order.shipping.fullName,
          phone: order.shipping.phone,
          document: order.shipping.document,
          region: order.shipping.region,
          city: order.shipping.city,
          address: order.shipping.address,
          reference: order.shipping.reference ?? undefined,
        }
      : undefined,
  };
}

export async function getPayments(limit?: number) {
  const payments = await db.payment.findMany({
    include: { order: { include: { user: true } } },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return payments.map((payment) => ({
    id: payment.id,
    code: payment.code,
    orderCode: payment.order.code,
    customerName: payment.order.user.name,
    method: payment.method.toLowerCase() as Payment["method"],
    amountUSD: Number(payment.amountUSD),
    status: payment.status.toLowerCase() as Payment["status"],
    createdAt: payment.createdAt.toISOString(),
  }));
}

export async function getProductMenuItems() {
  const categories = await getCategories();
  return categories;
}
