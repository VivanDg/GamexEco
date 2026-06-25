import { defineConfig } from "@prisma/config";

// Prisma 7 ya no lee la URL desde schema.prisma; se define aquí.
// Cargamos .env con el loader nativo de Node (Node >= 20.6).
try {
  process.loadEnvFile();
} catch {
  // .env ausente (p. ej. en CI con variables ya inyectadas) — se ignora.
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
