import { Link } from "@/i18n/navigation";

import type { FeatureIconName, FeatureItem } from "@/data/features";

interface LocalizedFeatureItem extends FeatureItem {
  title: string;
  description: string;
  linkLabel: string;
}

interface FeatureCardProps {
  feature: LocalizedFeatureItem;
  index: number;
}

interface IconProps {
  className?: string;
}

function TelegramIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M21.2 4.2 18.5 19c-.2 1.1-.8 1.4-1.7.9l-4.1-3-2 1.9c-.2.2-.4.4-.8.4l.3-4.2 7.7-6.9c.3-.3-.1-.5-.5-.2l-9.5 6-4.1-1.3c-.9-.3-.9-.9.2-1.3l16-6.2c.7-.3 1.4.2 1.2 1.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M9 7V5.8C9 4.8 9.8 4 10.8 4h2.4c1 0 1.8.8 1.8 1.8V7m-6 0h6m-6 0H6.8C5.3 7 4 8.3 4 9.8v7.4C4 18.7 5.3 20 6.8 20h10.4c1.5 0 2.8-1.3 2.8-2.8V9.8C20 8.3 18.7 7 17.2 7H15m5 4-6.6 3.1c-.9.4-1.9.4-2.8 0L4 11m6.5 2.5v1.2c0 .4.3.8.8.8h1.5c.4 0 .8-.3.8-.8v-1.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ServicesIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="m14.7 6.3 3-3a4.2 4.2 0 0 1-5.3 5.3l-7.7 7.7a2.1 2.1 0 1 0 3 3l7.7-7.7a4.2 4.2 0 0 1 5.3-5.3l-3 3-3-3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="m4.5 4.5 5 5M3.7 3.7l2.1.6.8 2.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CalendarIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M7 3v3m10-3v3M4.5 9.5h15M6.8 5h10.4C18.7 5 20 6.3 20 7.8v10.4c0 1.5-1.3 2.8-2.8 2.8H6.8C5.3 21 4 19.7 4 18.2V7.8C4 6.3 5.3 5 6.8 5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function ArrowIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function FeatureIcon({ name, className }: { name: FeatureIconName; className?: string }) {
  const icons = {
    telegram: TelegramIcon,
    briefcase: BriefcaseIcon,
    services: ServicesIcon,
    calendar: CalendarIcon,
  };

  const Icon = icons[name];
  return <Icon className={className} />;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <article
      className="group relative flex h-full min-h-[320px] overflow-hidden rounded-[2rem] border border-black/[0.07] bg-white/85 p-6 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur-xl transition duration-500 hover:-translate-y-1.5 hover:border-black/[0.12] hover:shadow-[0_28px_80px_-36px_rgba(15,23,42,0.45)] sm:p-7 dark:border-white/[0.08] dark:bg-white/[0.045] dark:shadow-[0_18px_60px_-36px_rgba(0,0,0,0.8)] dark:hover:border-white/[0.14]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${feature.accentClass} opacity-80 transition duration-500 group-hover:opacity-100`}
      />

      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full border border-black/[0.05] transition duration-700 group-hover:scale-125 dark:border-white/[0.06]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 size-48 rounded-full bg-slate-950/[0.025] blur-2xl transition duration-700 group-hover:scale-125 dark:bg-white/[0.025]" />

      <div className="relative z-10 flex w-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className={`flex size-14 items-center justify-center rounded-2xl ring-1 transition duration-500 group-hover:scale-105 group-hover:rotate-1 ${feature.iconClass}`}>
            <FeatureIcon className="size-7" name={feature.icon} />
          </div>

          <span className="font-mono text-xs font-semibold tracking-[0.18em] text-slate-400 dark:text-slate-500">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold tracking-[-0.025em] text-slate-950 sm:text-2xl dark:text-white">
            {feature.title}
          </h3>

          <p className="mt-4 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
            {feature.description}
          </p>
        </div>

        <div className="mt-auto pt-8">
          <Link
            aria-label={`${feature.title}: ${feature.linkLabel}`}
            className="inline-flex items-center gap-2 rounded-full text-sm font-semibold text-slate-900 outline-none transition hover:gap-3 hover:text-slate-600 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-4 dark:text-white dark:hover:text-slate-300 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            href={feature.href}
          >
            <span>{feature.linkLabel}</span>
            <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
