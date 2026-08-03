import { Link } from "../../i18n/navigation";

export default function HomeFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Link
              href="/"
              aria-label="Vatandoshlar.de bosh sahifasi"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 font-black text-white">
                V
              </span>

              <span className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                Vatandoshlar
                <span className="text-emerald-600 dark:text-emerald-400">
                  .de
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-md leading-7 text-slate-500 dark:text-slate-400">
              Germaniyadagi o‘zbekistonliklar uchun rasmiy ma’lumot,
              tekshirilgan xizmatlar va hamjamiyat platformasi.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 dark:text-white">
              Bo‘limlar
            </h2>

            <nav
              aria-label="Footer bo‘limlari"
              className="mt-5 flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400"
            >
              <Link
                href="/news"
                className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Yangiliklar
              </Link>

              <Link
                href="/services"
                className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Xizmatlar
              </Link>

              <Link
                href="/jobs"
                className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Ish
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 dark:text-white">
              Hamjamiyat
            </h2>

            <nav
              aria-label="Footer hamjamiyat havolalari"
              className="mt-5 flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400"
            >
              <Link
                href="/telegram"
                className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Telegram guruhlari
              </Link>

              <Link
                href="/events"
                className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Tadbirlar
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:text-slate-400">
          <p>© 2026 Vatandoshlar.de</p>

          <p>
            Germaniyadagi o‘zbekistonliklar uchun raqamli platforma
          </p>
        </div>
      </div>
    </footer>
  );
}