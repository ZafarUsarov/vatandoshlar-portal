import Link from "next/link";

import type { ServiceItem } from "@/data/services";

import { Badge, Card } from "../ui";

type ServiceCardProps = {
  service: ServiceItem;
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
  const href = `/services/${service.slug}`;
  const titleId = `service-${service.id}-title`;

  return (
    <Card
      as="article"
      variant="interactive"
      padding="none"
      aria-labelledby={titleId}
      className="
        group relative isolate flex min-h-[370px]
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
        <div className="flex items-start justify-between gap-4">
          <div
            aria-hidden="true"
            className="
              flex size-14 shrink-0 items-center justify-center
              rounded-2xl
              border border-brand/15
              bg-gradient-to-br
              from-brand/10
              to-accent/10
              text-2xl
              transition-transform duration-300
              group-hover:scale-105
              group-hover:-rotate-2
            "
          >
            {service.icon}
          </div>

          <Badge
            variant="neutral"
            className="max-w-[60%]"
          >
            <VerifiedIcon className="mr-1 size-3.5 shrink-0" />
            <span className="truncate">
              {service.category}
            </span>
          </Badge>
        </div>

        <div className="mt-8">
          <h3
            id={titleId}
            className="
              text-xl font-bold
              leading-8
              tracking-[-0.025em]
              text-text-primary
              sm:text-2xl
            "
          >
            <Link
              href={href}
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

              {service.shortTitle}
            </Link>
          </h3>

          <p className="mt-4 truncate-lines-3 text-[15px] leading-7 text-text-secondary">
            {service.description}
          </p>
        </div>

        <div className="mt-auto pt-8">
          <div className="flex items-center justify-between gap-4 border-t border-border-default pt-5">
            <div className="flex min-w-0 items-center gap-2 text-sm text-text-muted">
              <span
                aria-hidden="true"
                className="
                  flex size-8 shrink-0 items-center justify-center
                  rounded-full
                  bg-surface-muted
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
                text-brand
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