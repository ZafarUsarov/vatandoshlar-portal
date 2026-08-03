import { getTranslations } from "next-intl/server";

import { Link } from "../../i18n/navigation";

export default async function HeroSection() {
  const t = await getTranslations("Home");

  const quickLinks = [
    {
      title: t("quickLinks.official.title"),
      description: t("quickLinks.official.description"),
      href: "/news",
      label: t("quickLinks.official.title"),
      icon: (
        <svg
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
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
      ),
    },
    {
      title: t("quickLinks.services.title"),
      description: t("quickLinks.services.description"),
      href: "/services",
      label: t("quickLinks.services.title"),
      icon: (
        <svg
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            d="M14.25 6.25a4.5 4.5 0 0 0-5.9 5.9L3.5 17a2.12 2.12 0 0 0 3 3l4.85-4.85a4.5 4.5 0 0 0 5.9-5.9l-2.6 2.6-2.5-.5-.5-2.5 2.6-2.6Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: t("quickLinks.jobs.title"),
      description: t("quickLinks.jobs.description"),
      href: "/jobs",
      label: t("quickLinks.jobs.title"),
      icon: (
        <svg
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
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
      ),
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-emerald-500/25 blur-3xl" />

        <div className="absolute -bottom-48 left-0 h-[32rem] w-[32rem] rounded-full bg-teal-500/20 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-32">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            {t("hero.badge")}
          </div>

          <h1 className="mt-7 max-w-4xl text-balance text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl lg:leading-[1.05]">
            {t("hero.title")}

            <span className="block bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              {t("hero.highlight")}
            </span>
          </h1>

          <p className="mt-7 max-w-3xl text-pretty text-lg leading-8 text-slate-300 sm:text-xl">
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-7 py-4 font-bold text-white shadow-xl shadow-emerald-950/30 transition duration-300 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {t("hero.servicesCta")}

              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 12h14M14 7l5 5-5 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <Link
              href="/jobs"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {t("hero.jobsCta")}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                ✓
              </span>

              {t("hero.trust.officialSources")}
            </span>

            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                ✓
              </span>

              {t("hero.trust.verifiedListings")}
            </span>

            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                ✓
              </span>

              {t("hero.trust.mobileFriendly")}
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm font-semibold text-emerald-300">
                  Vatandoshlar.de
                </p>

                <p className="mt-1 text-xl font-bold">
                  {t("quickLinks.title")}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-xl font-black text-white">
                V
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 transition group-hover:bg-emerald-500 group-hover:text-white">
                    {item.icon}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-white">
                      {item.title}
                    </span>

                    <span className="mt-1 block text-sm leading-6 text-slate-400">
                      {item.description}
                    </span>
                  </span>

                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-slate-500 transition duration-300 group-hover:translate-x-1 group-hover:text-emerald-300"
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
                </Link>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-amber-300/15 bg-amber-300/10 p-4">
              <p className="text-sm font-semibold text-amber-200">
                {t("quickLinks.policy.title")}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {t("quickLinks.policy.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}