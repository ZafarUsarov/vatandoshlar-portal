import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "../i18n/navigation";
import BrandedText from "./ui/BrandedText";

type FooterProps = Readonly<{
  showSupportCta?: boolean;
  showFounderCta?: boolean;
  showHomeDetails?: boolean;
  variant?: "default" | "editorial";
}>;

const socialLinks = [
  { name: "Telegram", url: "https://t.me/UzDe_de" },
  { name: "Instagram", url: "https://www.instagram.com/uzde_de" },
  { name: "Facebook", url: "https://www.facebook.com/uzde.dee" },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/uzde" },
] as const;

export default async function Footer({ variant = "default" }: FooterProps = {}) {
  const locale = await getLocale();
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();
  const isUz = locale === "uz";
  const linkClass = "inline-flex min-h-11 items-center text-sm text-zinc-700 transition-colors hover:text-black focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current dark:text-zinc-300 dark:hover:text-white";

  return (
    <footer className={variant === "editorial" ? "border-t border-zinc-300 bg-[#f7f7f7] px-[clamp(16px,3.3vw,112px)] pb-28 pt-10 text-zinc-950 dark:border-zinc-800 dark:bg-[var(--uzde-home-surface,#111419)] dark:text-white sm:pt-12 lg:pb-24" : "border-t border-zinc-200 bg-[#fafafa] px-[clamp(16px,3.3vw,112px)] pb-28 pt-8 text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white lg:pb-24"}>
      <div className={variant === "editorial" ? "mx-auto flex max-w-[1600px] flex-col gap-7 lg:flex-row lg:items-start lg:justify-between lg:gap-12" : "flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-12"}>
        <nav aria-label={isUz ? "Huquqiy havolalar" : "Rechtliche Informationen"} className="flex flex-wrap items-center gap-x-7 gap-y-1">
          <Link href="/impressum" className={linkClass}>Impressum</Link>
          <Link href="/privacy" className={linkClass}>{isUz ? "Maxfiylik" : "Datenschutz"}</Link>
          <Link href="/install" className={linkClass}>{isUz ? "Ilovani o‘rnatish" : "App installieren"}</Link>
        </nav>
        <nav aria-label={isUz ? "Ijtimoiy tarmoqlar" : "Soziale Netzwerke"} className="flex flex-wrap items-center gap-x-7 gap-y-1 lg:justify-end">
          {socialLinks.map(({ name, url }) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>{name}</a>
          ))}
          <a href="#" aria-label={isUz ? "Sahifa boshiga qaytish" : "Zum Seitenanfang"} title={isUz ? "Sahifa boshiga qaytish" : "Zum Seitenanfang"} className="inline-flex size-11 items-center justify-center text-xl text-zinc-700 transition-colors hover:text-black focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current dark:text-zinc-300 dark:hover:text-white" >
            <span aria-hidden="true">↑</span>
          </a>
        </nav>
      </div>
      <div className={variant === "editorial" ? "mx-auto mt-10 max-w-[1600px] border-t border-zinc-300 pt-6 text-xs leading-5 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400" : "mt-8 border-t border-zinc-200 pt-5 text-xs leading-5 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"}>
        <BrandedText text={t("bottom.copyright", { year })} />
      </div>
    </footer>
  );
}
