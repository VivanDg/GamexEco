import { ThemeToggle } from "@/components/layout/theme-toggle";
import { AdminSidebar } from "@/modules/admin/components/admin-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { adminUser } from "@/lib/mock/users";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-card px-4">
          <span className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground md:hidden">
            Gamex Admin
          </span>
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarFallback className="bg-brand text-xs text-brand-foreground">
                  AG
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-sm leading-tight sm:block">
                <div className="font-medium">{adminUser.name}</div>
                <div className="text-xs text-muted-foreground">
                  {adminUser.email}
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 bg-muted/30 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
