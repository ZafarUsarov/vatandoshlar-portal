import TelegramCard, { type TelegramGroup } from "./TelegramCard";

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
          {telegramGroups.map((group, index) => (
            <TelegramCard
              key={group.shortName}
              group={group}
              index={index}
            />
          ))}
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