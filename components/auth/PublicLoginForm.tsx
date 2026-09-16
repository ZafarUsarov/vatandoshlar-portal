"use client";

import {

  useActionState,

} from "react";

import {

  googleLoginAction,

  publicLoginAction,

  type PublicLoginState,

} from "@/app/[locale]/id/login/actions";

const initialPublicLoginState: PublicLoginState = {

  error: null,

  errorField: null,

};

type PublicLoginFormProps = Readonly<{

  locale:

    | "uz"

    | "de";

}>;

export default function PublicLoginForm({

  locale,

}: PublicLoginFormProps) {

  const [

    state,

    formAction,

    pending,

  ] =

    useActionState(

      publicLoginAction,

      initialPublicLoginState,

    );

  const copy =

    locale === "de"

      ? {

          email:

            "E-Mail",

          password:

            "Passwort",

          submit:

            "Anmelden",

          pending:

            "Anmeldung läuft…",
          google: "Mit Google anmelden",
          or: "oder",

        }

      : {

          email:

            "E-mail",

          password:

            "Parol",

          submit:

            "Kirish",

          pending:

            "Kirilmoqda…",
          google: "Google orqali kirish",
          or: "yoki",

        };

  const emailInvalid =

    state.errorField === "email" ||

    state.errorField === "credentials";

  const passwordInvalid =

    state.errorField === "password" ||

    state.errorField === "credentials";

  return (

    <form

      action={formAction}

      className="space-y-5"

      noValidate

    >

      <input

        type="hidden"

        name="locale"

        value={locale}

      />

      <button
        type="submit"
        formAction={googleLoginAction}
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
      >
        <span aria-hidden="true" className="text-base font-black">G</span>
        {copy.google}
      </button>

      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{copy.or}</span>
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <div>

        <label

          htmlFor="public-login-email"

          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"

        >

          {copy.email}

        </label>

        <input

          id="public-login-email"

          name="email"

          type="email"

          autoComplete="email"

          inputMode="email"

          aria-invalid={

            emailInvalid

              ? true

              : undefined

          }

          aria-describedby={

            state.error

              ? "public-login-error"

              : undefined

          }

          className={[

            "min-h-12 w-full rounded-2xl border bg-white px-4 text-slate-950 outline-none transition focus:ring-4 dark:bg-slate-900 dark:text-white",

            emailInvalid

              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/60"

              : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/10 dark:border-slate-700",

          ].join(" ")}

        />

      </div>

      <div>

        <label

          htmlFor="public-login-password"

          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"

        >

          {copy.password}

        </label>

        <input

          id="public-login-password"

          name="password"

          type="password"

          autoComplete="current-password"

          aria-invalid={

            passwordInvalid

              ? true

              : undefined

          }

          aria-describedby={

            state.error

              ? "public-login-error"

              : undefined

          }

          className={[

            "min-h-12 w-full rounded-2xl border bg-white px-4 text-slate-950 outline-none transition focus:ring-4 dark:bg-slate-900 dark:text-white",

            passwordInvalid

              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/60"

              : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/10 dark:border-slate-700",

          ].join(" ")}

        />

      </div>

      {state.error && (

        <p

          id="public-login-error"

          role="alert"

          aria-live="polite"

          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"

        >

          {state.error}

        </p>

      )}

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <a href={`/${locale}/id/forgot-password`} className="font-semibold text-emerald-700 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300">
          {locale === "de" ? "Passwort vergessen?" : "Parolni unutdingizmi?"}
        </a>
        <a href={`/${locale}/id/resend-verification`} className="text-slate-500 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-slate-400 dark:hover:text-white">
          {locale === "de" ? "Bestätigung erneut senden" : "Tasdiqlash xatini qayta yuborish"}
        </a>
      </div>

      <button

        type="submit"

        disabled={pending}

        className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"

      >

        {pending

          ? copy.pending

          : copy.submit}

      </button>

    </form>

  );

}
