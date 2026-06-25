"use client";

import * as React from "react";
import { Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { PaymentStatusBadge } from "./payment-status-badge";
import { paymentMethodLabels, paymentStatusLabels } from "@/lib/mock/payments";
import { dualPrice } from "@/lib/utils";
import type { Payment, PaymentStatus } from "@/lib/types";

const STATUSES: PaymentStatus[] = [
  "pagado",
  "pendiente",
  "reembolsado",
  "fallido",
];

export function PaymentsTable({ initial }: { initial: Payment[] }) {
  const [status, setStatus] = React.useState<PaymentStatus | "todos">("todos");
  const [query, setQuery] = React.useState("");

  const filtered = initial.filter((p) => {
    if (status !== "todos" && p.status !== status) return false;
    const q = query.toLowerCase();
    return (
      !q ||
      `${p.code} ${p.orderCode} ${p.customerName}`.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar transacción, pedido o cliente"
            className="pl-9"
          />
        </div>
        <Select
          value={status}
          onValueChange={(v) => setStatus(v as PaymentStatus | "todos")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {paymentStatusLabels[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {filtered.length} transacción{filtered.length !== 1 && "es"}
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transacción</TableHead>
              <TableHead className="hidden sm:table-cell">Pedido</TableHead>
              <TableHead className="hidden md:table-cell">Cliente</TableHead>
              <TableHead className="hidden lg:table-cell">Método</TableHead>
              <TableHead className="hidden lg:table-cell">Fecha</TableHead>
              <TableHead className="text-right">Monto</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.code}</TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">
                  {p.orderCode}
                </TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {p.customerName}
                </TableCell>
                <TableCell className="hidden text-muted-foreground lg:table-cell">
                  {paymentMethodLabels[p.method]}
                </TableCell>
                <TableCell className="hidden text-muted-foreground lg:table-cell">
                  {new Date(p.createdAt).toLocaleDateString("es-PE")}
                </TableCell>
                <TableCell className="text-right font-medium text-price">
                  {dualPrice(p.amountUSD).usd}
                </TableCell>
                <TableCell>
                  <PaymentStatusBadge status={p.status} />
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-10 text-center text-muted-foreground"
                >
                  No hay transacciones que coincidan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
