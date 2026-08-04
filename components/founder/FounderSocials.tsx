import type {
  FounderSocialLink,
  FounderSocialPlatform,
} from "@/types/founder";

type FounderSocialsProps = Readonly<{
  email: string;
  socialLinks: ReadonlyArray<FounderSocialLink>;
  labels: Readonly<
    Record<FounderSocialPlatform | "email", string>
  >;
}>;

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 17 17 7M8 7h9v9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FounderSocials({
  email,
  socialLinks,
  labels,
}: FounderSocialsProps) {
  const links = [
    {
      key: "email",
      label: labels.email,
      value: email,
      href: `mailto:${email}`,
      external: false,
    },
    ...socialLinks.map((social) => ({
      key: social.platform,
      label: labels[social.platform],
      value: labels[social.platform],
      href: social.href,
      external: true,
    })),
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={
            link.external
              ? "noopener noreferrer"
              : undefined
          }
          className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-emerald-500/30 dark:hover:bg-emerald-500/10"
        >
          <span className="min-w-0">
            <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              {link.label}
            </span>
            <span className="mt-1 block truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
              {link.value}
            </span>
          </span>

          <ArrowUpRightIcon />
        </a>
      ))}
    </div>
  );
}
