"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OPTIONS = [
  { value: "relevancia", label: "Relevancia" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "nombre", label: "Nombre A-Z" },
];

export function SortSelect() {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("sort") ?? "relevancia";

  return (
    <Select
      value={current}
      onValueChange={(value) => {
        const next = new URLSearchParams(params.toString());
        if (!value || value === "relevancia") next.delete("sort");
        else next.set("sort", value);
        router.push(`/productos?${next.toString()}`);
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Ordenar" />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
