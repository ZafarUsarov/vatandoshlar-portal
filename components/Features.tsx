import Link from "next/link";

import FeatureCard from "@/components/features/FeatureCard";
import { features } from "@/data/features";

interface IconProps {
  className?: string;
}

function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SparklesIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 3c.5 4.2 2.8 6.5 7 7-4.2.5-6.5 2.8-7 7-.5-4.2-2.8-6.5-7-7 4.2-.5 6.5-2.8 7-7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />

      <path
        d="M19 16.5c.2 1.7 1.3 2.8 3 3-1.7.2-2.8 1.3-3 3-.2-1.7-1.3-2.8-3-3 1.7-.2 2.8-1.3 3-3ZM5 2c.2 1.4 1.1 2.3 2.5 2.5C6.1 4.7 5.2 5.6 5 7 4.8 5.6 3.9 4.7 2.5 4.5 3.9 4.3 4.8 3.4 5 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="
        relative isolate overflow-hidden
        bg-slate-50
        py-24 sm:py-28 lg:py-32
        dark:bg-slate-950
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.10),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(139,92,246,0.10),transparent_25%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.08),transparent_30%)]
          dark:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(167,139,250,0.10),transparent_25%),radial-gradient(circle_at_50%_100%,rgba(52,211,153,0.08),transparent_30%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 h-px
          bg-gradient-to-r
          from-transparent
          via-slate-300
          to-transparent
          dark:via-white/10
        "
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <div
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-slate-200
                bg-white/80
                px-3 py-1.5
                text-xs font-semibold
                uppercase tracking-[0.16em]
                text-slate-700
                shadow-sm
                backdrop-blur
                dark:border-white/10
                dark:bg-white/[0.05]
                dark:text-slate-300
              "
            >
              <SparklesIcon className="size-4" />
              Platforma imkoniyatlari
            </div>

            <h2
              id="features-heading"
              className="
                mt-6
                max-w-2xl
                text-3xl font-semibold
                tracking-[-0.04em]
                text-slate-950
                sm:text-4xl
                lg:text-5xl
                dark:text-white
              "
            >
              Germaniyadagi hayotingiz uchun kerakli imkoniyatlar bir joyda
            </h2>

            <p
              className="
                mt-5
                max-w-2xl
                text-base leading-8
                text-slate-600
                sm:text-lg
                dark:text-slate-400
              "
            >
              Ish topishdan tortib, ishonchli xizmatlar, tadbirlar va mahalliy
              hamjamiyatlargacha — Vatandoshlar.de sizga kerakli ma&apos;lumotni
              tez va qulay topishga yordam beradi.
            </p>
          </div>

          <Link
            href="/services"
            className="
              group hidden
              items-center gap-2
              rounded-full
              border border-slate-200
              bg-white
              px-5 py-3
              text-sm font-semibold
              text-slate-900
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:border-slate-300
              hover:shadow-md
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-slate-400
              focus-visible:ring-offset-4
              lg:inline-flex
              dark:border-white/10
              dark:bg-white/[0.05]
              dark:text-white
              dark:hover:border-white/20
              dark:focus-visible:ring-slate-500
              dark:focus-visible:ring-offset-slate-950
            "
          >
            Barcha bo‘limlarni ko‘rish

            <ArrowUpRightIcon
              className="
                size-4
                transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center lg:hidden">
          <Link
            href="/services"
            className="
              group inline-flex
              items-center gap-2
              rounded-full
              border border-slate-200
              bg-white
              px-5 py-3
              text-sm font-semibold
              text-slate-900
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:border-slate-300
              hover:shadow-md
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-slate-400
              focus-visible:ring-offset-4
              dark:border-white/10
              dark:bg-white/[0.05]
              dark:text-white
              dark:hover:border-white/20
              dark:focus-visible:ring-slate-500
              dark:focus-visible:ring-offset-slate-950
            "
          >
            Barcha bo‘limlarni ko‘rish

            <ArrowUpRightIcon
              className="
                size-4
                transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}