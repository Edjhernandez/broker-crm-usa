"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import MessagePopUp from "@/components/MessagePopUp";
import { ThemeToggle } from "@/components/ToggleTheme";
import { ShieldX, Languages } from "lucide-react";
import { useTheme } from "next-themes";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

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
      setError(error.message);
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
    try {
      setLoading(true);
      setError("");
      await signInWithEmail();
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-end gap-4">
        <button
          onClick={() => setLanguage(language === "es" ? "en" : "es")}
          className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${theme === "dark" ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-800 hover:bg-gray-200"} shadow-sm text-sm font-medium`}
        >
          <Languages size={18} />
          {language === "es" ? "ES" : "EN"}
        </button>
        <div
          className={`rounded-full shadow-sm ${theme === "dark" ? "bg-gray-800 text-yellow-400" : "bg-white text-gray-800"}`}
        >
          <ThemeToggle />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-8 rounded-lg shadow-md transition-colors ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      >
        <h1
          className={`text-2xl font-bold mb-6 text-center ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
        >
          {language === "es" ? "CRM Seguros" : "Insurance CRM"}
        </h1>

        {error && (
          <MessagePopUp
            icon={<ShieldX />}
            message={error}
            isVisible={isErrorMessageVisible}
            onClose={() => setIsErrorMessageVisible(false)}
            theme={theme as "light" | "dark" || "light"}
          />
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder={language === "es" ? "Tu correo" : "Your email"}
            className={`w-full p-2 border rounded outline-none transition-colors ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500" : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={language === "es" ? "Tu contraseña" : "Your password"}
            className={`w-full p-2 border rounded outline-none transition-colors ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500" : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded font-bold transition-colors ${theme === "dark" ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"} text-white disabled:bg-gray-400`}
          >
            {loading
              ? language === "es"
                ? "Verificando..."
                : "Checking..."
              : language === "es"
                ? "Entrar"
                : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
