"use client";

import {
  useActionState,
  useRef,
  useState,
  useTransition,
} from "react";
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
          privacyTitle:
            "Datenschutz und Verarbeitung Ihrer Daten",
          privacyDescription:
            "Lesen Sie vor der Kontoerstellung, wie Ihre personenbezogenen Daten erhoben, verwendet und geschützt werden.",
          privacyRead:
            "Datenschutzerklärung lesen →",
          privacyConsent:
            "Ich habe die Datenschutzerklärung gelesen und bestätige, dass ich die dort beschriebenen Hinweise zur Verarbeitung meiner Daten zur Kenntnis genommen habe.",
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
          privacyTitle:
            "Maxfiylik va ma’lumotlarni qayta ishlash",
          privacyDescription:
            "Hisob yaratishdan oldin shaxsiy ma’lumotlaringiz qanday yig‘ilishi, ishlatilishi va himoyalanishi haqida Maxfiylik siyosati bilan tanishing.",
          privacyRead:
            "Maxfiylik siyosatini o‘qish →",
          privacyConsent:
            "Maxfiylik siyosati bilan tanishdim va unda bayon qilingan shaxsiy ma’lumotlarimni qayta ishlashga oid ma’lumotlarni o‘qib chiqqanimni tasdiqlayman.",
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
        aria-labelledby="register-privacy-title"
        className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/50"
      >
        <h2
          id="register-privacy-title"
          className="text-sm font-bold text-slate-900 dark:text-white"
        >
          {copy.privacyTitle}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {copy.privacyDescription}
        </p>

        <a
          href={`/${locale}/privacy`}
          className="mt-2 inline-flex text-sm font-bold text-emerald-700 underline decoration-emerald-300 underline-offset-4 transition hover:text-emerald-600 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300 dark:decoration-emerald-700"
        >
          {copy.privacyRead}
        </a>

        <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
            <input
              name="privacyAccepted"
              type="checkbox"
              required
              defaultChecked={
                state.values.privacyAccepted
              }
              onChange={() => {
                if (googlePrivacyError) {
                  setGooglePrivacyError(null);
                }
              }}
              className="mt-[3px] h-4 w-4 shrink-0 accent-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            />
            <span>
              {copy.privacyConsent}
            </span>
          </label>
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
        <input
          id="public-register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          className={inputClassName}
        />
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
        <input
          id="public-register-password-confirm"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          className={inputClassName}
        />
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
