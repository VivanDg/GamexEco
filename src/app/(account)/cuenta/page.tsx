import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currentUser } from "@/lib/mock/users";

export default function PerfilPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold uppercase tracking-wide">
        Mi perfil
      </h1>

      <Card className="space-y-5 p-6">
        <h2 className="font-heading text-lg font-bold">Datos personales</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Nombres y apellidos</Label>
            <Input id="name" defaultValue={currentUser.name} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="doc">DNI</Label>
            <Input id="doc" defaultValue={currentUser.document} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Correo</Label>
            <Input id="email" type="email" defaultValue={currentUser.email} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" defaultValue={currentUser.phone} />
          </div>
        </div>
        <Button className="bg-brand text-brand-foreground hover:bg-brand/90">
          Guardar cambios
        </Button>
      </Card>

      <Card className="space-y-5 p-6">
        <h2 className="font-heading text-lg font-bold">Seguridad</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="cur">Contraseña actual</Label>
            <Input id="cur" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new">Nueva contraseña</Label>
            <Input id="new" type="password" placeholder="••••••••" />
          </div>
        </div>
        <Button variant="outline">Actualizar contraseña</Button>
      </Card>
    </div>
  );
}
