import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const isGoogleLoginEnabled =
    process.env.NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN === "true";

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 p-6 text-zinc-900">
      <section className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-zinc-900">Broker CRM Login</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Inicia sesion para acceder al formulario.
        </p>

        <Suspense fallback={<div className="mt-6 text-center text-sm text-zinc-500">Cargando formulario...</div>}>
          <LoginForm googleEnabled={isGoogleLoginEnabled} />
        </Suspense>
      </section>
    </main>
  );
}
