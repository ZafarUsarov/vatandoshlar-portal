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

import { useRouter } from "../i18n/navigation";

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
  title: string;
  description: string;
};

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
    icon: "service",
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
    icon: "service",
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
    icon: "service",
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

function normalizeText(value: string, locale: string) {
  return value
    .toLocaleLowerCase(locale)
    .replace(/[‘’ʼ`]/g, "'")
    .trim();
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

function CommandIcon({
  icon,
}: {
  icon: CommandIconName;
}) {
  const commonProps = {
    "aria-hidden": true,
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  switch (icon) {
    case "home":
      return (
        <svg {...commonProps}>
          <path
            d="m3.75 10.25 8.25-7 8.25 7V20H14.5v-5.75h-5V20H3.75v-9.75Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "news":
      return (
        <svg {...commonProps}>
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
        </svg>
      );

    case "service":
      return (
        <svg {...commonProps}>
          <path
            d="M14.25 6.25a4.5 4.5 0 0 0-5.9 5.9L3.5 17a2.12 2.12 0 0 0 3 3l4.85-4.85a4.5 4.5 0 0 0 5.9-5.9l-2.6 2.6-2.5-.5-.5-2.5 2.6-2.6Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "job":
      return (
        <svg {...commonProps}>
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
        </svg>
      );

    case "telegram":
      return (
        <svg {...commonProps}>
          <path
            d="m20.5 4-3.1 15.25c-.2.95-1.05 1.2-1.8.75l-4.7-3.45-2.3 2.2c-.25.25-.45.45-.95.45l.35-4.8 8.75-7.9c.4-.35-.1-.55-.6-.2L5.35 13.1.7 11.65c-1-.3-1.05-1 .2-1.5L19.1 3.1c.85-.3 1.6.2 1.4.9Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "event":
      return (
        <svg {...commonProps}>
          <rect
            x="2.75"
            y="4.75"
            width="18.5"
            height="16.5"
            rx="2.25"
          />
          <path d="M7.5 2.75v4M16.5 2.75v4M2.75 9h18.5" />
        </svg>
      );
  }
}

function getCategoryStyles(category: CommandCategory) {
  switch (category) {
    case "news":
      return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300";
    case "services":
      return "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300";
    case "jobs":
      return "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300";
    case "community":
      return "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300";
    case "main":
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
}

export default function CommandPalette() {
  const t = useTranslations("CommandPalette");
  const locale = useLocale();
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
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const commands = useMemo<LocalizedCommand[]>(
    () =>
      commandDefinitions.map((command) => ({
        ...command,
        title: t(`commands.${command.key}.title`),
        description: t(`commands.${command.key}.description`),
      })),
    [t],
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

  const filteredCommands = useMemo(() => {
    const normalizedQuery = normalizeText(query, locale);

    if (!normalizedQuery) {
      return commands;
    }

    return commands.filter((command) => {
      const searchableText = normalizeText(
        [
          command.title,
          command.description,
          t(`categories.${command.category}`),
          ...command.keywords,
        ].join(" "),
        locale,
      );

      return searchableText.includes(normalizedQuery);
    });
  }, [commands, locale, query, t]);

  const openPalette = useCallback(() => {
    setRecentSearches(readRecentSearches(storageKey));
    setIsOpen(true);
    setSelectedIndex(0);
  }, [storageKey]);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
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
    (command: LocalizedCommand) => {
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
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

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

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 pb-10 pt-[8vh] sm:px-6 sm:pt-[12vh]"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.18,
          }}
        >
          <motion.button
            type="button"
            aria-label={closeLabel}
            className="absolute inset-0 cursor-default bg-slate-950/65 backdrop-blur-md"
            onClick={closePalette}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-palette-title"
            className="relative w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-white/15 bg-white shadow-2xl shadow-black/30 dark:border-slate-700 dark:bg-slate-900"
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    y: -16,
                    scale: 0.97,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2 id="command-palette-title" className="sr-only">
              {t("title")}
            </h2>

            <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

            <div className="border-b border-slate-200 px-4 py-4 dark:border-slate-800 sm:px-5">
              <div className="flex min-h-14 items-center gap-3 rounded-full border border-slate-200 bg-slate-50/80 px-4 transition focus-within:border-emerald-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950/60 dark:focus-within:border-emerald-500 dark:focus-within:bg-slate-950 dark:focus-within:ring-emerald-400/15">
                <span className="shrink-0 text-slate-400">
                  <SearchIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>

                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder={t("placeholder")}
                  autoComplete="off"
                  spellCheck={false}
                  className="h-14 min-w-0 flex-1 appearance-none bg-transparent text-base font-medium text-slate-950 outline-none placeholder:text-slate-400 sm:text-lg dark:text-white [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                  aria-label={t("accessibility.searchInput")}
                  aria-controls="command-palette-results"
                  aria-activedescendant={
                    filteredCommands[selectedIndex]
                      ? `command-${filteredCommands[selectedIndex].key}`
                      : undefined
                  }
                />

                <button
                  type="button"
                  onClick={closePalette}
                  aria-label={closeLabel}
                  title={closeLabel}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-200/70 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:hover:bg-slate-800 dark:hover:text-white dark:focus-visible:ring-offset-slate-950"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            {!query && (
              <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
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
                        className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-emerald-500/30 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
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
                          className="rounded-full bg-slate-100 px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                        >
                          {recentSearch}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div
              ref={listRef}
              id="command-palette-results"
              role="listbox"
              aria-label={t("accessibility.results")}
              className="max-h-[min(60vh,32rem)] overflow-y-auto p-2"
            >
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command, index) => {
                  const isSelected = selectedIndex === index;

                  return (
                    <button
                      key={command.key}
                      id={`command-${command.key}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      data-command-index={index}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => selectCommand(command)}
                      className={`group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                        isSelected
                          ? "bg-slate-100 dark:bg-slate-800"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/70"
                      }`}
                    >
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${
                          isSelected
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                            : "bg-slate-100 text-slate-500 group-hover:text-emerald-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:text-emerald-400"
                        }`}
                      >
                        <CommandIcon icon={command.icon} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-slate-950 dark:text-white">
                            {command.title}
                          </span>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${getCategoryStyles(
                              command.category,
                            )}`}
                          >
                            {t(`categories.${command.category}`)}
                          </span>
                        </span>

                        <span className="mt-1 block truncate text-sm text-slate-500 dark:text-slate-400">
                          {command.description}
                        </span>
                      </span>

                      <span
                        className={`shrink-0 transition ${
                          isSelected
                            ? "translate-x-0 text-emerald-600 dark:text-emerald-400"
                            : "-translate-x-1 text-slate-300 group-hover:translate-x-0 group-hover:text-emerald-600 dark:text-slate-600 dark:group-hover:text-emerald-400"
                        }`}
                      >
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

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
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
                  count: filteredCommands.length,
                })}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
