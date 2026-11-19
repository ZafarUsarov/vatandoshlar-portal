import { getLocale } from "next-intl/server";
import HomeNativeShareButton from "./HomeNativeShareButton";
import HomeShareMotion from "./HomeShareMotion";

export default async function HomeShareCTA() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const de = locale === "de";

  return (
    <HomeShareMotion>
      <section
        aria-labelledby="home-share-title"
        className="bg-[#fafafa] px-[clamp(16px,3.3vw,112px)] py-7 text-zinc-950 dark:bg-[var(--uzde-home-surface)] dark:text-white sm:py-10"
      >
        <div className="border-y border-zinc-200 py-7 dark:border-zinc-800 sm:py-9">
          <p className="mb-5 text-xs font-medium tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
            UZDE / {de ? "TEILEN" : "ULASHISH"}
          </p>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="min-w-0">
              <h2
                id="home-share-title"
                className="text-[clamp(28px,3.2vw,56px)] font-semibold leading-[1.08] tracking-[-0.01em] [word-spacing:0.08em]"
              >
                {de ? "WENN ES HILFT, TEILEN SIE ES." : "FOYDALI BÖLSA, ULASHING."}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
                {de ? "Erzählen Sie auch Ihren Freunden von UzDe." : "UzDe haqida döstlaringizga ham xabar bering."}
              </p>
            </div>
            <div className="shrink-0 self-start lg:self-end">
              <HomeNativeShareButton
                title={de ? "UzDe – Plattform für Usbeken in Deutschland" : "UzDe – Germaniyadagi özbekistonliklar platformasi"}
                locale={locale}
              />
            </div>
          </div>
        </div>
      </section>
    </HomeShareMotion>
  );
}
