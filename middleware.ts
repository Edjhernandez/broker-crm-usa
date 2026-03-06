import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ req, token }) => {
      const pathname = req.nextUrl.pathname;

      if (
        pathname === "/login" ||
        pathname === "/forgot-password" ||
        pathname === "/reset-password" ||
        pathname.startsWith("/api/auth")
      ) {
        return true;
      }

      return Boolean(token);
    },
  },
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
