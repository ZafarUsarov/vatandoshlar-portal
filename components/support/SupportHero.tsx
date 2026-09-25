import Image from "next/image";

import BrandedText from "@/components/ui/BrandedText";

type SupportHeroProps = Readonly<{
  badge: string;
  title: string;
  description: string;
  action: string;
  imageSrc: string;
  imageAlt: string;
}>;

function HeartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
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

function ArrowDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
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

export default function SupportHero({
  badge,
  title,
  description,
  action,
  imageSrc,
  imageAlt,
}: SupportHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-slate-50 text-slate-950 dark:border-white/[0.08] dark:bg-slate-950 dark:text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(16,185,129,0.12),transparent_32%),radial-gradient(circle_at_48%_18%,rgba(20,184,166,0.06),transparent_30%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-10 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.82fr_1fr] lg:gap-10">
          <div className="flex max-w-2xl flex-col justify-center py-2 lg:py-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
              <HeartIcon />
              {badge}
            </span>

            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl lg:text-[3.35rem] lg:leading-[1.05] xl:text-6xl">
              <BrandedText text={title} />
            </h1>

            <div className="mt-6 max-w-xl space-y-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-slate-300">
              <p>
                <BrandedText text={description} />
              </p>
            </div>

            <a
              href="#support-options"
              className="mt-7 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none dark:focus-visible:ring-offset-slate-950"
            >
              {action}
              <ArrowDownIcon />
            </a>
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-[1.75rem] bg-slate-200 shadow-[0_28px_80px_-48px_rgba(5,150,105,0.45)] sm:min-h-[380px] dark:bg-slate-900 lg:min-h-[500px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1280px) 55vw, (min-width: 1024px) 54vw, 100vw"
              className="object-cover object-[center_45%] sm:object-[center_42%] lg:object-[center_45%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
