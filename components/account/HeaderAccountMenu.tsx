"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { signOut } from "next-auth/react";
import { LogOut, MessageCircle, Pencil, ShoppingBag } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";

type AccountInfo = {
  displayName: string | null;
  email: string;
  avatarUrl: string | null;
};

type Props = {
  locale: "uz" | "de";
  compact?: boolean;
  onNavigate?: () => void;
};

function getInitials(name: string | null, email: string) {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length > 1) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return email.slice(0, 2).toUpperCase() || "ID";
}

export default function HeaderAccountMenu({
  locale,
  compact = false,
  onNavigate,
}: Props) {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [confirming, setConfirming] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const pathname = usePathname();
  const de = locale === "de";

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch("/api/account/me", {
          cache: "no-store",
          credentials: "same-origin",
          signal: controller.signal,
        });
        if (!response.ok) return;
        const data = (await response.json()) as AccountInfo;
        if (!controller.signal.aborted) setAccount(data);
      } catch {
        // Keep the fallback avatar when the request fails.
      }
    }

    void load();
    return () => controller.abort();
  }, [pathname]);

  useEffect(() => {
    let disposed = false;
    let inFlight = false;
    const controller = new AbortController();

    async function refreshUnread() {
      if (disposed || inFlight || document.visibilityState !== "visible") return;
      inFlight = true;
      try {
        const response = await fetch("/api/messages/unread-count", {
          cache: "no-store",
          credentials: "same-origin",
          signal: controller.signal,
        });
        if (response.status === 401) {
          if (!disposed) setUnreadCount(0);
          return;
        }
        if (!response.ok) return;
        const data: { unreadCount?: unknown } = await response.json();
        if (!disposed && typeof data.unreadCount === "number" && Number.isFinite(data.unreadCount)) {
          setUnreadCount(Math.max(0, data.unreadCount));
        }
      } catch {
        // Keep the last known count on transient network errors.
      } finally {
        inFlight = false;
      }
    }

    function onVisible() {
      if (document.visibilityState === "visible") void refreshUnread();
    }
    void refreshUnread();
    const interval = window.setInterval(() => void refreshUnread(), 5000);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    return () => {
      disposed = true;
      controller.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!confirming) return;
    cancelRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !submitting) {
        setConfirming(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [confirming, submitting]);

  const name = account?.displayName || account?.email ||
    (de ? "Mein Konto" : "Mening akkauntim");

  const avatar = (
    <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-700 text-sm font-bold text-white">
      {account?.avatarUrl ? (
        // The URL comes from the authenticated account endpoint.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={account.avatarUrl}
          alt=""
          className="size-full object-cover"
        />
      ) : (
        getInitials(account?.displayName ?? null, account?.email ?? "")
      )}
    </span>
  );

  const itemClass =
    "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-slate-200 dark:hover:bg-slate-800";

  function closeAndNavigate() {
    setOpen(false);
    onNavigate?.();
  }

  return (
    <>
      <div ref={rootRef} className="relative shrink-0">
        <button
          type="button"
          aria-label={de ? "Kontomenü öffnen" : "Akkaunt menyusini ochish"}
          aria-haspopup="true"
          aria-controls={menuId}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className={`flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
            compact ? "size-10" : "size-11"
          }`}
        >
          <span className="relative inline-flex size-10 shrink-0">
            {avatar}
            {unreadCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-950"
              />
            )}
          </span>
          {unreadCount > 0 && (
            <span className="sr-only">
              {de ? `${unreadCount} ungelesene Nachrichten` : `${unreadCount} ta o‘qilmagan xabar`}
            </span>
          )}
        </button>

        {open && (
          <div
            id={menuId}
            className="absolute right-0 top-full z-[90] mt-3 w-[min(19rem,calc(100vw-1.5rem))] rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 px-2 py-3 dark:border-slate-800">
              {avatar}
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-950 dark:text-white">
                  {name}
                </p>
                {account?.email && (
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {account.email}
                  </p>
                )}
              </div>
            </div>

            <nav
              className="mt-2 grid gap-1"
              aria-label={de ? "Kontobereiche" : "Akkaunt bo‘limlari"}
            >
              <Link href="/market/mine" onClick={closeAndNavigate} className={itemClass}>
                <ShoppingBag size={18} aria-hidden="true" />
                {de ? "Meine Anzeigen" : "Mening e’lonlarim"}
              </Link>
              <Link href="/account/messages" onClick={closeAndNavigate} className={itemClass}>
                <MessageCircle size={18} aria-hidden="true" />
                <span className="flex-1">{de ? "Nachrichten" : "Xabarlar"}</span>
                {unreadCount > 0 && (
                  <span
                    aria-label={de ? `${unreadCount} ungelesene Nachrichten` : `${unreadCount} ta o‘qilmagan xabar`}
                    className="inline-flex min-h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[11px] font-bold leading-none text-white dark:bg-emerald-500 dark:text-slate-950"
                  >
                    {unreadCount >= 100 ? "99+" : unreadCount}
                  </span>
                )}
              </Link>
              <Link href="/account/profile" onClick={closeAndNavigate} className={itemClass}>
                <Pencil size={18} aria-hidden="true" />
                {de ? "Profil bearbeiten" : "Profilni tahrirlash"}
              </Link>
            </nav>

            <div className="mt-2 border-t border-slate-100 pt-2 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setConfirming(true);
                }}
                className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-bold text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950/30"
              >
                <LogOut size={18} aria-hidden="true" />
                {de ? "Abmelden" : "Chiqish"}
              </button>
            </div>
          </div>
        )}
      </div>

      {confirming && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${menuId}-signout-title`}
            className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <h2
              id={`${menuId}-signout-title`}
              className="text-lg font-bold text-slate-950 dark:text-white"
            >
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
                disabled={submitting}
                onClick={() => setConfirming(false)}
                className="min-h-11 rounded-xl border border-slate-300 px-4 font-semibold text-slate-700 dark:border-slate-700 dark:text-white"
              >
                {de ? "Abbrechen" : "Bekor qilish"}
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={async () => {
                  setSubmitting(true);
                  try {
                    await signOut({ callbackUrl: `/${locale}` });
                  } catch {
                    setSubmitting(false);
                  }
                }}
                className="min-h-11 rounded-xl bg-rose-600 px-4 font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
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
