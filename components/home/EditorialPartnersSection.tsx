import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// Add verified partner records here when partnerships are confirmed.
// No logos or claims are rendered while this collection is empty.
const partners: ReadonlyArray<{ name: string; logo: string; url: string }> = [];

export default async function EditorialPartnersSection() {
  const de = (await getLocale()) === "de";

  return (
    <section aria-labelledby="uzde-partners-title" className="overflow-hidden bg-[#f7f7f7] px-[clamp(16px,3.3vw,112px)] pt-0 pb-[clamp(40px,5vw,88px)] text-zinc-900 dark:bg-[var(--uzde-home-surface)] dark:text-white">
      <div className="border-t border-zinc-300 pt-8 dark:border-zinc-700">
        <p className="mb-6 text-xs font-medium tracking-[0.15em] text-zinc-500 dark:text-zinc-400">UZDE / {de ? "PARTNERSCHAFTEN" : "HAMKORLIK"}</p>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <h2 id="uzde-partners-title" className="max-w-[19ch] text-[clamp(34px,4.6vw,84px)] font-semibold leading-[1.08] tracking-[-0.01em] [word-spacing:0.08em]">
            {de ? "GEMEINSAM MEHR ERREICHEN." : "BIRGALIKDA KÖPROQ IMKONIYAT."}
          </h2>
          <div className="flex flex-col items-start justify-end gap-9">
            <p className="max-w-[51ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg">
              {de ? "Erreichen Sie die usbekischsprachige Community in Deutschland. Präsentieren Sie Ihr Projekt über UzDe und entdecken Sie neue Möglichkeiten der Zusammenarbeit." : "Germaniyadagi özbek tilida sözlaşuvçi auditoriya bilan boǵlaning. UzDe orqali loyihangizni taniting va yangi hamkorlik imkoniyatlarini kaşf eting."}
            </p>
            <Link href="/partners" className="inline-flex min-h-12 items-center border-b border-current pb-2 text-base font-semibold transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current">
              {de ? "Partnerschaft anfragen" : "Hamkorlikni boshlang"}<span aria-hidden="true" className="ml-8">↗</span>
            </Link>
          </div>
        </div>
        {partners.length > 0 && (
          <div className="mt-16 border-t border-zinc-300 pt-8 dark:border-zinc-700">
            <p className="mb-6 text-sm">{de ? "Unsere Partner" : "Hamkorlar"}</p>
            <div className="flex flex-wrap items-center gap-10">
              {partners.map((partner) => (
                <a key={partner.url} href={partner.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4" aria-label={partner.name}>
                  {/* Partner logos are rendered only after verified data is supplied. */}
                  <img src={partner.logo} alt={partner.name} className="h-12 w-auto max-w-40 object-contain" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
