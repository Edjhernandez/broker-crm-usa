"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "@/i18n/navigation"; //all navigation have to be handled by the custom hook for pathnames from navigation.ts, which is compatible with next-intl routing
import MessagePopUp from "@/components/MessagePopUp";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShieldX } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageToggle from "@/components/LanguageToggle";
import { loginSchema } from "@/lib/schemas/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const t = useTranslations("loginPage");

  useEffect(() => {
    setMounted(true);
  }, []);

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      //handle by supabase auth
      email: email,
      password: password,
    });

    if (error) {
      setIsErrorMessageVisible(true);
      setLoading(false);
      return;
    }

    if (data?.user) {
      setLoading(false);
      router.push("/");
    }
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // login fields validation using zod schema
    const validationResult = loginSchema.safeParse({ email, password });

    if (!validationResult.success) {
      const formattedError: { [key: string]: string } = {};

      formattedError[validationResult.error.issues[0].path[0] as string] =
        validationResult.error.issues[0].message as string;

      setValidationError(formattedError);
      return;
    }

    // Clear any stale validation errors and start loading before sign-in
    setValidationError({});
    setLoading(true);
    await signInWithEmail();
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-300 
        bg-background text-foreground`}
    >
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-end items-center gap-4">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      {/* login form */}
      <form
        noValidate
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-8 rounded-lg shadow-md transition-colors bg-secondary text-foreground`}
      >
        <h1 className={`text-2xl font-bold mb-6 text-center text-primary`}>
          {t("title")}
        </h1>

        <div className="space-y-2">
          <div className="flex flex-col ">
            <input
              type="email"
              autoComplete="email"
              required
              placeholder={t("email")}
              className={`w-full p-2 border rounded outline-none transition-colors bg-background text-foreground border-border placeholder-muted-foreground focus:border-primary ${validationError.email ? "border-destructive" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="min-h-5">
              {validationError.email && (
                <p className="text-red-400 text-xs mt-1">
                  {t(validationError.email)}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col ">
            <input
              type="password"
              autoComplete="current-password"
              required
              placeholder={t("password")}
              className={`w-full p-2 border rounded outline-none transition-colors bg-background text-foreground border-border placeholder-muted-foreground focus:border-primary ${validationError.password ? "border-destructive" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="min-h-5">
              {validationError.password && (
                <p className="text-red-400 text-xs mt-1">
                  {t(validationError.password)}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded font-bold transition-colors bg-primary hover:bg-primary-hover text-primary-foreground disabled:bg-muted`}
          >
            {loading ? t("checking") : t("submit")}
          </button>
        </div>
      </form>

      {/*  error message popup  */}
      <MessagePopUp
        icon={<ShieldX size={50} color="var(--color-destructive)" />}
        message={t("errorMessage")}
        isVisible={isErrorMessageVisible}
        onClose={() => setIsErrorMessageVisible(false)}
      />
    </div>
  );
}
