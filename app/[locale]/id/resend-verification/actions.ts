"use server";
import { createAuthTokenForEmail } from "@/lib/auth/public-auth-token-repository";
import { sendVerificationEmail } from "@/lib/email/auth-email";
export type ResendVerificationState = Readonly<{ message: string | null; error: string | null }>;
export async function resendVerificationAction(_p: ResendVerificationState, f: FormData): Promise<ResendVerificationState> {
  const locale = f.get("locale") === "de" ? "de" : "uz";
  const email = typeof f.get("email") === "string" ? String(f.get("email")).trim() : "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { message: null, error: locale === "de" ? "Bitte geben Sie eine gültige E-Mail-Adresse ein." : "To‘g‘ri e-mail manzilini kiriting." };
  const generic = locale === "de" ? "Falls das Konto eine Bestätigung benötigt, wurde eine neue E-Mail gesendet." : "Agar hisob tasdiqlashni talab qilsa, yangi tasdiqlash xati yuborildi.";
  try {
    const target = await createAuthTokenForEmail(email, "email_verification", 24 * 60);
    if (target) {
      try { await sendVerificationEmail(target.email, target.token, locale); }
      catch (error) { console.error("Verification resend failed", { error }); }
    }
    return { message: generic, error: null };
  } catch (error) {
    console.error("Verification resend request failed", error);
    return { message: generic, error: null };
  }
}
