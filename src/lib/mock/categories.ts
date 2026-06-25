import type { Category } from "@/lib/types";

export const categories: Category[] = [
  { id: "c-componentes", name: "Componentes PC", slug: "componentes" },
  { id: "c-procesadores", name: "Procesadores", slug: "procesadores", parentId: "c-componentes" },
  { id: "c-tarjetas-video", name: "Tarjetas de Video", slug: "tarjetas-video", parentId: "c-componentes" },
  { id: "c-memorias", name: "Memorias RAM", slug: "memorias-ram", parentId: "c-componentes" },
  { id: "c-almacenamiento", name: "Almacenamiento", slug: "almacenamiento", parentId: "c-componentes" },
  { id: "c-placas", name: "Placas Madre", slug: "placas-madre", parentId: "c-componentes" },
  { id: "c-fuentes", name: "Fuentes de Poder", slug: "fuentes-poder", parentId: "c-componentes" },
  { id: "c-refrigeracion", name: "Refrigeración", slug: "refrigeracion", parentId: "c-componentes" },

  { id: "c-configuraciones", name: "PC Configuraciones", slug: "pc-configuraciones" },
  { id: "c-monitores", name: "Monitores", slug: "monitores" },
  { id: "c-perifericos", name: "Periféricos PC", slug: "perifericos" },
  { id: "c-laptops", name: "Laptops", slug: "laptops" },
  { id: "c-streaming", name: "Streaming", slug: "streaming" },
  { id: "c-apple", name: "Apple", slug: "apple" },
];

export const categoryById = (id: string) => categories.find((c) => c.id === id);
export const categoryName = (id: string) => categoryById(id)?.name ?? "General";

/** Categorías de primer nivel para la barra de navegación. */
export const topCategories = categories.filter((c) => !c.parentId);

/** Estructura del mega-menú: grupo -> subcategorías. */
export const navMenu: { label: string; href: string; children?: Category[] }[] = [
  {
    label: "Productos",
    href: "/productos",
    children: categories.filter((c) => c.parentId === "c-componentes"),
  },
  { label: "PC Configuraciones", href: "/productos?cat=pc-configuraciones" },
  { label: "Monitores", href: "/productos?cat=monitores" },
  { label: "Periféricos PC", href: "/productos?cat=perifericos" },
  { label: "Laptops", href: "/productos?cat=laptops" },
  { label: "Streaming", href: "/productos?cat=streaming" },
  { label: "Apple", href: "/productos?cat=apple" },
];
