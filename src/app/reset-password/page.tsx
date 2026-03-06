"use client";

import { FormEvent, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Las contraseñas no coinciden." });
      return;
    }

    if (!token) {
      setMessage({
        type: "error",
        text: "Token de recuperación no válido o ausente.",
      });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Tu contraseña ha sido actualizada con éxito. Ya puedes iniciar sesión.",
        });
        setPassword("");
        setConfirmPassword("");

        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        const data = await response.json().catch(() => ({}));
        setMessage({
          type: "error",
          text:
            data.message || "Ocurrió un error al restablecer la contraseña.",
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

  if (!token) {
    return (
      <div className="text-center">
        <p className="text-red-600 font-medium">
          Enlace de recuperación inválido.
        </p>
        <Link
          href="/forgot-password"
          title="Volver a solicitar recuperación"
          className="mt-4 inline-block text-zinc-600 underline"
        >
          Solicitar un nuevo enlace
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label className="flex flex-col gap-1 text-sm text-zinc-900">
        Nueva contraseña
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500 text-zinc-900"
          placeholder="********"
          required
          minLength={8}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-zinc-900">
        Confirmar nueva contraseña
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500 text-zinc-900"
          placeholder="********"
          required
          minLength={8}
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
        {isSubmitting ? "Actualizando..." : "Actualizar contraseña"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 p-6">
      <section className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-zinc-900">
          Establecer nueva contraseña
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          Por favor, ingresa tu nueva contraseña a continuación.
        </p>

        <Suspense
          fallback={
            <div className="mt-6 text-center text-sm text-zinc-500">
              Cargando...
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </section>
    </main>
  );
}
