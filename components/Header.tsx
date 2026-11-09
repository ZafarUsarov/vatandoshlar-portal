"use client";

import Image from "next/image";
import { Plane, MessagesSquare, ShoppingBag, MapPin, ChevronRight } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";

import {

  useCallback,

  useEffect,

  useState,

  useSyncExternalStore,

  type MouseEvent,

  type ReactNode,

} from "react";

import { Link, usePathname } from "../i18n/navigation";

import LanguageSwitcher from "./LanguageSwitcher";
import HeaderAccountMenu from "./account/HeaderAccountMenu";

import BrandName from "./ui/BrandName";

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

type HeaderAuthState =
  | "loading"
  | "guest"
  | "user"
  | "admin";

function SocialTelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M21.7 3.3a1.5 1.5 0 0 0-1.55-.23L3.2 9.6a1.55 1.55 0 0 0 .06 2.91l4.09 1.34 1.58 4.87a1.55 1.55 0 0 0 2.65.55l2.3-2.54 4.25 3.12a1.55 1.55 0 0 0 2.43-.95l2.03-14.12a1.5 1.5 0 0 0-.89-1.48ZM9.67 13.1l7.86-5.34-6.55 6.37-.73 2.78-.58-3.81Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124Zm1.782 13.019H3.555V9h3.564v11.452Z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M13.6 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6H17V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10H8v3h2.6v8h3Z" />
    </svg>
  );
}



function getIOSWebViewFallbackSnapshot() {

  const isIOS = /iPhone|iPad|iPod/.test(

    window.navigator.userAgent,

  );

  const hasConstrainedOuterViewport =

    window.screen.height - window.outerHeight >= 64;

  return isIOS && hasConstrainedOuterViewport;

}

function getServerIOSWebViewFallbackSnapshot() {

  return false;

}

function subscribeToViewportChanges(

  onStoreChange: () => void,

) {

  window.addEventListener("resize", onStoreChange);

  window.addEventListener(

    "orientationchange",

    onStoreChange,

  );

  return () => {

    window.removeEventListener(

      "resize",

      onStoreChange,

    );

    window.removeEventListener(

      "orientationchange",

      onStoreChange,

    );

  };

}

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

