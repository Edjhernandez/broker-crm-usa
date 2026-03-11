"use client";

import { supabase } from "@/lib/supabase/client";

export default function Home() {
  const handleLogout = async () => {
    await supabase.auth.signOut();

    // Forzamos recarga para que el Middleware actúe de inmediato
    window.location.href = "/login";
  };

  return (
    <div className="text-black text-8xl">
      hello world
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
