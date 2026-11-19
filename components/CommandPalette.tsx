"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";

import { useRouter } from "next/navigation";

import HighlightedText from "./search/HighlightedText";
import type {
  SearchCategory,
  SearchLocale,
} from "../data/searchIndex";
import { getSearchCategoryLabel } from "../lib/search/search-category";
import { useSearch } from "../hooks/useSearch";
import type { SearchResult } from "../lib/search/search-types";
import { normalizeSearchText } from "../lib/search/search-normalization";

type CommandCategory =
  | "main"
  | "news"
  | "services"
  | "jobs"
  | "community";

type CommandIconName =
  | "home"
  | "news"
  | "service"
  | "specialist"
  | "guide"
  | "translation"
  | "legal"
  | "tax"
  | "job"
  | "telegram"
  | "event";

type CommandKey =
  | "home"
  | "news"
  | "services"
  | "translationServices"
  | "legalServices"
  | "taxServices"
  | "jobs"
  | "jobPlatforms"
  | "minijob"
  | "telegram"
  | "events";

type CommandDefinition = {
  key: CommandKey;
  href: string;
  category: CommandCategory;
  icon: CommandIconName;
  keywords: string[];
};

type LocalizedCommand = CommandDefinition & {
  id: string;
  title: string;
  description: string;
  resultCategory: SearchCategory;
};

type PaletteItem = Readonly<{
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  badge?: string;
  icon: CommandIconName;
}>;

const commandDefinitions: CommandDefinition[] = [
  {
    key: "home",
    href: "/",
    category: "main",
    icon: "home",
    keywords: [
      "home",
      "portal",
      "startseite",
      "bosh sahifa",
      "asosiy",
    ],
  },
  {
    key: "news",
    href: "/news",
    category: "news",
    icon: "news",
    keywords: [
      "news",
      "nachrichten",
      "yangilik",
      "bamf",
      "elchixona",
      "botschaft",
      "integratsiya",
      "integration",
      "hujjat",
      "dokumente",
    ],
  },
  {
    key: "services",
    href: "/services",
    category: "services",
    icon: "service",
    keywords: [
      "services",
      "dienstleistungen",
      "xizmat",
      "tarjimon",
      "dolmetscher",
      "yurist",
      "anwalt",
      "shifokor",
      "arzt",
    ],
  },
  {
    key: "translationServices",
    href: "/services/qasamyod-qilgan-tarjimonlar",
    category: "services",
    icon: "translation",
    keywords: [
      "tarjimon",
      "tarjima",
      "übersetzung",
      "dolmetscher",
      "til",
      "sprache",
      "hujjat",
      "dokument",
      "notar",
      "qasamyod",
      "beeidigt",
    ],
  },
  {
    key: "legalServices",
    href: "/services/yuridik-yordam-va-huquqiy-xizmatlar",
    category: "services",
    icon: "legal",
    keywords: [
      "huquq",
      "yuridik",
      "advokat",
      "anwalt",
      "recht",
      "migratsiya",
      "migration",
      "maslahat",
      "beratung",
    ],
  },
  {
    key: "taxServices",
    href: "/services/soliq-maslahatchisini-topish",
    category: "services",
    icon: "tax",
    keywords: [
      "soliq",
      "steuer",
      "deklaratsiya",
      "steuererklärung",
      "maslahatchi",
      "steuerberater",
      "finanzamt",
    ],
  },
  {
    key: "jobs",
    href: "/jobs",
    category: "jobs",
    icon: "job",
    keywords: [
      "ish",
      "arbeit",
      "job",
      "karyera",
      "karriere",
      "minijob",
      "werkstudent",
      "ausbildung",
      "praktikum",
    ],
  },
  {
    key: "jobPlatforms",
    href: "/jobs#job-platforms",
    category: "jobs",
    icon: "job",
    keywords: [
      "ish sayti",
      "jobbörse",
      "jobsuche",
      "arbeitsagentur",
      "stepstone",
      "linkedin",
      "eures",
      "xing",
    ],
  },
  {
    key: "minijob",
    href: "/jobs/germaniyada-minijob",
    category: "jobs",
    icon: "job",
    keywords: [
      "minijob",
      "ish",
      "arbeit",
      "qo‘shimcha ish",
      "nebenjob",
      "oylik",
      "verdienst",
    ],
  },
  {
    key: "telegram",
    href: "/telegram",
    category: "community",
    icon: "telegram",
    keywords: [
      "telegram",
      "guruh",
      "gruppe",
      "hamjamiyat",
      "community",
      "bundesland",
      "nrw",
      "berlin",
    ],
  },
  {
    key: "events",
    href: "/events",
    category: "community",
    icon: "event",
    keywords: [
      "tadbir",
      "veranstaltung",
      "event",
      "seminar",
      "uchrashuv",
      "treffen",
      "networking",
      "konsert",
      "konzert",
    ],
  },
];

