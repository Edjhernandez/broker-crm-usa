import LanguageToggle from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Bell, CircleUser } from "lucide-react";
import { getUser } from "@/utils/getUser";
import Image from "next/image";

export default async function Header() {
  const user = await getUser();
  const displayName = user?.displayName || user?.email || "No Name";

  return (
    <header className="h-14 w-full px-8 flex items-center justify-between bg-background border-b border-border/50">
      <div className="flex items-center w-full justify-end gap-6">
        <LanguageToggle />
        <ThemeToggle />
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-3 border-l border-border pl-6">
          <div className="text-right">
            <p className="text-sm font-bold leading-tight">{displayName}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
            {user?.photoURL ? (
              <Image
                src={user.photoURL}
                alt={displayName}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <CircleUser size={20} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
