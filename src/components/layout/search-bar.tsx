"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [q, setQ] = React.useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/productos?q=${encodeURIComponent(q.trim())}`);
      }}
      className={cn("flex w-full items-stretch", className)}
      role="search"
    >
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Búsqueda en catálogo"
        className="h-11 rounded-r-none border-r-0 bg-white text-neutral-900 placeholder:text-neutral-500 focus-visible:ring-0 dark:bg-white"
      />
      <Button
        type="submit"
        aria-label="Buscar"
        className="h-11 rounded-l-none bg-brand px-4 text-brand-foreground hover:bg-brand/90"
      >
        <Search className="size-5" />
      </Button>
    </form>
  );
}
