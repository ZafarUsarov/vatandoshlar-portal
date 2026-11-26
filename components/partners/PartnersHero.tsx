import mobile from "./PartnersMobile.module.css";
import { Inter_Tight } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import PartnershipNetwork from "./PartnershipNetwork";
import ShareButton from "@/components/shared/ShareButton";

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  weight: "600",
  display: "swap",
});

type PartnersHeroProps = Readonly<{
  locale: "uz" | "de";
  email: string;
  emailHref: string;
}>;

export default function PartnersHero({
  locale,
  email,
  emailHref,
}: PartnersHeroProps) {
  const de = locale === "de";

  return (
    <section
      aria-labelledby="partners-heading"
      className={`${mobile.hero} grid items-center gap-6 border-b border-dotted border-[var(--border-strong)] pb-6 pt-2 text-left sm:gap-8 sm:pb-8 lg:min-h-[350px] lg:grid-cols-[minmax(0,76fr)_minmax(0,24fr)] lg:gap-6 lg:py-8`}
    >
      <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
        UZDE. / {de ? "PARTNERSCHAFTEN" : "HAMKORLIK"}
      </p>

      <h1
        id="partners-heading"
        className={`${interTight.className} mt-4 text-[38px] font-semibold leading-[1.02] tracking-normal sm:text-[52px] lg:text-[clamp(56px,4.7vw,88px)]`}
      >
        {de ? "Partnerschaft mit UzDe." : "UzDe. bilan hamkorlik."}
      </h1>

      <div className="mt-5 max-w-[76ch]">
        <p className="text-[15px] font-medium leading-[1.5] sm:text-base lg:text-[18px]">
          {de
            ? "Neue Möglichkeiten für die Zusammenarbeit und gemeinsame Initiativen mit der usbekischen Gemeinschaft in Deutschland."
            : "Germaniyadagi vatandoşlar hamjamiyati bilan hamkorlik va qoşma taşabbuslar uçun yangi imkoniyatlar."}
        </p>


      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2 sm:mt-7">
        <a
          href={emailHref}
          className="group inline-flex min-h-11 items-center gap-6 border-b border-current pb-1 text-sm font-semibold transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-4 dark:hover:text-teal-300"
        >
          {de ? "Kontakt aufnehmen" : "Boǵlaniş"}
          <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
        </a>

        <a
          href={`mailto:${email}`}
          className="text-sm text-zinc-500 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-zinc-400 dark:hover:text-teal-300"
        >
          {email}
        </a>
      </div>
      </div>
      <div className={mobile.heroGraphic}>
        <PartnershipNetwork />
        <div className={mobile.heroShare}>
          <ShareButton
            title={de ? "Partnerschaft mit UzDe." : "UzDe. bilan hamkorlik."}
            locale={locale}
            variant="guide"
            iconOnly
            ariaLabel={de ? "Seite teilen" : "Sahifani ulaşiş"}
          />
        </div>
      </div>
    </section>
  );
}
