import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const DEFAULT_LOGIN_USERNAME = "admin@brokercrm.local";
const DEFAULT_LOGIN_PASSWORD = "ChangeMe123!";

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const username = credentials?.username?.trim();
      const password = credentials?.password;

      if (!username || !password) {
        return null;
      }

      const isDev = process.env.NODE_ENV === "development";
      const envUsername = process.env.AUTH_USERNAME;
      const envPassword = process.env.AUTH_PASSWORD;

      if (!isDev && (!envUsername || !envPassword)) {
        console.error(
          "AUTH_USERNAME and AUTH_PASSWORD must be set in non-development environments.",
        );
        return null;
      }

      const expectedUsername = envUsername ?? DEFAULT_LOGIN_USERNAME;
      const expectedPassword = envPassword ?? DEFAULT_LOGIN_PASSWORD;
      if (username !== expectedUsername || password !== expectedPassword) {
        return null;
      }

      return {
        id: username,
        name: username,
        email: username,
      };
    },
  }),
];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  secret:
    process.env.NEXTAUTH_SECRET ??
    process.env.AUTH_SECRET ??
    "dev-only-change-this-secret",
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers,
};
