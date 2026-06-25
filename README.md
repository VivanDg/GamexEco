# GamexEco

Ecommerce de hardware, componentes y periféricos gaming construido con Next.js.

## Stack

- **Framework:** Next.js
- **Base de datos:** PostgreSQL + Prisma ORM
- **UI:** Tailwind CSS + shadcn/ui
- **Autenticación:** Próximamente

## Requisitos

- Node.js >= 20.9.0
- PostgreSQL 16

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/VivanDg/GamexEco.git
cd GamexEco

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu conexión a PostgreSQL

# Sincronizar esquema de base de datos
npx prisma generate
npx prisma db push

# Sembrar datos de prueba
npm run db:seed

# Iniciar servidor de desarrollo
npm run dev
```

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Construye para producción |
| `npm run start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta linter |
| `npm run db:seed` | Siembra datos de prueba |

## Estructura

```
src/
├── app/          # Rutas y páginas (App Router)
├── components/   # Componentes compartidos (UI, layout)
├── lib/          # Utilidades, tipos, configuración
└── modules/      # Módulos de funcionalidad (catalog, cart, etc.)
prisma/
└── seed.ts       # Seed de datos de prueba
```

## Páginas

- `/` — Landing page con slider hero, marcas y productos destacados
- `/productos` — Catálogo con filtros
- `/productos/[slug]` — Detalle de producto
- `/carrito` — Carrito de compras
- `/checkout` — Checkout
- `/cuenta` — Perfil y pedidos del usuario
- `/login` / `/registro` — Autenticación
- `/nosotros` — Información de la empresa
- `/politicas` — Términos y condiciones
- `/admin` — Panel de administración
