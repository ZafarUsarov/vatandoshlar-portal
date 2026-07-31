import Link from "next/link";

import {
  formatEventDateShort,
  formatEventTime,
  getEventLocation,
  type EventItem,
} from "@/data/events";

type EventCardProps = {
  event: EventItem;
  index?: number;
};

type IconProps = {
  className?: string;
};

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

function ClockIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M12 7.8V12l3 1.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
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
        d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"
        stroke="currentColor"
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

function PriceIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M15.8 7.5A5.2 5.2 0 0 0 12.5 6C9.5 6 7 8.7 7 12s2.5 6 5.5 6a5.2 5.2 0 0 0 3.3-1.5M5.5 10h8M5.5 14h8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function getStatusStyles(
  status: EventItem["registrationStatus"],
) {
  switch (status) {
    case "Ro‘yxatdan o‘tish ochiq":
      return `
        border-emerald-200
        bg-emerald-50
        text-emerald-700
        dark:border-emerald-400/20
        dark:bg-emerald-400/10
        dark:text-emerald-300
      `;

    case "Ro‘yxatdan o‘tish shart emas":
      return `
        border-blue-200
        bg-blue-50
        text-blue-700
        dark:border-blue-400/20
        dark:bg-blue-400/10
        dark:text-blue-300
      `;

    case "Joylar tugagan":
      return `
        border-amber-200
        bg-amber-50
        text-amber-700
        dark:border-amber-400/20
        dark:bg-amber-400/10
        dark:text-amber-300
      `;

    case "Ro‘yxatdan o‘tish yopilgan":
      return `
        border-slate-200
        bg-slate-100
        text-slate-600
        dark:border-white/[0.08]
        dark:bg-white/[0.05]
        dark:text-slate-400
      `;

    default:
      return `
        border-slate-200
        bg-slate-100
        text-slate-600
        dark:border-white/[0.08]
        dark:bg-white/[0.05]
        dark:text-slate-400
      `;
  }
}

export default function EventCard({
  event,
  index = 0,
}: EventCardProps) {
  const eventHref = `/events/${event.slug}`;
  const formattedDate = formatEventDateShort(
    event.startDate,
  );
  const [day, ...monthParts] = formattedDate.split(" ");
  const month = monthParts.join(" ");

  return (
    <article
      className="
        group relative isolate flex h-full min-h-[520px]
        flex-col overflow-hidden rounded-[2rem]
        border border-slate-200/80
        bg-white/90
        shadow-[0_20px_65px_-42px_rgba(15,23,42,0.45)]
        backdrop-blur-xl
        transition duration-500
        hover:-translate-y-1.5
        hover:border-blue-200
        hover:shadow-[0_32px_85px_-42px_rgba(37,99,235,0.35)]
        dark:border-white/[0.08]
        dark:bg-white/[0.045]
        dark:hover:border-blue-400/20
      "
      style={{
        animationDelay: `${index * 70}ms`,
      }}
    >
      <div
        className="
          relative overflow-hidden
          border-b border-white/10
          bg-gradient-to-br
          from-blue-600
          via-indigo-700
          to-slate-950
          p-6 text-white
          sm:p-7
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.20),transparent_30%)]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -right-16 -top-20 size-52
            rounded-full border border-white/10
            transition duration-700
            group-hover:scale-125
          "
        />

        <div className="relative flex items-start justify-between gap-4">
          <div
            className="
              flex min-h-16 min-w-16 flex-col
              items-center justify-center
              rounded-2xl
              border border-white/60
              bg-white
              px-3 py-2
              text-center text-slate-950
              shadow-lg shadow-slate-950/15
            "
          >
            <span className="text-2xl font-bold leading-none">
              {day}
            </span>

            {month ? (
              <span
                className="
                  mt-1 text-[11px] font-semibold
                  uppercase tracking-[0.14em]
                  text-slate-500
                "
              >
                {month}
              </span>
            ) : null}
          </div>

          <span
            className="
              inline-flex items-center
              rounded-full
              border border-white/15
              bg-white/10
              px-3 py-1.5
              text-xs font-semibold
              text-white
              backdrop-blur-md
            "
          >
            {event.format}
          </span>
        </div>

        <div className="relative mt-8">
          <p
            className="
              text-xs font-semibold uppercase
              tracking-[0.16em]
              text-blue-200
            "
          >
            {event.category}
          </p>

          <h3
            className="
              mt-3 text-2xl font-semibold
              leading-tight tracking-[-0.025em]
              text-white
            "
          >
            <Link
              href={eventHref}
              className="
                outline-none
                focus-visible:rounded-md
                focus-visible:ring-2
                focus-visible:ring-white
                focus-visible:ring-offset-4
                focus-visible:ring-offset-blue-700
              "
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 z-10"
              />

              {event.title}
            </Link>
          </h3>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <p
          className="
            line-clamp-3
            text-[15px] leading-7
            text-slate-600
            dark:text-slate-400
          "
        >
          {event.excerpt}
        </p>

        <dl className="mt-7 space-y-4">
          <div className="flex items-start gap-3">
            <dt
              aria-label="Vaqt"
              className="
                flex size-9 shrink-0
                items-center justify-center
                rounded-xl
                bg-blue-50
                text-blue-700
                dark:bg-blue-400/10
                dark:text-blue-300
              "
            >
              <ClockIcon className="size-[18px]" />
            </dt>

            <dd
              className="
                pt-1.5 text-sm leading-6
                text-slate-600
                dark:text-slate-400
              "
            >
              {formatEventTime(
                event.startTime,
                event.endTime,
              )}
            </dd>
          </div>

          <div className="flex items-start gap-3">
            <dt
              aria-label="Manzil"
              className="
                flex size-9 shrink-0
                items-center justify-center
                rounded-xl
                bg-violet-50
                text-violet-700
                dark:bg-violet-400/10
                dark:text-violet-300
              "
            >
              <LocationIcon className="size-[18px]" />
            </dt>

            <dd
              className="
                pt-1.5 text-sm leading-6
                text-slate-600
                dark:text-slate-400
              "
            >
              {getEventLocation(event)}
            </dd>
          </div>

          <div className="flex items-start gap-3">
            <dt
              aria-label="Narx"
              className="
                flex size-9 shrink-0
                items-center justify-center
                rounded-xl
                bg-emerald-50
                text-emerald-700
                dark:bg-emerald-400/10
                dark:text-emerald-300
              "
            >
              <PriceIcon className="size-[18px]" />
            </dt>

            <dd
              className="
                pt-1.5 text-sm leading-6
                text-slate-600
                dark:text-slate-400
              "
            >
              {event.priceLabel}
            </dd>
          </div>
        </dl>

        <div className="mt-7">
          <span
            className={`
              inline-flex rounded-full
              border px-3 py-1.5
              text-xs font-semibold
              ${getStatusStyles(event.registrationStatus)}
            `}
          >
            {event.registrationStatus}
          </span>
        </div>

        <div className="mt-auto pt-7">
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
                Tadbir
              </p>

              <p
                className="
                  mt-1 text-sm font-semibold
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Batafsil dastur va manzil
              </p>
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