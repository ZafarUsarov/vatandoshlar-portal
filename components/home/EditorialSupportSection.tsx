import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function EditorialSupportSection() {
  const de = (await getLocale()) === "de";
  return (
    <section aria-labelledby="uzde-support-title" className="bg-[#202124] dark:bg-[var(--uzde-home-surface)] px-[clamp(16px,3.3vw,112px)] pt-0 pb-[clamp(40px,5vw,88px)] text-white">
      <div className="border-t border-white/25 pt-8">
        <p className="mb-6 text-xs font-medium tracking-[0.15em] text-white/60">UZDE / {de ? "UNTERSTÜTZEN" : "QÖLLAB-QUVVATLAŞ"}</p>
        <div className="grid gap-9 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <h2 id="uzde-support-title" className="max-w-[20ch] text-[clamp(32px,4.3vw,76px)] font-semibold leading-[1.1] tracking-[-0.01em] [word-spacing:0.08em]">
            {de ? "DIESES PROJEKT IST FÜR UNS ALLE DA." : "BU LOYIHA BARCHAMIZNIKI."}
          </h2>
          <div className="flex flex-col items-start justify-end gap-9">
            <p className="max-w-[52ch] text-base leading-relaxed text-white/75 sm:text-lg">
              {de ? "Gemeinsam schaffen wir hilfreiche Informationen und neue Möglichkeiten für die usbekische Community in Deutschland. Mit Ihrem freiwilligen Beitrag helfen Sie uns, dieses Projekt weiterzuentwickeln." : "Germaniyadagi özbeklar uchun foydali ma’lumotlar va yangi imkoniyatlarni birgalikda yaratamiz. Sizning ixtiyoriy hissangiz bu işni davom ettirişga yordam beradi."}
            </p>
            <Link href="/support" className="inline-flex min-h-12 items-center border-b border-white pb-2 text-base font-semibold transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              {de ? "Gemeinsam etwas beitragen" : "Loyihamizga hissa qöşing"}<span aria-hidden="true" className="ml-8">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
