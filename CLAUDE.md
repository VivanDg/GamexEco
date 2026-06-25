# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Gamex e-commerce (hardware/gaming). Digitaliza venta, inventario y pedidos. The build is **phased**: **Fase 1 = UI with mock data (current)** — pages are still wired to `src/lib/mock/`. **Fase 2 has begun**: the Prisma data model exists (`prisma/schema.prisma`), but auth, Server Actions/API, the payment gateway, and migrating the UI off mocks are not done yet.

Implication: the UI still renders from `src/lib/mock/`. Do not rewire pages to the database unless explicitly asked. New screens are presentational; UI copy is in Spanish.

## Data model (Prisma — Fase 2)

`prisma/schema.prisma` is the source of truth, derived from `src/lib/types.ts`. Confirmed decisions baked in: **own email+password auth** (`User.passwordHash`), **simple integer stock**, **real payment gateway** (`Payment` holds `provider`/`externalId`/`externalStatus`/`payload` for webhooks), and features **coupons / reviews / wishlist / server-side cart**.

Modeling conventions to preserve when editing:
- Money is **`Decimal`** (`@db.Decimal(12,2)`), never float. Base prices are USD; PEN is derived via `Order.exchangeRate`. `Order` stores frozen `subtotalUSD/discountUSD/shippingUSD/taxUSD` (IGV 18%) `/totalUSD`.
- **Snapshots for history**: `OrderItem` copies `name/sku/priceUSD` and its `productId` is nullable (`onDelete: SetNull`); `OrderShipping` is a 1:1 snapshot of the address. Don't "normalize these away" — orders must not change when products/addresses later change.
- `User.ordersCount`/`totalSpentUSD` are **derived** (aggregations), not columns.

Prisma 7 specifics (differ from older Prisma in training data):
- The datasource block has **no `url`** — the connection URL lives in `prisma.config.ts` (which loads `.env` via `process.loadEnvFile()`).
- Runtime **requires a driver adapter**: `src/lib/db.ts` exports the `db` singleton built with `PrismaPg` (`@prisma/adapter-pg`). Import `db` from `@/lib/db`.
- Scripts: `npm run db:generate | db:migrate | db:push | db:studio`. Migrations need a running PostgreSQL (none is provisioned in this workspace yet).

## Commands

```bash
npm run dev      # dev server (Turbopack) → http://localhost:3000
npm run build    # production build — runs TypeScript checks; use to validate types end-to-end
npm run lint     # eslint
npx tsc --noEmit # standalone typecheck (faster than build)
```

No test runner is configured. After changes, validate with `npx tsc --noEmit` + `npm run lint`, then curl/visit affected routes. `npm run build` is the most thorough check (the dev server is lenient).

## Stack — important version caveats

- **Next.js 16** (App Router, RSC). This is NOT the Next.js in your training data — see `@AGENTS.md` and read `node_modules/next/dist/docs/` before non-trivial framework work. `params` and `searchParams` are **Promises** in pages — `await` them.
- **shadcn/ui is installed on Base UI, not Radix** (`@base-ui/react`). Two consequences that break naively-copied shadcn code:
  - Composition uses the **`render` prop**, not `asChild`: `<Button render={<Link href="..." />}>Texto</Button>`. Passing `asChild` leaks to the DOM and does nothing.
  - Base UI `Select` `onValueChange` yields `string | null` (not `string`) — handle null.
- **lucide-react v1** dropped brand icons (`Youtube`, `Facebook`, `Instagram`, `Twitch`). Use generic icons.
- **Tailwind v4** — theme is CSS-variable driven in `src/app/globals.css` (no `tailwind.config`).

## Architecture — modular monolith

Code is organized by **domain module** under `src/modules/`, not by technical layer. Routes in `src/app/` stay thin and compose module components.

```
src/
  app/
    (shop)/      # storefront: home, productos, productos/[slug], carrito, checkout
    (account)/   # cliente: login, registro, cuenta, cuenta/pedidos[/id]
    admin/       # panel interno: dashboard, productos, pedidos, pagos, usuarios
  modules/       # catalog, cart, checkout, account, admin — each with components/ (+ store/query)
  components/
    ui/          # shadcn primitives — generated; prefer regenerating via `npx shadcn add`
    layout/      # SiteHeader, SiteFooter, MainNav, SearchBar, Logo, ThemeToggle
  lib/
    types.ts     # domain types — designed to map directly to the future Prisma model
    mock/        # mock data source of truth (products, brands, categories, orders, payments, users)
    utils.ts     # cn(); price helpers formatUSD/formatPEN/dualPrice (prices stored as priceUSD)
```

Key structural facts:
- **Three route groups, three layouts.** `(shop)` and `(account)` both render `SiteHeader`/`SiteFooter`/`CartDrawer`; `admin` has its own sidebar layout (`AdminSidebar`) with no storefront chrome. The root layout (`src/app/layout.tsx`) holds `ThemeProvider` (next-themes, `defaultTheme="dark"`) and the sonner `Toaster`; fonts are Geist (`--font-sans`/`--font-mono`) + Oswald (`--font-heading`, used for headings/titles).
- **Cart** is the only real client state: a zustand store with `persist` at `src/modules/cart/store.ts` (`useCart`, plus `cartCount`/`cartSubtotalUSD` selectors). `CartDrawer` opens via `useCart().open()`.
- **Catalog filtering/sorting** lives in `src/modules/catalog/query.ts` (`filterProducts`, `activeFilterLabel`), driven by URL `searchParams` (`q`, `cat`, `marca`, `stock`, `sort`); `FilterSidebar`/`SortSelect` mutate the query string with `useRouter`.
- **Prices** are stored once as `priceUSD`; always render via `dualPrice()` (shows USD + derived S/). Don't hardcode currency formatting.
- **Mock lookups** are colocated with each mock file (e.g. `productBySlug`, `brandName`, `categoryName`, `orderById`, `recentPayments`). Pages with dynamic segments use `generateStaticParams` over the mock arrays.

## Design system (réplica del estilo de referencia)

Dark-first gaming look: near-black surfaces + intense **red brand accent**. Theme tokens (light + dark) are defined in `src/app/globals.css`. Use the brand tokens — `bg-brand`/`text-brand`/`text-brand-foreground`, `text-price`, `bg-header`/`text-header-foreground` — and the `.card-top-accent` utility for product cards, rather than ad-hoc colors. Light/dark is toggleable via `ThemeToggle` (color must be passed per-context via `className`).
