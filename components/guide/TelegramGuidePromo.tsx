type Props = Readonly<{
  locale: "uz" | "de";
  href: string;
}>;

function TelegramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6 shrink-0"
      fill="currentColor"
    >
      <path d="M20.7 4.4 3.9 10.9c-1.15.46-1.14 1.1-.21 1.39l4.31 1.35 1.66 5.08c.2.56.1.78.69.78.46 0 .66-.21.92-.46l2.07-2.01 4.3 3.17c.79.44 1.36.21 1.56-.73l2.82-13.29c.29-1.16-.44-1.68-1.32-1.33Z" />
    </svg>
  );
}

export default function TelegramGuidePromo({
  locale,
  href,
}: Props) {
  const copy =
    locale === "uz"
      ? {
          label: "Germaniya 360°",
          title: "Foydali qo‘llanmalarni Telegramda ham kuzating",
          body:
            "Germaniyada yashash, o‘qish, ishlash, nemis tili va kundalik hayotga oid foydali ma’lumotlarni Telegram kanalimizda ham ulashib boramiz.",
          username: "@Nemistili_uz",
          action: "Telegram kanaliga o‘tish",
        }
      : {
          label: "Germaniya 360°",
          title: "Praktische Guides auch auf Telegram verfolgen",
          body:
            "Im Telegram-Kanal teilen wir praktische Informationen rund um Leben, Lernen, Arbeiten, Deutsch und Alltag in Deutschland.",
          username: "@Nemistili_uz",
          action: "Zum Telegram-Kanal",
        };

  return (
    <aside
      aria-labelledby="telegram-guide-promo-title"
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 p-7 text-white shadow-sm sm:p-9 dark:border-slate-800"
    >
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-20 size-52 rounded-full bg-sky-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 left-10 size-48 rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-sky-500 text-white">
              <TelegramIcon />
            </span>
            <div>
              <p className="text-sm font-bold text-sky-300">{copy.label}</p>
              <p className="text-xs text-slate-400">{copy.username}</p>
            </div>
          </div>
          <h2
            id="telegram-guide-promo-title"
            className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {copy.title}
          </h2>
          <p className="mt-3 leading-7 text-slate-300">{copy.body}</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3 text-sm font-bold !text-slate-950 no-underline transition hover:-translate-y-0.5 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 sm:self-auto"
        >
          {copy.action}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </aside>
  );
}
