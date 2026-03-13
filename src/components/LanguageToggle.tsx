"use client";

import { useLocale } from "next-intl";
// used the custom hook for pathnames from navigation.ts, which is compatible with next-intl routing
import { usePathname, useRouter } from "@/i18n/navigation";
import { useState } from "react";

export default function LanguageToggle() {
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = useLocale();
  const [language, setLanguage] = useState<"en" | "es">(
    currentLocale as "en" | "es",
  );

  const changeLocale = (newLocale: "en" | "es") => {
    router.push(pathName, { locale: newLocale });
    setLanguage(newLocale);
  };
  return (
    <div className="flex">
      <button
        onClick={() => changeLocale("es")}
        disabled={language === "es"}
        className={`px-2 py-1 rounded ${language === "es" ? "bg-primary text-background" : `text-muted-foreground bg-muted`}`}
      >
        ES
      </button>
      <button
        onClick={() => changeLocale("en")}
        disabled={language === "en"}
        className={`px-2 py-1 rounded ${language === "en" ? "bg-primary text-background" : `text-muted-foreground bg-muted`}`}
      >
        EN
      </button>
    </div>
  );
}
