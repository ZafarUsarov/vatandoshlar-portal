import {
  formatEventDateShort,
  formatEventTime,
  getEventLocation,
  type EventItem,
  type RegistrationStatusKey,
  type SupportedEventLocale,
} from "@/data/events";
import { Link } from "@/i18n/navigation";

import { Badge, Card } from "../ui";

type EventCardLabels = Readonly<{
  time: string;
  location: string;
  price: string;
  event: string;
  detailsDescription: string;
  details: string;
}>;

type EventCardProps = Readonly<{
  event: EventItem;
  locale: SupportedEventLocale;
  labels: EventCardLabels;
  index?: number;
}>;

type IconProps = Readonly<{
  className?: string;
}>;

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
  status: RegistrationStatusKey,
): string {
  switch (status) {
    case "open":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
    case "not-required":
      return "border-brand/20 bg-brand/10 text-brand";
    case "sold-out":
      return "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300";
    case "closed":
    default:
      return "border-border-default bg-surface-muted text-text-muted";
  }
}

type EventDetailProps = Readonly<{
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}>;

function EventDetail({
  label,
  icon,
  children,
}: EventDetailProps) {
  return (
    <div className="flex items-start gap-3">
      <dt
        aria-label={label}
        className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border-default bg-surface-muted text-brand"
      >
        {icon}
      </dt>
      <dd className="pt-1.5 text-sm leading-6 text-text-secondary">
        {children}
      </dd>
    </div>
  );
}

export default function EventCard({
  event,
  locale,
  labels,
  index = 0,
}: EventCardProps) {
  const href = `/events/${event.slug}`;
  const titleId = `event-${event.id}-title`;
  const formattedDate = formatEventDateShort(
    event.startDate,
    locale,
  );
  const [day, ...monthParts] = formattedDate.split(" ");
  const month = monthParts.join(" ");

  return (
    <Card
      as="article"
      variant="interactive"
      padding="none"
      aria-labelledby={titleId}
      className="group relative isolate flex min-h-[520px] flex-col overflow-hidden rounded-[2rem] bg-surface animate-fade-in-up"
      style={{
        animationDelay: `${index * 70}ms`,
      }}
    >
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-brand via-indigo-700 to-slate-950 p-6 text-white sm:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.20),transparent_30%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 size-52 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-125"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-20 size-52 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-125"
        />

        <div className="relative flex items-start justify-between gap-4">
          <time
            dateTime={event.startDate}
            className="flex min-h-16 min-w-16 flex-col items-center justify-center rounded-2xl border border-white/60 bg-white px-3 py-2 text-center text-slate-950 shadow-lg shadow-slate-950/15 transition-transform duration-300 group-hover:scale-105"
          >
            <span className="text-2xl font-bold leading-none">
              {day}
            </span>
            {month && (
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                {month}
              </span>
            )}
          </time>

          <Badge
            variant="neutral"
            className="border-white/15 bg-white/10 text-white backdrop-blur-md"
          >
            {event.format}
          </Badge>
        </div>

        <div className="relative mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
            {event.category}
          </p>

          <h3
            id={titleId}
            className="mt-3 text-2xl font-bold leading-tight tracking-[-0.025em] text-white"
          >
            <Link
              href={href}
              className="outline-none transition-opacity duration-200 hover:opacity-90 focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-brand"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 z-20"
              />
              {event.title}
            </Link>
          </h3>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <p className="truncate-lines-3 text-[15px] leading-7 text-text-secondary">
          {event.excerpt}
        </p>

        <dl className="mt-7 space-y-4">
          <EventDetail
            label={labels.time}
            icon={<ClockIcon className="size-[18px]" />}
          >
            {formatEventTime(
              locale,
              event.startTime,
              event.endTime,
            )}
          </EventDetail>

          <EventDetail
            label={labels.location}
            icon={<LocationIcon className="size-[18px]" />}
          >
            {getEventLocation(event, locale)}
          </EventDetail>

          <EventDetail
            label={labels.price}
            icon={<PriceIcon className="size-[18px]" />}
          >
            {event.priceLabel}
          </EventDetail>
        </dl>

        <div className="mt-7">
          <span
            className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyles(
              event.registrationStatusKey,
            )}`}
          >
            {event.registrationStatus}
          </span>
        </div>

        <div className="mt-auto pt-7">
          <div className="flex items-end justify-between gap-5 border-t border-border-default pt-5">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
                {labels.event}
              </p>
              <p className="mt-1 text-sm font-semibold text-text-secondary">
                {labels.detailsDescription}
              </p>
            </div>

            <span
              aria-hidden="true"
              className="flex shrink-0 items-center gap-2 text-sm font-semibold text-brand transition-all duration-300 group-hover:gap-3"
            >
              {labels.details}
              <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
