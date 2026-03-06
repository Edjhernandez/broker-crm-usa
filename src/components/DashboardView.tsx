"use client";

import React from "react";
import { Users, FileCheck2, Shield, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";

interface CardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}

const Card = ({ label, value, change, trend, icon }: CardProps) => (
  <div className="bg-[#FDFCF8] p-7 rounded-3xl border border-stone-200/60 shadow-sm hover:shadow-md transition-all duration-500 group">
    <div className="flex justify-between items-start mb-6">
      <div className="p-3.5 rounded-2xl bg-stone-50 text-stone-700 border border-stone-100 group-hover:scale-110 group-hover:bg-[#065F46] group-hover:text-white transition-all duration-500 shadow-sm">
        {icon}
      </div>
      <div
        className={cn(
          "flex items-center gap-1 text-[13px] font-semibold px-2 py-0.5 rounded-full",
          trend === "up"
            ? "text-emerald-700 bg-emerald-50"
            : "text-rose-700 bg-rose-50"
        )}
      >
        <span>{change}</span>
        {trend === "up" ? "↑" : "↓"}
      </div>
    </div>
    <h3 className="text-stone-400 text-[11px] font-bold uppercase tracking-[0.15em] mb-1">
      {label}
    </h3>
    <p className="text-3xl font-bold text-stone-900 tracking-tight">{value}</p>
  </div>
);

const chartData = [
  { day: "Lun", value: 40 },
  { day: "Mar", value: 65 },
  { day: "Mie", value: 45 },
  { day: "Jue", value: 80 },
  { day: "Vie", value: 55 },
  { day: "Sab", value: 90 },
  { day: "Dom", value: 70 },
];

const Chart = () => (
  <div className="bg-[#FDFCF8] p-8 rounded-3xl border border-stone-200/60 shadow-sm">
    <div className="flex items-center justify-between mb-10">
      <div>
        <h3 className="text-lg font-bold text-stone-900">Actividad Mensual</h3>
        <p className="text-stone-400 text-sm mt-0.5">
          Nuevos registros en el periodo
        </p>
      </div>
      <TrendingUp size={20} className="text-stone-300" />
    </div>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} barSize={28}>
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fontWeight: 700, fill: "#a8a29e", letterSpacing: "0.1em" }}
        />
        <YAxis hide />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            background: "#121212",
            border: "none",
            borderRadius: "12px",
            color: "#FDFCF8",
            fontSize: "12px",
          }}
          itemStyle={{ color: "#FDFCF8" }}
          labelStyle={{ color: "#a8a29e" }}
        />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.value === Math.max(...chartData.map((d) => d.value)) ? "#065F46" : "#e7e5e4"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const DashboardView = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold text-stone-900 tracking-tight leading-none mb-3">
            Panel de Control
          </h2>
          <p className="text-stone-500 font-medium">
            Gestión inteligente de tu cartera de seguros.
          </p>
        </div>
        <div className="text-right">
          <p className="text-stone-400 text-[10px] uppercase font-bold tracking-widest">
            Fecha Actual
          </p>
          <p className="text-stone-900 font-bold bg-white px-4 py-2 rounded-xl mt-1 border border-stone-100 shadow-sm">
            6 Mar 2026
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          label="Total Clientes"
          value="1,284"
          change="+12.4%"
          trend="up"
          icon={<Users size={20} />}
        />
        <Card
          label="Firmas Pendientes"
          value="23"
          change="-4.2%"
          trend="down"
          icon={<FileCheck2 size={20} />}
        />
        <Card
          label="Seguros del Mes"
          value="45"
          change="+8.1%"
          trend="up"
          icon={<Shield size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Chart />
        </div>
        <div className="bg-[#121212] p-8 rounded-3xl text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#065F46] opacity-10 blur-3xl rounded-full -mr-16 -mt-16"></div>
          <div>
            <h3 className="text-xl font-bold mb-2">Meta Mensual</h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-8">
              Estás a solo{" "}
              <span className="text-white font-bold">5 pólizas</span> de
              alcanzar tu objetivo del primer trimestre.
            </p>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                  Progreso
                </span>
                <span className="text-lg font-bold">85%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[85%] rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
              </div>
            </div>
          </div>
          <button className="w-full bg-[#065F46] hover:bg-emerald-700 py-4 rounded-2xl font-bold text-sm transition-all mt-10 active:scale-95 border border-white/5">
            Ver Plan Detallado
          </button>
        </div>
      </div>
    </div>
  );
};
