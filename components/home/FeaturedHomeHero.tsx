import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { HomeFeatured } from "@/lib/featured/resolve-home-featured";

// Normalize legacy Uzbek orthography only for rendered homepage feature copy.
// Stored editorial content and non-Uzbek locales remain unchanged.
function homeUzText(value: string, de: boolean): string {
  if (de) return value;
  return value
    .replace(/([Oo])[‘’ʻʼ']/g, (_, letter: string) => letter === "O" ? "Ö" : "ö")
    .replace(/([Gg])[‘’ʻʼ']/g, (_, letter: string) => letter === "G" ? "Ǵ" : "ǵ")
    .replace(/ō/g, "ö")
    .replace(/Ō/g, "Ö");
}

export default function FeaturedHomeHero({ item, de }: { item: HomeFeatured; de: boolean }) {
  return (
    <section
      className="px-[clamp(12px,2vw,36px)] pb-[clamp(36px,5vw,80px)] pt-[clamp(20px,3vw,48px)]"
      aria-labelledby="uzde-featured-heading"
    >
      <div className="mb-4 flex items-center justify-between gap-4 border-b border-zinc-300 px-1 pb-4 text-[10px] font-semibold uppercase tracking-[0.2em] dark:border-zinc-700 sm:mb-6 sm:text-xs">
        <span>{de ? "UZDE / HAUPTTHEMA" : "UZDE / ASOSIY MAVZU"}</span>
        <span aria-hidden="true">01 / 01</span>
      </div>

      <Link
        href={item.href}
        aria-labelledby="uzde-featured-heading"
        className="group relative mx-auto block w-full max-w-[var(--uzde-layout-width)] overflow-hidden rounded-[10px] bg-[#102a31] text-white outline-none focus-visible:ring-4 focus-visible:ring-teal-400 focus-visible:ring-offset-4 dark:bg-[#0b2026] sm:rounded-[14px]"
      >
        <div className="relative grid min-h-[320px] w-full grid-cols-1 grid-rows-[minmax(320px,auto)] sm:min-h-0 sm:grid-rows-[minmax(0,1fr)] sm:aspect-[16/9] lg:aspect-[1.9/1] lg:max-h-[720px]">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt=""
              fill
              priority
              sizes="(min-width: 1600px) 1600px, 100vw"
              className="object-cover object-center transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.015]"
            />
          ) : (
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#102a31] dark:bg-[#0b2026]">
              <div className="absolute -right-[12%] -top-[45%] aspect-square w-[75%] rounded-full bg-teal-400/20 blur-3xl" />
              <div className="absolute -bottom-[65%] -left-[10%] aspect-square w-[65%] rounded-full bg-cyan-300/10 blur-3xl" />
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(120deg,transparent_49.8%,rgba(255,255,255,0.18)_50%,transparent_50.2%)]" />
            </div>
          )}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
          <div className="relative col-start-1 row-start-1 flex items-end justify-between gap-3 p-5 pb-7 sm:gap-8 sm:p-10 sm:pb-28 lg:p-14 lg:pb-32">
            <div className="min-w-0 max-w-[1050px]">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85 sm:mb-5 sm:text-xs">
                {homeUzText(item.category, de)}
              </p>
              <h1
                id="uzde-featured-heading"
                className="!text-white text-[clamp(1.8rem,5.5vw,5.8rem)] font-semibold leading-[1.05] tracking-[-0.015em] [overflow-wrap:anywhere]"
              >
                {homeUzText(item.title, de)}
              </h1>
              {item.description && (
                <p className="mt-3 max-w-[70ch] text-[clamp(12px,1.3vw,18px)] leading-relaxed !text-white/85 sm:mt-5">
                  {homeUzText(item.description, de)}
                </p>
              )}
            </div>
            <span aria-hidden="true" className="mb-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-white/60 !text-white text-xl transition-colors group-hover:bg-white group-hover:!text-zinc-950 group-focus-visible:bg-white group-focus-visible:!text-zinc-950 sm:size-12">
              ↗
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
