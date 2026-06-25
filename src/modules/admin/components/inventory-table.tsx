"use client";

import * as React from "react";
import { Pencil, Plus, Search } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
// Use embedded relations or fallback names from the product
import { dualPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

const LOW_STOCK = 15;

export function InventoryTable({ initial }: { initial: Product[] }) {
  const [rows, setRows] = React.useState(initial);
  const [query, setQuery] = React.useState("");
  const [editing, setEditing] = React.useState<Product | null>(null);

  const filtered = rows.filter((p) =>
    `${p.name} ${p.sku}`.toLowerCase().includes(query.toLowerCase()),
  );

  function save(updated: Product) {
    setRows((rs) => rs.map((r) => (r.id === updated.id ? updated : r)));
    setEditing(null);
    toast.success("Producto actualizado", { description: updated.name });
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o SKU"
            className="pl-9"
          />
        </div>
        <Button
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          onClick={() => toast.info("Formulario de alta — disponible en Fase 2")}
        >
          <Plus className="size-4" /> Nuevo producto
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead className="hidden md:table-cell">Categoría</TableHead>
              <TableHead className="hidden sm:table-cell">Marca</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="line-clamp-1 max-w-xs font-medium">
                    {p.name}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    {p.sku}
                  </div>
                </TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {p.category?.name ?? p.categoryName ?? p.categoryId}
                </TableCell>
                <TableCell className="hidden uppercase text-muted-foreground sm:table-cell">
                  {p.brand?.name ?? p.brandName ?? p.brandId}
                </TableCell>
                <TableCell className="text-right font-medium text-price">
                  {dualPrice(p.priceUSD).usd}
                </TableCell>
                <TableCell className="text-center">
                  {p.onRequest ? (
                    <Badge variant="secondary">A pedido</Badge>
                  ) : p.stock === 0 ? (
                    <Badge variant="secondary" className="bg-destructive/15 text-destructive">
                      Agotado
                    </Badge>
                  ) : p.stock <= LOW_STOCK ? (
                    <Badge
                      variant="secondary"
                      className="bg-amber-500/15 text-amber-600 dark:text-amber-400"
                    >
                      {p.stock} u.
                    </Badge>
                  ) : (
                    <span className="text-sm font-medium">{p.stock}</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Editar"
                    onClick={() => setEditing(p)}
                  >
                    <Pencil className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <EditDialog product={editing} onClose={() => setEditing(null)} onSave={save} />
    </>
  );
}

function EditDialog({
  product,
  onClose,
  onSave,
}: {
  product: Product | null;
  onClose: () => void;
  onSave: (p: Product) => void;
}) {
  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        {product && (
          // key remonta el formulario al cambiar de producto, evitando sincronizar con un efecto
          <EditForm
            key={product.id}
            product={product}
            onClose={onClose}
            onSave={onSave}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function EditForm({
  product,
  onClose,
  onSave,
}: {
  product: Product;
  onClose: () => void;
  onSave: (p: Product) => void;
}) {
  const [price, setPrice] = React.useState(product.priceUSD);
  const [stock, setStock] = React.useState(product.stock);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-heading">Editar producto</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">{product.name}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="price">Precio (USD)</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          onClick={() => onSave({ ...product, priceUSD: price, stock })}
        >
          Guardar
        </Button>
      </DialogFooter>
    </>
  );
}
