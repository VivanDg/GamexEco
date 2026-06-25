import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/layout/logo";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-10">
      <div className="mb-6 flex justify-center">
        <div className="rounded-lg bg-header px-6 py-4">
          <Logo />
        </div>
      </div>
      <Card className="space-y-5 p-6">
        <div className="space-y-1 text-center">
          <h1 className="font-heading text-2xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {children}
      </Card>
      {footer && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {footer}
        </p>
      )}
      <p className="mt-2 text-center text-xs text-muted-foreground">
        <Link href="/" className="hover:text-brand">
          ← Volver a la tienda
        </Link>
      </p>
    </div>
  );
}
