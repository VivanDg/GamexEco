import type { Brand, Category, Order, Payment, Product, User } from "@/lib/types";

export type CatalogFilters = {
  q?: string;
  cat?: string;
  marca?: string;
  stock?: string;
  featured?: boolean;
  isNew?: boolean;
  sort?: string;
  limit?: number;
};

async function fetchJSON<T>(path: string): Promise<T> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;
  const url = path.startsWith("/") ? `${base}${path}` : path;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Fetch failed: ${path} (${res.status})`);
  }
  return res.json();
}

export async function getProducts(filters: CatalogFilters = {}) {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.cat) params.set("cat", filters.cat);
  if (filters.marca) params.set("marca", filters.marca);
  if (filters.stock === "1") params.set("stock", "1");
  if (filters.sort) params.set("sort", filters.sort);
  if (typeof filters.limit === "number") params.set("limit", String(filters.limit));
  const path = `/api/products${params.toString() ? `?${params.toString()}` : ""}`;
  return fetchJSON<Product[]>(path);
}

export async function getProductDetail(slug: string) {
  const data = await fetchJSON<{ product: Product; related: Product[] }>(
    `/api/products/${encodeURIComponent(slug)}`,
  );
  return data;
}

export async function getProductSlugs() {
  const products = await getProducts();
  return products.map((p) => p.slug);
}

export async function getCategories() {
  return fetchJSON<Category[]>("/api/categories");
}

export async function getBrands() {
  return fetchJSON<Brand[]>("/api/brands");
}

export async function getOrders(currentUser = false, limit?: number) {
  const params = new URLSearchParams();
  if (currentUser) params.set("currentUser", "1");
  if (typeof limit === "number") params.set("limit", String(limit));
  return fetchJSON<Order[]>(`/api/orders${params.toString() ? `?${params.toString()}` : ""}`);
}

export async function getOrderById(id: string) {
  return fetchJSON<Order>(`/api/orders/${encodeURIComponent(id)}`);
}

export async function getPayments(limit?: number) {
  const params = new URLSearchParams();
  if (typeof limit === "number") params.set("limit", String(limit));
  return fetchJSON<Payment[]>(`/api/payments${params.toString() ? `?${params.toString()}` : ""}`);
}

export async function getUsers() {
  return fetchJSON<User[]>("/api/users");
}

export async function getCurrentUser() {
  return fetchJSON<User>("/api/users/current");
}

export async function getAdminUser() {
  return fetchJSON<User>("/api/users/admin");
}
