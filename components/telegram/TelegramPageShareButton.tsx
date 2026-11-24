"use client";

import { useState } from "react";

type Props = Readonly<{
  title: string;
  locale: "uz" | "de";
}>;

export default function TelegramPageShareButton({ title, locale }: Props) {
  const [feedback, setFeedback] = useState("");
  const label = locale === "de" ? "Seite teilen" : "Sahifani ulashish";

  async function handleShare() {
    const url = window.location.href.split("#")[0];
    setFeedback("");

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setFeedback(locale === "de" ? "Link kopiert" : "Havola nusxalandi");
    } catch {
      setFeedback(
        locale === "de"
          ? "Link konnte nicht kopiert werden"
          : "Havolani nusxalab bo‘lmadi",
      );
    }
  }

  return (
    <div className="relative inline-flex shrink-0 md:hidden">
      <button
        type="button"
        onClick={() => void handleShare()}
        aria-label={label}
        title={label}
        className="inline-flex size-11 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 15V2.75" />
          <path d="m7.75 7 4.25-4.25L16.25 7" />
          <path d="M7 9.75H5.5A2.5 2.5 0 0 0 3 12.25v6.25A2.5 2.5 0 0 0 5.5 21h13a2.5 2.5 0 0 0 2.5-2.5v-6.25a2.5 2.5 0 0 0-2.5-2.5H17" />
        </svg>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {feedback}
      </span>
    </div>
  );
}
