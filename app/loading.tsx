import Image from "next/image";

export default function Loading() {
  return (
    <main
      aria-label="Sahifa yuklanmoqda"
      aria-busy="true"
      className="flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 text-slate-950 dark:bg-slate-950 dark:text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/15" />

        <div className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-teal-500/10 blur-3xl dark:bg-teal-500/15" />

        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:56px_56px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)]" />
      </div>

      <div className="relative flex w-full max-w-md flex-col items-center text-center">
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-emerald-500/15 blur-2xl dark:bg-emerald-500/20" />

          <div className="relative flex h-20 w-20 items-center justify-center">
            <Image
              src="/images/brand/vatandoshlar-icon.png"
              alt=""
              width={80}
              height={80}
              priority
              className="h-20 w-20 object-contain"
            />
          </div>

          <span className="absolute -right-1 -top-1 flex h-5 w-5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

            <span className="relative inline-flex h-5 w-5 rounded-full border-4 border-white bg-emerald-500 dark:border-slate-950" />
          </span>
        </div>

        <div className="mt-7">
          <p className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Vatandoshlar
            <span className="text-emerald-600 dark:text-emerald-400">
              .de
            </span>
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Kerakli ma’lumotlar tayyorlanmoqda
          </p>
        </div>

        <div className="mt-8 w-full max-w-xs">
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="loading-progress h-full w-1/3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="loading-dot h-2 w-2 rounded-full bg-emerald-500" />
            <span className="loading-dot h-2 w-2 rounded-full bg-emerald-500 [animation-delay:150ms]" />
            <span className="loading-dot h-2 w-2 rounded-full bg-emerald-500 [animation-delay:300ms]" />
          </div>
        </div>

        <p className="sr-only">Sahifa yuklanmoqda, iltimos kuting.</p>
      </div>
    </main>
  );
}