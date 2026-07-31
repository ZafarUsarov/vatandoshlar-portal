"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";

type CommandCategory =
  | "Asosiy"
  | "Yangilik"
  | "Xizmat"
  | "Ish"
  | "Hamjamiyat";

type CommandItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: CommandCategory;
  keywords: string[];
  icon:
    | "home"
    | "news"
    | "service"
    | "job"
    | "telegram"
    | "event";
};

const commands: CommandItem[] = [
  {
    id: "home",
    title: "Bosh sahifa",
    description: "Vatandoshlar.de asosiy sahifasiga o‘tish",
    href: "/",
    category: "Asosiy",
    keywords: [
      "bosh sahifa",
      "asosiy",
      "home",
      "portal",
    ],
    icon: "home",
  },
  {
    id: "news",
    title: "Rasmiy yangiliklar",
    description:
      "Germaniyada yashash, o‘qish va ishlash bo‘yicha ma’lumotlar",
    href: "/news",
    category: "Yangilik",
    keywords: [
      "yangilik",
      "rasmiy",
      "bamf",
      "elchixona",
      "integratsiya",
      "hujjat",
    ],
    icon: "news",
  },
  {
    id: "services",
    title: "Tekshirilgan xizmatlar",
    description:
      "Tarjimon, yurist, shifokor va boshqa mutaxassislarni topish",
    href: "/services",
    category: "Xizmat",
    keywords: [
      "xizmat",
      "tarjimon",
      "yurist",
      "advokat",
      "shifokor",
      "soliq",
      "maslahatchi",
    ],
    icon: "service",
  },
  {
    id: "translation-services",
    title: "Tarjimon va til xizmatlari",
    description:
      "Hujjat tarjimasi, rasmiy tasdiqlash va tarjimon topish",
    href: "/services/qasamyod-qilgan-tarjimonlar",
    category: "Xizmat",
    keywords: [
      "tarjimon",
      "tarjima",
      "til",
      "hujjat",
      "notar",
      "qasamyod",
    ],
    icon: "service",
  },
  {
    id: "legal-services",
    title: "Huquqiy xizmatlar",
    description:
      "Advokat, migratsiya va iste’molchilar huquqi bo‘yicha yordam",
    href: "/services/yuridik-yordam-va-huquqiy-xizmatlar",
    category: "Xizmat",
    keywords: [
      "huquq",
      "yuridik",
      "advokat",
      "migratsiya",
      "maslahat",
    ],
    icon: "service",
  },
  {
    id: "tax-services",
    title: "Soliq maslahatchisi",
    description:
      "Germaniyada soliq va deklaratsiya bo‘yicha ma’lumotlar",
    href: "/services/soliq-maslahatchisini-topish",
    category: "Xizmat",
    keywords: [
      "soliq",
      "steuer",
      "deklaratsiya",
      "maslahatchi",
      "finanzamt",
    ],
    icon: "service",
  },
  {
    id: "jobs",
    title: "Ish va karyera",
    description:
      "Minijob, Werkstudent, Ausbildung va professional ishlar",
    href: "/jobs",
    category: "Ish",
    keywords: [
      "ish",
      "job",
      "karyera",
      "minijob",
      "werkstudent",
      "ausbildung",
      "praktikum",
    ],
    icon: "job",
  },
  {
    id: "job-platforms",
    title: "Ish platformalari",
    description:
      "Germaniyadagi ishonchli ish qidirish portallari",
    href: "/jobs#job-platforms",
    category: "Ish",
    keywords: [
      "ish sayti",
      "arbeitsagentur",
      "stepstone",
      "linkedin",
      "eures",
      "xing",
    ],
    icon: "job",
  },
  {
    id: "minijob",
    title: "Germaniyada Minijob",
    description:
      "Minijob topish va ishlash qoidalari bo‘yicha qo‘llanma",
    href: "/jobs/germaniyada-minijob",
    category: "Ish",
    keywords: [
      "minijob",
      "ish",
      "qo‘shimcha ish",
      "oylik",
    ],
    icon: "job",
  },
  {
    id: "telegram",
    title: "Telegram guruhlari",
    description:
      "Bundeslandlar bo‘yicha faol o‘zbek hamjamiyatlari",
    href: "/telegram",
    category: "Hamjamiyat",
    keywords: [
      "telegram",
      "guruh",
      "hamjamiyat",
      "bundesland",
      "nrw",
      "berlin",
    ],
    icon: "telegram",
  },
  {
    id: "events",
    title: "Tadbirlar",
    description:
      "Uchrashuv, seminar, networking va madaniy tadbirlar",
    href: "/events",
    category: "Hamjamiyat",
    keywords: [
      "tadbir",
      "event",
      "seminar",
      "uchrashuv",
      "networking",
      "konsert",
    ],
    icon: "event",
  },
];

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase("uz")
    .replace(/[‘’ʼ`]/g, "'")
    .trim();
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
      <circle
        cx="10.75"
        cy="10.75"
        r="6.75"
      />
      <path
        d="m16 16 4.25 4.25"
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

function CommandIcon({
  icon,
}: {
  icon: CommandItem["icon"];
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

function getCategoryStyles(
  category: CommandCategory,
) {
  switch (category) {
    case "Yangilik":
      return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300";

    case "Xizmat":
      return "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300";

    case "Ish":
      return "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300";

    case "Hamjamiyat":
      return "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300";

    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
}

export default function CommandPalette() {
  const router = useRouter();
  const inputRef =
    useRef<HTMLInputElement>(null);
  const listRef =
    useRef<HTMLDivElement>(null);
  const prefersReducedMotion =
    useReducedMotion();

  const [isMounted, setIsMounted] =
    useState(false);
  const [isOpen, setIsOpen] =
    useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const filteredCommands = useMemo(() => {
    const normalizedQuery =
      normalizeText(query);

    if (!normalizedQuery) {
      return commands;
    }

    return commands.filter((command) => {
      const searchableText = normalizeText(
        [
          command.title,
          command.description,
          command.category,
          ...command.keywords,
        ].join(" "),
      );

      return searchableText.includes(
        normalizedQuery,
      );
    });
  }, [query]);

  const openPalette = useCallback(() => {
    setIsOpen(true);
    setSelectedIndex(0);
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const selectCommand = useCallback(
    (command: CommandItem) => {
      closePalette();
      router.push(command.href);
    },
    [closePalette, router],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (
      event: KeyboardEvent,
    ) => {
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

      if (
        event.key === "Escape" &&
        isOpen
      ) {
        event.preventDefault();
        closePalette();
      }
    };

    const handleOpenEvent = () => {
      openPalette();
    };

    window.addEventListener(
      "keydown",
      handleGlobalKeyDown,
    );

    window.addEventListener(
      "open-command-palette",
      handleOpenEvent as EventListener,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleGlobalKeyDown,
      );

      window.removeEventListener(
        "open-command-palette",
        handleOpenEvent as EventListener,
      );
    };
  }, [
    closePalette,
    isOpen,
    openPalette,
  ]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const focusTimer =
      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 50);

    return () => {
      window.clearTimeout(focusTimer);

      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

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

      setSelectedIndex(
        (currentIndex) => {
          if (
            filteredCommands.length === 0
          ) {
            return 0;
          }

          return (
            (currentIndex + 1) %
            filteredCommands.length
          );
        },
      );

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setSelectedIndex(
        (currentIndex) => {
          if (
            filteredCommands.length === 0
          ) {
            return 0;
          }

          return (
            (currentIndex -
              1 +
              filteredCommands.length) %
            filteredCommands.length
          );
        },
      );

      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      const selectedCommand =
        filteredCommands[selectedIndex];

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
          initial={
            prefersReducedMotion
              ? false
              : {
                  opacity: 0,
                }
          }
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: prefersReducedMotion
              ? 0
              : 0.18,
          }}
        >
          <motion.button
            type="button"
            aria-label="Qidiruv oynasini yopish"
            className="absolute inset-0 cursor-default bg-slate-950/65 backdrop-blur-md"
            onClick={closePalette}
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                  }
            }
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
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
              duration:
                prefersReducedMotion
                  ? 0
                  : 0.24,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            <h2
              id="command-palette-title"
              className="sr-only"
            >
              Tezkor qidiruv
            </h2>

            <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

            <div className="flex items-center gap-3 border-b border-slate-200 px-5 dark:border-slate-800">
              <span className="shrink-0 text-slate-400">
                <SearchIcon className="h-6 w-6" />
              </span>

              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) =>
                  setQuery(
                    event.target.value,
                  )
                }
                onKeyDown={
                  handleInputKeyDown
                }
                placeholder="Sahifa, xizmat yoki ma’lumotni qidiring..."
                autoComplete="off"
                spellCheck={false}
                className="h-20 min-w-0 flex-1 bg-transparent text-base font-medium text-slate-950 outline-none placeholder:text-slate-400 sm:text-lg dark:text-white"
                aria-label="Sayt bo‘yicha qidirish"
                aria-controls="command-palette-results"
                aria-activedescendant={
                  filteredCommands[
                    selectedIndex
                  ]
                    ? `command-${filteredCommands[selectedIndex].id}`
                    : undefined
                }
              />

              <button
                type="button"
                onClick={closePalette}
                className="shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
              >
                ESC
              </button>
            </div>

            <div
              ref={listRef}
              id="command-palette-results"
              role="listbox"
              className="max-h-[min(60vh,32rem)] overflow-y-auto p-2"
            >
              {filteredCommands.length >
              0 ? (
                filteredCommands.map(
                  (command, index) => {
                    const isSelected =
                      selectedIndex ===
                      index;

                    return (
                      <button
                        key={command.id}
                        id={`command-${command.id}`}
                        type="button"
                        role="option"
                        aria-selected={
                          isSelected
                        }
                        data-command-index={
                          index
                        }
                        onMouseEnter={() =>
                          setSelectedIndex(
                            index,
                          )
                        }
                        onClick={() =>
                          selectCommand(
                            command,
                          )
                        }
                        className={`group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition ${
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
                          <CommandIcon
                            icon={
                              command.icon
                            }
                          />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-slate-950 dark:text-white">
                              {
                                command.title
                              }
                            </span>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${getCategoryStyles(
                                command.category,
                              )}`}
                            >
                              {
                                command.category
                              }
                            </span>
                          </span>

                          <span className="mt-1 block truncate text-sm text-slate-500 dark:text-slate-400">
                            {
                              command.description
                            }
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
                  },
                )
              ) : (
                <div className="px-6 py-14 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                    <SearchIcon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">
                    Mos natija
                    topilmadi
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Boshqa kalit so‘z
                    bilan qayta qidirib
                    ko‘ring.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setQuery("")
                    }
                    className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                  >
                    Qidiruvni tozalash
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

                  Tanlash
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono dark:border-slate-700 dark:bg-slate-800">
                    ↵
                  </kbd>

                  Ochish
                </span>
              </div>

              <span>
                {
                  filteredCommands.length
                }{" "}
                ta natija
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}