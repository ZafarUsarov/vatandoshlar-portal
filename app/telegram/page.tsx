import Link from "next/link";

import Header from "../../components/Header";
import TelegramSection from "../../components/TelegramSection";

export default function TelegramPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-24 lg:pt-28 text-slate-950 dark:bg-slate-950 dark:text-white">
        <section className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <span
                aria-hidden="true"
                className="mr-2 transition-transform duration-300 group-hover:-translate-x-1"
              >
                ←
              </span>

              Bosh sahifaga qaytish
            </Link>

            <div className="mt-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                Hududiy hamjamiyatlar
              </p>

              <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                Telegram guruhlari
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                O'zingiz yashayotgan Bundesland bo'yicha Telegram
                hamjamiyatini toping, vatandoshlar bilan bog'laning,
                tajriba almashing va foydali ma'lumotlarni birinchi
                bo'lib oling.
              </p>
            </div>
          </div>
        </section>

        <TelegramSection />

        <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8 dark:text-slate-400">
            <p>© 2026 Vatandoshlar.de</p>

            <p>
              Germaniyadagi o'zbekistonliklar uchun raqamli platforma
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}