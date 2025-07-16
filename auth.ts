import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import {
  getUserByEmail,
  verifyUserPassword,
  getLatestBubblspaceIdForUser,
  createUser,
  getUserById,
  updateUserLoginInfo,
} from "./src/lib/auth/auth";

// Extend NextAuth types for custom session properties
declare module "next-auth" {
  interface Session {
    userId?: string;
    role?: "admin" | "user";
    company?: string;
    bubblspaceid?: string;
    userType?: "RegularPro" | "Free" | "OrgUser";
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      company?: string | null;
      createdBy?: string | null;
      userType?: "RegularPro" | "Free" | "OrgUser";
    };
  }

  interface User {
    id?: string;
    email?: string | null;
    name?: string | null;
    role?: "admin" | "user";
    company?: string;
    bubblspaceid?: string;
    createdBy?: string | null;
    userType?: "RegularPro" | "Free" | "OrgUser";
    isVerified?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    role?: "admin" | "user";
    company?: string;
    bubblspaceid?: string;
    createdBy?: string;
    userType?: "RegularPro" | "Free" | "OrgUser";
  }
}

// Ensure AUTH_SECRET is available
const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
if (!authSecret) {
  console.error("🚨 AUTH_SECRET Environment Variable Debug:", {
    AUTH_SECRET: process.env.AUTH_SECRET ? "SET" : "NOT_SET",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "SET" : "NOT_SET",
    NODE_ENV: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter((key) => key.includes("AUTH")),
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
  trustHost: true,

  logger: {
    debug: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
  },
  debug: process.env.NODE_ENV === "development",

  providers: [
    // OAuth Providers
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),

    // Credentials Provider
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password");
        }

        try {
          const user = await getUserByEmail(credentials.email as string);

          if (!user) {
            throw new Error("No account found with this email address");
          }

          if (!user.isVerified) {
            throw new Error(
              "Please verify your email address before signing in"
            );
          }

          if (user.status !== "active") {
            throw new Error(
              "Your account has been suspended. Please contact support"
            );
          }

          const isValid = await verifyUserPassword(
            user,
            credentials.password as string
          );

          if (!isValid) {
            throw new Error("Invalid password");
          }

          // Get the latest bubblspaceid for the user
          const bubblspaceid = await getLatestBubblspaceIdForUser(user.userId);

          return {
            id: user.userId,
            email: user.email,
            name: user.name,
            role: user.role,
            company: user.company,
            bubblspaceid: bubblspaceid,
            createdBy: user.createdBy,
            userType: user.userType,
            isVerified: user.isVerified,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session, account }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
        token.company = user.company;
        token.bubblspaceid = user.bubblspaceid;
        token.createdBy = user.createdBy || undefined;
        token.userType = user.userType;
      }

      // Handle session updates
      if (trigger === "update" && session) {
        if (session.bubblspaceid) {
          token.bubblspaceid = session.bubblspaceid;
        }
        if (session.userType) {
          token.userType = session.userType;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.userId = token.userId as string;
        session.role = token.role as "admin" | "user";
        session.company = token.company as string;
        session.bubblspaceid = token.bubblspaceid as string;
        session.userType = token.userType as "RegularPro" | "Free" | "OrgUser";

        session.user = {
          ...session.user,
          id: token.userId as string,
          name: token.name ? String(token.name) : "",
          email: token.email ? String(token.email) : "",
          company: token.company ? String(token.company) : "",
          createdBy: token.createdBy ? String(token.createdBy) : "",
          userType: token.userType as "RegularPro" | "Free" | "OrgUser",
        };
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      try {
        // Handle OAuth sign-ins (Google, GitHub)
        if (account?.provider === "google" || account?.provider === "github") {
          if (!user.email) {
            console.error("OAuth user has no email");
            return false;
          }

          // Check if user already exists in database
          let existingUser = await getUserByEmail(user.email);

          if (!existingUser) {
            // Create new OAuth user in database
            console.log(`Creating new OAuth user: ${user.email}`);

            try {
              const newUser = await createUser({
                email: user.email,
                name: user.name || "OAuth User",
                password: "oauth_user", // OAuth users don't need passwords but DB requires a value
                role: "user",
                company: (profile?.company as string) || "Not specified",
                status: "active",
                userType: "Free",
              });

              console.log(`OAuth user created successfully: ${newUser.userId}`);

              // Update user object with database info
              user.id = newUser.userId;
              user.role = newUser.role;
              user.company = newUser.company;
              user.userType = "Free"; // Set explicitly since createUser doesn't return userType
              user.isVerified = true; // OAuth users are considered verified

              // Get bubblspaceid for the new user
              const bubblspaceid = await getLatestBubblspaceIdForUser(
                newUser.userId
              );
              user.bubblspaceid = bubblspaceid;

              // Track login for new OAuth user
              try {
                await updateUserLoginInfo(
                  newUser.userId,
                  account.provider as "google" | "github"
                );
              } catch (loginError) {
                console.error(
                  "Error tracking login for new OAuth user:",
                  loginError
                );
                // Don't fail the sign-in if login tracking fails
              }
            } catch (error) {
              console.error("Error creating OAuth user:", error);
              return false;
            }
          } else {
            console.log(`Existing OAuth user found: ${existingUser.userId}`);

            // Update user object with existing database info
            user.id = existingUser.userId;
            user.role = existingUser.role;
            user.company = existingUser.company;
            user.userType = existingUser.userType;
            user.isVerified = existingUser.isVerified;
            user.createdBy = existingUser.createdBy;

            // Get bubblspaceid for existing user
            const bubblspaceid = await getLatestBubblspaceIdForUser(
              existingUser.userId
            );
            user.bubblspaceid = bubblspaceid;

            // Check if user account is active
            if (existingUser.status !== "active") {
              console.error(
                `OAuth user account is not active: ${existingUser.status}`
              );
              return false;
            }

            // Track login for existing OAuth user
            try {
              await updateUserLoginInfo(
                existingUser.userId,
                account.provider as "google" | "github"
              );
            } catch (loginError) {
              console.error(
                "Error tracking login for existing OAuth user:",
                loginError
              );
              // Don't fail the sign-in if login tracking fails
            }
          }

          return true;
        }

        // For credentials, user validation is handled in the authorize callback
        if (account?.provider === "credentials") {
          // Track login for credentials user
          try {
            if (user.id) {
              await updateUserLoginInfo(user.id, "email");
            }
          } catch (loginError) {
            console.error(
              "Error tracking login for credentials user:",
              loginError
            );
            // Don't fail the sign-in if login tracking fails
          }
          return true;
        }

        return false;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});
