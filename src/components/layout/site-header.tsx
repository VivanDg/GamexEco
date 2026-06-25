import Link from "next/link";
import { Headset, UserRound } from "lucide-react";
import { Logo } from "./logo";
import { SearchBar } from "./search-bar";
import { ThemeToggle } from "./theme-toggle";
import { MainNav, MobileNav } from "./main-nav";
import { CartButton } from "@/modules/cart/components/cart-button";
import { getCategories } from "@/lib/api";

export async function SiteHeader() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-40">
      {/* Barra superior oscura */}
      <div className="bg-header text-header-foreground">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Logo className="shrink-0" />
          <SearchBar className="mx-2 hidden flex-1 md:flex" />
          <div className="ml-auto flex items-center gap-1">
            <Link
              href="/login"
              className="hidden items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium hover:bg-white/10 sm:flex"
            >
              <UserRound className="size-5" />
              <span className="hidden lg:inline">Mi cuenta</span>
            </Link>
            <ThemeToggle className="text-header-foreground hover:bg-white/10 hover:text-header-foreground" />
            <CartButton />
          </div>
        </div>
        {/* Buscador en móvil */}
        <div className="px-4 pb-3 md:hidden">
          <SearchBar />
        </div>
      </div>

      {/* Navbar rojo */}
      <div className="bg-brand text-brand-foreground shadow-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4">
          <MobileNav categories={categories} />
          <MainNav categories={categories} />
          <Link
            href="/login"
            className="ml-auto flex items-center gap-2 py-2.5 text-sm font-semibold uppercase tracking-wide hover:opacity-90"
          >
            <Headset className="size-4" />
            <span className="hidden sm:inline">Ventas Online</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
