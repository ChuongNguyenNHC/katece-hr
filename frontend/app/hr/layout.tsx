import { Sidebar } from "@/components/sidebar";

export default function HrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <main className="pl-64 min-h-screen">
        <div className="container mx-auto p-6 max-w-7xl">
            {children}
        </div>
      </main>
    </div>
  );
}
