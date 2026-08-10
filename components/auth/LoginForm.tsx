"use client";

import { useActionState } from "react";

import {
  loginAction,
  type LoginActionState,
} from "@/app/[locale]/login/actions";

const initialError: LoginActionState = {
  error: null,
};

type LoginFormCopy = {
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  submit: string;
  submitting: string;
};

type LoginFormProps = {
  copy: LoginFormCopy;
};

function SubmitButton({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel: string;
}) {
  return (
    <button
      type="submit"
      className="
        mt-2 flex h-12 w-full
        items-center justify-center
        rounded-2xl
        bg-gradient-to-r
        from-emerald-600 to-teal-600
        px-5 text-sm font-bold text-white
        shadow-lg shadow-emerald-600/20
        transition
        hover:-translate-y-0.5
        hover:shadow-xl
        hover:shadow-emerald-600/25
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-emerald-500
        focus-visible:ring-offset-2
        active:translate-y-0
        disabled:cursor-not-allowed
        disabled:opacity-60
        dark:focus-visible:ring-offset-slate-950
      "
    >
      <span className="group-data-[pending=true]:hidden">
        {label}
      </span>

      <span className="hidden group-data-[pending=true]:inline">
        {pendingLabel}
      </span>
    </button>
  );
}

export default function LoginForm({
  copy,
}: LoginFormProps) {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialError,
  );

  return (
    <form
      action={formAction}
      className="group mt-8 space-y-5"
      data-pending={pending}
    >
      <div>
        <label
          htmlFor="email"
          className="text-sm font-bold text-slate-800 dark:text-slate-100"
        >
          {copy.emailLabel}
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          inputMode="email"
          required
          disabled={pending}
          placeholder={copy.emailPlaceholder}
          className="
            mt-2 h-12 w-full rounded-2xl
            border border-slate-200
            bg-white px-4
            text-base text-slate-950
            outline-none transition
            placeholder:text-slate-400
            focus:border-emerald-400
            focus:ring-4
            focus:ring-emerald-500/10
            disabled:cursor-not-allowed
            disabled:opacity-60
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-white
            dark:placeholder:text-slate-500
          "
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-sm font-bold text-slate-800 dark:text-slate-100"
        >
          {copy.passwordLabel}
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
          placeholder={copy.passwordPlaceholder}
          className="
            mt-2 h-12 w-full rounded-2xl
            border border-slate-200
            bg-white px-4
            text-base text-slate-950
            outline-none transition
            placeholder:text-slate-400
            focus:border-emerald-400
            focus:ring-4
            focus:ring-emerald-500/10
            disabled:cursor-not-allowed
            disabled:opacity-60
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-white
            dark:placeholder:text-slate-500
          "
        />
      </div>

      {state.error && (
        <div
          role="alert"
          className="
            rounded-2xl border
            border-red-200 bg-red-50
            px-4 py-3
            text-sm font-medium text-red-700
            dark:border-red-500/20
            dark:bg-red-500/10
            dark:text-red-300
          "
        >
          {state.error}
        </div>
      )}

      <SubmitButton
        label={copy.submit}
        pendingLabel={copy.submitting}
      />
    </form>
  );
}
