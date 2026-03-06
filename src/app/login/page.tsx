import { authOptions } from "@/lib/auth-options";
import LoginForm from "./LoginForm";

function getSafeRedirectPath(
  url: string | null | undefined,
  fallback = "/",
): string {
  if (url && /^\/(?!\/)/.test(url)) {
    return url;
  }
  return fallback;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = getSafeRedirectPath(
    searchParams.get("callbackUrl") || searchParams.get("redirect"),
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isGoogleLoginEnabled =
    process.env.NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN === "true";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
        callbackUrl: redirectTarget,
      });

      if (!result?.ok) {
        setErrorMessage("Credenciales inválidas");
        return;
      }

      router.replace(getSafeRedirectPath(result.url, redirectTarget));
      router.refresh();
    } catch {
      setErrorMessage("No es posible iniciar sesión en este momento");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: redirectTarget,
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 p-6 text-zinc-900">
      <section className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Broker CRM Login</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Inicia sesión para acceder al formulario.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="flex flex-col gap-1 text-sm">
            Username
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              placeholder="admin@brokercrm.local"
              required
            />
          </label>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              placeholder="********"
              required
            />
            <div className="mt-1 flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs text-zinc-600 hover:text-zinc-900 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          {errorMessage ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {isGoogleLoginEnabled ? (
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="mt-3 w-full rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
          >
            Continuar con Google
          </button>
        ) : (
          <p className="mt-3 text-xs text-zinc-500">
            Google OAuth deshabilitado. Define
            NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN=true para mostrarlo.
          </p>
        )}
      </section>
    </main>
  );
}
