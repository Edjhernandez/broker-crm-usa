import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const AUTH_USERNAME = process.env.AUTH_USERNAME;
const AUTH_PASSWORD = process.env.AUTH_PASSWORD;

if (!AUTH_USERNAME || !AUTH_PASSWORD) {
  throw new Error(
    "AUTH_USERNAME and AUTH_PASSWORD environment variables must be set.",
  );
}

// A per-startup key used to HMAC inputs before comparison, normalising all
// values to the same digest length so timingSafeEqual never receives buffers
// of different lengths and no length information is leaked.
const COMPARISON_KEY = randomBytes(32);

function safeEqual(a: string, b: string): boolean {
  const hmacA = createHmac("sha256", COMPARISON_KEY)
    .update(Buffer.from(a, "utf8"))
    .digest();
  const hmacB = createHmac("sha256", COMPARISON_KEY)
    .update(Buffer.from(b, "utf8"))
    .digest();
  return timingSafeEqual(hmacA, hmacB);
}

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

      if (!safeEqual(username, AUTH_USERNAME) || !safeEqual(password, AUTH_PASSWORD)) {
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

const authSecret =
  process.env.NEXTAUTH_SECRET ??
  process.env.AUTH_SECRET ??
  (process.env.NODE_ENV === "development"
    ? "dev-only-change-this-secret"
    : undefined);

if (!authSecret) {
  throw new Error(
    "NEXTAUTH_SECRET or AUTH_SECRET must be set in non-development environments",
  );
}

export const authOptions: NextAuthOptions = {
  secret: authSecret,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers,
};