export default function Header({ showRebrandingBanner = false }: { showRebrandingBanner?: boolean }) {

  const t = useTranslations("Header");

  const specialistsT = useTranslations("SpecialistsPage");

  const locale =
    useLocale() === "de"
      ? "de"
      : "uz";

  const pathname = usePathname();

  const [
    authState,
    setAuthState,
  ] = useState<HeaderAuthState>(
    "loading",
  );

  const authCopy =
    locale === "de"
      ? {
          account:
            "UzDe ID",
          myCity:
            "Meine Stadt",
          admin:
            "Admin",
          login:
            "Anmelden",
        }
      : {
          account:
            "UzDe ID",
          myCity:
            "Mening shahrim",
          admin:
            "Admin",
          login:
            "Kirish",
        };

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

      name: t("navigation.guide"),

      href: "/guide",

      description: t("navigationDescriptions.guide"),

      icon: <GuideIcon />,

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

      description: locale === "uz"
          ? "Germaniyadagi o‘zbek mutaxassislarini toping"
          : "Usbekische Fachkräfte in Deutschland finden",

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

  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] =

    useState(false);

  const [isDarkMode, setIsDarkMode] =

    useState(false);

  const [isScrolled, setIsScrolled] =

    useState(false);

  const useIOSWebViewFallback = useSyncExternalStore(

    subscribeToViewportChanges,

    getIOSWebViewFallbackSnapshot,

    getServerIOSWebViewFallbackSnapshot,

  );

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

  const isHomePage =

    pathname === "/" ||

    pathname === "/uz" ||

    pathname === "/de";

  const handleBrandClick = useCallback(

    (event: MouseEvent<HTMLAnchorElement>) => {

      if (!isHomePage) {

        return;

      }

      event.preventDefault();

      setIsMobileMenuOpen(false);

      window.scrollTo({

        top: 0,

        left: 0,

        behavior: "smooth",

      });

    },

    [isHomePage],

  );

  const handleNavigationClick = useCallback(

    (

      event: MouseEvent<HTMLAnchorElement>,

      href: string,

    ) => {

      setIsMobileMenuOpen(false);

      if (pathname !== href) {

        return;

      }

      event.preventDefault();

      window.scrollTo(0, 0);
      window.location.reload();

    },

    [pathname],

  );

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

    const frameId = window.requestAnimationFrame(() => {

      setIsDarkMode(initialDarkMode);

    });

    return () => {

      window.cancelAnimationFrame(frameId);

    };

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
    const controller =
      new AbortController();

    async function loadSession() {
      try {
        const response =
          await fetch(
            "/api/auth/session",
            {
              cache:
                "no-store",
              credentials:
                "same-origin",
              signal:
                controller.signal,
            },
          );

        if (!response.ok) {
          setAuthState(
            "guest",
          );
          return;
        }

        const session =
          (await response.json()) as {
            user?: {
              role?:
                | "admin"
                | "user";
            };
          };

        if (
          session.user?.role ===
          "user"
        ) {
          setAuthState(
            "user",
          );
          return;
        }

        if (
          session.user?.role ===
          "admin"
        ) {
          setAuthState(
            "admin",
          );
          return;
        }

        setAuthState(
          "guest",
        );
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        setAuthState(
          "guest",
        );
      }
    }

    void loadSession();

    return () => {
      controller.abort();
    };
  }, [pathname]);

  return (

    <>

      <header

        data-uzde-ipad-header

        className={`

          ${useIOSWebViewFallback ? "absolute" : "fixed"}

          inset-x-0 top-0 z-50

          border-b

          transition-[background-color,border-color,box-shadow]

          duration-300

          min-[1024px]:max-[1359px]:pb-12

          ${

            isScrolled

              ? "border-slate-200/90 bg-white/80 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/80"

              : "border-slate-200/80 bg-white/90 shadow-[0_1px_20px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90"

          }

        `}

      >

        <style>{`
          @media screen and (min-width: 1024px) and (max-width: 1359px) {
            header[data-uzde-ipad-header] { padding-bottom: 0; }
            header [data-uzde-ipad-nav] {
              display: flex !important;
              position: static !important;
              inset: auto !important;
              flex: 1 1 auto;
              width: auto !important;
              min-width: 0;
              height: auto !important;
              margin: 0 !important;
              justify-content: center;
              overflow: visible;
              border: 0 !important;
              padding: 0 !important;
              gap: 4px;
            }
            header [data-uzde-ipad-nav] > a {
              font-size: 14px !important;
              line-height: 20px;
              padding-inline: 5px;
            }
            header [data-uzde-desktop-actions] {
              display: flex !important;
              margin-left: 0 !important;
              flex-shrink: 0;
            }
            /* A loading-only auth skeleton was reserving ~116px of empty space. */
            header [data-uzde-desktop-actions] > span[aria-hidden="true"] {
              display: none !important;
            }
            header [data-uzde-mobile-actions] { display: none !important; }
            [data-uzde-mobile-overlay] { display: none !important; }
          }
        `}</style>

        {showRebrandingBanner && (
          <div className="flex h-9 items-center justify-center gap-2 overflow-hidden bg-teal-700 px-3 text-center text-[11px] font-medium text-white sm:text-xs">
            <span className="shrink-0 sm:hidden">{locale === "de" ? "Vatandoshlar.de heißt jetzt UzDe!" : "Vatandoshlar.de endi UzDe!"}</span>
            <span className="hidden truncate sm:inline">{locale === "de" ? "Vatandoshlar.de heißt jetzt UzDe! Neuer Name, neues Logo – unsere Mission bleibt." : "Vatandoshlar.de endi UzDe! Yangi nom, yangi logo — maqsadimiz o‘zgarmadi."}</span>
            <Link href="/news/vatandoshlar-de-endi-uzde" className="shrink-0 font-bold underline underline-offset-2 hover:text-teal-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              {locale === "de" ? "Mehr →" : "Batafsil →"}
            </Link>
          </div>
        )}

        <div

          data-uzde-ipad-inner

          className={`

            mx-auto flex w-full max-w-[1440px] min-[1921px]:max-w-[1680px] min-[2560px]:max-w-[2200px]

            relative items-center gap-3 px-4

            transition-[height] duration-300

            sm:px-6 min-[1360px]:px-5

            xl:px-8 2xl:px-10

            ${isScrolled ? "h-16" : "h-20"} max-[1023px]:!h-14

          `}

        >

          <Link

            href="/"

            onClick={handleBrandClick}

            aria-label={t("accessibility.homeLink")}

            className="group ml-0 flex min-w-0 shrink items-center gap-1 lg:ml-4"

          >

            <span

              className="

                relative flex shrink-0 items-center justify-center
                rounded-md border border-slate-950 bg-slate-950 p-0.5
                dark:border-transparent dark:bg-transparent
                transition-all duration-300

                group-hover:-translate-y-0.5

              "

            >

              <Image

                src="/images/brand/uzde/uzde-logo-original-transparent.webp"

                alt=""

                aria-hidden="true"

                width={30}

                height={27}

                priority

                className="!h-[27px] !w-[30px] object-contain"

              />

            </span>

            <span className="min-w-0 overflow-hidden">

              <span

                className={`

                  block font-extrabold tracking-tight

                  text-slate-950

                  transition-[font-size] duration-300

                  dark:text-white

                  ${

                    isScrolled

                      ? "text-sm min-[390px]:text-base xl:text-[22px]"

                      : "text-sm min-[390px]:text-base xl:text-[24px]"

                  }

                `}

              >

                <BrandName />

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

            data-uzde-ipad-nav

            aria-label={t("accessibility.mainNavigation")}

            className="

              hidden min-w-max shrink-0 items-center gap-0.5

              min-[1024px]:flex min-[1024px]:max-[1359px]:absolute min-[1024px]:max-[1359px]:inset-x-0 min-[1024px]:max-[1359px]:bottom-0 min-[1024px]:max-[1359px]:h-12 min-[1024px]:max-[1359px]:w-full min-[1024px]:max-[1359px]:min-w-0 min-[1024px]:max-[1359px]:justify-center min-[1024px]:max-[1359px]:overflow-x-auto min-[1024px]:max-[1359px]:border-t min-[1024px]:max-[1359px]:px-3 min-[1360px]:ml-auto

              xl:gap-1


            "

          >

            {navigation.map((item) => {

              const isActive = isActiveRoute(

                item.href,

              );

              return (

                <Link

                  key={item.href}

                  href={item.href}

                  onClick={(event) =>

                    handleNavigationClick(

                      event,

                      item.href,

                    )

                  }

                  aria-current={

                    isActive ? "page" : undefined

                  }

                  className={`

                    relative shrink-0 whitespace-nowrap rounded-xl

                    text-[11px] font-semibold

                    transition-all duration-300

                    min-[1024px]:max-[1359px]:text-xs xl:text-sm

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

          <div data-uzde-desktop-actions className="ml-auto hidden shrink-0 items-center gap-1.5 min-[1024px]:flex xl:gap-2">

            <button

              type="button"

              onClick={openCommandPalette}

              aria-label={t("accessibility.openSearch")}

              aria-keyshortcuts="Meta+K Control+K"

              className={`

                flex shrink-0 items-center justify-center

                overflow-hidden

                border-0

                bg-transparent text-slate-500

                transition-all duration-300

                hover:border-slate-300

                hover:bg-slate-50

                hover:text-slate-950

                focus-visible:outline-none

                focus-visible:ring-2

                focus-visible:ring-emerald-500

                focus-visible:ring-offset-2

                dark:border-0

                dark:bg-transparent

                dark:text-slate-400

                dark:hover:border-slate-600

                dark:hover:bg-slate-800

                dark:hover:text-white

                dark:focus-visible:ring-offset-slate-950

                ${

                  isScrolled

                    ? "h-10 w-10 gap-0 px-0"

                    : "h-11 w-11 gap-0 px-0"

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

                      : "max-w-0 -translate-x-1 overflow-hidden opacity-0"

                  }

                `}

              >{t("actions.search")}</span>

              <kbd

                aria-hidden={isScrolled}

                className={`

                  shrink-0 items-center gap-1

                  overflow-hidden rounded-md

                  border-0

                  bg-slate-50

                  text-[10px] font-semibold

                  text-slate-400

                  transition-all duration-300

                  dark:border-0

                  dark:bg-slate-800

                  ${

                    isScrolled

                      ? "hidden max-w-0 border-0 px-0 py-0 opacity-0"

                      : "hidden max-w-0 border-0 px-0 py-0 opacity-0"

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

                flex items-center justify-center

                border-0

                bg-transparent text-slate-600

                transition-all duration-300

                hover:border-slate-300

                hover:bg-slate-50

                hover:text-emerald-600

                focus-visible:outline-none

                focus-visible:ring-2

                focus-visible:ring-emerald-500

                focus-visible:ring-offset-2

                dark:border-0

                dark:bg-transparent

                dark:text-slate-300

                dark:hover:border-slate-600

                dark:hover:bg-slate-800

                dark:hover:text-emerald-400

                dark:focus-visible:ring-offset-slate-950

                ${

                  "h-11 w-11"

                }

              `}

            >

              {isDarkMode ? (

                <SunIcon />

              ) : (

                <MoonIcon />

              )}

            </button>

            {authState === "user" ? (
              <HeaderAccountMenu locale={locale} />
            ) : authState === "loading" ? (
              <span
                aria-hidden="true"
                className={
                  isScrolled
                    ? "h-10 w-[108px]"
                    : "h-11 w-[116px]"
                }
              />
            ) : (
              <Link
                href={
                  authState === "admin"
                    ? "/admin"
                    : "/id/login"
                }
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
              >
                {
                  authState === "admin"
                    ? authCopy.admin
                    : authCopy.login
                }
              </Link>
            )}

          </div>

          <div data-uzde-mobile-actions className="ml-auto flex shrink-0 items-center gap-0 min-[1024px]:hidden">
            <LanguageSwitcher variant="dropdown" onLocaleChange={closeMobileMenu} />
            <button type="button" onClick={toggleTheme} aria-label={isDarkMode ? t("actions.lightMode") : t("actions.darkMode")} className="flex h-11 w-10 shrink-0 items-center justify-center rounded-md text-slate-900 transition-colors hover:bg-slate-900/5 active:bg-slate-900/10 [&_svg]:h-[22px] [&_svg]:w-[22px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-slate-100 dark:hover:bg-white/10 dark:active:bg-white/15">
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            <button

              type="button"

              onClick={openCommandPalette}

              aria-label={t("accessibility.openSearch")}

              aria-keyshortcuts="Meta+K Control+K"

              className={`

                flex items-center justify-center

                rounded-md

                text-slate-900

                hover:bg-slate-900/5 active:bg-slate-900/10

                transition-all duration-300

                active:scale-95

                focus-visible:outline-none

                focus-visible:ring-2

                focus-visible:ring-emerald-500

                focus-visible:ring-offset-2

                dark:text-slate-100 dark:hover:bg-white/10 dark:active:bg-white/15

                dark:focus-visible:ring-offset-slate-950

                h-11 w-10 shrink-0 [&_svg]:h-[22px] [&_svg]:w-[22px]

              `}

            >

              <SearchIcon />

            </button>

            {authState === "user" && (
              <HeaderAccountMenu
                locale={locale}
                compact
                onNavigate={closeMobileMenu}
              />
            )}

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

                rounded-md

                text-slate-900 hover:bg-slate-900/5 active:bg-slate-900/10
                [&_svg]:h-5 [&_svg]:w-5

                transition-all duration-300

                active:scale-95

                focus-visible:outline-none

                focus-visible:ring-2

                focus-visible:ring-emerald-500

                focus-visible:ring-offset-2

                dark:hover:bg-white/10 dark:active:bg-white/15

                dark:text-slate-100

                dark:focus-visible:ring-offset-slate-950

                h-11 w-10 shrink-0 [&_svg]:h-[22px] [&_svg]:w-[22px]

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

        <div data-uzde-mobile-overlay className="fixed inset-0 z-40 min-[1024px]:hidden">

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

                  ? (showRebrandingBanner ? "top-[100px] max-h-[calc(100dvh-100px)] max-[1023px]:!top-[92px] max-[1023px]:!max-h-[calc(100dvh-92px)]" : "top-16 max-h-[calc(100dvh-4rem)] max-[1023px]:!top-14 max-[1023px]:!max-h-[calc(100dvh-3.5rem)]")

                  : (showRebrandingBanner ? "top-[116px] max-h-[calc(100dvh-116px)] max-[1023px]:!top-[92px] max-[1023px]:!max-h-[calc(100dvh-92px)]" : "top-20 max-h-[calc(100dvh-5rem)] max-[1023px]:!top-14 max-[1023px]:!max-h-[calc(100dvh-3.5rem)]")

              }

            `}

          >

            <div className="mx-auto max-w-2xl px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">{t("mobile.navigationTitle")}</p>
              <nav aria-label={t("mobile.navigationTitle")} className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                {navigation.map((item) => {
                  const isActive = isActiveRoute(item.href);
                  return (
                    <Link key={item.href} href={item.href} onClick={(event) => handleNavigationClick(event, item.href)} aria-current={isActive ? "page" : undefined} className={`flex min-h-11 items-center justify-between gap-3 px-2 py-2 text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500 ${isActive ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300" : "text-slate-900 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-900"}`}>
                      <span>{item.name}</span>
                      <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-400" />
                    </Link>
                  );
                })}
              </nav>
              <section aria-label={locale === "de" ? "UzDe Angebote" : "UzDe xizmatlari"} className="mt-4">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">{locale === "de" ? "UzDe Angebote" : "UzDe xizmatlari"}</p>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { href: "/safar", label: locale === "de" ? "UzDe Reisen" : "UzDe Safar", icon: Plane },
                    { href: "/savol", label: locale === "de" ? "UzDe Q&A" : "UzDe Savol", icon: MessagesSquare },
                    { href: "/market", label: t("navigation.market"), icon: ShoppingBag },
                    { href: "/places", label: t("navigation.places"), icon: MapPin },
                  ] as const).map(({ href, label, icon: ServiceIcon }) => (
                    <Link key={href} href={href} onClick={closeMobileMenu} className="flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold leading-tight text-slate-900 transition-colors hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800">
                      <ServiceIcon aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
                      <span>{label}</span>
                    </Link>
                  ))}
                </div>
              </section>
              <nav aria-label={locale === "de" ? "Soziale Netzwerke" : "Ijtimoiy tarmoqlar"} className="mt-3 flex items-center justify-center gap-2 border-t border-slate-200 pt-3 dark:border-slate-800">
                {([
                  { href: "https://t.me/UzDe_de", label: "Telegram", icon: SocialTelegramIcon },
                  { href: "https://www.instagram.com/uzde_de", label: "Instagram", icon: InstagramIcon },
                  { href: "https://www.facebook.com/uzde.dee", label: "Facebook", icon: FacebookIcon },
                  { href: "https://www.linkedin.com/company/uzde", label: "LinkedIn", icon: LinkedInIcon },
                ] as const).map(({ href, label, icon: SocialIcon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-800 transition-colors hover:border-emerald-500 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:text-slate-100 dark:hover:text-emerald-400">
                    <SocialIcon aria-hidden="true" className="h-5 w-5" />
                  </a>
                ))}
              </nav>
              {authState !== "user" && authState !== "loading" && (
                <Link href={authState === "admin" ? "/admin" : "/id/login"} onClick={closeMobileMenu} className="mt-2 flex min-h-11 items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
                  {authState === "admin" ? authCopy.admin : authCopy.login}
                </Link>
              )}
            </div>
          </div>

        </div>

      )}

    </>

  );

}
