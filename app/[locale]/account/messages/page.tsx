import type { Metadata } from "next";
import { MessagesSquare } from "lucide-react";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";

export const metadata: Metadata = {
  title: "Xabarlar | Nachrichten | Vatandoshlar.de",
  robots: { index: false, follow: false },
};

export default async function AccountMessagesPage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";

  await requirePublicUser(locale);

  const de = locale === "de";

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-16 dark:bg-slate-950 sm:px-6">
      <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 sm:px-10">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
          <MessagesSquare size={36} aria-hidden="true" />
        </div>

        <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          {de ? "Nachrichten" : "Xabarlar"}
        </h1>

        <p className="mt-4 text-lg font-bold text-emerald-700 dark:text-emerald-300">
          {de ? "Demnächst verfügbar!" : "Tez orada!"}
        </p>

        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {de
            ? "Dieser Dienst ist noch nicht verfügbar. Wir arbeiten daran, ihn Ihnen bald zur Verfügung zu stellen."
            : "Ushbu xizmat hali ishga tushirilmagan. Tez orada uni foydalanishingiz uchun taqdim etamiz."}
        </p>

        <p className="mt-4 text-sm font-medium leading-7 text-slate-700 dark:text-slate-200">
          {de
            ? "Vielen Dank, dass Sie unsere Plattform nutzen!"
            : "Platformamizdan foydalanayotganingiz uchun minnatdorchilik bildiramiz!"}
        </p>

        <Link
          href="/account"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-bold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        >
          {de ? "Zurück zum Konto" : "Akkauntga qaytish"}
        </Link>
      </section>
    </main>
  );
}
