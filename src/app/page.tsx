"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="text-black text-8xl">
      hello world
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
