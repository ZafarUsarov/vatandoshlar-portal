import Link from "next/link";

import type { NewsItem } from "@/data/news";
import { formatNewsDate } from "@/data/news";

import { Badge, Card } from "./ui";

type NewsCardProps = {
  item: NewsItem;
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
        d="M12 7.8V12l2.8 1.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CalendarCheckIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 3.5v3m10-3v3M4.5 9.5h15M7 5h10c1.7 0 3 1.3 3 3v9c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V8c0-1.7 1.3-3 3-3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />

      <path
        d="m8.5 14.3 2 2 4.5-4.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function NewsCard({
  item,
  index = 0,
}: NewsCardProps) {
  const newsHref = `/news/${item.slug}`;
  const titleId = `news-card-${item.id}-title`;

  return (
    <Card
      as="article"
      variant="interactive"
      padding="none"
      aria-labelledby={titleId}
      className="
        group relative isolate flex min-h-[390px]
        overflow-hidden rounded-[2rem]
        bg-surface
        animate-fade-in-up
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
          from-brand/15
          via-brand/5
          to-transparent
          opacity-80
          transition-opacity duration-500
          group-hover:opacity-100
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-20 -top-20
          size-52 rounded-full
          border border-brand/10
          transition-transform duration-700
          group-hover:scale-125
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -bottom-28 -left-24
          size-56 rounded-full
          bg-brand/5 blur-3xl
          transition-transform duration-700
          group-hover:scale-125
        "
      />

      <div className="relative z-10 flex w-full flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="primary">
            {item.category}
          </Badge>

          <span className="inline-flex items-center gap-1.5 text-sm text-text-muted">
            <ClockIcon className="size-4 shrink-0" />
            {item.readingTime}
          </span>
        </div>

        <div className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {item.contentType}
          </p>

          <h3
            id={titleId}
            className="
              mt-3 text-xl font-bold
              leading-8 tracking-[-0.025em]
              text-text-primary
              sm:text-2xl
            "
          >
            <Link
              href={newsHref}
              className="
                outline-none
                transition-colors duration-200
                group-hover:text-brand
                focus-visible:rounded-md
                focus-visible:ring-2
                focus-visible:ring-brand
                focus-visible:ring-offset-4
                focus-visible:ring-offset-surface
              "
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 z-20"
              />

              {item.title}
            </Link>
          </h3>

          <p className="mt-4 truncate-lines-3 text-[15px] leading-7 text-text-secondary">
            {item.excerpt}
          </p>
        </div>

        <div className="mt-auto pt-8">
          <div className="flex items-end justify-between gap-5 border-t border-border-default pt-5">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                <CalendarCheckIcon className="size-4 shrink-0" />
                Tekshirildi
              </div>

              <time
                className="mt-1 block text-sm font-semibold text-text-secondary"
                dateTime={item.verifiedAt}
              >
                {formatNewsDate(item.verifiedAt)}
              </time>
            </div>

            <span
              aria-hidden="true"
              className="
                flex shrink-0 items-center gap-2
                text-sm font-semibold text-brand
                transition-all duration-300
                group-hover:gap-3
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
    </Card>
  );
}