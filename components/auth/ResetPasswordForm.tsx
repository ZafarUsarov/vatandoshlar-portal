"use client";
import { useActionState } from "react";
import { resetPasswordAction, type ResetPasswordState } from "@/app/[locale]/id/reset-password/actions";
const initial: ResetPasswordState = { message: null, error: null };
export default function ResetPasswordForm({ locale, token }: Readonly<{ locale: "uz" | "de"; token: string }>) {
  const [state, action, pending] = useActionState(resetPasswordAction, initial);
  return <form action={action} className="space-y-5"><input type="hidden" name="locale" value={locale}/><input type="hidden" name="token" value={token}/>
    <input name="password" type="password" minLength={8} autoComplete="new-password" required placeholder={locale === "de" ? "Neues Passwort" : "Yangi parol"} className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 dark:border-slate-700 dark:bg-slate-900"/>
    <input name="passwordConfirm" type="password" minLength={8} autoComplete="new-password" required placeholder={locale === "de" ? "Passwort wiederholen" : "Parolni takrorlang"} className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 dark:border-slate-700 dark:bg-slate-900"/>
    {state.error && <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">{state.error}</p>}
    {state.message && <p role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">{state.message}</p>}
    <button disabled={pending} className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white disabled:opacity-60">{locale === "de" ? "Passwort speichern" : "Parolni saqlash"}</button>
  </form>;
}
