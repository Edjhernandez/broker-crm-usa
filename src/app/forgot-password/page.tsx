"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Si el correo existe en nuestro sistema, recibirás un enlace de recuperación.",
        });
        setEmail("");
      } else {
        setMessage({
          type: "error",
          text: "Ocurrió un error al procesar la solicitud.",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "No se pudo conectar con el servidor.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 p-6 text-zinc-900">
      <section className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Recuperar contraseña</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Ingresa tu correo electrónico para recibir instrucciones.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="flex flex-col gap-1 text-sm">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              placeholder="tu@email.com"
              required
            />
          </label>

          {message && (
            <p
              className={`rounded-md px-3 py-2 text-sm ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-60"
          >
            {isSubmitting ? "Enviando..." : "Enviar instrucciones"}
          </button>

          <div className="mt-4 text-center">
            <Link
              href="/login"
              className="text-sm text-zinc-600 hover:underline"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
