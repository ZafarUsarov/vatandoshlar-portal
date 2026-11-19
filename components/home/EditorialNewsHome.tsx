import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPublishedNews } from "@/lib/news/public-news-repository";
import { resolveHomeFeatured } from "@/lib/featured/resolve-home-featured";
import FeaturedHomeHero from "./FeaturedHomeHero";
import type { NewsItem } from "@/types/news";

function Photo({ item }: { item: NewsItem }) {
  return <div className={`relative w-full overflow-hidden rounded-md bg-zinc-200 dark:bg-zinc-800 aspect-[16/9]`}>
    {item.imageUrl ? <Image src={item.imageUrl} alt={item.title} fill sizes="(min-width: 2200px) 32vw, (min-width: 768px) 50vw, 100vw" className={item.slug === "vatandoshlar-de-endi-uzde" ? "object-contain" : item.slug === "pegasus-ozbekiston-germaniya-aviachiptalar-2026" ? "object-cover object-bottom" : "object-cover"} /> : <div aria-hidden="true" className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800" />}
  </div>;
}

export default async function EditorialNewsHome() {
  const de = (await getLocale()) === "de";
  const locale = de ? "de" : "uz";
  const featured = await resolveHomeFeatured(locale);
  const latest = (await getPublishedNews(locale, 3))
    .filter((item) => `/news/${item.slug}` !== featured.href)
    .slice(0, 2);
  const pad = "px-[clamp(16px,3.3vw,112px)]";
  return <div className="bg-[#f7f7f7] text-[#202020] dark:bg-[var(--uzde-home-surface)] dark:text-zinc-100">
    <FeaturedHomeHero item={featured} de={de} />
    <section className={`${pad} pb-[clamp(24px,3vw,56px)]`} aria-labelledby="uzde-editorial-news">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-zinc-300 pb-5 dark:border-zinc-700"><h2 id="uzde-editorial-news" className="text-[clamp(26px,4.5vw,80px)] font-semibold leading-none tracking-[-0.01em] [word-spacing:0.12em]">{de ? "AKTUELLE NACHRICHTEN" : "SÖNGGI XABARLAR"}</h2><Link href="/news" className="shrink-0 text-sm underline underline-offset-4">{de ? "Alle Nachrichten" : "Barça yangiliklar"}</Link></div>
      <div className="grid gap-x-[clamp(16px,2.5vw,48px)] gap-y-9 md:grid-cols-2 ">{latest.map(item => <Link key={item.id} href={`/news/${item.slug}`} className="group block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600">{item.imageUrl && <Photo item={item} />}<div className="flex items-start justify-between gap-5 pt-4"><div className="max-w-[70ch]"><p className="mb-2 text-xs uppercase tracking-widest text-zinc-500">{item.category}</p><h3 className="text-[clamp(20px,1.6vw,32px)] font-semibold leading-tight tracking-tight">{item.title}</h3>{item.excerpt && <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{item.excerpt}</p>}</div><span aria-hidden="true" className="text-xl">↗</span></div></Link>)}</div>
    </section>
  </div>;
}
