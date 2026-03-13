import DashboardSideBar from "@/components/DashboardSideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Este es el que tiene la lógica de navegación */}
      <DashboardSideBar />

      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
