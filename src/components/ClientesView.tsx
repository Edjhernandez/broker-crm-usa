import React from "react";

const clients = [
  {
    id: 1,
    name: "Alejandro Rivera",
    email: "a.rivera@example.com",
    policy: "SUV-9821-X",
    status: "Activo",
    type: "Auto",
  },
  {
    id: 2,
    name: "Beatriz Santos",
    email: "b.santos@mail.com",
    policy: "LIFE-0042-B",
    status: "Pendiente",
    type: "Vida",
  },
  {
    id: 3,
    name: "Carlos Mendoza",
    email: "cmendoza@pro.es",
    policy: "HOME-1192-M",
    status: "Vencido",
    type: "Hogar",
  },
  {
    id: 4,
    name: "Diana López",
    email: "diana.l@web.com",
    policy: "HLT-5521-L",
    status: "Activo",
    type: "Salud",
  },
  {
    id: 5,
    name: "Eduardo Gómez",
    email: "egomez@corp.mx",
    policy: "BUS-8821-G",
    status: "Activo",
    type: "Empresa",
  },
];

export const ClientesView = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
            Directorio de Clientes
          </h2>
          <p className="text-stone-500 mt-1">
            Administra y contacta a tus asegurados de forma eficiente.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar cliente..."
              className="pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#065F46]/20 focus:border-[#065F46] transition-all w-64 shadow-sm"
            />
            <svg
              className="absolute left-3 top-3 text-stone-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-[#FDFCF8] rounded-3xl border border-stone-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="px-8 py-5 text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                Nombre del Cliente
              </th>
              <th className="px-8 py-5 text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                Póliza / Ramo
              </th>
              <th className="px-8 py-5 text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                Estado
              </th>
              <th className="px-8 py-5 text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {clients.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-stone-50/50 transition-colors group"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 font-bold text-sm border border-stone-200 group-hover:bg-[#065F46] group-hover:text-white transition-all duration-300">
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 leading-none mb-1">
                        {client.name}
                      </p>
                      <p className="text-xs text-stone-400">{client.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold text-stone-700">
                      {client.policy}
                    </span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-tighter font-bold">
                      {client.type}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      client.status === "Activo"
                        ? "bg-emerald-100 text-emerald-800"
                        : client.status === "Pendiente"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button aria-label="Ver detalles" className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-stone-200 text-stone-400 hover:text-[#065F46] transition-all shadow-none hover:shadow-sm">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                  <button aria-label="Editar cliente" className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-stone-200 text-stone-400 hover:text-[#065F46] transition-all shadow-none hover:shadow-sm ml-1">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
