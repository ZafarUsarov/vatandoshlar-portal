import Image from "next/image";

import BrandedText from "@/components/ui/BrandedText";

type SupportHeroProps = Readonly<{
  badge: string;
  title: string;
  description: string;
  secondaryDescription: string;
  purposeTitle: string;
  purposeDescription: string;
  purposeClarification: string;
  statement: string;
  action: string;
  imageSrc?: string;
}>;

type IconProps = Readonly<{
  className?: string;
}>;

function HeartIcon({
  className = "size-4",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M20.8 5.8a5 5 0 0 0-7.1 0L12 7.5l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-8.1a5 5 0 0 0 0-7.1Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownIcon({
  className = "size-4",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 5v14M6.5 13.5 12 19l5.5-5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SupportVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-gradient-to-br from-white via-emerald-50 to-teal-50 shadow-[0_28px_80px_-45px_rgba(5,150,105,0.45)] dark:border-emerald-400/15 dark:from-slate-900 dark:via-emerald-950/30 dark:to-slate-900"
    >
      <div className="absolute -right-12 -top-12 size-52 rounded-full bg-teal-300/20 blur-3xl dark:bg-teal-400/10" />
      <div className="absolute -bottom-20 -left-12 size-64 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-400/10" />

      <svg
        className="absolute inset-0 h-full w-full text-emerald-700/75 dark:text-emerald-300/70"
        fill="none"
        viewBox="0 0 640 480"
      >
        <circle
          cx="320"
          cy="132"
          fill="currentColor"
          opacity=".08"
          r="72"
        />
        <path
          d="M206 228c0-43 31-72 70-72 25 0 45 12 58 32 13-20 33-32 58-32 39 0 70 29 70 72 0 64-66 111-128 151-62-40-128-87-128-151Z"
          fill="currentColor"
          opacity=".09"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <path
          d="M132 332c63-44 115-60 157-47 21 7 37 22 57 25 40 7 76-25 118-34 25-6 50-2 76 11"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="7"
        />
        <path
          d="M166 358c58-24 105-31 142-19 22 7 40 21 62 22 36 2 66-27 104-33"
          opacity=".5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="4"
        />
      </svg>

      <div className="absolute inset-x-8 bottom-8 rounded-3xl border border-white/80 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/55">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/20">
            <HeartIcon className="size-5" />
          </span>
          <span className="h-2.5 w-28 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="mt-4 h-2 w-full rounded-full bg-emerald-100 dark:bg-emerald-400/10" />
        <div className="mt-2 h-2 w-4/5 rounded-full bg-slate-100 dark:bg-slate-800" />
      </div>
    </div>
  );
}

export default function SupportHero({
  badge,
  title,
  description,
  secondaryDescription,
  purposeTitle,
  purposeDescription,
  purposeClarification,
  statement,
  action,
  imageSrc,
}: SupportHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200 bg-slate-50 py-16 text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-white sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(20,184,166,0.10),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.05),transparent_34%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
              <HeartIcon />
              {badge}
            </span>

            <h1 className="mt-7 text-balance text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              <BrandedText text={title} />
            </h1>

            <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
              <p>
                <BrandedText text={description} />
              </p>
              <p>
                <BrandedText
                  text={secondaryDescription}
                />
              </p>
            </div>

            <a
              href="#support-options"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none dark:focus-visible:ring-offset-slate-950"
            >
              {action}
              <ArrowDownIcon />
            </a>
          </div>

          <div className="mx-auto w-full max-w-xl lg:mx-0">
            {imageSrc ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-slate-100 shadow-[0_28px_80px_-45px_rgba(5,150,105,0.45)] dark:border-emerald-400/15 dark:bg-slate-900">
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, (min-width: 640px) 80vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent"
                />
              </div>
            ) : (
              <SupportVisual />
            )}
          </div>
        </div>

        <div className="mt-14 rounded-[2rem] border border-emerald-200/80 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-8 lg:mt-16 lg:p-10 dark:border-emerald-400/15 dark:bg-slate-900/75">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                {badge}
              </p>
              <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
                <BrandedText text={purposeTitle} />
              </h2>
            </div>

            <div className="space-y-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 dark:text-slate-300">
              <p>
                <BrandedText
                  text={purposeDescription}
                />
              </p>
              <p>
                <BrandedText
                  text={purposeClarification}
                />
              </p>

              <blockquote className="border-l-2 border-emerald-500 pl-5 font-semibold text-slate-800 dark:text-slate-100">
                <BrandedText text={statement} />
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
