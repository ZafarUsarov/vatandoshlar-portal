"use client";

import Image from "next/image";
import { HeartHandshake, MessageCircleQuestion, ShoppingBag, Plane } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "../../i18n/navigation";

export default function DesktopQuickNavigation() {
  const t = useTranslations("DesktopQuickNavigation");
  const locale = useLocale();
  const isGerman = locale === "de";
  const pathname = usePathname();

  const links = [
    { href: "/market", label: "Market", Icon: ShoppingBag },
    { href: "/travel", label: isGerman ? "Reisen" : "Sayohat", Icon: Plane },
    { href: "/savol", label: isGerman ? "Fragen" : "Savollar", Icon: MessageCircleQuestion },
    { href: "/support", label: isGerman ? "Beitragen" : "Hissa qo‘shish", Icon: HeartHandshake },
  ] as const;

  return (
    <nav
      aria-label={t("navigation")}
      className="pointer-events-none fixed inset-x-0 bottom-[max(8px,env(safe-area-inset-bottom))] z-40 justify-center px-3 sm:bottom-6 hidden min-[1024px]:flex"
    >
      <div className="pointer-events-auto flex h-14 max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-[#D8EAE7] bg-white p-1 text-[#173B4B] dark:border-[#2A5260] dark:bg-[#10283A] dark:text-[#E1ECF1] sm:gap-1.5">
        <Link
          href="/"
          aria-label={t("home")}
          aria-current={pathname === "/" ? "page" : undefined}
          onClick={(event) => {
            if (pathname === "/") {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#061626] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 dark:bg-[#061626] sm:w-12"
        >
          <Image
            src="/images/brand/uzde/uzde-logo-original-transparent.webp"
            alt="UzDe"
            width={30}
            height={30}
            className="h-[30px] w-[30px] object-contain"
          />
        </Link>
        {links.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              aria-label={label}
              className={`flex h-11 w-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-0 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 sm:w-auto sm:px-3 ${active ? "bg-[#E1F8F1] text-[#008D78] dark:bg-[#00B99B] dark:text-white" : "text-[#173B4B] hover:bg-[#E1F8F1] hover:text-[#008D78] dark:text-[#E1ECF1] dark:hover:bg-[#2A5260]"}`}
            >
              <Icon aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
