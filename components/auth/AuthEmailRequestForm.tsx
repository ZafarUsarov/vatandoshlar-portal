"use client";
import { useActionState } from "react";
import { forgotPasswordAction, type ForgotPasswordState } from "@/app/[locale]/id/forgot-password/actions";
import { resendVerificationAction, type ResendVerificationState } from "@/app/[locale]/id/resend-verification/actions";
type Props = Readonly<{ locale: "uz" | "de"; mode: "forgot" | "resend" }>;
const initial = { message: null, error: null };
export default function AuthEmailRequestForm({ locale, mode }: Props) {
  const action = mode === "forgot" ? forgotPasswordAction : resendVerificationAction;
  const [state, formAction, pending] = useActionState(action as (p: ForgotPasswordState | ResendVerificationState, f: FormData) => Promise<ForgotPasswordState | ResendVerificationState>, initial);
  const submit = mode === "forgot" ? (locale === "de" ? "Reset-Link senden" : "Tiklash havolasini yuborish") : (locale === "de" ? "Bestätigungs-E-Mail senden" : "Tasdiqlash xatini yuborish");
  return <form action={formAction} className="space-y-5">
    <input type="hidden" name="locale" value={locale} />
    <div><label htmlFor={`${mode}-email`} className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">E-mail</label><input id={`${mode}-email`} name="email" type="email" autoComplete="email" required className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></div>
    {state.error && <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">{state.error}</p>}
    {state.message && <p role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">{state.message}</p>}
    <button disabled={pending} className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:opacity-60">{pending ? "…" : submit}</button>
  </form>;
}
