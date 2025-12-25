
import { Sidebar } from "@/components/sidebar";
import { RoleGuard } from "@/components/role-guard";

export default function TeamLeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={['To truong']}>
        <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 pl-64 transition-all duration-300 ease-in-out">
            <div className="container mx-auto p-8">
            {children}
            </div>
        </main>
        </div>
    </RoleGuard>
  );
}
