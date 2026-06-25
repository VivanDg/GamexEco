import type { Brand, Category, Product } from "@/lib/types";

export interface CatalogFilters {
  q?: string;
  cat?: string;
  marca?: string;
  stock?: string;
  sort?: string;
  limit?: number;
}

function buildQueryString(filters: CatalogFilters) {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.cat) params.set("cat", filters.cat);
  if (filters.marca) params.set("marca", filters.marca);
  if (filters.stock === "1") params.set("stock", "1");
  if (filters.sort) params.set("sort", filters.sort);
  if (typeof filters.limit === "number") params.set("limit", String(filters.limit));
  return params.toString();
}

export async function getProducts(filters: CatalogFilters = {}) {
  const query = buildQueryString(filters);
  const url = `/api/products${query ? `?${query}` : ""}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  return (await res.json()) as Product[];
}

export async function getProductBySlug(slug: string) {
  const res = await fetch(`/api/products/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.product as Product;
}

export async function getRelatedProducts(productId: string, categoryId: string) {
  const res = await fetch(
    `/api/products/${encodeURIComponent(categoryId)}?related=${encodeURIComponent(productId)}`,
    { cache: "no-store" },
  );
  if (!res.ok) return [];
  return (await res.json()) as Product[];
}

export async function getCategories() {
  const res = await fetch(`/api/categories`, { cache: "no-store" });
  if (!res.ok) return [];
  return (await res.json()) as Category[];
}

export async function getBrands() {
  const res = await fetch(`/api/brands`, { cache: "no-store" });
  if (!res.ok) return [];
  return (await res.json()) as Brand[];
}

export function activeFilterLabel(
  filters: CatalogFilters,
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