const MOBILE_SEARCH_QUERY = "(max-width: 639px)";

function subscribeToMobileSearchViewport(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(MOBILE_SEARCH_QUERY);

  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    mediaQuery.removeEventListener("change", onStoreChange);
  };
}

function getMobileSearchViewportSnapshot() {
  return window.matchMedia(MOBILE_SEARCH_QUERY).matches;
}

function getMobileSearchViewportServerSnapshot() {
  return false;
}

function normalizeText(value: string, locale: SearchLocale) {
  return normalizeSearchText(value, locale);
}

function readRecentSearches(storageKey: string): string[] {
  try {
    const storedValue = window.localStorage.getItem(storageKey);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue) as unknown;

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .filter(
        (item): item is string =>
          typeof item === "string" && item.trim().length > 0,
      )
      .slice(0, 5);
  } catch {
    return [];
  }
}

function SearchIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <circle cx="10.75" cy="10.75" r="6.75" />
      <path d="m16 16 4.25 4.25" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 7l10 10M17 7 7 17"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h14M14 7l5 5-5 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path
        d="M12 7.5V12l3.25 2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getQuickCategory(command: CommandDefinition): SearchCategory {
  if (command.key === "events") return "Tadbir";
  if (command.key === "telegram") return "Telegram";

  switch (command.category) {
    case "news": return "Yangilik";
    case "services": return "Xizmat";
    case "jobs": return "Ish";
    default: return "Sahifa";
  }
}

function getResultIcon(item: SearchResult, locale: SearchLocale): CommandIconName {
  switch (item.category) {
    case "Yangilik": return "news";
    case "Mutaxassis": return "specialist";
    case "Ish":
    case "Ish platformasi": return "job";
    case "Telegram": return "telegram";
    case "Tadbir": return "event";
    case "Qo‘llanma": return "guide";
    case "Xizmat": {
      const value = normalizeSearchText(
        `${item.title} ${item.badge ?? ""} ${item.description}`,
        locale,
      );
      if (value.includes("tarjim") || value.includes("übersetz") || value.includes("dolmetsch")) return "translation";
      if (value.includes("huquq") || value.includes("yuridik") || value.includes("recht") || value.includes("anwalt")) return "legal";
      if (value.includes("soliq") || value.includes("steuer") || value.includes("finanz")) return "tax";
      return "service";
    }
    default: return "home";
  }
}

