import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Globe } from "lucide-react";
import PlaceMiniMap from "@/components/places/PlaceMiniMap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { getDb } from "@/lib/db";
import { getPublicPlace } from "@/lib/places/places-repository";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
type Founder = { slug: string; name: string; avatar_url: string | null };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const place = await getPublicPlace(locale, slug);
  return { title: place ? `${place.name} | Vatandoshlar.de` : "Places | Vatandoshlar.de", robots: place ? undefined : { index: false } };
}

export default async function PlaceDetail({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const place = await getPublicPlace(locale, slug);
  if (!place) notFound();

  const founders = await getDb().query<Founder>(`
    SELECT s.slug, s.name, s.avatar_url
    FROM place_entrepreneurs pe
    JOIN places p ON p.id = pe.place_id
    JOIN specialists s ON s.id = pe.specialist_id
    WHERE p.slug = $1 AND p.status = 'published' AND s.status = 'published'
    ORDER BY s.name ASC
  `, [slug]);
  const address = [place.address, place.postalCode, place.city].filter(Boolean).join(", ");
  const mapQuery = place.latitude !== null && place.longitude !== null
    ? `${place.latitude},${place.longitude}`
    : `${address}, Germany`;

  const categoryLabel = place.categoryLabel || (place.category === "organization" ? (locale === "de" ? "Organisation" : "Tashkilot") : place.category);
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  return <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
    <Header />
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
      <Link href="/places" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-700 dark:text-slate-300">← {locale === "de" ? "Alle Orte" : "Barcha joylar"}</Link>
      <article className="mt-6 overflow-hidden rounded-[28px] border border-slate-200/90 bg-white shadow-[0_16px_50px_-32px_rgba(15,23,42,0.28)] dark:border-slate-800 dark:bg-slate-900">
        <div className="p-6 sm:p-9">
          <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_340px] md:items-start">
            <div className="min-w-0">
              {place.logoPath && <Image unoptimized={place.logoPath.startsWith("/api/")} src={place.logoPath} alt={`${place.name} logotipi`} width={810} height={160} className="mb-5 h-auto max-h-20 w-auto max-w-full object-contain object-left" priority />}
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"><span aria-hidden="true">✦</span>{categoryLabel}</span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{place.name}</h1>
              <div className="mt-4 flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                <svg aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
                <span>{address}</span>
              </div>
            </div>
            {address && <PlaceMiniMap
              query={mapQuery}
              mapLink={mapLink}
              title={locale === "de" ? `Karte: ${place.name}` : `${place.name} xaritasi`}
              openLabel={locale === "de" ? "In Google Maps öffnen" : "Xaritada ochish"}
              zoomInLabel={locale === "de" ? "Vergrößern" : "Yaqinlashtirish"}
              zoomOutLabel={locale === "de" ? "Verkleinern" : "Uzoqlashtirish"}
            />}
          </div>
          {place.description && <div className="mt-7 flex gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
            <svg aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 7c-3-2-6-2-9-1v13c3-1 6-1 9 1 3-2 6-2 9-1V6c-3-1-6-1-9 1Zm0 0v13"/></svg>
            <p className="whitespace-pre-line leading-7 text-slate-700 dark:text-slate-200">{place.description}</p>
          </div>}
          <div className="mt-6 flex flex-wrap gap-3">
            {address && <a href={mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-emerald-700 px-5 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-900/20"><MapPin aria-hidden="true" size={18} strokeWidth={1.8} className="shrink-0" />{locale === "de" ? "Auf Karte anzeigen" : "Xaritada ko‘rish"}</a>}
            {place.website && /^https?:\/\//i.test(place.website) && <a href={place.website} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"><Globe aria-hidden="true" size={18} strokeWidth={1.8} className="shrink-0" />{locale === "de" ? "Website besuchen" : "Veb-saytga o‘tish"}</a>}
          </div>
        </div>
        {founders.rows.length > 0 && <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/40 sm:px-9">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{locale === "de" ? "Gründer / Inhaber" : "Asoschisi"}</span>
            {founders.rows.map(founder => <Link key={founder.slug} href={`/specialists/${founder.slug}`} className="group inline-flex items-center gap-2 text-sm font-semibold transition hover:text-emerald-700 dark:hover:text-emerald-400">
              {founder.avatar_url?.startsWith("/images/specialists/")
                ? <Image src={founder.avatar_url} alt={founder.name} width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
                : <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700">•</span>}
              <span>{founder.name} <span aria-hidden="true">↗</span></span>
            </Link>)}
          </div>
        </div>}
      </article>
    </main>
    <Footer />
  </div>;
}
