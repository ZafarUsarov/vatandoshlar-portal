import Image from "next/image";
import Link from "next/link";

export default function RootNotFound() {
  return (
    <main className="flex min-h-screen items-center bg-white px-6 py-16 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto w-full max-w-3xl text-center">
        <Image
          src="/images/brand/vatandoshlar-icon.png"
          alt=""
          width={72}
          height={72}
          priority
          className="mx-auto h-[72px] w-[72px]"
        />

        <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
          404
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
          Sahifa topilmadi · Seite nicht gefunden
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
          Kerakli tilni tanlab bosh sahifaga qayting. Wählen Sie Ihre Sprache und kehren Sie zur Startseite zurück.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/uz"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-bold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-950 sm:w-auto"
          >
            O‘zbekcha
          </Link>

          <Link
            href="/de"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950 sm:w-auto"
          >
            Deutsch
          </Link>
        </div>
      </div>
    </main>
  );
}
