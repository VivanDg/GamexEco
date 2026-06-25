import { UserCheck, UserPlus, Users } from "lucide-react";
import { StatCard } from "@/modules/admin/components/stat-card";
import { UsersTable } from "@/modules/admin/components/users-table";
import { users } from "@/lib/mock/users";

export default function AdminUsuariosPage() {
  const clients = users.filter((u) => u.role === "cliente");
  const active = users.filter((u) => (u.status ?? "activo") === "activo");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold uppercase tracking-wide">
          Usuarios
        </h1>
        <p className="text-sm text-muted-foreground">
          Gestiona las cuentas de clientes y administradores
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Usuarios totales"
          value={String(users.length)}
          hint={`${clients.length} clientes`}
          icon={Users}
          accent="brand"
        />
        <StatCard
          label="Activos"
          value={String(active.length)}
          hint="Con cuenta habilitada"
          icon={UserCheck}
          accent="emerald"
        />
        <StatCard
          label="Nuevos este mes"
          value="1"
          hint="Junio 2026"
          icon={UserPlus}
          accent="sky"
        />
      </div>

      <UsersTable initial={users} />
    </div>
  );
}