export default function CommandPalette() {
  const t = useTranslations("CommandPalette");
  const currentLocale = useLocale();
  const locale: SearchLocale = currentLocale === "de" ? "de" : "uz";
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const storageKey = `vatandoshlar-recent-searches-${locale}`;

  const isMounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const isMobileSearchViewport = useSyncExternalStore(
    subscribeToMobileSearchViewport,
    getMobileSearchViewportSnapshot,
    getMobileSearchViewportServerSnapshot,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [headerBottom, setHeaderBottom] = useState(80);
  const [inputHost, setInputHost] = useState<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<SearchCategory | "all">("all");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const commands = useMemo<LocalizedCommand[]>(
    () =>
      commandDefinitions.map((command) => ({
        ...command,
        id: `quick-${command.key}`,
        href: `/${locale}${command.href === "/" ? "" : command.href}`,
        title: t(`commands.${command.key}.title`),
        description: t(`commands.${command.key}.description`),
        resultCategory: getQuickCategory(command),
      })),
    [locale, t],
  );

  const popularSearches = [
    t("popularSearches.minijob"),
    t("popularSearches.werkstudent"),
    t("popularSearches.translator"),
    t("popularSearches.telegram"),
    t("popularSearches.ausbildung"),
    t("popularSearches.internship"),
  ];

  const closeLabel =
    locale === "de" ? "Suche schließen" : "Qidiruvni yopish";
  const searchPlaceholder = isMobileSearchViewport
    ? locale === "de"
      ? "Seite oder Dienst suchen..."
      : "Sahifa yoki xizmatni qidiring..."
    : t("placeholder");

  const hasQuery = query.trim().length > 0;
  const {
    results: searchResults,
    total: searchTotal,
    isLoading,
    isError,
  } = useSearch({
    query,
    locale,
    limit: 10,
    debounceMs: 220,
  });

  const allCommands = useMemo<ReadonlyArray<PaletteItem>>(() => {
    if (!hasQuery) {
      return commands.map((command) => ({
        id: command.id,
        title: command.title,
        description: command.description,
        href: command.href,
        category: command.resultCategory,
        badge: getSearchCategoryLabel(command.resultCategory, locale),
        icon: command.icon,
      }));
    }

    return searchResults.map((item) => ({
      ...item,
      icon: getResultIcon(item, locale),
    }));
  }, [commands, hasQuery, locale, searchResults]);

  const categories = useMemo(() => {
    const available = Array.from(new Set(allCommands.map((item) => item.category)));
    return available;
  }, [allCommands]);

  const filteredCommands = useMemo(
    () => activeCategory === "all"
      ? allCommands
      : allCommands.filter((item) => item.category === activeCategory),
    [activeCategory, allCommands],
  );

  const selectCategory = useCallback((category: SearchCategory | "all") => {
    setActiveCategory(category);
    setSelectedIndex(0);
  }, []);

  const openPalette = useCallback(() => {
    setRecentSearches(readRecentSearches(storageKey));
    setIsOpen(true);
    setActiveCategory("all");
    setSelectedIndex(0);
  }, [storageKey]);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveCategory("all");
    setSelectedIndex(0);
  }, []);

  const saveRecentSearch = useCallback(
    (value: string) => {
      const cleanedValue = value.trim();

      if (!cleanedValue) {
        return;
      }

      setRecentSearches((currentSearches) => {
        const nextSearches = [
          cleanedValue,
          ...currentSearches.filter(
            (item) =>
              normalizeText(item, locale) !==
              normalizeText(cleanedValue, locale),
          ),
        ].slice(0, 5);

        window.localStorage.setItem(
          storageKey,
          JSON.stringify(nextSearches),
        );

        return nextSearches;
      });
    },
    [locale, storageKey],
  );

  const selectCommand = useCallback(
    (command: PaletteItem) => {
      saveRecentSearch(query || command.title);
      closePalette();
      router.push(command.href);
    },
    [closePalette, query, router, saveRecentSearch],
  );

  const handleSuggestedSearch = useCallback((value: string) => {
    setQuery(value);
    setSelectedIndex(0);

    window.setTimeout(() => {
      inputRef.current?.focus();
    }, 20);
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    window.localStorage.removeItem(storageKey);
  }, [storageKey]);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      const isCommandShortcut =
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k";

      if (isCommandShortcut) {
        event.preventDefault();

        if (isOpen) {
          closePalette();
        } else {
          openPalette();
        }

        return;
      }

      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        closePalette();
      }
    };

    const handleOpenEvent = () => {
      openPalette();
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    window.addEventListener(
      "open-command-palette",
      handleOpenEvent as EventListener,
    );

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
      window.removeEventListener(
        "open-command-palette",
        handleOpenEvent as EventListener,
      );
    };
  }, [closePalette, isOpen, openPalette]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("uzde-search-state", { detail: { open: isOpen } }));
    if (!isOpen) {
      return;
    }
    let frame = 0;
    const findHost = () => {
      const device = window.matchMedia("(min-width: 1024px)").matches ? "desktop" : "mobile";
      const host = document.querySelector<HTMLElement>(`[data-uzde-search-slot="${device}"]`);
      if (host) setInputHost(host);
      else frame = window.requestAnimationFrame(findHost);
    };
    const onResize = () => {
      setInputHost(null);
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(findHost);
    };
    frame = window.requestAnimationFrame(findHost);
    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.dispatchEvent(new CustomEvent("uzde-search-state", { detail: { open: false } }));
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const header = document.querySelector<HTMLElement>("[data-uzde-ipad-header]");
    const updatePosition = () => {
      setHeaderBottom(Math.max(0, Math.ceil(header?.getBoundingClientRect().bottom ?? 80)));
    };
    updatePosition();
    const observer = header ? new ResizeObserver(updatePosition) : null;
    if (header && observer) observer.observe(header);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.visualViewport?.addEventListener("resize", updatePosition);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
      window.visualViewport?.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    if (!isMobileSearchViewport) document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, isMobileSearchViewport]);

  useEffect(() => {
    const activeElement =
      listRef.current?.querySelector<HTMLElement>(
        `[data-command-index="${selectedIndex}"]`,
      );

    activeElement?.scrollIntoView({
      block: "nearest",
    });
  }, [selectedIndex]);

  function handleInputKeyDown(
    event: ReactKeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setSelectedIndex((currentIndex) => {
        if (filteredCommands.length === 0) {
          return 0;
        }

        return (currentIndex + 1) % filteredCommands.length;
      });

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setSelectedIndex((currentIndex) => {
        if (filteredCommands.length === 0) {
          return 0;
        }

        return (
          (currentIndex - 1 + filteredCommands.length) %
          filteredCommands.length
        );
      });

      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      const selectedCommand = filteredCommands[selectedIndex];

      if (selectedCommand) {
        selectCommand(selectedCommand);
      }
    }
  }

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <style>{`
        #command-palette-search-input,
        #command-palette-search-input:focus,
        #command-palette-search-input:focus-visible {
          border: 0 !important;
          outline: none !important;
          box-shadow: none !important;
          --tw-ring-shadow: 0 0 #0000 !important;
        }
        [data-uzde-search-input-shell]:has(#command-palette-search-input:focus-visible) {
          box-shadow: inset 0 0 0 1px #0f766e;
        }
        .dark [data-uzde-search-input-shell]:has(#command-palette-search-input:focus-visible) {
          box-shadow: inset 0 0 0 1px #5eead4;
        }
      `}</style>
      {isOpen && inputHost && createPortal(
        <div data-uzde-search-input-shell className="flex h-10 w-full min-w-0 items-center gap-2 rounded-md bg-zinc-100 px-2 dark:bg-[#191c21]">
          <span className="shrink-0 text-zinc-500"><SearchIcon className="h-4 w-4" /></span>
                <input
                  id="command-palette-search-input"
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder={searchPlaceholder}
                  autoComplete="off"
                  spellCheck={false}
                  className="h-10 w-full min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-[13px] text-zinc-950 outline-none ring-0 shadow-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-500 [&::-webkit-search-cancel-button]:hidden"
                  aria-label={t("accessibility.searchInput")}
                  aria-controls={!isMobileSearchViewport || hasQuery ? "command-palette-results" : undefined}
                  aria-activedescendant={
                    filteredCommands[selectedIndex]
                      ? `command-${filteredCommands[selectedIndex].id}`
                      : undefined
                  }
                />
          <button type="button" onClick={closePalette} aria-label={closeLabel} className="shrink-0 rounded p-1 text-zinc-500 hover:text-zinc-950 dark:hover:text-white"><CloseIcon /></button>
        </div>,
        inputHost,
      )}
      {createPortal(
    <AnimatePresence>
      {isOpen && (!isMobileSearchViewport || hasQuery) && (
        <motion.div
          className={`fixed inset-x-0 z-40 flex items-start justify-center px-3 sm:px-6 ${isMobileSearchViewport ? "pointer-events-none" : "bottom-0"}`}
          style={{ top: headerBottom }}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.18,
          }}
        >
          {!isMobileSearchViewport && <motion.button
            type="button"
            aria-label={closeLabel}
            className="absolute inset-0 cursor-default bg-black/30 dark:bg-black/45"
            onClick={closePalette}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />}

          <motion.div
            role="dialog"
            aria-modal="false"
            aria-labelledby="command-palette-title"
            className="pointer-events-auto relative flex w-full max-w-[1440px] min-h-0 max-h-[min(65dvh,650px)] flex-col overflow-hidden rounded-b-xl border border-t-0 border-zinc-200 bg-white shadow-xl dark:border-[#292e36] dark:bg-[#191c21] max-md:max-h-[min(45dvh,360px)]"
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    y: -16,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2 id="command-palette-title" className="sr-only">
              {t("title")}
            </h2>



            <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)] overflow-hidden md:min-h-[min(390px,55dvh)] md:grid-cols-[230px_minmax(0,1fr)] md:grid-rows-1 lg:grid-cols-[270px_minmax(0,1fr)]">
              <nav aria-label={locale === "de" ? "Suchkategorien" : "Qidiruv kategoriyalari"} className="hidden min-h-0 border-b border-zinc-200 px-4 py-3 dark:border-[#292e36] md:block md:overflow-y-auto md:overscroll-contain md:border-b-0 md:border-r md:px-6 md:py-5">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  {locale === "de" ? "Kategorien" : "Kategoriyalar"}
                </p>
                <div className="flex gap-1 overflow-x-auto md:flex-col md:overflow-x-visible">
                  <button type="button" onClick={() => selectCategory("all")} aria-pressed={activeCategory === "all"}
                    className={`shrink-0 rounded-md px-3 py-2 text-left text-sm transition-colors md:w-full ${activeCategory === "all" ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-[#292e36] dark:text-white" : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-[#252a30]"}`}>
                    {locale === "de" ? "Alle" : "Barçasi"}
                  </button>
                  {categories.map((category) => (
                    <button key={category} type="button" onClick={() => selectCategory(category)} aria-pressed={activeCategory === category}
                      className={`shrink-0 rounded-md px-3 py-2 text-left text-sm transition-colors md:w-full ${activeCategory === category ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-[#292e36] dark:text-white" : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-[#252a30]"}`}>
                      {getSearchCategoryLabel(category, locale)}
                    </button>
                  ))}
                </div>
              </nav>
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
            {!query && (
              <div className="hidden shrink-0 border-b border-zinc-200 px-5 py-3 dark:border-[#292e36] md:block">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                    {t("popularTitle")}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {popularSearches.map((popularSearch) => (
                      <button
                        key={popularSearch}
                        type="button"
                        onClick={() =>
                          handleSuggestedSearch(popularSearch)
                        }
                        className="rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-zinc-500 dark:border-[#292e36] dark:text-zinc-300 dark:hover:bg-[#292e36]"
                      >
                        {popularSearch}
                      </button>
                    ))}
                  </div>
                </div>

                {recentSearches.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                        <ClockIcon />
                        {t("recentTitle")}
                      </p>

                      <button
                        type="button"
                        onClick={clearRecentSearches}
                        className="text-xs font-semibold text-slate-400 transition hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      >
                        {t("clearRecent")}
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {recentSearches.map((recentSearch) => (
                        <button
                          key={recentSearch}
                          type="button"
                          onClick={() =>
                            handleSuggestedSearch(recentSearch)
                          }
                          className="rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-zinc-500 dark:border-[#292e36] dark:text-zinc-300 dark:hover:bg-[#292e36]"
                        >
                          {recentSearch}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

                <p className="px-5 pt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  {locale === "de" ? "Ergebnisse" : "Natijalar"}
                </p>
            <div
              ref={listRef}
              id="command-palette-results"
              role="listbox"
              aria-label={t("accessibility.results")}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-2 sm:px-5"
            >
              {hasQuery && isLoading ? (
                <div className="px-6 py-14 text-center" role="status" aria-live="polite">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-600 dark:border-slate-700 dark:border-t-emerald-400" />
                  <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {locale === "de" ? "Suche läuft…" : "Qidirilmoqda…"}
                  </p>
                </div>
              ) : hasQuery && isError ? (
                <div className="px-6 py-14 text-center" role="alert">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-300">
                    <SearchIcon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">
                    {locale === "de" ? "Suche derzeit nicht verfügbar" : "Qidiruv vaqtincha ishlamayapti"}
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {locale === "de" ? "Bitte versuchen Sie es gleich noch einmal." : "Iltimos, birozdan keyin qayta urinib ko‘ring."}
                  </p>
                </div>
              ) : filteredCommands.length > 0 ? (
                filteredCommands.map((command, index) => {
                  const isSelected = selectedIndex === index;

                  return (
                    <button
                      key={command.id}
                      id={`command-${command.id}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      data-command-index={index}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => selectCommand(command)}
                      className={`group flex w-full items-center gap-4 border-b border-zinc-100 p-3 text-left transition focus-visible:outline-2 focus-visible:outline-zinc-500 dark:border-[#292e36] ${
                        isSelected
                          ? "bg-slate-100 dark:bg-slate-800"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/70"
                      }`}
                    >

                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-slate-950 dark:text-white">
                            <HighlightedText
                              text={command.title}
                              query={query}
                              locale={locale}
                            />
                          </span>

                          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                            {command.badge ??
                              getSearchCategoryLabel(command.category, locale)}
                          </span>
                        </span>

                        <span className="mt-1 block text-sm leading-5 text-slate-500 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden sm:leading-6 dark:text-slate-400">
                          <HighlightedText
                            text={command.description}
                            query={query}
                            locale={locale}
                          />
                        </span>
                      </span>

                      <span className="shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-800 dark:group-hover:text-white">
                        <ArrowRightIcon />
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="px-6 py-14 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                    <SearchIcon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">
                    {t("emptyState.title")}
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {t("emptyState.description")}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setSelectedIndex(0);
                    }}
                    className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                  >
                    {t("emptyState.clear")}
                  </button>
                </div>
              )}
            </div>

              </div>
            </div>

            <div className="hidden shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-200 md:flex bg-slate-50 px-5 py-2 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono dark:border-slate-700 dark:bg-slate-800">
                    ↑
                  </kbd>
                  <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono dark:border-slate-700 dark:bg-slate-800">
                    ↓
                  </kbd>
                  {t("keyboard.select")}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono dark:border-slate-700 dark:bg-slate-800">
                    ↵
                  </kbd>
                  {t("keyboard.open")}
                </span>
              </div>

              <span>
                {t("resultCount", {
                  count: activeCategory === "all" && hasQuery ? searchTotal : filteredCommands.length,
                })}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
      )}
    </>
  );
}
