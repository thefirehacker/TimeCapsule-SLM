import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

// Ensure AUTH_SECRET is available
const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
if (!authSecret) {
  console.error("🚨 AUTH_SECRET Environment Variable Debug:", {
    AUTH_SECRET: process.env.AUTH_SECRET ? "SET" : "NOT_SET",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "SET" : "NOT_SET",
    NODE_ENV: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('AUTH')),
  });
  throw new Error(
    "AUTH_SECRET or NEXTAUTH_SECRET environment variable is required"
  );
}

// Determine the base URL for authentication
const baseUrl =
  process.env.NEXTAUTH_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

// Debug logging for production
if (process.env.NODE_ENV === "production") {
  console.log("🔐 NextAuth Production Config:", {
    hasSecret: !!authSecret,
    secretLength: authSecret?.length,
    baseUrl,
    nodeEnv: process.env.NODE_ENV,
    trustHost: true,
  });
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: authSecret,
  trustHost: true, // CRITICAL: Required for Amplify and production deployments
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user!.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
});
