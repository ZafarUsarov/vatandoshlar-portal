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
  const socialItems = socialLinks.map((social) => ({
    key: social.platform,
    label: labels[social.platform],
    value: labels[social.platform],
    href: social.href,
    external: true,
  }));

  const emailItem = {
    key: "email",
    label: labels.email,
    value: email,
    href: `mailto:${email}`,
    external: false,
  };

  const links = [...socialItems, emailItem];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {links.map((link) => {
        const isEmail = link.key === "email";

        return (
          <a
            key={link.key}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={
              link.external
                ? "noopener noreferrer"
                : undefined
            }
            className={[
              "group flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 shadow-sm backdrop-blur transition duration-300",
              "hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
              "dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-emerald-500/30 dark:hover:bg-emerald-500/10",
              isEmail
                ? "border-sky-200 bg-sky-50/80 sm:col-span-2 dark:border-sky-400/15 dark:bg-sky-400/[0.06]"
                : "border-white/80 bg-white/80",
            ].join(" ")}
          >
            <span className="min-w-0">
              <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                {link.label}
              </span>

              <span
                className={[
                  "mt-1 block text-sm font-semibold text-slate-800 dark:text-slate-200",
                  isEmail
                    ? "break-all"
                    : "truncate",
                ].join(" ")}
              >
                {link.value}
              </span>
            </span>

            <ArrowUpRightIcon />
          </a>
        );
      })}
    </div>
  );
}
