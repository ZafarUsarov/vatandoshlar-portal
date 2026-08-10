import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { verifyAdminCredentials } from "@/lib/auth/admin-repository";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const email =
          typeof credentials.email === "string"
            ? credentials.email.trim()
            : "";

        const password =
          typeof credentials.password === "string"
            ? credentials.password
            : "";

        if (!email || !password) {
          return null;
        }

        const admin = await verifyAdminCredentials(
          email,
          password,
        );

        if (!admin) {
          return null;
        }

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id =
          typeof token.userId === "string"
            ? token.userId
            : "";

        session.user.role =
          token.role === "admin"
            ? "admin"
            : "user";
      }

      return session;
    },
  },
});
