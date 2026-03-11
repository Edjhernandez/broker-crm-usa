"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import MessagePopUp from "@/components/MessagePopUp";
import { ShieldX } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  const router = useRouter();

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          CRM Seguros
        </h1>

        {error && (
          <MessagePopUp
            icon={<ShieldX />}
            message={error}
            isVisible={isErrorMessageVisible}
            onClose={() => setIsErrorMessageVisible(false)}
          />
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Tu correo"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Tu contraseña"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </div>
      </form>
    </div>
  );
}
