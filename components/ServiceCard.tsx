import Link from "next/link";

import type { ServiceItem } from "@/data/services";

type ServiceCardProps = {
  service: ServiceItem;
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

function LocationIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="10"
        r="2.2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function VerifiedIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m9.4 3.8 2.6-1.3 2.6 1.3 2.9.4.5 2.9 1.3 2.6L18 12.3l-.5 2.9-2.9.4-2.6 1.3-2.6-1.3-2.9-.4-.5-2.9-1.3-2.6L6 7.1l.5-2.9 2.9-.4Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />

      <path
        d="m9.2 9.8 1.8 1.8 3.9-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function ServiceCard({
  service,
  index = 0,
}: ServiceCardProps) {
  const serviceHref = `/services/${service.slug}`;

  return (
    <article
      className="
        group relative isolate flex h-full min-h-[370px]
        overflow-hidden rounded-[2rem]
        border border-slate-200/80 bg-white/90 p-6
        shadow-[0_18px_60px_-38px_rgba(15,23,42,0.38)]
        backdrop-blur-xl
        transition duration-500
        hover:-translate-y-1.5
        hover:border-slate-300
        hover:shadow-[0_30px_80px_-40px_rgba(15,23,42,0.48)]
        sm:p-7
        dark:border-white/[0.08]
        dark:bg-white/[0.045]
        dark:shadow-[0_18px_60px_-38px_rgba(0,0,0,0.85)]
        dark:hover:border-white/[0.15]
      "
      style={{
        animationDelay: `${index * 70}ms`,
      }}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 h-44
          bg-gradient-to-b
          from-blue-500/[0.13]
          via-cyan-500/[0.06]
          to-transparent
          opacity-80
          transition duration-500
          group-hover:opacity-100
          dark:from-blue-400/[0.14]
          dark:via-cyan-400/[0.05]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-20 -top-20
          size-52 rounded-full
          border border-blue-500/[0.08]
          transition duration-700
          group-hover:scale-125
          dark:border-blue-300/[0.08]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -bottom-28 -left-24
          size-56 rounded-full
          bg-blue-500/[0.05] blur-3xl
          transition duration-700
          group-hover:scale-125
          dark:bg-blue-400/[0.06]
        "
      />

      <div className="relative z-10 flex w-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div
            className="
              flex size-14 shrink-0 items-center justify-center
              rounded-2xl
              bg-blue-500/10
              text-2xl font-bold text-blue-700
              ring-1 ring-blue-500/20
              transition duration-500
              group-hover:scale-105
              group-hover:-rotate-2
              dark:bg-blue-400/10
              dark:text-blue-300
              dark:ring-blue-400/20
            "
          >
            <span aria-hidden="true">{service.icon}</span>
          </div>

          <span
            className="
              inline-flex max-w-[60%] items-center gap-1.5
              rounded-full
              border border-slate-200
              bg-white/80
              px-3 py-1.5
              text-xs font-semibold
              text-slate-600
              shadow-sm
              backdrop-blur
              dark:border-white/10
              dark:bg-white/[0.06]
              dark:text-slate-300
            "
          >
            <VerifiedIcon className="size-3.5 shrink-0" />

            <span className="truncate">{service.category}</span>
          </span>
        </div>

        <div className="mt-8">
          <h3
            className="
              text-xl font-semibold
              leading-8 tracking-[-0.025em]
              text-slate-950
              sm:text-2xl
              dark:text-white
            "
          >
            <Link
              className="
                outline-none transition
                group-hover:text-blue-700
                focus-visible:rounded-md
                focus-visible:ring-2
                focus-visible:ring-blue-500
                focus-visible:ring-offset-4
                dark:group-hover:text-blue-300
                dark:focus-visible:ring-blue-400
                dark:focus-visible:ring-offset-slate-950
              "
              href={serviceHref}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 z-10"
              />

              {service.shortTitle}
            </Link>
          </h3>

          <p
            className="
              mt-4 line-clamp-4
              text-[15px] leading-7
              text-slate-600
              dark:text-slate-400
            "
          >
            {service.description}
          </p>
        </div>

        <div className="mt-auto pt-8">
          <div
            className="
              flex items-center justify-between gap-4
              border-t border-slate-200/80
              pt-5
              dark:border-white/[0.08]
            "
          >
            <div
              className="
                flex min-w-0 items-center gap-2
                text-sm text-slate-500
                dark:text-slate-400
              "
            >
              <span
                className="
                  flex size-8 shrink-0 items-center justify-center
                  rounded-full
                  bg-slate-100
                  text-slate-500
                  dark:bg-white/[0.06]
                  dark:text-slate-400
                "
              >
                <LocationIcon className="size-4" />
              </span>

              <span className="truncate">
                {service.location}
              </span>
            </div>

            <span
              aria-hidden="true"
              className="
                flex shrink-0 items-center gap-2
                text-sm font-semibold
                text-blue-700
                transition duration-300
                group-hover:gap-3
                dark:text-blue-300
              "
            >
              Batafsil

              <ArrowUpRightIcon
                className="
                  size-4
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