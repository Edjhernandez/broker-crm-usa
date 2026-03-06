import React from "react";

export type ViewType = "dashboard" | "clientes" | "documentos";

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const Icons = {
  Dashboard: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  ),
  Clientes: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Documentos: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  ),
  Add: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  ),
};

export const Sidebar = ({ activeView, setActiveView }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Icons.Dashboard },
    { id: "clientes", label: "Clientes", icon: Icons.Clientes },
    {
      id: "documentos",
      label: "Documentos Pendientes",
      icon: Icons.Documentos,
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeView === item.id
                  ? "bg-[#065F46] text-[#FDFCF8] shadow-lg shadow-emerald-900/20"
                  : "text-stone-400 hover:bg-white/5 hover:text-[#FDFCF8]"
              }`}
            >
              <span
                className={`${activeView === item.id ? "text-white" : "text-stone-500 group-hover:text-stone-300"}`}
              >
                <item.icon />
              </span>
              <span className="font-medium text-sm tracking-wide">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5 mt-auto">
          <button className="w-full bg-[#059669] hover:bg-[#047857] text-[#FDFCF8] px-4 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm font-semibold text-sm mb-6 active:scale-[0.98]">
            <Icons.Add />
            <span>Agregar Cliente</span>
          </button>

          <div className="px-4 py-3 flex items-center gap-3 text-stone-500 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Sistema Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
