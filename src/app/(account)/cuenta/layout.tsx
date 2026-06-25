import { AccountNav } from "@/modules/account/components/account-nav";
import { currentUser } from "@/lib/mock/users";

export default function CuentaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="font-heading text-lg font-bold">
              Hola, {currentUser.name.split(" ")[0]}
            </div>
            <div className="truncate text-sm text-muted-foreground">
              {currentUser.email}
            </div>
          </div>
          <AccountNav />
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
