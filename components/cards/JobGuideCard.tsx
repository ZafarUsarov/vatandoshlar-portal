import { Link } from "@/i18n/navigation";
import type {
  JobGuide,
} from "@/types/jobs";

import { Badge, Card } from "../ui";

type JobGuideCardProps = Readonly<{
  guide: JobGuide;
  labels: Readonly<{
    highlightsAria: string;
    guide: string;
    explained: string;
    open: string;
    openShort: string;
  }>;
  index?: number;
}>;

type IconProps = Readonly<{
  className?: string;
}>;

function ArrowUpRightIcon({
  className,
}: IconProps) {
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

function CheckIcon({
  className,
}: IconProps) {
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
  labels,
  index = 0,
}: JobGuideCardProps) {
  const href =
    `/jobs/${guide.slug}`;

  const titleId =
    `job-guide-${guide.id}-title`;

  return (
    <Card
      as="article"
      variant="interactive"
      padding="none"
      aria-labelledby={
        titleId
      }
      className="group relative isolate flex min-h-[430px] overflow-hidden rounded-[2rem] bg-surface animate-fade-in-up"
      style={{
        animationDelay:
          `${index * 70}ms`,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand/15 via-brand/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-10 flex w-full flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div
            aria-hidden="true"
            className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 to-accent/10 text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110"
          >
            {guide.icon}
          </div>

          <Badge
            variant="neutral"
            className="max-w-[60%] text-center uppercase tracking-[0.12em]"
          >
            {
              guide.category
            }
          </Badge>
        </div>

        <div className="mt-7">
          <h3
            id={titleId}
            className="text-xl font-bold leading-8 tracking-[-0.02em] text-text-primary sm:text-2xl"
          >
            <Link
              href={href}
              className="outline-none transition-colors duration-200 group-hover:text-brand focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 z-20"
              />
              {
                guide.shortTitle
              }
            </Link>
          </h3>

          <p className="mt-4 text-[15px] leading-7 text-text-secondary">
            {
              guide.description
            }
          </p>
        </div>

        {guide.highlights.length >
          0 && (
          <ul
            aria-label={
              labels.highlightsAria
            }
            className="mt-7 space-y-3"
          >
            {guide.highlights
              .slice(
                0,
                3,
              )
              .map(
                (
                  highlight,
                ) => (
                  <li
                    key={
                      highlight
                    }
                    className="flex items-start gap-3 text-sm leading-6 text-text-secondary"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent"
                    >
                      <CheckIcon className="size-3.5" />
                    </span>

                    <span>
                      {
                        highlight
                      }
                    </span>
                  </li>
                ),
              )}
          </ul>
        )}

        <div className="mt-auto pt-8">
          <div className="flex items-end justify-between gap-5 border-t border-border-default pt-5">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
                {
                  labels.guide
                }
              </p>

              <p className="mt-1 text-sm font-semibold text-text-secondary">
                {
                  labels.explained
                }
              </p>
            </div>

            <span
              aria-hidden="true"
              className="flex shrink-0 items-center gap-2 text-sm font-semibold text-brand transition-all duration-300 group-hover:gap-3"
            >
              <span className="hidden sm:inline">
                {
                  labels.open
                }
              </span>

              <span className="sm:hidden">
                {
                  labels.openShort
                }
              </span>

              <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
