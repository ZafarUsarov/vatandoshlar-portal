type TelegramGroup = {
  state: string;
  shortName: string;
  description: string;
  href: string | null;
  button: string;
  status: "Faol" | "Tez orada";
};

const telegramGroups: TelegramGroup[] = [
  {
    state: "Nordrhein-Westfalen",
    shortName: "NRW",
    description:
      "NRW vatandoshlari Telegram hamjamiyatiga qo‘shilish uchun rasmiy botdan foydalaning.",
    href: "https://t.me/NRW_Vatandoshlar_bot",
    button: "Bot orqali qo‘shilish",
    status: "Faol",
  },
  {
    state: "Baden-Württemberg",
    shortName: "BW",
    description:
      "Baden-Württemberg hududidagi vatandoshlar uchun Telegram guruhi.",
    href: "https://t.me/baden_wurttemberg_vatandoshlar",
    button: "Telegramga qo‘shilish",
    status: "Faol",
  },
  {
    state: "Schleswig-Holstein",
    shortName: "SH",
    description:
      "Schleswig-Holstein hududidagi vatandoshlar uchun Telegram guruhi.",
    href: "https://t.me/SH_Vatandoshlar",
    button: "Telegramga qo‘shilish",
    status: "Faol",
  },
  {
    state: "Berlin",
    shortName: "BE",
    description: "Berlin uchun Telegram guruhi tez orada qo‘shiladi.",
    href: null,
    button: "Tez orada",
    status: "Tez orada",
  },
  {
    state: "Bayern",
    shortName: "BY",
    description: "Bayern uchun Telegram guruhi tez orada qo‘shiladi.",
    href: null,
    button: "Tez orada",
    status: "Tez orada",
  },
  {
    state: "Brandenburg",
    shortName: "BB",
    description: "Brandenburg uchun Telegram guruhi tez orada qo‘shiladi.",
    href: null,
    button: "Tez orada",
    status: "Tez orada",
  },
  {
    state: "Bremen",
    shortName: "HB",
    description: "Bremen uchun Telegram guruhi tez orada qo‘shiladi.",
    href: null,
    button: "Tez orada",
    status: "Tez orada",
  },
  {
    state: "Hamburg",
    shortName: "HH",
    description: "Hamburg uchun Telegram guruhi tez orada qo‘shiladi.",
    href: null,
    button: "Tez orada",
    status: "Tez orada",
  },
  {
    state: "Hessen",
    shortName: "HE",
    description: "Hessen uchun Telegram guruhi tez orada qo‘shiladi.",
    href: null,
    button: "Tez orada",
    status: "Tez orada",
  },
  {
    state: "Mecklenburg-Vorpommern",
    shortName: "MV",
    description:
      "Mecklenburg-Vorpommern uchun Telegram guruhi tez orada qo‘shiladi.",
    href: null,
    button: "Tez orada",
    status: "Tez orada",
  },
  {
    state: "Niedersachsen",
    shortName: "NI",
    description: "Niedersachsen uchun Telegram guruhi tez orada qo‘shiladi.",
    href: null,
    button: "Tez orada",
    status: "Tez orada",
  },
  {
    state: "Rheinland-Pfalz",
    shortName: "RP",
    description: "Rheinland-Pfalz uchun Telegram guruhi tez orada qo‘shiladi.",
    href: null,
    button: "Tez orada",
    status: "Tez orada",
  },
  {
    state: "Saarland",
    shortName: "SL",
    description: "Saarland uchun Telegram guruhi tez orada qo‘shiladi.",
    href: null,
    button: "Tez orada",
    status: "Tez orada",
  },
  {
    state: "Sachsen",
    shortName: "SN",
    description: "Sachsen uchun Telegram guruhi tez orada qo‘shiladi.",
    href: null,
    button: "Tez orada",
    status: "Tez orada",
  },
  {
    state: "Sachsen-Anhalt",
    shortName: "ST",
    description: "Sachsen-Anhalt uchun Telegram guruhi tez orada qo‘shiladi.",
    href: null,
    button: "Tez orada",
    status: "Tez orada",
  },
  {
    state: "Thüringen",
    shortName: "TH",
    description: "Thüringen uchun Telegram guruhi tez orada qo‘shiladi.",
    href: null,
    button: "Tez orada",
    status: "Tez orada",
  },
];

interface IconProps {
  className?: string;
}

function TelegramIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M21.5 3.5 2.8 10.7c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.9 6c.2.6.1.8.8.8.5 0 .8-.2 1.1-.5l2.7-2.6 5.6 4.1c1 .6 1.8.3 2.1-.9L23 4.8c.4-1.7-.6-2.5-1.5-1.3Z" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function TelegramSection() {
  return (
    <section
      id="telegram"
      aria-labelledby="telegram-heading"
      className="
        relative isolate overflow-hidden
        bg-gradient-to-b
        from-sky-50
        via-white
        to-slate-50
        py-24 sm:py-28 lg:py-32
        dark:from-slate-950
        dark:via-slate-950
        dark:to-slate-900
      "
    >
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_28%)]
        "
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <div
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-sky-200
                bg-sky-100/80
                px-3 py-1.5
                text-xs font-semibold
                uppercase tracking-[0.16em]
                text-sky-700
                dark:border-sky-400/20
                dark:bg-sky-400/10
                dark:text-sky-300
              "
            >
              <TelegramIcon className="size-4" />
              Telegram hamjamiyati
            </div>

            <h2
              id="telegram-heading"
              className="
                mt-6
                text-3xl
                font-semibold
                tracking-[-0.04em]
                text-slate-950
                sm:text-4xl
                lg:text-5xl
                dark:text-white
              "
            >
              Germaniya bo‘ylab vatandoshlar Telegram hamjamiyatlari
            </h2>

            <p
              className="
                mt-5
                max-w-2xl
                text-base
                leading-8
                text-slate-600
                sm:text-lg
                dark:text-slate-400
              "
            >
              O‘zingiz yashayotgan federal yer guruhiga qo‘shiling, tajriba
              almashing, foydali ma’lumotlar va e’lonlarni birinchi bo‘lib oling.
            </p>
          </div>

          <a
            href="https://t.me/Vatandoshlar_de"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vatandoshlar.de rasmiy Telegram kanalini ochish"
            className="
              group hidden
              items-center gap-2
              rounded-full
              bg-sky-600
              px-5 py-3
              text-sm font-semibold
              text-white
              shadow-lg shadow-sky-600/25
              transition
              hover:-translate-y-0.5
              hover:bg-sky-700
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-sky-500
              focus-visible:ring-offset-2
              lg:inline-flex
              dark:focus-visible:ring-offset-slate-950
            "
          >
            Rasmiy Telegram kanali

            <ArrowUpRightIcon
              className="
                size-4
                transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </a>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {telegramGroups.map((group, index) => {
            const isActive = group.status === "Faol";

            return (
              <article
                key={group.shortName}
                className={`
                  group relative flex h-full flex-col overflow-hidden
                  rounded-[2rem]
                  border
                  p-6
                  backdrop-blur-xl
                  transition duration-500
                  hover:-translate-y-1.5
                  ${
                    isActive
                      ? "border-sky-200 bg-white shadow-[0_20px_60px_-35px_rgba(14,165,233,.35)] dark:border-sky-400/20 dark:bg-white/[0.04]"
                      : "border-slate-200 bg-white/70 dark:border-white/[0.08] dark:bg-white/[0.03]"
                  }
                `}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`
                      flex h-16 w-16 items-center justify-center
                      rounded-2xl text-lg font-bold
                      ${
                        isActive
                          ? "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"
                          : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400"
                      }
                    `}
                  >
                    {group.shortName}
                  </div>

                  <span
                    className={`
                      rounded-full px-3 py-1.5
                      text-xs font-semibold
                      ${
                        isActive
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                          : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400"
                      }
                    `}
                  >
                    {group.status}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-950 dark:text-white">
                  {group.state}
                </h3>

                <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-400">
                  {group.description}
                </p>

                {group.href ? (
                  <a
                    href={group.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${group.state} Telegram hamjamiyatiga qo‘shilish`}
                    className="
                      group/button mt-7 inline-flex w-full
                      items-center justify-center gap-2
                      rounded-2xl
                      bg-sky-600
                      px-5 py-3.5
                      text-sm font-semibold
                      text-white
                      shadow-lg shadow-sky-600/20
                      transition
                      hover:-translate-y-0.5
                      hover:bg-sky-700
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-sky-500
                      focus-visible:ring-offset-2
                      dark:focus-visible:ring-offset-slate-950
                    "
                  >
                    {group.button}

                    <ArrowUpRightIcon
                      className="
                        size-4
                        transition-transform duration-300
                        group-hover/button:translate-x-0.5
                        group-hover/button:-translate-y-0.5
                      "
                    />
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="
                      mt-7 inline-flex w-full
                      cursor-not-allowed
                      items-center justify-center
                      rounded-2xl
                      border border-slate-200
                      bg-slate-100
                      px-5 py-3.5
                      text-sm font-semibold
                      text-slate-500
                      dark:border-white/[0.08]
                      dark:bg-white/[0.04]
                      dark:text-slate-500
                    "
                  >
                    {group.button}
                  </span>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center lg:hidden">
          <a
            href="https://t.me/Vatandoshlar_de"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vatandoshlar.de rasmiy Telegram kanalini ochish"
            className="
              group inline-flex
              items-center gap-2
              rounded-full
              bg-sky-600
              px-5 py-3
              text-sm font-semibold
              text-white
              shadow-lg shadow-sky-600/25
              transition
              hover:-translate-y-0.5
              hover:bg-sky-700
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-sky-500
              focus-visible:ring-offset-2
              dark:focus-visible:ring-offset-slate-950
            "
          >
            Rasmiy Telegram kanali

            <ArrowUpRightIcon
              className="
                size-4
                transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </a>
        </div>
      </div>
    </section>
  );
}