"use server";
import { createAuthTokenForEmail } from "@/lib/auth/public-auth-token-repository";
import { sendPasswordResetEmail } from "@/lib/email/auth-email";
export type ForgotPasswordState = Readonly<{ message: string | null; error: string | null }>;
export async function forgotPasswordAction(_p: ForgotPasswordState, f: FormData): Promise<ForgotPasswordState> {
  const locale = f.get("locale") === "de" ? "de" : "uz";
  const email = typeof f.get("email") === "string" ? String(f.get("email")).trim() : "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { message: null, error: locale === "de" ? "Bitte geben Sie eine gültige E-Mail-Adresse ein." : "To‘g‘ri e-mail manzilini kiriting." };
  const generic = locale === "de" ? "Falls ein Konto existiert, haben wir einen Link zum Zurücksetzen des Passworts gesendet." : "Agar bu e-mail bilan hisob mavjud bo‘lsa, parolni tiklash havolasi yuborildi.";
  try {
    const target = await createAuthTokenForEmail(email, "password_reset", 60);
    if (target) {
      try { await sendPasswordResetEmail(target.email, target.token, locale); }
      catch (error) { console.error("Password reset email failed", { error }); }
    }
    return { message: generic, error: null };
  } catch (error) {
    console.error("Password reset request failed", error);
    return { message: generic, error: null };
  }
}
