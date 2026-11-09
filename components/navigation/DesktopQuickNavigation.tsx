"use client";

import Image from "next/image";
import { HeartHandshake, MessageCircleQuestion, ShoppingBag, Plane } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "../../i18n/navigation";

export default function DesktopQuickNavigation() {
  const t = useTranslations("DesktopQuickNavigation");
  const pathname = usePathname();

  const links = [
    { href: "/market", label: t("market"), Icon: ShoppingBag },
    { href: "/travel", label: t("travel"), Icon: Plane },
    { href: "/savol", label: t("questions"), Icon: MessageCircleQuestion },
    { href: "/support", label: t("support"), Icon: HeartHandshake },
  ] as const;

  return (
    <nav
      aria-label={t("navigation")}
      className="pointer-events-none fixed inset-x-0 bottom-5 z-40 hidden justify-center px-4 min-[1024px]:flex"
    >
      <div className="pointer-events-auto flex max-w-full items-center gap-1.5 overflow-x-auto rounded-2xl border border-[#E2E8F0] bg-white p-1.5 text-[#172238] shadow-[0_10px_28px_rgba(15,23,42,0.12)] backdrop-blur-md dark:border-slate-500/80 dark:bg-slate-800 dark:text-slate-100 dark:shadow-[0_12px_36px_rgba(0,0,0,0.55)]">
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
          className="flex h-11 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B1220] transition-colors duration-150 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
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
              className={`flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-3 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${active ? "border-emerald-500/50 bg-emerald-50 text-emerald-800 dark:border-emerald-400/40 dark:bg-emerald-500/20 dark:text-teal-300" : "border-[#E2E8F0] bg-[#F3F6FA] text-[#172238] hover:border-emerald-500/50 hover:bg-emerald-50 hover:text-emerald-800 dark:border-white/15 dark:bg-white/[0.06] dark:text-slate-100 dark:hover:border-teal-400/40 dark:hover:bg-white/10 dark:hover:text-teal-300"}`}
            >
              <Icon aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
