import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCard } from "@/modules/account/components/auth-card";

export default function RegistroPage() {
  return (
    <AuthCard
      title="Crear cuenta"
      subtitle="Únete a Gamex y compra más rápido"
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-medium text-brand hover:underline">
            Inicia sesión
          </Link>
        </>
      }
    >
      <form className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Nombres y apellidos</Label>
          <Input id="name" placeholder="Brayan Vargas" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Correo</Label>
          <Input id="email" type="email" placeholder="correo@ejemplo.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" placeholder="+51 987 654 321" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Button
          type="button"
          size="lg"
          className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
          render={<Link href="/cuenta" />}
        >
          Crear cuenta
        </Button>
      </form>
    </AuthCard>
  );
}
