"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LogOut } from "lucide-react";

type Props = Readonly<{ locale: "uz" | "de"; label: string }>;

export default function AccountSignOutConfirm({ locale, label }: Props) {
  const [confirming, setConfirming] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const de = locale === "de";

  useEffect(() => {
    if (!confirming) return;
    cancelRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setConfirming(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [confirming]);

  return (
    <>
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-bold text-rose-600 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-rose-300 dark:hover:bg-rose-950/30"
      >
        <LogOut size={18} />
        {label}
      </button>
      {confirming && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-signout-title"
            className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <h2 id="account-signout-title" className="text-lg font-bold text-slate-950 dark:text-white">
              {de ? "Wirklich abmelden?" : "Haqiqatan ham chiqmoqchimisiz?"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {de
                ? "Möchten Sie sich wirklich von Ihrem Konto abmelden?"
                : "Haqiqatan ham hisobingizdan chiqishni xohlaysizmi?"}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                ref={cancelRef}
                type="button"
                onClick={() => setConfirming(false)}
                className="min-h-11 rounded-xl border border-slate-300 px-4 font-semibold text-slate-700 dark:border-slate-700 dark:text-white"
              >
                {de ? "Abbrechen" : "Bekor qilish"}
              </button>
              <button
                type="submit"
                form="account-signout-form"
                className="min-h-11 rounded-xl bg-rose-600 px-4 font-semibold text-white hover:bg-rose-700"
              >
                {de ? "Ja, abmelden" : "Ha, chiqish"}
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
