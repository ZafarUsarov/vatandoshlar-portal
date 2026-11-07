import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Globe, Phone, Building2, GraduationCap, Stethoscope, UtensilsCrossed } from "lucide-react";
import SpecialistEmailPopover from "@/components/specialists/SpecialistEmailPopover";
import PlaceAddressPopover from "@/components/places/PlaceAddressPopover";
import PlaceMiniMap from "@/components/places/PlaceMiniMap";
import ShareButton from "@/components/shared/ShareButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { getDb } from "@/lib/db";
import { getPublicPlace } from "@/lib/places/places-repository";
import { getPlaceExtra } from "@/lib/places/place-extras";

const contactIconClass = "flex size-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition duration-300 motion-reduce:transform-none motion-reduce:transition-none hover:-translate-y-1 hover:scale-105 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-lg hover:shadow-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-900";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
type Founder = { slug: string; name: string; avatar_url: string | null };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const place = await getPublicPlace(locale, slug);
  return { title: place ? `${place.name} | UzDe` : "Places | UzDe", robots: place ? undefined : { index: false } };
}

export default async function PlaceDetail({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const place = await getPublicPlace(locale, slug);
  if (!place) notFound();
  const extra = getPlaceExtra(place.slug);
  const logoSrc = (place.slug === "marakand-restaurant" ? "/images/places/marakand-restaurant-transparent.webp" : place.logoPath) || (place.slug === "taste-of-samarkand" ? "/images/places/taste-of-samarkand.webp" : null);

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

  const CategoryIcon =
    place.category === "restaurant" ? UtensilsCrossed :
    place.slug === "polar-dent" ? Stethoscope :
    place.slug === "bildung-beruf" ? GraduationCap :
    Building2;

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
              {logoSrc && <div className={place.slug === "dill-vegan" ? "mb-5 inline-flex max-w-full items-center h-16 w-[148px] justify-center overflow-hidden rounded-lg bg-green-900 px-1 py-0" : "contents"}><Image unoptimized={logoSrc.startsWith("/api/")} src={logoSrc} alt={`${place.name} logotipi`} width={810} height={160} className={place.slug === "dill-vegan" ? "block h-auto max-h-16 w-auto max-w-full object-contain object-center" : "mb-5 h-auto max-h-20 w-auto max-w-full object-contain object-left"} priority /></div>}
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"><CategoryIcon aria-hidden="true" className="size-3.5 shrink-0" />{categoryLabel}</span>
              <h1 className={place.slug === "dill-vegan" ? "mt-4 text-3xl font-bold tracking-tight text-green-900 sm:text-4xl" : "mt-4 text-3xl font-bold tracking-tight sm:text-4xl"}>{place.name}</h1>
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
          {extra?.branches && <section className="mt-7 border-t border-slate-100 pt-6 dark:border-slate-800">
            <h2 className="text-lg font-bold">{locale === "de" ? "Standorte" : "Filiallar"}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {extra.branches.map(branch => <div key={branch.name} className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_10px_30px_rgba(16,185,129,0.13)] motion-reduce:transform-none motion-reduce:transition-none dark:border-emerald-900/50 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900 dark:hover:border-emerald-600/60">
                <h3 className="font-semibold">{branch.name}</h3>
                <PlaceAddressPopover address={branch.address} locale={locale} />
              </div>)}
            </div>
          </section>}

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {address && <a href={mapLink} target="_blank" rel="noopener noreferrer" aria-label={locale === "de" ? "In Google Maps öffnen" : "Xaritada ochish"} title={locale === "de" ? "In Google Maps öffnen" : "Xaritada ochish"} className={contactIconClass}><MapPin aria-hidden="true" className="size-5" /></a>}
            {place.website && /^https?:\/\//i.test(place.website) && <a href={place.website} target="_blank" rel="noopener noreferrer nofollow" aria-label={locale === "de" ? (extra?.websiteLabelDe ?? "Website besuchen") : (extra?.websiteLabelUz ?? "Veb-saytga o‘tish")} title={locale === "de" ? (extra?.websiteLabelDe ?? "Website besuchen") : (extra?.websiteLabelUz ?? "Veb-saytga o‘tish")} className={contactIconClass}><Globe aria-hidden="true" className="size-5" /></a>}
            {extra?.instagram && <a href={extra.instagram} target="_blank" rel="noopener noreferrer nofollow" aria-label="Instagram" title="Instagram" className={contactIconClass}><svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>}
              {extra?.phone && <a href={`tel:${extra.phone}`} aria-label={locale === "de" ? "Anrufen" : "Qo‘ng‘iroq qilish"} title={locale === "de" ? "Anrufen" : "Qo‘ng‘iroq qilish"} className={contactIconClass}><Phone aria-hidden="true" className="size-5" /></a>}
            <ShareButton title={place.name} locale={locale} iconOnly />
            {extra?.email && <SpecialistEmailPopover email={extra.email} label={locale === "de" ? "E-Mail" : "Email"} copyLabel={locale === "de" ? "Kopieren" : "Nusxalash"} composeLabel={locale === "de" ? "Schreiben" : "Xat yozish"} copiedLabel={locale === "de" ? "Kopiert" : "Nusxalandi"} copyFailedLabel={locale === "de" ? "Kopieren fehlgeschlagen" : "Nusxalab bo‘lmadi"} />}
          </div>
        </div>
        {extra?.manager && <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/40 sm:px-9">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{locale === "de" ? "Leitung" : "Rahbar"}</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">{extra.manager}</span>
          </div>
        </div>}
        {extra?.owner && <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/40 sm:px-9">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{locale === "de" ? "Gründer" : "Asoschi"}</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">{extra.owner}</span>
          </div>
        </div>}
        {founders.rows.length > 0 && <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/40 sm:px-9">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{locale === "de" ? "Gründer" : "Asoschi"}</span>
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
