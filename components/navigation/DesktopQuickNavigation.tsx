"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "../../i18n/navigation";

export default function DesktopQuickNavigation() {
  const t = useTranslations("DesktopQuickNavigation");
  const isGerman = useLocale() === "de";
  const pathname = usePathname();

  const links = [
    { href: "/market", label: "Market" },
    { href: "/travel", label: isGerman ? "Reisen" : "Sayohat" },
    { href: "/savol", label: isGerman ? "Fragen" : "Savollar" },
    { href: "/support", label: isGerman ? "Beitragen" : "Hissa qo‘shish" },
  ] as const;

  const baseClass = "flex min-h-10 min-w-0 shrink-0 items-center justify-center whitespace-nowrap rounded-[9px] border px-[clamp(5px,2vw,16px)] py-2 text-[clamp(10px,2.7vw,14px)] font-medium leading-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-11";
  const inactiveClass = "border-[#444444] bg-[#303030]! text-[#F5F5F5]! hover:border-[#777777] hover:bg-[#414141]! hover:text-[#F5F5F5]! focus-visible:text-[#F5F5F5]!";
  const activeClass = "border-[#F1F1F1] bg-[#F1F1F1]! text-[#202020]! hover:bg-white! hover:text-[#202020]! focus-visible:text-[#202020]!";

  return (
    <nav
      aria-label={t("navigation")}
      className="pointer-events-none fixed inset-x-0 bottom-[max(24px,env(safe-area-inset-bottom))] z-40 hidden justify-center px-2 lg:flex"
    >
      <div className="pointer-events-auto flex max-w-full items-center gap-1 rounded-[14px] border border-[#393939] bg-[#242424] p-1 sm:gap-1.5 sm:p-1.5">
        <Link
          href="/"
          aria-label={t("home")}
          aria-current={pathname === "/" ? "page" : undefined}
          onClick={(event) => {
            if (pathname === "/") {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
            }
          }}
          className={`${baseClass} bg-[#191919]! font-semibold text-[#F5F5F5]! hover:text-[#F5F5F5]! focus-visible:text-[#F5F5F5]! ${pathname === "/" ? "border-white" : "border-[#444444] hover:bg-[#303030]"}`}
        >
          UzDe.
        </Link>
        {links.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`${baseClass} ${active ? activeClass : inactiveClass}`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
