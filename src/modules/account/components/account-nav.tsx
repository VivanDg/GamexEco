"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Package, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/cuenta", label: "Mi perfil", icon: UserRound },
  { href: "/cuenta/pedidos", label: "Mis pedidos", icon: Package },
];

export function AccountNav() {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {links.map((l) => {
        const active =
          l.href === "/cuenta"
            ? pathname === "/cuenta"
            : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-brand text-brand-foreground"
                : "hover:bg-accent",
            )}
          >
            <l.icon className="size-4" />
            {l.label}
          </Link>
        );
      })}
      <Link
        href="/login"
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent"
      >
        <LogOut className="size-4" />
        Cerrar sesión
      </Link>
    </nav>
  );
}
