"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "../../i18n/navigation"; //all navigation have to be handled by the custom hook for pathnames from navigation.ts, which is compatible with next-intl routing

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
