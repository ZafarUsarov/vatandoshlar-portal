"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  reportContentAction,
  type ReportContentState,
} from "@/app/savol/[slug]/actions";

const initialState: ReportContentState = {
  status: "idle",
  message: null,
};

type Props = Readonly<{
  locale: "uz" | "de";
  slug: string;
  targetType: "question" | "answer";
  targetId: string;
}>;

function FlagIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 3 2 3H5" />
    </svg>
  );
}

function ChevronIcon({
  className = "",
}: Readonly<{
  className?: string;
}>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 shrink-0 ${className}`}
    >
      <path d="m6 8 4 4 4-4" />
    </svg>
  );
}

function SubmitButton({
  locale,
}: Readonly<{
  locale: "uz" | "de";
}>) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-10 items-center justify-center rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white transition hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-rose-600 dark:hover:bg-rose-500 dark:focus-visible:ring-offset-slate-900"
    >
      {pending
        ? "…"
        : locale === "de"
          ? "Meldung senden"
          : "Shikoyatni yuborish"}
    </button>
  );
}

export default function ReportContentForm({
  locale,
  slug,
  targetType,
  targetId,
}: Props) {
  const [state, action] = useActionState(
    reportContentAction,
    initialState,
  );

  const t =
    locale === "de"
      ? {
          trigger: "Inhalt melden",
          reason: "Grund",
          spam: "Spam",
          abuse: "Beleidigung / Missbrauch",
          misinformation: "Falsche Information",
          other: "Sonstiges",
          details: "Zusätzliche Angaben",
          optional: "Optional",
        }
      : {
          trigger: "Kontent haqida shikoyat",
          reason: "Sabab",
          spam: "Spam",
          abuse: "Haqorat / suiiste’mol",
          misinformation: "Noto‘g‘ri ma’lumot",
          other: "Boshqa",
          details: "Qo‘shimcha izoh",
          optional: "Ixtiyoriy",
        };

  if (
    state.status === "success" ||
    state.status === "duplicate"
  ) {
    return (
      <p
        role="status"
        className="inline-flex min-h-10 items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
      >
        {state.message}
      </p>
    );
  }

  const reasonId =
    `report-reason-${targetType}-${targetId}`;

  const detailsId =
    `report-details-${targetType}-${targetId}`;

  return (
    <details className="group">
      <summary className="inline-flex min-h-10 cursor-pointer list-none items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 text-sm font-semibold text-slate-700 transition marker:hidden hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 group-open:border-rose-300 group-open:bg-rose-50 group-open:text-rose-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-rose-500/50 dark:hover:bg-rose-500/10 dark:hover:text-rose-300 dark:group-open:border-rose-500/50 dark:group-open:bg-rose-500/10 dark:group-open:text-rose-300 dark:focus-visible:ring-offset-slate-900">
        <FlagIcon />

        <span>
          {t.trigger}
        </span>

        <ChevronIcon className="ml-0.5 transition-transform duration-200 group-open:rotate-180" />
      </summary>

      <form
        action={action}
        className="mt-3 w-[min(28rem,calc(100vw-3rem))] space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-6"
      >
        <input
          type="hidden"
          name="locale"
          value={locale}
        />

        <input
          type="hidden"
          name="slug"
          value={slug}
        />

        <input
          type="hidden"
          name="targetType"
          value={targetType}
        />

        <input
          type="hidden"
          name="targetId"
          value={targetId}
        />

        <div>
          <label
            htmlFor={reasonId}
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {t.reason}
          </label>

          <div className="relative">
            <select
              id={reasonId}
              name="reason"
              required
              defaultValue="spam"
              className="min-h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white py-2 pl-3.5 pr-11 text-sm text-slate-900 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-rose-500"
            >
              <option value="spam">
                {t.spam}
              </option>

              <option value="abuse">
                {t.abuse}
              </option>

              <option value="misinformation">
                {t.misinformation}
              </option>

              <option value="other">
                {t.other}
              </option>
            </select>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-slate-400 dark:text-slate-500"
            >
              <ChevronIcon />
            </span>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label
              htmlFor={detailsId}
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {t.details}
            </label>

            <span className="shrink-0 text-xs font-medium text-slate-400 dark:text-slate-500">
              {t.optional}
            </span>
          </div>

          <textarea
            id={detailsId}
            name="details"
            maxLength={1000}
            rows={4}
            className="w-full resize-y rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-rose-500"
          />
        </div>

        {state.status === "error" ? (
          <p
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm font-medium leading-6 text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
          >
            {state.message}
          </p>
        ) : null}

        <div className="flex justify-end">
          <SubmitButton locale={locale} />
        </div>
      </form>
    </details>
  );
}