import Link from "next/link";

type IconProps = {
  className?: string;
};

function ClockIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 7.8V12l3 1.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
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

export default function EventsEmptyState() {
  return (
    <div
      className="
        mt-14 overflow-hidden
        rounded-[2rem]
        border border-slate-200
        bg-white/90
        shadow-[0_24px_80px_-45px_rgba(15,23,42,0.40)]
        backdrop-blur-xl
        dark:border-white/[0.08]
        dark:bg-white/[0.04]
      "
    >
      <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
        <div
          className="
            relative flex min-h-72
            items-center justify-center
            overflow-hidden
            bg-gradient-to-br
            from-blue-600
            via-indigo-700
            to-slate-950
            p-10 text-white
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute -right-16 -top-20
              size-64 rounded-full
              border border-white/10
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute -bottom-20 -left-16
              size-56 rounded-full
              bg-blue-400/10 blur-3xl
            "
          />

          <div className="relative text-center">
            <div
              className="
                mx-auto flex size-20
                items-center justify-center
                rounded-3xl
                border border-white/15
                bg-white/10
                shadow-lg
                backdrop-blur-md
              "
            >
              <ClockIcon className="size-9" />
            </div>

            <p
              className="
                mt-6 text-xs font-semibold
                uppercase tracking-[0.16em]
                text-blue-200
              "
            >
              Tadbirlar kalendari
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-12">
          <span
            className="
              inline-flex w-fit rounded-full
              border border-amber-200
              bg-amber-50
              px-4 py-2
              text-sm font-semibold
              text-amber-700
              dark:border-amber-400/20
              dark:bg-amber-400/10
              dark:text-amber-300
            "
          >
            Hozircha yangi tadbir yo‘q
          </span>

          <h3
            className="
              mt-6 max-w-2xl
              text-3xl font-semibold
              tracking-[-0.035em]
              text-slate-950
              dark:text-white
            "
          >
            Tasdiqlangan tadbirlar tez orada shu yerda chiqadi
          </h3>

          <p
            className="
              mt-5 max-w-2xl
              text-base leading-8
              text-slate-600
              sm:text-lg
              dark:text-slate-400
            "
          >
            Portal manbasi noma’lum tadbirlarni joylashtirmaydi.
            Yangi tadbir rasmiy tashkilotchi sahifasi orqali
            tekshirilgandan keyin e’lon qilinadi.
          </p>

          <Link
            href="/events"
            className="
              group mt-8 inline-flex w-fit
              items-center gap-2
              rounded-full
              bg-blue-600
              px-6 py-3
              text-sm font-semibold
              text-white
              shadow-lg shadow-blue-600/20
              transition
              hover:-translate-y-0.5
              hover:bg-blue-700
            "
          >
            Tadbirlar sahifasini ochish

            <ArrowUpRightIcon
              className="
                size-4
                transition
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>
        </div>
      </div>
    </div>
  );
}