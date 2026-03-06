"use client";

import { useState } from "react";
import { Sidebar, ViewType } from "@/components/Sidebar";
import { DashboardView } from "@/components/DashboardView";
import { ClientesView } from "@/components/ClientesView";
import { DocumentosView } from "@/components/DocumentosView";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewType>("dashboard");

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "clientes":
        return <ClientesView />;
      case "documentos":
        return <DocumentosView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDFCF8]">
      {/* Dynamic Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen p-12 lg:p-16 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
