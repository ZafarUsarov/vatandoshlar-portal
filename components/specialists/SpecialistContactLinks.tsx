import {
  Globe, GraduationCap, MessageCircle, Send, BookOpen,
} from "lucide-react";
import type { SVGProps } from "react";
import { zafarSocialLinks } from "@/components/founder/ZafarExtraSocials";

type IconProps = SVGProps<SVGSVGElement>;

function Instagram({ className, ...props }: IconProps) {
  return <svg {...props} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
}
function Youtube({ className, ...props }: IconProps) {
  return <svg {...props} className={className} viewBox="0 0 24 24" fill="none"><rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="currentColor"/><path d="m10 9 5 3-5 3V9Z" fill="white"/></svg>;
}
function Facebook({ className, ...props }: IconProps) {
  return <svg {...props} className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M13.6 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6H17V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10H8v3h2.6v8h3Z"/></svg>;
}
function Github({ className, ...props }: IconProps) {
  return <svg {...props} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-4.5 1.5-4.5-2.5-6-3m12 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22" transform="translate(1 1) scale(.91)"/></svg>;
}
function Linkedin({ className, ...props }: IconProps) {
  return (
    <svg
      {...props}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="2.5" />
      <circle cx="7.5" cy="8" r="1" fill="currentColor" stroke="none" />
      <path d="M7.5 11v7" />
      <path d="M12 18v-7m0 3a3 3 0 0 1 6 0v4" />
    </svg>
  );
}
import type { LocalizedSpecialist } from "@/types/specialist";
import SpecialistEmailPopover from "@/components/specialists/SpecialistEmailPopover";
import SpecialistPhonePopover from "@/components/specialists/SpecialistPhonePopover";

type Labels = Readonly<{
  email: string; phone: string; mobile: string; website: string;
  whatsapp: string; telegram: string; instagram: string; youtube: string;
  facebook: string; googleScholar: string; researchGate: string;
  github: string; linkedin: string;
  copyEmail: string; composeEmail: string; emailCopied: string;
  emailCopyFailed: string; callPhone: string;
}>;

type Props = Readonly<{ contact: LocalizedSpecialist["contact"]; labels: Labels; isFounder?: boolean }>;

const iconClass = "flex size-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition duration-300 motion-reduce:transform-none motion-reduce:transition-none hover:-translate-y-1 hover:scale-105 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300";

export default function SpecialistContactLinks({ contact, labels, isFounder = false }: Props) {
  const links = [
    { key: "website", href: contact.website, label: labels.website, Icon: Globe },
    { key: "whatsapp", href: contact.whatsapp, label: labels.whatsapp, Icon: MessageCircle },
    { key: "telegram", href: contact.telegram, label: labels.telegram, Icon: Send },
    { key: "instagram", href: contact.instagram, label: labels.instagram, Icon: Instagram },
    { key: "youtube", href: contact.youtube, label: labels.youtube, Icon: Youtube },
    { key: "facebook", href: contact.facebook, label: labels.facebook, Icon: Facebook },
    { key: "googleScholar", href: contact.googleScholar, label: labels.googleScholar, Icon: GraduationCap },
    { key: "researchGate", href: contact.researchGate, label: labels.researchGate, Icon: BookOpen },
    { key: "github", href: contact.github, label: labels.github, Icon: Github },
    { key: "linkedin", href: contact.linkedin, label: labels.linkedin, Icon: Linkedin },
  ].filter((item) => Boolean(item.href));
  const visibleLinks = isFounder ? [
    ...links.filter((item) => ["instagram", "youtube", "facebook"].includes(item.key)),
    ...zafarSocialLinks.map((item) => ({ key: item.platform, href: item.href, label: item.label, Icon: item.Icon })),
  ] : links;

  return (
    <div className={`mt-5 flex flex-wrap items-center ${isFounder ? "gap-2" : "gap-2.5"}`}>
      {contact.email && (
        <SpecialistEmailPopover email={contact.email} label={labels.email}
          copyLabel={labels.copyEmail} composeLabel={labels.composeEmail}
          copiedLabel={labels.emailCopied} copyFailedLabel={labels.emailCopyFailed} />
      )}
      {contact.phone && (
        <SpecialistPhonePopover number={contact.phone} label={labels.phone}
          copyLabel={labels.copyEmail} copiedLabel={labels.emailCopied}
          copyFailedLabel={labels.emailCopyFailed} callLabel={labels.callPhone} />
      )}
      {contact.mobile && (
        <SpecialistPhonePopover number={contact.mobile} label={labels.mobile}
          copyLabel={labels.copyEmail} copiedLabel={labels.emailCopied}
          copyFailedLabel={labels.emailCopyFailed} callLabel={labels.callPhone} />
      )}
      {visibleLinks.map(({ key, href, label, Icon }) => (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer"
          aria-label={label} title={label} className={iconClass}>
          <Icon aria-hidden="true" className="size-5" />
          <span className="sr-only">{label}</span>
        </a>
      ))}
    </div>
  );
}
