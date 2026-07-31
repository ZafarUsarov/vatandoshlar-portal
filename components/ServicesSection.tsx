import Link from "next/link";

import ServiceCard from "@/components/cards/ServiceCard";
import { services } from "@/data/services";

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

function ShieldCheckIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 3.5 19 6v5.2c0 4.4-2.8 7.8-7 9.3-4.2-1.5-7-4.9-7-9.3V6l7-2.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />

      <path
        d="m8.8 11.8 2.1 2.1 4.4-4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function ServicesSection() {
  const homepageServices = services.slice(0, 6);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="
        relative isolate overflow-hidden
        bg-white
        py-24 sm:py-28 lg:py-32
        dark:bg-slate-950
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.10),transparent_28%),radial-gradient(circle_at_85%_25%,rgba(6,182,212,0.08),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.06),transparent_30%)]
          dark:bg-[radial-gradient(circle_at_15%_15%,rgba(96,165,250,0.10),transparent_28%),radial-gradient(circle_at_85%_25%,rgba(34,211,238,0.08),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(56,189,248,0.06),transparent_30%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 h-px
          bg-gradient-to-r
          from-transparent
          via-slate-200
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
                border border-blue-200/80
                bg-blue-50/80
                px-3 py-1.5
                text-xs font-semibold
                uppercase tracking-[0.16em]
                text-blue-700
                shadow-sm
                backdrop-blur
                dark:border-blue-400/20
                dark:bg-blue-400/10
                dark:text-blue-300
              "
            >
              <ShieldCheckIcon className="size-4" />
              Ishonchli xizmatlar
            </div>

            <h2
              id="services-heading"
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
              Kerakli mutaxassisni ishonchli va qulay toping
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
              Tarjimon, huquqshunos, soliq maslahatchisi, shifokor yoki
              hunarmandni toping. Har bir xizmat sahifasida tekshirish usullari,
              rasmiy manbalar va foydali tavsiyalar jamlangan.
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
              focus-visible:ring-blue-500
              focus-visible:ring-offset-4
              lg:inline-flex
              dark:border-white/10
              dark:bg-white/[0.05]
              dark:text-white
              dark:hover:border-white/20
              dark:focus-visible:ring-blue-400
              dark:focus-visible:ring-offset-slate-950
            "
          >
            Barcha xizmatlar

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

        <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {homepageServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
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
              focus-visible:ring-blue-500
              focus-visible:ring-offset-4
              dark:border-white/10
              dark:bg-white/[0.05]
              dark:text-white
              dark:hover:border-white/20
              dark:focus-visible:ring-blue-400
              dark:focus-visible:ring-offset-slate-950
            "
          >
            Barcha xizmatlar

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