import type { Brand } from "@/lib/types";

export const brands: Brand[] = [
  { id: "b-asrock", name: "ASRock", slug: "asrock" },
  { id: "b-corsair", name: "Corsair", slug: "corsair" },
  { id: "b-biwin", name: "Biwin", slug: "biwin" },
  { id: "b-creative", name: "Creative", slug: "creative" },
  { id: "b-gskill", name: "G.Skill", slug: "gskill" },
  { id: "b-inno3d", name: "INNO3D", slug: "inno3d" },
  { id: "b-kingston", name: "Kingston Fury", slug: "kingston-fury" },
  { id: "b-tforce", name: "T-Force", slug: "t-force" },
  { id: "b-amd", name: "AMD", slug: "amd" },
  { id: "b-arctic", name: "Arctic", slug: "arctic" },
  { id: "b-puskill", name: "Puskill", slug: "puskill" },
  { id: "b-msi", name: "MSI", slug: "msi" },
  { id: "b-asus", name: "ASUS", slug: "asus" },
  { id: "b-palit", name: "Palit", slug: "palit" },
  { id: "b-antec", name: "Antec", slug: "antec" },
];

export const brandById = (id: string) => brands.find((b) => b.id === id);
export const brandName = (id: string) => brandById(id)?.name ?? "Genérico";
