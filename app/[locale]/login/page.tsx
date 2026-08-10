import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "next-intl/server";

import LoginForm from "@/components/auth/LoginForm";
import {
  getCurrentAdmin,
} from "@/lib/auth/admin";
import {
  Link,
  redirect,
} from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title:
      locale === "de"
        ? "Anmelden"
        : "Kirish",
    robots: {
      index: false,
      follow: false,
    },
  };
}

const copy = {
  uz: {
    eyebrow: "VATANDOSHLAR.DE · ADMIN",
    title: "Boshqaruv paneliga kirish",
    description:
      "Bu kirish sahifasi Vatandoshlar.de boshqaruv paneli uchun mo‘ljallangan.",
    emailLabel: "E-mail",
    emailPlaceholder: "admin@vatandoshlar.de",
    passwordLabel: "Parol",
    passwordPlaceholder: "Parolingiz",
    submit: "Kirish",
    submitting: "Tekshirilmoqda…",
    security:
      "Kirish ma’lumotlaringiz himoyalangan ulanish orqali tekshiriladi.",
    back: "Bosh sahifaga qaytish",
  },

  de: {
    eyebrow: "VATANDOSHLAR.DE · ADMIN",
    title: "Im Verwaltungsbereich anmelden",
    description:
      "Diese Anmeldung ist für den Verwaltungsbereich von Vatandoshlar.de vorgesehen.",
    emailLabel: "E-Mail",
    emailPlaceholder: "admin@vatandoshlar.de",
    passwordLabel: "Passwort",
    passwordPlaceholder: "Ihr Passwort",
    submit: "Anmelden",
    submitting: "Wird geprüft…",
    security:
      "Ihre Zugangsdaten werden über eine geschützte Verbindung geprüft.",
    back: "Zur Startseite",
  },
} as const;

export default async function LoginPage() {
  const locale = await getLocale();
  const currentCopy =
    locale === "de"
      ? copy.de
      : copy.uz;

  const admin =
    await getCurrentAdmin();

  if (admin) {
    return redirect({
      href: "/admin",
      locale,
    });
  }

  return (
    <main
      className="
        relative isolate flex min-h-screen
        items-center justify-center
        overflow-hidden
        bg-slate-50 px-4 py-12
        dark:bg-slate-950
        sm:px-6
      "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-48 top-10 size-[34rem] rounded-full bg-cyan-200/25 blur-[130px] dark:bg-cyan-400/[0.025]" />
        <div className="absolute -right-48 top-1/4 size-[36rem] rounded-full bg-emerald-200/25 blur-[135px] dark:bg-emerald-400/[0.03]" />
      </div>

      <section
        aria-labelledby="login-title"
        className="
          relative w-full max-w-md
          rounded-[2rem]
          border border-slate-200/90
          bg-white/95 p-7
          shadow-[0_30px_80px_-42px_rgba(15,23,42,0.38)]
          backdrop-blur
          dark:border-white/10
          dark:bg-slate-900/95
          sm:p-9
        "
      >
        <Link
          href="/"
          aria-label="Vatandoshlar.de"
          className="inline-flex items-center gap-2"
        >
          <Image
            src="/images/brand/vatandoshlar-icon.png"
            alt=""
            aria-hidden="true"
            width={44}
            height={44}
            priority
            className="size-10 object-contain"
          />

          <span className="font-extrabold tracking-tight text-slate-950 dark:text-white">
            Vatandoshlar
            <span className="text-emerald-600 dark:text-emerald-400">
              .de
            </span>
          </span>
        </Link>

        <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
          {currentCopy.eyebrow}
        </p>

        <h1
          id="login-title"
          className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl"
        >
          {currentCopy.title}
        </h1>

        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
          {currentCopy.description}
        </p>

        <LoginForm
          copy={{
            emailLabel:
              currentCopy.emailLabel,
            emailPlaceholder:
              currentCopy.emailPlaceholder,
            passwordLabel:
              currentCopy.passwordLabel,
            passwordPlaceholder:
              currentCopy.passwordPlaceholder,
            submit:
              currentCopy.submit,
            submitting:
              currentCopy.submitting,
          }}
        />

        <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-800">
          <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
            {currentCopy.security}
          </p>

          <Link
            href="/"
            className="mt-4 inline-flex text-sm font-bold text-emerald-700 transition hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            ← {currentCopy.back}
          </Link>
        </div>
      </section>
    </main>
  );
}
