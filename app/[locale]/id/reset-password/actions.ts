"use server";
import { resetPasswordWithToken } from "@/lib/auth/public-auth-token-repository";
export type ResetPasswordState = Readonly<{ message: string | null; error: string | null }>;
export async function resetPasswordAction(_p: ResetPasswordState, f: FormData): Promise<ResetPasswordState> {
  const locale = f.get("locale") === "de" ? "de" : "uz";
  const token = typeof f.get("token") === "string" ? String(f.get("token")) : "";
  const password = typeof f.get("password") === "string" ? String(f.get("password")) : "";
  const confirm = typeof f.get("passwordConfirm") === "string" ? String(f.get("passwordConfirm")) : "";
  const err = (uz: string, de: string): ResetPasswordState => ({ message: null, error: locale === "de" ? de : uz });
  if (password.length < 8) return err("Parol kamida 8 ta belgidan iborat bo‘lishi kerak.", "Das Passwort muss mindestens 8 Zeichen lang sein.");
  if (password !== confirm) return err("Parollar bir xil emas.", "Die Passwörter stimmen nicht überein.");
  try {
    const ok = await resetPasswordWithToken(token, password);
    if (!ok) return err("Havola yaroqsiz, muddati tugagan yoki avval ishlatilgan.", "Der Link ist ungültig, abgelaufen oder wurde bereits verwendet.");
    return { error: null, message: locale === "de" ? "Passwort geändert. Sie können sich jetzt anmelden." : "Parol yangilandi. Endi tizimga kirishingiz mumkin." };
  } catch (error) {
    console.error("Password reset failed", error);
    return err("Parolni yangilab bo‘lmadi. Keyinroq qayta urinib ko‘ring.", "Das Passwort konnte nicht geändert werden. Bitte versuchen Sie es später erneut.");
  }
}
