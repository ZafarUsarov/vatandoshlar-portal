import Image from "next/image";

import BrandedText from "@/components/ui/BrandedText";

type SupportHeroProps = Readonly<{
  badge: string;
  title: string;
  description: string;
  secondaryDescription: string;
  action: string;
  imageSrc?: string;
  imageAlt?: string;
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
  secondaryDescription,
  action,
  imageSrc,
  imageAlt = "",
}: SupportHeroProps) {
  return (
      <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-slate-50 py-14 text-slate-950 dark:border-white/[0.08] dark:bg-slate-950 dark:text-white sm:py-18 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(16,185,129,0.12),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(20,184,166,0.08),transparent_30%)]"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`grid items-center gap-10 ${imageSrc ? "lg:grid-cols-[0.92fr_1.08fr] lg:gap-12" : ""}`}>
            <div className="max-w-2xl">
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
                  <BrandedText text={secondaryDescription} />
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

            {imageSrc && (
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-[0_28px_80px_-48px_rgba(5,150,105,0.45)] dark:bg-slate-900 lg:min-h-[430px]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1280px) 52vw, (min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>
  );
}
