"use client";

import { useRouter } from "@/i18n/navigation";
import { supabase } from "@/lib/supabase/client";
import {
  Users,
  FileText,
  Settings,
  Plus,
  LogOut,
  LayoutGrid,
  ChartColumnIncreasing,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { AsideBarButton } from "./AsideBarButton";
import { useMemo } from "react";

export default function DashboardSideBar() {
  const router = useRouter();
  const t = useTranslations("dashboard.asideBar");
  const asideButtons = useMemo(
    () => [
      {
        icon: <ChartColumnIncreasing size={20} />,
        label: t("generalPanel"),
        href: "/",
      },
      {
        icon: <Users size={20} />,
        label: t("clients"),
        href: "/",
      },
      {
        icon: <FileText size={20} />,
        label: t("pendingDocuments"),
        href: "/",
      },
      {
        icon: <Settings size={20} />,
        label: t("settings"),
        href: "/",
      },
    ],
    [t, router],
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex bg-background text-foreground">
      <aside className="w-64 border-r border-border flex flex-col pt-8 pb-6 bg-background">
        {/* logo and App Brand*/}
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
            <LayoutGrid size={24} />
          </div>
          <div>
            {/*  name of the APP */}
            <h1 className="font-bold text-xl leading-none">Luna Broker's</h1>
            <p className="text-[8.5px] text-muted-foreground uppercase tracking-wider font-semibold mt-1">
              {t("slogan")}
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {asideButtons.map((button, index) => (
            <AsideBarButton
              key={index}
              icon={button.icon}
              label={button.label}
              href={button.href}
            />
          ))}
        </nav>

        <div className="px-4 space-y-4">
          <button className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
            <Plus size={20} strokeWidth={3} />
            <span>agregar cliente</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-xl transition-colors font-medium"
          >
            <LogOut size={20} />
            <span>{t("logout")}</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
