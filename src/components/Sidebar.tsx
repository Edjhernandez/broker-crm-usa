import React from "react";
import { signOut } from "next-auth/react";

export type ViewType = "dashboard" | "clientes" | "documentos";

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

export const Sidebar = ({ activeView, setActiveView }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "clientes", label: "Clientes", icon: Users },
    {
      id: "documentos",
      label: "Documentos Pendientes",
      icon: FileText,
    },
  ];

  return (
    <aside className="w-64 h-screen bg-[#121212] text-white flex flex-col fixed left-0 top-0 border-r border-white/5 z-50">
      <div className="p-8 flex flex-col h-full">
        <div className="mb-12 px-2">
          <h1 className="text-xl font-semibold tracking-tight text-[#FDFCF8] flex items-center gap-2">
            Broker<span className="text-[#059669]">CRM</span>
          </h1>
          <p className="text-[10px] text-stone-500 mt-1 uppercase tracking-[0.2em] font-medium">
            Professional Suite
          </p>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewType)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                activeView === item.id
                  ? "bg-[#065F46] text-[#FDFCF8] shadow-lg shadow-emerald-900/20"
                  : "text-stone-400 hover:bg-white/5 hover:text-[#FDFCF8]"
              )}
            >
              <span
                className={cn(
                  activeView === item.id
                    ? "text-white"
                    : "text-stone-500 group-hover:text-stone-300"
                )}
              >
                <item.icon size={20} />
              </span>
              <span className="font-medium text-sm tracking-wide">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5 mt-auto space-y-2">
          <button className="w-full bg-[#059669] hover:bg-[#047857] text-[#FDFCF8] px-4 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm font-semibold text-sm mb-4 active:scale-[0.98]">
            <Plus size={18} />
            <span>Agregar Cliente</span>
          </button>

          <button className="w-full text-stone-400 hover:bg-white/5 hover:text-[#FDFCF8] px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 group font-medium text-sm">
            <span className="text-stone-500 group-hover:text-stone-300">
              <Settings size={20} />
            </span>
            <span>Ajustes</span>
          </button>

          <button onClick={() => signOut()} className="w-full text-stone-400 hover:bg-rose-500/10 hover:text-rose-400 px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 group font-medium text-sm">
            <span className="text-stone-500 group-hover:text-rose-400">
              <LogOut size={20} />
            </span>
            <span>Cerrar Sesión</span>
          </button>

          <div className="px-4 py-3 flex items-center gap-3 text-stone-500 text-[10px] uppercase tracking-widest font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Sistema Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
