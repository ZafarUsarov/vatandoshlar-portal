import type {
  FounderSocialLink,
  FounderSocialPlatform,
} from "@/types/founder";

type FounderSocialsProps = Readonly<{
  email: string;
  socialLinks: ReadonlyArray<FounderSocialLink>;
  labels: Readonly<Record<FounderSocialPlatform | "email", string>>;
}>;

type IconProps = Readonly<{ className?: string }>;

function TelegramIcon({ className }: IconProps) {
  return <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M21.7 3.3a1.5 1.5 0 0 0-1.55-.23L3.2 9.6a1.55 1.55 0 0 0 .06 2.91l4.09 1.34 1.58 4.87a1.55 1.55 0 0 0 2.65.55l2.3-2.54 4.25 3.12a1.55 1.55 0 0 0 2.43-.95l2.03-14.12a1.5 1.5 0 0 0-.89-1.48ZM9.67 13.1l7.86-5.34-6.55 6.37-.73 2.78-.58-3.81Z" /></svg>;
}
function InstagramIcon({ className }: IconProps) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor"/></svg>;
}
function YoutubeIcon({ className }: IconProps) {
  return <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M21.4 7.1a2.8 2.8 0 0 0-2-2C17.6 4.6 12 4.6 12 4.6s-5.6 0-7.4.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.1 12a29 29 0 0 0 .5 4.9 2.8 2.8 0 0 0 2 2c1.8.5 7.4.5 7.4.5s5.6 0 7.4-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-4.9 29 29 0 0 0-.5-4.9ZM10 15.3V8.7l5.7 3.3-5.7 3.3Z"/></svg>;
}
function FacebookIcon({ className }: IconProps) {
  return <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M13.6 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6H17V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10H8v3h2.6v8h3Z"/></svg>;
}
function MailIcon({ className }: IconProps) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7"/><path d="m5 7 7 5 7-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7"/></svg>;
}

const platformStyles = {
  telegram: "hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 hover:shadow-sky-500/10 focus-visible:ring-sky-500 dark:hover:border-sky-400/30 dark:hover:bg-sky-400/10 dark:hover:text-sky-300",
  instagram: "hover:border-fuchsia-300 hover:bg-fuchsia-50 hover:text-fuchsia-700 hover:shadow-fuchsia-500/10 focus-visible:ring-fuchsia-500 dark:hover:border-fuchsia-400/30 dark:hover:bg-fuchsia-400/10 dark:hover:text-fuchsia-300",
  youtube: "hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-red-500/10 focus-visible:ring-red-500 dark:hover:border-red-400/30 dark:hover:bg-red-400/10 dark:hover:text-red-300",
  facebook: "hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-blue-500/10 focus-visible:ring-blue-500 dark:hover:border-blue-400/30 dark:hover:bg-blue-400/10 dark:hover:text-blue-300",
  email: "hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-emerald-500/10 focus-visible:ring-emerald-500 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300",
} as const;

function PlatformIcon({ platform }: { platform: string }) {
  const className = "size-5 transition-transform duration-300 group-hover/social:scale-110 motion-reduce:transition-none motion-reduce:group-hover/social:scale-100";
  if (platform === "telegram") return <TelegramIcon className={className} />;
  if (platform === "instagram") return <InstagramIcon className={className} />;
  if (platform === "youtube") return <YoutubeIcon className={className} />;
  if (platform === "facebook") return <FacebookIcon className={className} />;
  return <MailIcon className={className} />;
}

export default function FounderSocials({ email, socialLinks, labels }: FounderSocialsProps) {
  const socialItems = socialLinks.map((social) => ({
    key: social.platform,
    label: labels[social.platform],
    tooltip: labels[social.platform],
    href: social.href,
    external: true,
  }));
  const links = [...socialItems, { key: "email" as const, label: labels.email, tooltip: email, href: `mailto:${email}`, external: false }];

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <div key={link.key} className="group/tooltip relative">
          <a
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            aria-label={link.key === "email" ? `${link.label}: ${email}` : link.label}
            className={`group/social flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:focus-visible:ring-offset-slate-950 motion-reduce:transform-none motion-reduce:transition-none ${platformStyles[link.key]}`}
          >
            <PlatformIcon platform={link.key} />
            <span className="sr-only">{link.label}</span>
          </a>
          <span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 opacity-0 shadow-lg transition duration-200 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 motion-reduce:transition-none">
            {link.tooltip}
          </span>
        </div>
      ))}
    </div>
  );
}
