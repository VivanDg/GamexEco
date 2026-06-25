"use client";

import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Category } from "@/lib/types";

function buildNavMenu(categories: Category[]): ({ label: string; href: string; children?: Category[] })[] {
  const sections = categories.filter((c) => c.parentId === "c-componentes");
  const roots = categories.filter((c) => !c.parentId && c.slug !== "componentes");

  return [
    {
      label: "Productos",
      href: "/productos",
      children: sections,
    },
    ...roots.map((category) => ({
      label: category.name,
      href: `/productos?cat=${category.slug}`,
    })),
  ];
}

export function MainNav({ categories }: { categories: Category[] }) {
  const navMenu = buildNavMenu(categories);

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {navMenu.map((item) =>
        item.children ? (
          <DropdownMenu key={item.label}>
            <DropdownMenuTrigger className="flex items-center gap-1 rounded-sm px-3 py-2 text-sm font-semibold uppercase tracking-wide text-brand-foreground/90 outline-none transition hover:bg-white/15 data-[state=open]:bg-white/15">
              {item.label}
              <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {item.children.map((cat) => (
                <DropdownMenuItem
                  key={cat.id}
                  render={<Link href={`/productos?cat=${cat.slug}`} />}
                >
                  {cat.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-sm px-3 py-2 text-sm font-semibold uppercase tracking-wide text-brand-foreground/90 transition hover:bg-white/15"
          >
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );
}

export function MobileNav({ categories }: { categories: Category[] }) {
  const navMenu = buildNavMenu(categories);

  return (
    <Sheet>
      <SheetTrigger
        aria-label="Abrir menú"
        className="grid size-10 place-items-center rounded-sm bg-white/10 text-brand-foreground lg:hidden"
      >
        <Menu className="size-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="border-b">
          <SheetTitle className="font-heading">Categorías</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col p-2">
          {navMenu.map((item) => (
            <div key={item.label} className="py-1">
              <Link
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-accent"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-3 flex flex-col border-l pl-2">
                  {item.children.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/productos?cat=${cat.slug}`}
                      className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
