"use client";

import * as React from "react";
import { MoreHorizontal, Search, Shield, UserRound } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { dualPrice, cn } from "@/lib/utils";
import type { User } from "@/lib/types";

type StatusFilter = "todos" | "activo" | "inactivo";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function UsersTable({ initial }: { initial: User[] }) {
  const [rows, setRows] = React.useState(initial);
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<StatusFilter>("todos");

  const filtered = rows.filter((u) => {
    if (status !== "todos" && (u.status ?? "activo") !== status) return false;
    const q = query.toLowerCase();
    return !q || `${u.name} ${u.email}`.toLowerCase().includes(q);
  });

  function toggleStatus(id: string) {
    setRows((rs) =>
      rs.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "inactivo" ? "activo" : "inactivo" }
          : u,
      ),
    );
    const u = rows.find((x) => x.id === id);
    toast.success(
      `Usuario ${u?.status === "inactivo" ? "activado" : "desactivado"}`,
      { description: u?.name },
    );
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o correo"
            className="pl-9"
          />
        </div>
        <Select
          value={status}
          onValueChange={(v) => setStatus(v as StatusFilter)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="activo">Activos</SelectItem>
            <SelectItem value="inactivo">Inactivos</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {filtered.length} usuario{filtered.length !== 1 && "s"}
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead className="hidden md:table-cell">Rol</TableHead>
              <TableHead className="hidden lg:table-cell">Registro</TableHead>
              <TableHead className="text-center">Pedidos</TableHead>
              <TableHead className="text-right">Total gastado</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((u) => {
              const active = (u.status ?? "activo") === "activo";
              return (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback
                          className={cn(
                            "text-xs font-semibold",
                            u.role === "admin"
                              ? "bg-brand text-brand-foreground"
                              : "bg-muted",
                          )}
                        >
                          {initials(u.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="font-medium">{u.name}</div>
                        <div className="truncate text-xs text-muted-foreground">
                          {u.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                      {u.role === "admin" ? (
                        <Shield className="size-3.5 text-brand" />
                      ) : (
                        <UserRound className="size-3.5" />
                      )}
                      {u.role === "admin" ? "Administrador" : "Cliente"}
                    </span>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString("es-PE")
                      : "—"}
                  </TableCell>
                  <TableCell className="text-center">
                    {u.ordersCount ?? 0}
                  </TableCell>
                  <TableCell className="text-right font-medium text-price">
                    {dualPrice(u.totalSpentUSD ?? 0).usd}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "border-transparent font-medium",
                        active
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {active ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon" aria-label="Acciones" />
                        }
                      >
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            toast.info("Edición de usuario — disponible en Fase 2")
                          }
                        >
                          Ver / editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleStatus(u.id)}>
                          {active ? "Desactivar" : "Activar"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-10 text-center text-muted-foreground"
                >
                  No se encontraron usuarios.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
