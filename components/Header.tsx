"use client";

import { useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { Link, usePathname } from "../i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

type NavigationItem = {
  name: string;
  href: string;
  description: string;
  icon: ReactNode;
};

type IconProps = {
  children: ReactNode;
  className?: string;
};

function Icon({
  children,
  className = "h-5 w-5",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
}

function HomeIcon() {
  return (
    <Icon>
      <path
        d="m3 10.75 9-7 9 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 9.25V20h13.5V9.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.25 20v-6.25h5.5V20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function NewsIcon() {
  return (
    <Icon>
      <path
        d="M5 4.75h11.5A2.5 2.5 0 0 1 19 7.25V19H7.5A2.5 2.5 0 0 1 5 16.5V4.75Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 9h1.25v7.75A2.25 2.25 0 0 1 18 19"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 9h7M8.5 12.5h7M8.5 16h4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function ServicesIcon() {
  return (
    <Icon>
      <path
        d="M14.25 6.25a4.5 4.5 0 0 0-5.9 5.9L3.5 17a2.12 2.12 0 0 0 3 3l4.85-4.85a4.5 4.5 0 0 0 5.9-5.9l-2.6 2.6-2.5-.5-.5-2.5 2.6-2.6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function SpecialistsIcon() {
  return (
    <Icon>
      <path
        d="M8.25 11.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.75 19.25v-1.5A4.75 4.75 0 0 1 7.5 13h1.5a4.75 4.75 0 0 1 4.75 4.75v1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 7a2.75 2.75 0 1 1 0 5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 14h.5a4.75 4.75 0 0 1 4.75 4.75v.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function JobsIcon() {
  return (
    <Icon>
      <path
        d="M4 7.75h16A2.25 2.25 0 0 1 22.25 10v8A2.25 2.25 0 0 1 20 20.25H4A2.25 2.25 0 0 1 1.75 18v-8A2.25 2.25 0 0 1 4 7.75Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 7.75V6A2.25 2.25 0 0 1 10.5 3.75h3A2.25 2.25 0 0 1 15.75 6v1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.75 12.25A22.7 22.7 0 0 0 12 14.5a22.7 22.7 0 0 0 10.25-2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function TelegramIcon() {
  return (
    <Icon>
      <path
        d="m3.75 11 15.5-6.25c.7-.28 1.38.38 1.1 1.08l-5.5 14c-.25.64-1.1.74-1.5.18l-3.25-4.5-3.75 2.25.5-5.25L17 7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function EventsIcon() {
  return (
    <Icon>
      <path
        d="M5 4.75h14A2.25 2.25 0 0 1 21.25 7v12A2.25 2.25 0 0 1 19 21.25H5A2.25 2.25 0 0 1 2.75 19V7A2.25 2.25 0 0 1 5 4.75Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 2.75v4M16.5 2.75v4M2.75 9.25h18.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function GuideIcon() {
  return (
    <Icon>
      <path
        d="M5.25 4.75h5A2.75 2.75 0 0 1 13 7.5v11.75h-5A2.75 2.75 0 0 1 5.25 16.5V4.75Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.75 4.75h-3A2.75 2.75 0 0 0 13 7.5v11.75h3A2.75 2.75 0 0 0 18.75 16.5V4.75Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function SearchIcon() {
  return (
    <Icon>
      <circle cx="10.75" cy="10.75" r="6.75" />
      <path d="m16 16 4.25 4.25" strokeLinecap="round" />
    </Icon>
  );
}

function SunIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M5.3 5.3 3.9 3.9M20.1 20.1l-1.4-1.4M18.7 5.3l1.4-1.4M3.9 20.1l1.4-1.4"
        strokeLinecap="round"
      />
    </Icon>
  );
}

function MoonIcon() {
  return (
    <Icon>
      <path
        d="M20.25 15.25A8.5 8.5 0 0 1 8.75 3.75 8.5 8.5 0 1 0 20.25 15.25Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function MenuIcon() {
  return (
    <Icon className="h-6 w-6">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        strokeLinecap="round"
      />
    </Icon>
  );
}

function CloseIcon() {
  return (
    <Icon className="h-6 w-6">
      <path
        d="m5 5 14 14M19 5 5 19"
        strokeLinecap="round"
      />
    </Icon>
  );
}

function ArrowRightIcon() {
  return (
    <Icon>
      <path
        d="M5 12h14M14 7l5 5-5 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function getInitialDarkMode(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const storedTheme = window.localStorage.getItem(
    "vatandoshlar-theme",
  );

  if (storedTheme === "dark") {
    return true;
  }

  if (storedTheme === "light") {
    return false;
  }

  return window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
}

export default function Header() {
  const t = useTranslations("Header");
  const specialistsT = useTranslations("SpecialistsPage");
  const pathname = usePathname();

  const navigation: NavigationItem[] = [
    {
      name: t("navigation.home"),
      href: "/",
      description: t("navigationDescriptions.home"),
      icon: <HomeIcon />,
    },
    {
      name: t("navigation.news"),
      href: "/news",
      description: t("navigationDescriptions.news"),
      icon: <NewsIcon />,
    },
    {
      name: t("navigation.services"),
      href: "/services",
      description: t("navigationDescriptions.services"),
      icon: <ServicesIcon />,
    },
    {
      name: specialistsT("results.title"),
      href: "/specialists",
      description: specialistsT("hero.description"),
      icon: <SpecialistsIcon />,
    },
    {
      name: t("navigation.jobs"),
      href: "/jobs",
      description: t("navigationDescriptions.jobs"),
      icon: <JobsIcon />,
    },
    {
      name: t("navigation.telegram"),
      href: "/telegram",
      description: t("navigationDescriptions.telegram"),
      icon: <TelegramIcon />,
    },
    {
      name: t("navigation.events"),
      href: "/events",
      description: t("navigationDescriptions.events"),
      icon: <EventsIcon />,
    },
    {
      name: t("navigation.guide"),
      href: "/guide",
      description: t("navigationDescriptions.guide"),
      icon: <GuideIcon />,
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [isDarkMode, setIsDarkMode] =
    useState(false);

  const [isScrolled, setIsScrolled] =
    useState(false);

  const isActiveRoute = useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === "/";
      }

      return pathname.startsWith(href);
    },
    [pathname],
  );

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const openCommandPalette = useCallback(() => {
    setIsMobileMenuOpen(false);

    window.dispatchEvent(
      new Event("open-command-palette"),
    );
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(
      (currentValue) => !currentValue,
    );
  }, []);

  const applyTheme = useCallback(
    (darkModeEnabled: boolean) => {
      document.documentElement.classList.toggle(
        "dark",
        darkModeEnabled,
      );

      document.documentElement.style.colorScheme =
        darkModeEnabled ? "dark" : "light";
    },
    [],
  );

  const toggleTheme = useCallback(() => {
    setIsDarkMode((currentMode) => {
      const nextMode = !currentMode;

      applyTheme(nextMode);

      window.localStorage.setItem(
        "vatandoshlar-theme",
        nextMode ? "dark" : "light",
      );

      return nextMode;
    });
  }, [applyTheme]);

  useEffect(() => {
    const initialDarkMode = getInitialDarkMode();

    applyTheme(initialDarkMode);
    setIsDarkMode(initialDarkMode);
  }, [applyTheme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-50
          border-b
          transition-[background-color,border-color,box-shadow]
          duration-300
          ${
            isScrolled
              ? "border-slate-200/90 bg-white/80 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/80"
              : "border-slate-200/80 bg-white/90 shadow-[0_1px_20px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90"
          }
        `}
      >
        <div
          className={`
            mx-auto flex max-w-[1380px]
            items-center gap-3 px-4
            transition-[height] duration-300
            sm:px-6 lg:px-8
            ${isScrolled ? "h-16" : "h-20"}
          `}
        >
          <Link
            href="/"
            aria-label={t("accessibility.homeLink")}
            className="group flex shrink-0 items-center gap-3"
          >
            <span
              className={`
                relative flex items-center justify-center
                overflow-hidden
                bg-gradient-to-br
                from-emerald-500 via-emerald-600 to-teal-700
                font-black text-white
                shadow-lg shadow-emerald-600/20
                transition-all duration-300
                group-hover:-translate-y-0.5
                group-hover:shadow-xl
                group-hover:shadow-emerald-600/25
                ${
                  isScrolled
                    ? "h-9 w-9 rounded-xl text-base"
                    : "h-11 w-11 rounded-2xl text-lg"
                }
              `}
            >
              <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <span className="relative">V</span>
            </span>

            <span className="hidden min-[390px]:block">
              <span
                className={`
                  block font-extrabold tracking-tight
                  text-slate-950
                  transition-[font-size] duration-300
                  dark:text-white
                  ${
                    isScrolled
                      ? "text-base xl:text-lg"
                      : "text-base xl:text-xl"
                  }
                `}
              >
                Vatandoshlar
                <span className="text-emerald-600 dark:text-emerald-400">
                  .de
                </span>
              </span>

              <span
                className={`
                  hidden overflow-hidden
                  text-[10px] font-semibold
                  2xl:block
                  uppercase tracking-[0.16em]
                  text-slate-400
                  transition-all duration-300
                  ${
                    isScrolled
                      ? "max-h-0 opacity-0"
                      : "max-h-4 opacity-100"
                  }
                `}
              >
                {t("brand.subtitle")}
              </span>
            </span>
          </Link>

          <nav
            aria-label={t("accessibility.mainNavigation")}
            className="mx-auto hidden min-w-0 items-center gap-0 min-[1160px]:flex"
          >
            {navigation.map((item) => {
              const isActive = isActiveRoute(
                item.href,
              );

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={
                    isActive ? "page" : undefined
                  }
                  className={`
                    relative shrink-0 whitespace-nowrap rounded-xl
                    text-[11px] font-semibold
                    transition-all duration-300
                    xl:text-sm
                    ${
                      isScrolled
                        ? "px-1 py-2 xl:px-2.5"
                        : "px-1 py-2.5 xl:px-2.5"
                    }
                    ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    }
                  `}
                >
                  {item.name}

                  {isActive && (
                    <span
                      className={`
                        absolute inset-x-4
                        h-0.5 rounded-full
                        bg-emerald-500
                        transition-[bottom] duration-300
                        ${
                          isScrolled
                            ? "-bottom-[13px]"
                            : "-bottom-[19px]"
                        }
                      `}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-1 min-[1160px]:flex xl:gap-2">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label={t("accessibility.openSearch")}
              aria-keyshortcuts="Meta+K Control+K"
              className={`
                flex shrink-0 items-center justify-center
                overflow-hidden rounded-xl
                border border-slate-200
                bg-white text-slate-500
                transition-all duration-300
                hover:border-slate-300
                hover:bg-slate-50
                hover:text-slate-950
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500
                focus-visible:ring-offset-2
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-400
                dark:hover:border-slate-600
                dark:hover:bg-slate-800
                dark:hover:text-white
                dark:focus-visible:ring-offset-slate-950
                ${
                  isScrolled
                    ? "h-10 w-10 gap-0 px-0"
                    : "h-11 w-11 gap-0 px-0 2xl:w-[142px] 2xl:gap-2.5 2xl:px-3.5"
                }
              `}
            >
              <span className="flex shrink-0 items-center justify-center">
                <SearchIcon />
              </span>

              <span
                aria-hidden={isScrolled}
                className={`
                  shrink-0 whitespace-nowrap
                  text-sm font-medium
                  transition-all duration-300
                  ${
                    isScrolled
                      ? "max-w-0 -translate-x-1 overflow-hidden opacity-0"
                      : "max-w-0 -translate-x-1 overflow-hidden opacity-0 2xl:max-w-20 2xl:translate-x-0 2xl:opacity-100"
                  }
                `}
              >{t("actions.search")}</span>

              <kbd
                aria-hidden={isScrolled}
                className={`
                  shrink-0 items-center gap-1
                  overflow-hidden rounded-md
                  border border-slate-200
                  bg-slate-50
                  text-[10px] font-semibold
                  text-slate-400
                  transition-all duration-300
                  dark:border-slate-700
                  dark:bg-slate-800
                  ${
                    isScrolled
                      ? "hidden max-w-0 border-0 px-0 py-0 opacity-0"
                      : "hidden max-w-12 px-1.5 py-0.5 opacity-100 2xl:inline-flex"
                  }
                `}
              >
                <span className="text-xs">⌘</span>
                <span>K</span>
              </kbd>
            </button>

            <LanguageSwitcher variant="compact" />

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDarkMode
                  ? t("accessibility.enableLightMode")
                  : t("accessibility.enableDarkMode")
              }
              className={`
                flex items-center justify-center rounded-xl
                border border-slate-200
                bg-white text-slate-600
                transition-all duration-300
                hover:border-slate-300
                hover:bg-slate-50
                hover:text-emerald-600
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500
                focus-visible:ring-offset-2
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-300
                dark:hover:border-slate-600
                dark:hover:bg-slate-800
                dark:hover:text-emerald-400
                dark:focus-visible:ring-offset-slate-950
                ${
                  isScrolled
                    ? "h-10 w-10"
                    : "h-11 w-11"
                }
              `}
            >
              {isDarkMode ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )}
            </button>

            <Link
              href="/login"
              className={`
                flex shrink-0 items-center justify-center whitespace-nowrap rounded-xl
                bg-gradient-to-r
                from-emerald-600 to-teal-600
                text-sm font-bold text-white
                shadow-lg shadow-emerald-600/20
                transition-all duration-300
                hover:-translate-y-0.5
                hover:shadow-xl
                hover:shadow-emerald-600/25
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500
                focus-visible:ring-offset-2
                dark:focus-visible:ring-offset-slate-950
                ${
                  isScrolled
                    ? "h-10 min-w-[92px] px-3 xl:min-w-[108px] xl:px-4"
                    : "h-11 min-w-[96px] px-3 xl:min-w-[116px] xl:px-5"
                }
              `}
            >{t("actions.login")}</Link>
          </div>

          <div className="ml-auto flex items-center gap-2 min-[1160px]:hidden">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label={t("accessibility.openSearch")}
              aria-keyshortcuts="Meta+K Control+K"
              className={`
                flex items-center justify-center
                rounded-xl
                border border-slate-200
                bg-white text-slate-600
                transition-all duration-300
                active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500
                focus-visible:ring-offset-2
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-300
                dark:focus-visible:ring-offset-slate-950
                ${
                  isScrolled
                    ? "h-10 w-10"
                    : "h-11 w-11"
                }
              `}
            >
              <SearchIcon />
            </button>

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              aria-label={
                isMobileMenuOpen
                  ? t("accessibility.closeMenu")
                  : t("accessibility.openMenu")
              }
              className={`
                flex items-center justify-center
                rounded-xl
                bg-slate-950 text-white
                transition-all duration-300
                active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500
                focus-visible:ring-offset-2
                dark:bg-white
                dark:text-slate-950
                dark:focus-visible:ring-offset-slate-950
                ${
                  isScrolled
                    ? "h-10 w-10"
                    : "h-11 w-11"
                }
              `}
            >
              {isMobileMenuOpen ? (
                <CloseIcon />
              ) : (
                <MenuIcon />
              )}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 min-[1160px]:hidden">
          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label={t("accessibility.closeMobileMenu")}
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
          />

          <div
            id="mobile-navigation"
            className={`
              absolute inset-x-0
              overflow-y-auto
              border-b border-slate-200
              bg-white shadow-2xl
              transition-[top,max-height] duration-300
              dark:border-slate-800
              dark:bg-slate-950
              ${
                isScrolled
                  ? "top-16 max-h-[calc(100dvh-4rem)]"
                  : "top-20 max-h-[calc(100dvh-5rem)]"
              }
            `}
          >
            <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">{t("mobile.navigationTitle")}</p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("mobile.navigationDescription")}</p>
                </div>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label={t("accessibility.closeMobileMenu")}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white dark:focus-visible:ring-offset-slate-950"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="grid gap-2">
                {navigation.map((item) => {
                  const isActive = isActiveRoute(
                    item.href,
                  );

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      aria-current={
                        isActive
                          ? "page"
                          : undefined
                      }
                      className={`
                        flex items-center gap-4
                        rounded-2xl border p-4
                        transition
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-emerald-500
                        focus-visible:ring-offset-2
                        dark:focus-visible:ring-offset-slate-950
                        ${
                          isActive
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                        }
                      `}
                    >
                      <span
                        className={`
                          flex h-11 w-11 shrink-0
                          items-center justify-center
                          rounded-xl
                          ${
                            isActive
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                          }
                        `}
                      >
                        {item.icon}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block font-bold">
                          {item.name}
                        </span>

                        <span className="mt-0.5 block text-sm text-slate-500 dark:text-slate-400">
                          {item.description}
                        </span>
                      </span>

                      <span className="shrink-0 text-slate-300 dark:text-slate-600">
                        <ArrowRightIcon />
                      </span>
                    </Link>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={openCommandPalette}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
              >
                <SearchIcon />
                {t("actions.searchPortal")}
              </button>

              <LanguageSwitcher
                variant="full"
                className="mt-3"
                onLocaleChange={closeMobileMenu}
              />

              <button
                type="button"
                onClick={toggleTheme}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
              >
                {isDarkMode ? (
                  <SunIcon />
                ) : (
                  <MoonIcon />
                )}

                {isDarkMode
                  ? t("actions.lightMode")
                  : t("actions.darkMode")}
              </button>

              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="mt-3 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:shadow-xl hover:shadow-emerald-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
              >
                {t("actions.loginToPortal")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}