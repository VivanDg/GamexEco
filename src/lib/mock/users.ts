import type { User } from "@/lib/types";

export const currentUser: User = {
  id: "u-1",
  name: "Brayan Vargas",
  email: "brayanvargassedano@gmail.com",
  phone: "+51 987 654 321",
  document: "70123456",
  role: "cliente",
};

export const adminUser: User = {
  id: "u-admin",
  name: "Admin Gamex",
  email: "admin@gamex.pe",
  role: "admin",
};

/** Listado de usuarios para la administración (vista admin). */
export const users: User[] = [
  {
    id: "u-1",
    name: "Brayan Vargas",
    email: "brayanvargassedano@gmail.com",
    phone: "+51 987 654 321",
    role: "cliente",
    status: "activo",
    createdAt: "2026-01-12T10:00:00.000Z",
    ordersCount: 3,
    totalSpentUSD: 1785.9,
  },
  {
    id: "u-2",
    name: "Lucía Fernández",
    email: "lucia.fernandez@gmail.com",
    phone: "+51 956 112 233",
    role: "cliente",
    status: "activo",
    createdAt: "2026-02-03T15:30:00.000Z",
    ordersCount: 1,
    totalSpentUSD: 329,
  },
  {
    id: "u-3",
    name: "Diego Ramírez",
    email: "diego.ramirez@outlook.com",
    phone: "+51 944 778 990",
    role: "cliente",
    status: "inactivo",
    createdAt: "2026-03-21T09:15:00.000Z",
    ordersCount: 0,
    totalSpentUSD: 0,
  },
  {
    id: "u-4",
    name: "Andrea Salas",
    email: "andrea.salas@gmail.com",
    phone: "+51 933 221 100",
    role: "cliente",
    status: "activo",
    createdAt: "2026-05-09T18:45:00.000Z",
    ordersCount: 2,
    totalSpentUSD: 593.5,
  },
  {
    id: "u-admin",
    name: "Admin Gamex",
    email: "admin@gamex.pe",
    role: "admin",
    status: "activo",
    createdAt: "2025-12-01T08:00:00.000Z",
    ordersCount: 0,
    totalSpentUSD: 0,
  },
];
