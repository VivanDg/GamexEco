"use client";

import * as React from "react";
import Link from "next/link";
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
import { OrderStatusBadge } from "@/modules/account/components/order-status-badge";
import { orderStatusLabels, orderFlow } from "@/lib/mock/orders";
import { dualPrice } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/types";

const ALL_STATUSES: OrderStatus[] = [...orderFlow, "cancelado"];

export function OrdersTable({ initial }: { initial: Order[] }) {
  const [rows, setRows] = React.useState(initial);
  const [filter, setFilter] = React.useState<OrderStatus | "todos">("todos");

  const filtered =
    filter === "todos" ? rows : rows.filter((o) => o.status === filter);

  function changeStatus(id: string, status: OrderStatus) {
    setRows((rs) => rs.map((o) => (o.id === id ? { ...o, status } : o)));
    toast.success(`Pedido actualizado a “${orderStatusLabels[status]}”`);
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <Select
          value={filter}
          onValueChange={(v) => setFilter(v as OrderStatus | "todos")}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            {ALL_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {orderStatusLabels[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {filtered.length} pedido{filtered.length !== 1 && "s"}
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead className="hidden sm:table-cell">Cliente</TableHead>
              <TableHead className="hidden md:table-cell">Fecha</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[180px]">Cambiar estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((o) => (
              <TableRow key={o.id}>
                <TableCell>
                  <Link
                    href={`/cuenta/pedidos/${o.id}`}
                    className="font-medium hover:text-brand"
                  >
                    {o.code}
                  </Link>
                </TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">
                  {o.customerName}
                </TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {new Date(o.createdAt).toLocaleDateString("es-PE")}
                </TableCell>
                <TableCell className="text-right font-medium text-price">
                  {dualPrice(o.totalUSD).usd}
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={o.status} />
                </TableCell>
                <TableCell>
                  <Select
                    value={o.status}
                    onValueChange={(v) => changeStatus(o.id, v as OrderStatus)}
                  >
                    <SelectTrigger size="sm" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {orderStatusLabels[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                  No hay pedidos con ese estado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
