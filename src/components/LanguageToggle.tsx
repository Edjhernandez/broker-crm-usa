"use client";

import { useLocale } from "next-intl";
//import { usePathname, useRouter } from "next/navigation";
import { usePathname, useRouter } from "./../i18n/navigation"; // Adjust the import path as needed

export default function LanguageToggle() {
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = useLocale();

  const changeLocale = (newLocale: string) => {
    const newPathName = `/${newLocale}` + pathName;
    console.log("path:", newPathName);
    router.push(newPathName);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLocale("es")}
        /*  disabled={currentLocale === "es"} */
        className={`px-2 py-1 rounded ${currentLocale === "es" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-800"}`}
      >
        ES
      </button>
      <button
        onClick={() => changeLocale("en")}
        /*  disabled={currentLocale === "en"} */
        className={`px-2 py-1 rounded ${currentLocale === "en" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-800"}`}
      >
        EN
      </button>
    </div>
  );
}
