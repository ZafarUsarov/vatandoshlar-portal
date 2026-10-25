import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, MapPin, Building2 } from "lucide-react";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { listPublicPlaces, placeCategories } from "@/lib/places/places-repository";
import PlacesFilters from "@/components/places/PlacesFilters";
import { Link } from "@/i18n/navigation";
export const dynamic="force-dynamic";
const labels={uz:{title:"Biznes va tashkilotlar",subtitle:"Germaniyadagi vatandoshlar bizneslari va tashkilotlari",search:"Nomi yoki tavsifi bo‘yicha qidiring",city:"Barcha shaharlar",category:"Barcha yo‘nalishlar",find:"Qidirish",reset:"Tozalash",empty:"Hozircha mos joylar topilmadi.",details:"Batafsil",count:"ta joy",cats:{restaurant:"Restoran va kafe",hotel:"Mehmonxona",shop:"Do‘kon",service:"Xizmat",organization:"Tashkilot",other:"Boshqa"}},de:{title:"Unternehmen & Organisationen",subtitle:"Unternehmen und Organisationen der Community in Deutschland",search:"Nach Name oder Beschreibung suchen",city:"Alle Städte",category:"Alle Kategorien",find:"Suchen",reset:"Zurücksetzen",empty:"Noch keine passenden Orte gefunden.",details:"Details",count:"Orte",cats:{restaurant:"Restaurant & Café",hotel:"Hotel",shop:"Geschäft",service:"Dienstleistung",organization:"Organisation",other:"Sonstige"}}} as const;
export async function generateMetadata():Promise<Metadata>{const locale=(await getLocale())==='de'?'de':'uz';return {title:`${labels[locale].title} | Vatandoshlar.de`,description:labels[locale].subtitle,alternates:{canonical:`/${locale}/places`,languages:{uz:'/uz/places',de:'/de/places'}}};}
export default async function PlacesPage({searchParams}:{searchParams:Promise<{q?:string;category?:string;city?:string;location?:string;locationId?:string}>}){
 const locale=(await getLocale())==='de'?'de':'uz';const t=labels[locale];const params=await searchParams;const q=typeof params.q==='string'?params.q.trim().slice(0,100):'';const category=placeCategories.find(c=>c===params.category);const location=typeof params.location==='string'?params.location.trim().slice(0,100):'';const locationId=typeof params.locationId==='string' && /^\d{1,18}$/.test(params.locationId)?params.locationId:'';const places=await listPublicPlaces(locale,{q,category,location,locationId});
 return <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white"><Header/><main className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8"><div className="grid w-full min-w-0 overflow-hidden rounded-3xl bg-slate-900 text-white lg:h-[330px] lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
  <div className="flex min-w-0 flex-col justify-center px-7 py-9 sm:px-10 sm:py-10 lg:px-10 lg:py-8 xl:px-12">
    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Vatandoshlar.de</span>
    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{t.title}</h1>
    <p className="mt-4 max-w-2xl text-lg text-slate-200">{t.subtitle}</p>
  </div>
  <div className="relative aspect-[1115/613] w-full min-w-0 overflow-hidden bg-slate-900 lg:aspect-auto lg:h-full">
    <Image
      src="/images/places/places-collage-photos-clean.webp"
      alt={locale === "de" ? "Collage mit Restaurant, Klinik, Hotel, IT-Unternehmen und Bildungszentrum" : "Restoran, klinika, mehmonxona, IT kompaniya va o‘quv markazi kollaji"}
      fill
      sizes="(min-width: 1280px) 672px, (min-width: 1024px) 60vw, (min-width: 640px) 90vw, 100vw"
      className="object-cover object-center"
      priority
    />
  </div>
</div><PlacesFilters locale={locale} q={q} category={category??""} location={location} locationId={locationId}/><div className="mb-5 mt-10 text-sm font-medium text-slate-500 dark:text-slate-400">{places.length} {t.count}</div>{places.length===0?<div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">{t.empty}</div>:<div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 xl:grid-cols-3">
  {places.map((p) => {
    const categoryName = p.categoryLabel || t.cats[p.category];
    const CategoryIcon = Building2;
    const logoSrc = p.logoPath;
    return (
      <article key={p.slug} className="group relative flex w-full max-w-[326px] flex-col overflow-hidden rounded-[22px] border border-slate-200/90 bg-white px-5 pb-4 pt-5 shadow-[0_3px_12px_rgba(15,23,42,0.035)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-emerald-300 hover:shadow-[0_14px_32px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-emerald-500/80" aria-hidden="true" />
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex min-w-0 items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <CategoryIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            <span>{categoryName}</span>
          </span>
          {logoSrc ? (
            <div className="relative h-11 w-[92px] shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-white p-1 dark:border-slate-700" aria-label={`${p.name} logotipi`}>
              <Image unoptimized={logoSrc.startsWith("/api/")} src={logoSrc} alt={p.name} fill sizes="92px" className="object-contain p-1" />
            </div>
          ) : (
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-[250ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-700" />
          )}
        </div>
        <h2 className="mt-3 text-[19px] font-bold leading-snug tracking-tight text-slate-950 dark:text-white">{p.name}</h2>
        <div className="mt-2 flex items-start gap-1.5 text-[13px] leading-5 text-slate-500 dark:text-slate-400">
          <MapPin aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
          <span>{p.city} · {p.state}</span>
        </div>
        <div className="mt-3">
          <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
            <Link href={`/places/${p.slug}`} className="inline-flex items-center gap-2 text-[13px] font-semibold text-slate-900 transition-colors hover:text-emerald-700 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 dark:text-white dark:hover:text-emerald-400">
              {locale === "de" ? "Mehr erfahren" : "Batafsil ko‘rish"}
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-[250ms] group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    );
  })}
</div>}</main><Footer/></div>;
}
