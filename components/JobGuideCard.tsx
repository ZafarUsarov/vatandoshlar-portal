import Link from "next/link";

import type { JobGuide } from "@/data/jobs";

type JobGuideCardProps = {
  guide: JobGuide;
  index?: number;
};

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

function CheckIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m6.5 12 3.2 3.2L17.5 7.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function JobGuideCard({
  guide,
  index = 0,
}: JobGuideCardProps) {
  const href = `/jobs/${guide.slug}`;

  return (
    <article
      className="
        group relative isolate flex h-full min-h-[430px]
        overflow-hidden rounded-[2rem]
        border border-slate-200/80
        bg-white/90
        p-6
        shadow-[0_18px_60px_-38px_rgba(15,23,42,0.38)]
        backdrop-blur-xl
        transition duration-500
        hover:-translate-y-1.5
        hover:border-slate-300
        hover:shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)]
        sm:p-7
        dark:border-white/[0.08]
        dark:bg-white/[0.045]
        dark:hover:border-white/[0.14]
      "
      style={{
        animationDelay: `${index * 70}ms`,
      }}
    >
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 top-0 h-40
          bg-gradient-to-b
          from-blue-500/[0.12]
          via-cyan-500/[0.05]
          to-transparent
          transition
          duration-500
          group-hover:opacity-100
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute -right-20 -top-20
          h-56 w-56 rounded-full
          border border-blue-500/[0.08]
          transition duration-700
          group-hover:scale-125
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute -bottom-20 -left-20
          h-56 w-56 rounded-full
          bg-blue-500/[0.05]
          blur-3xl
          transition duration-700
          group-hover:scale-125
        "
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div
            className="
              flex h-16 w-16 items-center justify-center
              rounded-2xl
              border border-blue-200/70
              bg-gradient-to-br
              from-blue-50
              to-cyan-50
              text-2xl
              shadow-sm
              transition
              duration-300
              group-hover:scale-110
              dark:border-blue-400/20
              dark:bg-blue-500/10
            "
          >
            {guide.icon}
          </div>

          <span
            className="
              inline-flex items-center
              rounded-full
              border border-slate-200
              bg-slate-100/80
              px-3 py-1.5
              text-xs font-semibold
              uppercase tracking-[0.12em]
              text-slate-700
              dark:border-white/[0.08]
              dark:bg-white/[0.05]
              dark:text-slate-300
            "
          >
            {guide.category}
          </span>
        </div>

        <div className="mt-7">
          <h3
            className="
              text-xl font-semibold
              leading-8
              tracking-[-0.02em]
              text-slate-950
              sm:text-2xl
              dark:text-white
            "
          >
            <Link
              href={href}
              className="
                outline-none transition
                group-hover:text-blue-700
                focus-visible:rounded-md
                focus-visible:ring-2
                focus-visible:ring-blue-500
                focus-visible:ring-offset-4
                dark:group-hover:text-blue-300
                dark:focus-visible:ring-offset-slate-950
              "
            >
              <span
                aria-hidden="true"
                className="absolute inset-0"
              />

              {guide.shortTitle}
            </Link>
          </h3>

          <p
            className="
              mt-4
              text-[15px]
              leading-7
              text-slate-600
              dark:text-slate-400
            "
          >
            {guide.description}
          </p>
        </div>

        <ul className="mt-7 space-y-3">
          {guide.highlights.slice(0, 3).map((highlight) => (
            <li
              key={highlight}
              className="
                flex items-start gap-3
                text-sm
                leading-6
                text-slate-600
                dark:text-slate-400
              "
            >
              <span
                className="
                  mt-0.5 flex h-6 w-6 shrink-0
                  items-center justify-center
                  rounded-full
                  bg-emerald-100
                  text-emerald-600
                  dark:bg-emerald-500/15
                  dark:text-emerald-400
                "
              >
                <CheckIcon className="h-3.5 w-3.5" />
              </span>

              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <div
            className="
              flex items-center justify-between gap-4
              border-t border-slate-200/80
              pt-5
              dark:border-white/[0.08]
            "
          >
            <div>
              <p
                className="
                  text-xs font-medium uppercase
                  tracking-[0.12em]
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Qo‘llanma
              </p>

              <p
                className="
                  mt-1 text-sm font-semibold
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Bosqichma-bosqich tushuntirilgan
              </p>
            </div>

            <span
              aria-hidden="true"
              className="
                flex items-center gap-2
                text-sm font-semibold
                text-blue-700
                transition duration-300
                group-hover:gap-3
                dark:text-blue-300
              "
            >
              Qo‘llanmani ochish

              <ArrowUpRightIcon
                className="
                  h-4 w-4
                  transition-transform duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}