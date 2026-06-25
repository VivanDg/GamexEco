import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCard } from "@/modules/account/components/auth-card";

export default function LoginPage() {
  return (
    <AuthCard
      title="Iniciar sesión"
      subtitle="Ingresa a tu cuenta Gamex"
      footer={
        <>
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="font-medium text-brand hover:underline">
            Regístrate
          </Link>
        </>
      }
    >
      <form className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Correo</Label>
          <Input id="email" type="email" placeholder="correo@ejemplo.com" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
            <Link href="#" className="text-xs text-brand hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Button
          type="button"
          size="lg"
          className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
          render={<Link href="/cuenta" />}
        >
          Ingresar
        </Button>
      </form>
    </AuthCard>
  );
}
