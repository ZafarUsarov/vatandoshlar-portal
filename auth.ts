import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { verifyAdminCredentials } from "@/lib/auth/admin-repository";
import { consumeGoogleAuthIntent, PRIVACY_VERSION } from "@/lib/auth/google-auth-intent";
import { resolveGoogleAuthUser } from "@/lib/auth/google-auth-repository";
import { verifyPublicUserCredentials } from "@/lib/auth/public-user-repository";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = typeof credentials.email === "string" ? credentials.email.trim() : "";
        const password = typeof credentials.password === "string" ? credentials.password : "";
        if (!email || !password) return null;
        const admin = await verifyAdminCredentials(email, password);
        if (!admin) return null;
        return { id: admin.id, email: admin.email, name: admin.name, role: admin.role };
      },
    }),
    Credentials({
      id: "public-credentials",
      name: "Vatandoshlar ID",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = typeof credentials.email === "string" ? credentials.email.trim() : "";
        const password = typeof credentials.password === "string" ? credentials.password : "";
        if (!email || !password) return null;
        return verifyPublicUserCredentials(email, password);
      },
    }),
    ...(googleClientId && googleClientSecret
      ? [
          Google({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
            authorization: { params: { prompt: "select_account" } },
            profile(profile) {
              return {
                id: profile.sub,
                name: profile.name ?? null,
                email: profile.email ?? null,
                image: profile.picture ?? null,
                role: "user" as const,
              };
            },
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") return true;

      const intent = await consumeGoogleAuthIntent();
      const locale = intent?.locale === "de" ? "de" : "uz";
      const emailVerified = Boolean((profile as { email_verified?: boolean } | undefined)?.email_verified);
      const email = typeof user.email === "string" ? user.email.trim() : "";

      if (!email || !emailVerified || !account.providerAccountId) {
        return `/${locale}/id/login?oauthError=google_unverified`;
      }

      const result = await resolveGoogleAuthUser({
        providerAccountId: account.providerAccountId,
        email,
        displayName: user.name ?? null,
        preferredLocale: locale,
        allowRegistration: intent?.mode === "register",
        privacyAccepted: intent?.privacyAccepted === true,
        privacyVersion: PRIVACY_VERSION,
      });

      if (!result.ok) {
        if (intent?.mode === "register" || result.reason === "not_linked") {
          return `/${locale}/id/register?oauthError=${result.reason}`;
        }
        return `/${locale}/id/login?oauthError=${result.reason}`;
      }

      user.id = result.user.id;
      user.email = result.user.email;
      user.name = result.user.name;
      user.role = "user";
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.userId === "string" ? token.userId : "";
        session.user.role = token.role === "admin" ? "admin" : "user";
      }
      return session;
    },
  },
});
