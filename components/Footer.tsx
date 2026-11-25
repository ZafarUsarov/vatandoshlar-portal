import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "../i18n/navigation";
import BrandedText from "./ui/BrandedText";

type FooterProps = Readonly<{
  showSupportCta?: boolean;
  showFounderCta?: boolean;
  showHomeDetails?: boolean;
  variant?: "default" | "editorial" | "compact";
  continuous?: boolean;
}>;

const socialLinks = [
  { name: "Telegram", url: "https://t.me/UzDe_de" },
  { name: "Instagram", url: "https://www.instagram.com/uzde_de" },
  { name: "Facebook", url: "https://www.facebook.com/uzde.dee" },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/uzde" },
] as const;

export default async function Footer({ variant = "default", continuous = false }: FooterProps = {}) {
  const locale = await getLocale();
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();
  const isUz = locale === "uz";
  const compact = variant === "compact";
  const linkClass = "inline-flex min-h-11 items-center text-sm text-zinc-700 transition-colors hover:text-black focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current dark:text-zinc-300 dark:hover:text-white";

  return (
    <footer className={continuous ? "border-t border-slate-200 bg-[var(--uzde-page-bg)] px-[clamp(16px,3.3vw,112px)] pb-16 pt-5 sm:pb-28 sm:pt-8 text-zinc-950 dark:border-[var(--uzde-home-border)] dark:text-white lg:pb-24" : compact ? "border-t border-zinc-200 bg-[#fafafa] px-5 pb-20 pt-7 text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white sm:px-8 lg:px-14 lg:pb-20" : variant === "editorial" ? "border-t border-zinc-300 bg-[#f7f7f7] px-[clamp(16px,3.3vw,112px)] pb-28 pt-10 text-zinc-950 dark:border-zinc-800 dark:bg-[var(--uzde-home-surface,#111419)] dark:text-white sm:pt-12 lg:pb-24" : "border-t border-zinc-200 bg-[#fafafa] px-[clamp(16px,3.3vw,112px)] pb-28 pt-8 text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white lg:pb-24"}>
      <div className={continuous ? "mx-auto flex max-w-[var(--uzde-layout-width)] flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-12" : compact ? "mx-auto flex max-w-[var(--uzde-layout-width)] flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-6" : variant === "editorial" ? "mx-auto flex max-w-[var(--uzde-layout-width)] flex-col gap-7 lg:flex-row lg:items-start lg:justify-between lg:gap-12" : "mx-auto flex max-w-[var(--uzde-layout-width)] flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-12"}>
        {compact ? (
          <div className="flex min-w-0 flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-0">
            <div className="shrink-0 text-lg font-bold tracking-tight text-zinc-950 dark:text-white">UzDe.</div>
            <nav aria-label={isUz ? "Huquqiy havolalar" : "Rechtliche Informationen"} className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-0 sm:gap-x-5">

          <Link href="/impressum" className={linkClass}>Impressum</Link>
          <Link href="/privacy" className={linkClass}>{isUz ? "Maxfiylik" : "Datenschutz"}</Link>
          <Link href="/install" className={linkClass}>{isUz ? "Ilovani o‘rnatish" : "App installieren"}</Link>
        </nav>
          </div>
        ) : (
        <nav aria-label={isUz ? "Huquqiy havolalar" : "Rechtliche Informationen"} className={compact ? "flex flex-wrap items-center gap-x-4 gap-y-0 sm:gap-x-5" : "flex flex-wrap items-center gap-x-7 gap-y-1"}>
          <Link href="/impressum" className={linkClass}>Impressum</Link>
          <Link href="/privacy" className={linkClass}>{isUz ? "Maxfiylik" : "Datenschutz"}</Link>
          <Link href="/install" className={linkClass}>{isUz ? "Ilovani o‘rnatish" : "App installieren"}</Link>
        </nav>
        )}
        <nav aria-label={isUz ? "Ijtimoiy tarmoqlar" : "Soziale Netzwerke"} className={compact ? "flex flex-wrap items-center gap-x-4 gap-y-0 sm:gap-x-5 lg:justify-end" : "flex flex-wrap items-center gap-x-7 gap-y-1 lg:justify-end"}>
          {socialLinks.map(({ name, url }) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>{name}</a>
          ))}
          <a href="#" aria-label={isUz ? "Sahifa boshiga qaytish" : "Zum Seitenanfang"} title={isUz ? "Sahifa boshiga qaytish" : "Zum Seitenanfang"} className="inline-flex size-11 items-center justify-center text-xl text-zinc-700 transition-colors hover:text-black focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current dark:text-zinc-300 dark:hover:text-white" >
            <span aria-hidden="true">↑</span>
          </a>
        </nav>
      </div>
      <div className={continuous ? "mx-auto mt-4 sm:mt-8 max-w-[var(--uzde-layout-width)] border-t border-slate-200 pt-4 sm:pt-5 text-xs leading-5 text-zinc-500 dark:border-[var(--uzde-home-border)] dark:text-zinc-400" : compact ? "mx-auto mt-5 max-w-[var(--uzde-layout-width)] border-t border-zinc-200 pt-4 text-xs leading-5 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400" : variant === "editorial" ? "mx-auto mt-10 max-w-[var(--uzde-layout-width)] border-t border-zinc-300 pt-6 text-xs leading-5 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400" : "mx-auto mt-8 max-w-[var(--uzde-layout-width)] border-t border-zinc-200 pt-5 text-xs leading-5 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"}>
        <BrandedText text={t("bottom.copyright", { year })} />
      </div>
    </footer>
  );
}
