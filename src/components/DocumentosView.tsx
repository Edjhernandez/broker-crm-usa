import React from "react";

const docs = [
  {
    id: 1,
    client: "Alejandro Rivera",
    document: "Póliza GMM - Individual",
    date: "6 Mar 2026",
    phone: "+525512345678",
  },
  {
    id: 2,
    client: "Beatriz Santos",
    document: "Anexo de Endoso 002",
    date: "5 Mar 2026",
    phone: "+525587654321",
  },
  {
    id: 3,
    client: "Carlos Mendoza",
    document: "Consentimiento de Datos",
    date: "4 Mar 2026",
    phone: "+525511223344",
  },
];

export const DocumentosView = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 tracking-tight leading-none mb-3">
            Documentos Pendientes
          </h2>
          <p className="text-stone-500 font-medium italic">
            Acción rápida para agilizar cierres.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#FDFCF8] rounded-[2.5rem] border border-stone-200/50 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-stone-100 group-hover:text-emerald-50 transition-colors">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <rect width="8" height="2" x="8" y="13" />
                <rect width="4" height="2" x="8" y="17" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-[10px] uppercase font-bold tracking-widest mb-6 border border-amber-200 shadow-sm">
                Esperando Firma
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-1">
                {doc.document}
              </h3>
              <p className="text-stone-500 text-sm font-medium mb-10">
                {doc.client}
              </p>

              <div className="flex items-center gap-3 text-stone-400 text-xs font-bold uppercase tracking-widest mb-10 bg-stone-50/50 p-3 rounded-2xl border border-stone-100">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>Enviado: {doc.date}</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${doc.phone.replace(/\+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 font-bold text-sm shadow-md hover:shadow-[#25D366]/20 active:scale-[0.98] group/btn"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover/btn:scale-110 transition-transform"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Reenviar WhatsApp</span>
            </a>
          </div>
        ))}

        <button className="flex flex-col items-center justify-center bg-stone-50 rounded-[2.5rem] border-2 border-dashed border-stone-200 p-8 shadow-none hover:bg-white hover:border-[#065F46] hover:shadow-xl transition-all duration-500 group min-h-[380px]">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-300 group-hover:bg-emerald-50 group-hover:text-[#065F46] transition-all duration-500 mb-6">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </div>
          <p className="text-stone-400 font-bold text-sm uppercase tracking-widest group-hover:text-stone-600 transition-colors">
            Solicitar Nuevo
          </p>
        </button>
      </div>
    </div>
  );
};
