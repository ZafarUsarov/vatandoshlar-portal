"use client";

import {
  useActionState,
  useRef,
  useState,
  useTransition,
} from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  googleRegisterAction,
  publicRegisterAction,
  type PublicRegisterState,
} from "@/app/[locale]/id/register/actions";

const initialPublicRegisterState: PublicRegisterState = {
  error: null,
  success: null,
  values: {
    firstName: "",
    lastName: "",
    email: "",
    privacyAccepted: false,
  },
};

type PublicRegisterFormProps = Readonly<{
  locale:
    | "uz"
    | "de";
}>;

export default function PublicRegisterForm({
  locale,
}: PublicRegisterFormProps) {
  const [
    state,
    formAction,
    pending,
  ] =
    useActionState(
      publicRegisterAction,
      initialPublicRegisterState,
    );

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const formRef =
    useRef<HTMLFormElement>(null);

  const [
    googlePending,
    startGoogleTransition,
  ] =
    useTransition();

  const [
    googlePrivacyError,
    setGooglePrivacyError,
  ] =
    useState<string | null>(null);

  const copy =
    locale === "de"
      ? {
          firstName:
            "Vorname",
          lastName:
            "Nachname",
          email:
            "E-Mail",
          password:
            "Passwort",
          passwordConfirm:
            "Passwort wiederholen",
          passwordHint:
            "Mindestens 8 Zeichen.",
          submit:
            "Konto erstellen",
          pending:
            "Konto wird erstellt…",
          google:
            "Mit Google registrieren",
          googlePending:
            "Google wird geöffnet…",
          privacyBefore: "Ich habe die ",
          privacyLink: "Datenschutzerklärung",
          privacyAfter: " gelesen und stimme ihr zu.",
          privacyRequired:
            "Bitte lesen und bestätigen Sie die Datenschutzerklärung, bevor Sie mit Google fortfahren.",
          or:
            "oder",
        }
      : {
          firstName:
            "Ism",
          lastName:
            "Familiya",
          email:
            "E-mail",
          password:
            "Parol",
          passwordConfirm:
            "Parolni takrorlang",
          passwordHint:
            "Kamida 8 ta belgi.",
          submit:
            "Hisob yaratish",
          pending:
            "Hisob yaratilmoqda…",
          google:
            "Google orqali ro‘yxatdan o‘tish",
          googlePending:
            "Google ochilmoqda…",
          privacyBefore: "",
          privacyLink: "Maxfiylik siyosati",
          privacyAfter: " bilan tanishdim va roziman.",
          privacyRequired:
            "Google orqali davom etishdan oldin Maxfiylik siyosatini o‘qib, tanishganingizni tasdiqlang.",
          or:
            "yoki",
        };

  const inputClassName =
    "min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

  function handleGoogleRegister() {
    const form =
      formRef.current;

    if (!form) {
      return;
    }

    const formData =
      new FormData(form);

    if (
      formData.get("privacyAccepted") !== "on"
    ) {
      setGooglePrivacyError(
        copy.privacyRequired,
      );
      return;
    }

    setGooglePrivacyError(null);

    startGoogleTransition(() => {
      void googleRegisterAction(
        formData,
      );
    });
  }

  const busy =
    pending ||
    googlePending;

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="space-y-5"
    >
      <input
        type="hidden"
        name="locale"
        value={locale}
      />

      <section
        aria-label={copy.privacyLink}
        className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-slate-700 dark:bg-slate-950/50"
      >
        <div className="flex min-h-11 items-center gap-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
          <input
            id="public-register-privacy-accepted"
            name="privacyAccepted"
            type="checkbox"
            required
            defaultChecked={state.values.privacyAccepted}
            onChange={() => {
              if (googlePrivacyError) {
                setGooglePrivacyError(null);
              }
            }}
            className="h-5 w-5 shrink-0 cursor-pointer accent-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          />
          <span className="min-w-0 flex-1">
            <label htmlFor="public-register-privacy-accepted" className="cursor-pointer">
              {copy.privacyBefore}
            </label>
            <a
              href={`/${locale}/privacy`}
              className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-600 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300 dark:decoration-emerald-700"
            >
              {copy.privacyLink}
            </a>
            <label htmlFor="public-register-privacy-accepted" className="cursor-pointer">
              {copy.privacyAfter}
            </label>
          </span>
        </div>
      </section>

      {googlePrivacyError && (
        <p
          role="alert"
          aria-live="polite"
          className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200"
        >
          {googlePrivacyError}
        </p>
      )}

      <button
        type="button"
        onClick={handleGoogleRegister}
        disabled={busy}
        className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
      >
        <span
          aria-hidden="true"
          className="text-base font-black"
        >
          G
        </span>
        {googlePending
          ? copy.googlePending
          : copy.google}
      </button>

      <div
        className="flex items-center gap-3"
        aria-hidden="true"
      >
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          {copy.or}
        </span>
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <div>
        <label
          htmlFor="public-register-first-name"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          {copy.firstName}
        </label>
        <input
          id="public-register-first-name"
          name="firstName"
          type="text"
          autoComplete="given-name"
          maxLength={40}
          required
          defaultValue={
            state.values.firstName
          }
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="public-register-last-name"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          {copy.lastName}
        </label>
        <input
          id="public-register-last-name"
          name="lastName"
          type="text"
          autoComplete="family-name"
          maxLength={40}
          required
          defaultValue={
            state.values.lastName
          }
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="public-register-email"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          {copy.email}
        </label>
        <input
          id="public-register-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          defaultValue={
            state.values.email
          }
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="public-register-password"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          {copy.password}
        </label>
        <div className="relative">
          <input
          id="public-register-password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          minLength={8}
          required
          className={`${inputClassName} pr-12`}
        />
        <button type="button" onClick={() => setShowPassword((current) => !current)}
          aria-label={showPassword ? (locale === "de" ? "Passwort verbergen" : "Parolni yashirish") : (locale === "de" ? "Passwort anzeigen" : "Parolni ko‘rsatish")}
          aria-pressed={showPassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-slate-400">
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {copy.passwordHint}
        </p>
      </div>

      <div>
        <label
          htmlFor="public-register-password-confirm"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          {copy.passwordConfirm}
        </label>
        <div className="relative">
          <input
          id="public-register-password-confirm"
          name="passwordConfirm"
          type={showPasswordConfirm ? "text" : "password"}
          autoComplete="new-password"
          minLength={8}
          required
          className={`${inputClassName} pr-12`}
        />
        <button type="button" onClick={() => setShowPasswordConfirm((current) => !current)}
          aria-label={showPasswordConfirm ? (locale === "de" ? "Passwort verbergen" : "Parolni yashirish") : (locale === "de" ? "Passwort anzeigen" : "Parolni ko‘rsatish")}
          aria-pressed={showPasswordConfirm}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-slate-400">
          {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        </div>
      </div>

      {state.success && (
        <div
          role="status"
          aria-live="polite"
          className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200"
        >
          <p>{state.success}</p>
          <a
            href={`/${locale}/id/login`}
            className="inline-flex font-bold underline underline-offset-4"
          >
            {locale === "de"
              ? "Zur Anmeldung"
              : "Kirish sahifasiga"}
          </a>
        </div>
      )}

      {state.error && (
        <p
          role="alert"
          aria-live="polite"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending
          ? copy.pending
          : copy.submit}
      </button>
    </form>
  );
}
