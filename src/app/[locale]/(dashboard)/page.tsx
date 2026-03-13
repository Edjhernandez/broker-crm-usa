"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "../../../i18n/navigation";
import LanguageToggle from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  TrendingUp,
  ClipboardCheck,
  ShieldCheck,
  Search,
  Bell,
} from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex bg-background text-foreground">
      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-muted/30">
        {/* Header */}
        <header className="h-20 px-8 flex items-center justify-between bg-background/50 backdrop-blur-sm border-b border-border/50">
          <div className="relative w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-muted/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 ring-primary/20 outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center p-1 bg-muted rounded-full">
              <LanguageToggle />
            </div>
            <ThemeToggle />
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-border pl-6">
              <div className="text-right">
                <p className="text-sm font-bold leading-tight">Admin Studio</p>
                <p className="text-[11px] text-muted-foreground uppercase font-semibold">
                  Administrador
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                AS
              </div>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-300">
          <header className="mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight">
              Panel de Control
            </h2>
            <p className="text-muted-foreground text-lg mt-1">
              Gestiona tu cartera de clientes con calma.
            </p>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Total Clientes */}
            <div className="bg-background p-8 rounded-4xl border border-border shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-muted-foreground font-medium">
                  Total Clientes
                </p>
                <div className="p-2 bg-primary/5 text-primary rounded-lg">
                  <TrendingUp size={20} />
                </div>
              </div>
              <h3 className="text-5xl font-bold mb-2 tracking-tight">1,284</h3>
              <p className="text-emerald-500 font-bold text-sm flex items-center gap-1">
                +12%{" "}
                <span className="text-muted-foreground font-normal">
                  vs el mes anterior
                </span>
              </p>
            </div>

            {/* Firmas Pendientes */}
            <div className="bg-background p-8 rounded-4xl border border-border shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-muted-foreground font-medium">
                  Firmas Pendientes
                </p>
                <div className="p-2 bg-accent/10 text-accent rounded-lg">
                  <ClipboardCheck size={20} />
                </div>
              </div>
              <h3 className="text-5xl font-bold mb-2 tracking-tight">24</h3>
              <p className="text-accent font-bold text-sm flex items-center gap-1">
                Urgent{" "}
                <span className="text-muted-foreground font-normal text-xs ml-1">
                  5 críticas hoy
                </span>
              </p>
            </div>

            {/* Seguros del Mes */}
            <div className="bg-background p-8 rounded-4xl border border-border shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-muted-foreground font-medium">
                  Seguros del Mes
                </p>
                <div className="p-2 bg-primary/5 text-primary rounded-lg">
                  <ShieldCheck size={20} />
                </div>
              </div>
              <h3 className="text-5xl font-bold mb-2 tracking-tight">12</h3>
              <p className="text-emerald-500 font-bold text-sm flex items-center gap-1">
                +18%{" "}
                <span className="text-muted-foreground font-normal">
                  objetivo alcanzado
                </span>
              </p>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-background p-10 rounded-4xl border border-border shadow-sm h-100 flex flex-col">
            <div className="flex justify-between items-center mb-auto">
              <h4 className="font-bold text-xl">Actividad Mensual</h4>
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary shadow-sm shadow-primary/20"></div>
                  <span className="font-medium text-muted-foreground">
                    Renovaciones
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <span className="font-medium text-muted-foreground">
                    Nuevos
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-end justify-between px-4 pb-4">
              {["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO"].map(
                (mes) => (
                  <div key={mes} className="flex flex-col items-center gap-4">
                    <div className="w-2 rounded-full bg-muted h-32 relative">
                      <div
                        className="absolute bottom-0 w-full bg-primary rounded-full transition-all duration-1000"
                        style={{ height: 100 }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      {mes}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
