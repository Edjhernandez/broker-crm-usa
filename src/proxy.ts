/* import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export default createMiddleware(routing);

export const config = {
  matcher: [
    
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/",
    "/(es|en)/:path*",
  ],
}; */

import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { routing } from "./i18n/routing";

export default async function proxy(request: NextRequest) {
  // PASO 1: Ejecutar la lógica de Supabase (Auth)
  const supabaseResponse = await updateSession(request);

  // Si Supabase ya decidió redirigir (ej. al login), cortamos aquí
  if (supabaseResponse.headers.get("location")) {
    return supabaseResponse;
  }

  // Step 1: Use the incoming request (example)
  const defaultLocale = request.headers.get("x-your-custom-locale") || "en";

  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware({
    locales: ["en", "es"],
    defaultLocale: "en",
  });
  const response = handleI18nRouting(request);

  // Step 3: Alter the response (example)
  response.headers.set("x-your-custom-locale", defaultLocale);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  //matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/",
    "/(es|en)/:path*",
  ],
};
