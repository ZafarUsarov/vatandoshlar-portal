"use client";

import { useFormStatus } from "react-dom";

import {
  toggleFollowAction,
  toggleHelpfulAction,
} from "@/app/savol/[slug]/actions";

type Props = Readonly<{
  kind: "follow" | "helpful";
  locale: "uz" | "de";
  slug: string;
  targetId: string;
  count: number;
}>;

function SubmitButton({
  label,
  count,
}: Readonly<{ label: string; count: number }>) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-900"
    >
      <span>{pending ? "…" : label}</span>
      <span
        aria-label={`${count}`}
        className="rounded-full bg-slate-100 px-2 py-0.5 text-xs tabular-nums text-slate-600 dark:bg-slate-800 dark:text-slate-300"
      >
        {count}
      </span>
    </button>
  );
}

export default function SavolInteractions({
  kind,
  locale,
  slug,
  targetId,
  count,
}: Props) {
  const action = kind === "follow" ? toggleFollowAction : toggleHelpfulAction;
  const label =
    locale === "de"
      ? kind === "follow"
        ? "Folgen"
        : "Hilfreich"
      : kind === "follow"
        ? "Kuzatish"
        : "Foydali";

  return (
    <form action={action}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="targetId" value={targetId} />
      <SubmitButton label={label} count={count} />
    </form>
  );
}
