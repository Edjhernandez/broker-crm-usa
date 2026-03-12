import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export default async function proxy(request: NextRequest) {
  // step 1: Supabase (Auth)
  const supabaseResponse = await updateSession(request);

  // If Supabase decides (e.g., on login), we stop here
  if (supabaseResponse.headers.get("location")) {
    return supabaseResponse;
  }

  // Step 2: Use the incoming request
  const defaultLocale = request.headers.get("x-your-custom-locale") || "en";

  // Step 3: Create and call the next-intl middleware
  const handleI18nRouting = createMiddleware({
    locales: ["en", "es"],
    defaultLocale: "en",
  });
  const response = handleI18nRouting(request);

  // Step 4: Alter the response
  response.headers.set("x-your-custom-locale", defaultLocale);

  return response;
}

export const config = {
  // Match only internationalized pathnames, excluding static assets and API routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/",
    "/(es|en)/:path*",
  ],
};
