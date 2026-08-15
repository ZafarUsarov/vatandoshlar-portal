import Image from "next/image";
import type { ReactNode } from "react";

import { Link } from "../../i18n/navigation";
import BrandName from "@/components/ui/BrandName";

export type QuickDirectionItem = Readonly<{
  title: string;
  description: string;
  href: string;
  label: string;
  icon: ReactNode;
  featured?: boolean;
}>;

type QuickDirectionsPanelProps = Readonly<{
  title: string;
  items: ReadonlyArray<QuickDirectionItem>;
  policyTitle: string;
  policyDescription: string;
}>;

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h14M14 7l5 5-5 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function QuickDirectionsPanel({
  title,
  items,
  policyTitle,
  policyDescription,
}: QuickDirectionsPanelProps) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 blur-2xl sm:-inset-5"
      />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6 xl:p-7">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 sm:pb-5">
          <div>
            <p className="text-sm font-semibold">
              <BrandName />
            </p>

            <h2 className="mt-1 text-xl font-bold">{title}</h2>
          </div>

          <div
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center"
          >
            <Image
              src="/images/brand/vatandoshlar-icon.png"
              alt=""
              width={48}
              height={48}
              className="h-11 w-11 object-contain"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:mt-5">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={[
                "group flex min-h-[7rem] flex-col rounded-2xl border p-4 transition duration-300 sm:min-h-[7.25rem] xl:min-h-[7rem]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                item.featured
                  ? "border-emerald-400/25 bg-emerald-400/[0.09] hover:border-emerald-300/40 hover:bg-emerald-400/[0.13]"
                  : "border-white/10 bg-white/[0.055] hover:border-white/20 hover:bg-white/[0.09]",
              ].join(" ")}
            >
              <span className="flex items-start justify-between gap-3">
                <span
                  className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10 text-emerald-300 transition-colors duration-300",
                    "group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-white",
                  ].join(" ")}
                >
                  {item.icon}
                </span>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-emerald-300">
                  <ArrowRightIcon />
                </span>
              </span>

              <span className="mt-3 block font-bold text-white sm:mt-4">
                {item.title}
              </span>

              <span className="mt-1 block text-sm leading-5.5 text-slate-400">
                {item.description}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-amber-300/15 bg-amber-300/10 p-4 sm:mt-5">
          <p className="text-sm font-semibold text-amber-200">
            {policyTitle}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            {policyDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
