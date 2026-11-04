import { getLocale } from "next-intl/server";
import { Handshake } from "lucide-react";
import ShareButton from "../shared/ShareButton";
import HomeShareMotion from "./HomeShareMotion";

export default async function HomeShareCTA() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const de = locale === "de";

  return (
    <HomeShareMotion>
    <section
      aria-labelledby="home-share-title"
      className="group bg-[#F0F2FA] px-6 py-4 lg:px-8 lg:py-5 dark:bg-[#20283B]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="home-share-icon flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-400/15 dark:text-indigo-300">
              <span className="inline-flex transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:scale-110 motion-reduce:transform-none">
                <Handshake size={23} aria-hidden="true" />
              </span>
            </div>
            <div className="home-share-copy min-w-0">
              <h2
                id="home-share-title"
                className="text-base font-semibold tracking-tight text-slate-950 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none dark:text-white"
              >
                {de
                  ? "Empfehlen Sie UzDe weiter"
                  : "UzDe’ni do‘stlaringizga tavsiya qiling"}
              </h2>
              <p className="mt-1 text-sm leading-5 text-slate-600 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none xl:whitespace-nowrap dark:text-slate-300">
                {de
                  ? "Helfen Sie anderen Usbeken in Deutschland, hilfreiche Informationen, Dienstleistungen und Möglichkeiten zu entdecken."
                  : "Germaniyadagi boshqa vatandoshlarimiz ham foydali ma’lumotlar, xizmatlar va imkoniyatlardan xabardor bo‘lishsin."}
              </p>
            </div>
          </div>
          <div className="home-share-action shrink-0 self-start transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transform-none lg:self-center">
            <ShareButton
              title={
                de
                  ? "UzDe – Plattform für Usbeken in Deutschland"
                  : "UzDe – Germaniyadagi o‘zbekistonliklar platformasi"
              }
              locale={locale}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          [data-home-share-motion] .home-share-icon,
          [data-home-share-motion] .home-share-copy,
          [data-home-share-motion] .home-share-action {
            opacity: 0;
            transition:
              opacity 800ms cubic-bezier(.22, 1, .36, 1),
              transform 800ms cubic-bezier(.22, 1, .36, 1);
          }

          [data-home-share-motion] .home-share-icon {
            transform: translateX(-50px);
          }

          [data-home-share-motion] .home-share-copy {
            transform: translateX(-35px);
            transition-delay: 120ms;
          }

          [data-home-share-motion] .home-share-action {
            transform: translateX(40px);
            transition-delay: 220ms;
          }

          [data-home-share-motion][data-visible="true"] .home-share-icon,
          [data-home-share-motion][data-visible="true"] .home-share-copy,
          [data-home-share-motion][data-visible="true"] .home-share-action {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
    </HomeShareMotion>
  );
}
