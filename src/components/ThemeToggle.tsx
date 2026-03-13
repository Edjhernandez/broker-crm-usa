"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 transition-all duration-300 flex items-center justify-center rounded-full hover:bg-muted"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun size={20} className="text-accent" />
      ) : (
        <Moon size={20} className="text-muted-foreground" />
      )}
    </button>
  );
}
