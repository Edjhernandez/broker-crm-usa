"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "../../../i18n/navigation"; //all navigation have to be handled by the custom hook for pathnames from navigation.ts, which is compatible with next-intl routing
import MessagePopUp from "@/components/MessagePopUp";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShieldX } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageToggle from "@/components/LanguageToggle";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    await signInWithEmail();
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-300 bg-white dark:bg-gray-900`}
    >
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-end items-center gap-4">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      {/* login form */}
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-8 rounded-lg shadow-md transition-colors bg-white dark:bg-gray-800`}
      >
        <h1
          className={`text-2xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400`}
        >
          {t("title")}
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder={t("email")}
            className={`w-full p-2 border rounded outline-none transition-colors bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={t("password")}
            className={`w-full p-2 border rounded outline-none transition-colors bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded font-bold transition-colors bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white disabled:bg-gray-400`}
          >
            {loading ? t("checking") : t("submit")}
          </button>
        </div>
      </form>

      {/*  error message popup  */}
      <MessagePopUp
        icon={<ShieldX />}
        message={t("errorMessage")}
        isVisible={isErrorMessageVisible}
        onClose={() => setIsErrorMessageVisible(false)}
      />
    </div>
  );
}
