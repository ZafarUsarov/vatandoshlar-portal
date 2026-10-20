import { getTravelAuthorProfiles } from "@/lib/travel/travel-author-profiles";
import { parcelCargoLabels, parcelPaymentLabels } from "@/lib/travel/parcel-details";
import { companionHelpLabels, companionRelationshipLabels } from "@/lib/travel/companion-details";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { CalendarDays, Clock3, Armchair, CarFront, UsersRound, Package, ArrowLeft, Wallet, Plane, MapPin, CheckCircle2, ShieldCheck, UserRound, Building2, Hash, Route, ArrowRight, Weight, Ruler, Handshake, FileText, CreditCard } from "lucide-react";
import Header from "@/components/Header";
import PublicUserAvatar from "@/components/account/PublicUserAvatar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { getExpiredPublishedTravelBySlug, getPublishedTravelBySlug } from "@/lib/travel/travel-repository";
import { travelKinds, travelModes } from "@/lib/travel/travel-labels";
import TravelRouteSummary from "@/components/travel/TravelRouteSummary";
import { readableTravelDescription } from "@/lib/travel/travel-description";
import CompanionShareButton from "@/components/travel/CompanionShareButton";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Safarlar | E’lon" };
export default async function TravelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const { slug } = await params;
  const item = await getPublishedTravelBySlug(slug);
  if (!item) {
    const expired = await getExpiredPublishedTravelBySlug(slug);
    if (!expired) notFound();
    const de = locale === "de";
    return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white"><Header />
      <main className="mx-auto max-w-3xl px-5 pb-20 pt-32 sm:px-8">
        <Link href="/safar" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400"><ArrowLeft size={16} />{de ? "Zurück zu Reisen" : "Safarlarga qaytish"}</Link>
        <section className="mt-8 rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
          <h1 className="text-xl font-semibold">{de ? "Diese Reiseanzeige ist abgelaufen" : "Bu safar e’lonining muddati tugagan"}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{de ? "Die Abreise liegt bereits zurück. Diese Anzeige wird nicht mehr in der Suche angezeigt." : "Safar sanasi o‘tib ketgan. Bu e’lon endi qidiruv natijalarida ko‘rsatilmaydi."}</p>
        </section>
      </main><Footer /></div>;
  }
  const de = locale === "de";
  const date = new Date(item.departureAt);
  const formattedDate = date.toLocaleDateString(de ? "de-DE" : "uz-UZ", { timeZone: item.departureTimezone, dateStyle: "long" });
  const formattedTime = date.toLocaleTimeString(de ? "de-DE" : "uz-UZ", { timeZone: item.departureTimezone, hour: "2-digit", minute: "2-digit" });
  const Icon = item.kind.startsWith("ride_") ? CarFront : item.kind.startsWith("companion_") ? UsersRound : Package;
  const description = readableTravelDescription(item.description, item.originCity, item.destinationCity);
  if (item.kind.startsWith("parcel_")) {
    const parcel = item.parcelStructured;
    const profiles = await getTravelAuthorProfiles([item.authorUserId]);
    const author = profiles[item.authorUserId];
    const card = "min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_3px_20px_rgba(15,23,42,0.035)] dark:border-slate-800 dark:bg-slate-900 sm:p-6";
    const isOffer = item.kind === "parcel_offer";
    const purpose = isOffer ? (de ? "Ich kann eine Sendung mitnehmen" : "Yuk olib keta olaman") : (de ? "Ich möchte etwas versenden" : "Yuk yubormoqchiman");
    const cost = parcel?.paymentType === "negotiable" || item.priceAmount === null ? (de ? "Preis verhandelbar" : "Narx kelishiladi") : Number(item.priceAmount) === 0 ? (de ? "Kostenlos" : "Bepul") : `${new Intl.NumberFormat(de ? "de-DE" : "uz-UZ", {maximumFractionDigits:2}).format(Number(item.priceAmount))} ${item.priceCurrency ?? ""}`;
    const details: { label: string; value: string; icon: typeof Package }[] = [
      {label: de ? "Datum" : "Sana", value: `${formattedDate}${parcel?.flexibleDate ? (de ? " · flexibel" : " · taxminiy") : ` · ${formattedTime}`}`, icon: CalendarDays},
      ...(parcel ? [{label: de ? "Sendungsart" : "Yuk turi", value: parcelCargoLabels[parcel.cargoType][locale], icon: Package}] : []),
      {label: de ? "Zahlungsart" : "To‘lov turi", value: parcel ? parcelPaymentLabels[parcel.paymentType][locale] : (de ? "Nicht angegeben" : "Ko‘rsatilmagan"), icon: CreditCard},
      {label: de ? "Preis" : "Narx", value: cost, icon: Wallet},
      ...(parcel?.weightKg != null ? [{label: de ? "Gewicht" : "Og‘irlik", value: `${parcel.weightKg} kg`, icon: Weight}] : []),
      ...(parcel?.dimensions ? [{label: de ? "Maße" : "O‘lcham", value: parcel.dimensions, icon: Ruler}] : []),
    ];
    const notes = [item.parcelDetails, description].filter((v): v is string => Boolean(v?.trim())).filter((v,i,a) => a.indexOf(v) === i);
    return <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white"><Header/><main className="mx-auto w-full max-w-6xl min-w-0 px-3 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
      <Link href="/safar?service=parcel" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900 dark:text-emerald-400"><ArrowLeft size={16}/>{de ? "Zurück zu Sendungen" : "Jo‘natmalarga qaytish"}</Link>
      <div className="mt-4 grid min-w-0 items-start gap-3 sm:mt-5 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_290px]">
        <div className="min-w-0 space-y-3 sm:space-y-5">
          <section className={`${card} overflow-hidden`}>
            <div className="flex flex-wrap items-center justify-between gap-3"><span className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"><Package size={14} className="mr-1.5"/>{purpose}</span><span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400 sm:text-xl">{cost}</span></div>
            <h1 className="mt-4 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xl font-extrabold tracking-tight sm:text-3xl"><span className="break-words">{item.originCity}</span><ArrowRight size={23} className="shrink-0 text-emerald-600"/><span className="break-words">{item.destinationCity}</span></h1>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-500 dark:text-slate-400"><span><MapPin size={13} className="mr-1 inline"/>{item.originCountryCode}{item.originRegionCode ? ` · ${item.originRegionCode}` : ""}</span><span><MapPin size={13} className="mr-1 inline"/>{item.destinationCountryCode}{item.destinationRegionCode ? ` · ${item.destinationRegionCode}` : ""}</span></div>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800"><span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"><CalendarDays size={14}/>{formattedDate}</span>{parcel && <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">{parcelCargoLabels[parcel.cargoType][locale]}</span>}</div>
          </section>
          {item.imageKey && <section className={`${card} p-2 sm:p-3`}><img src={`/api/travel/images/${item.id}`} alt={de ? "Bild der Sendung" : "Jo‘natma rasmi"} className="max-h-72 w-full rounded-2xl object-contain"/></section>}
          <section className={card}><h2 className="flex items-center gap-2 text-base font-bold sm:text-lg"><Package size={19} className="text-emerald-700"/>{de ? "Sendungsdetails" : "Jo‘natma ma’lumotlari"}</h2><dl className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-2.5">{details.map(({label,value,icon:DetailIcon}) => <div key={label} className="flex min-w-0 flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 sm:flex-row sm:gap-3 sm:rounded-2xl sm:p-3 dark:border-slate-800 dark:bg-slate-950/40"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:h-9 sm:w-9 sm:rounded-xl bg-white text-emerald-700 shadow-sm dark:bg-slate-800 dark:text-emerald-400"><DetailIcon size={17}/></div><div className="min-w-0"><dt className="text-xs text-slate-500 dark:text-slate-400">{label}</dt><dd className="mt-0.5 break-words text-sm font-semibold">{value}</dd></div></div>)}</dl>
            {parcel?.handover && <div className="mt-3 flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/40"><Handshake size={19} className="mt-0.5 shrink-0 text-emerald-700"/><div className="min-w-0"><p className="text-xs text-slate-500">{de ? "Übergabe / Abholung" : "Qabul qilish / topshirish"}</p><p className="mt-1 whitespace-pre-wrap break-words text-sm font-semibold">{parcel.handover}</p></div></div>}
          </section>
          {notes.length > 0 && <section className={card}><h2 className="flex items-center gap-2 text-base font-bold sm:text-lg"><FileText size={19} className="text-emerald-700"/>{de ? "Weitere Angaben" : "Qo‘shimcha ma’lumot"}</h2><div className="mt-3 space-y-2">{notes.map((note,i) => <p key={i} className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700 dark:text-slate-300">{note}</p>)}</div></section>}
          <section className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900 dark:bg-emerald-950/30 sm:p-5"><h2 className="flex items-center gap-2 text-sm font-bold text-emerald-900 dark:text-emerald-200"><ShieldCheck size={18}/>{de ? "Sicherheitshinweise" : "Xavfsizlik bo‘yicha tavsiyalar"}</h2><p className="mt-2 text-xs leading-6 text-emerald-900/80 dark:text-emerald-200/80">{de ? "Versenden Sie keine verbotenen Gegenstände. Veröffentlichen Sie keine Passnummern oder persönlichen Dokumente. Vereinbaren Sie die Übergabe nur mit vertrauenswürdigen Personen." : "Taqiqlangan buyumlarni jo‘natmang. Pasport raqamlari va shaxsiy hujjatlarni ommaga joylamang. Topshirish shartlarini ishonchli odamlar bilan kelishing."}</p></section>
        </div>
        <aside className="min-w-0 space-y-4 lg:sticky lg:top-24"><section className={card}><h2 className="text-base font-bold">{de ? "Inserent" : "E’lon beruvchi"}</h2><div className="mt-4 flex min-w-0 items-center gap-3"><div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-slate-100 ring-2 ring-emerald-400/60 shadow-[0_3px_12px_rgba(5,150,105,0.18)] dark:border-slate-900 dark:ring-emerald-400/50 text-slate-500 dark:bg-slate-800"><PublicUserAvatar name={author?.displayName} avatarUrl={author?.avatarUrl} size="md" /></div><div className="min-w-0"><p className="truncate text-sm font-bold">{author?.displayName || (de ? "Mitglied" : "Foydalanuvchi")}</p><p className="mt-1 text-xs text-slate-500">{author?.ratingAverage != null && author.ratingCount > 0 ? `${author.ratingAverage.toFixed(1)} (${author.ratingCount})` : (de ? "Noch nicht bewertet" : "Hali baholanmagan")}</p></div></div><div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 dark:bg-emerald-950"><p className="text-xs text-emerald-800 dark:text-emerald-300">{de ? "Preis" : "Narx"}</p><p className="mt-1 text-xl font-extrabold text-emerald-800 dark:text-emerald-300">{cost}</p>{parcel && <p className="mt-1 text-xs text-emerald-800/75 dark:text-emerald-300/75">{parcelPaymentLabels[parcel.paymentType][locale]}</p>}</div><p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">{de ? "Direkte Kontaktaufnahme ist derzeit nicht verfügbar." : "Bevosita bog‘lanish hozircha mavjud emas."}</p></section><section className={card}><h2 className="text-sm font-bold">{de ? "Anzeige teilen" : "E’lonni ulashish"}</h2><div className="mt-3"><CompanionShareButton de={de} title={`${purpose} — ${item.originCity} → ${item.destinationCity}`}/></div></section></aside>
      </div>
    </main><Footer/></div>;
  }
  if (item.kind.startsWith("companion_") && item.companionDetails) {
    const c = item.companionDetails;
    const companionProfiles = await getTravelAuthorProfiles([item.authorUserId]);
    const companionAuthor = companionProfiles[item.authorUserId];
    const isRequest = item.kind === "companion_request";
    const money = item.priceAmount === null ? null : Number(item.priceAmount) === 0 ? (de ? "Kostenlos" : "Bepul") : item.priceCurrency ? new Intl.NumberFormat(de ? "de-DE" : "uz-UZ", { style: "currency", currency: item.priceCurrency, maximumFractionDigits: 2 }).format(Number(item.priceAmount)) : new Intl.NumberFormat(de ? "de-DE" : "uz-UZ", { maximumFractionDigits: 2 }).format(Number(item.priceAmount));
    const card = "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5";
    const datum = (v: string) => new Date(v).toLocaleDateString(de ? "de-DE" : "uz-UZ", {timeZone:item.departureTimezone, dateStyle:"medium"});
    const info: {label:string; value:string; icon:typeof Plane}[] = [
      {label:de ? "Flugart" : "Parvoz turi",value:c.flightType === "direct" ? (de ? "Direktflug" : "To‘g‘ridan-to‘g‘ri") : (de ? "Mit Umstieg" : "Tranzit orqali"),icon:Route},
      ...(c.transitAirports.length ? [{label:de ? "Umstieg" : "Tranzit",value:c.transitAirports.join(" → "),icon:Plane}] : []),
      {label:de ? "Abflugdatum" : "Uchish sanasi",value:formattedDate,icon:CalendarDays},
      ...(c.departureTimeKnown ? [{label:de ? "Abflugzeit" : "Uchish vaqti",value:formattedTime,icon:Clock3}] : []),
      ...(c.arrivalAt ? [{label:de ? "Ankunft" : "Yetib kelish",value:new Date(c.arrivalAt).toLocaleString(de ? "de-DE" : "uz-UZ", {timeZone:item.departureTimezone,dateStyle:"medium",timeStyle:"short"}),icon:CalendarDays}] : []),
      ...(c.airline ? [{label:de ? "Fluggesellschaft" : "Aviakompaniya",value:c.airline,icon:Building2}] : []),
      ...(item.flightNumber ? [{label:de ? "Flugnummer" : "Reys raqami",value:item.flightNumber,icon:Hash}] : []),
    ];
    return <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white"><Header />
      <main className="mx-auto w-full max-w-6xl min-w-0 px-3 pb-14 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8">
        <Link href="/safar" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-700 dark:text-slate-300"><ArrowLeft size={16}/>{de ? "Reisen" : "Safarlar"}</Link>
        <header className="mt-4">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><UsersRound size={16}/>{de ? "Flugbegleitung" : "Hamroh · Samolyot"}</div>
              <h1 className="mt-1 break-words text-2xl font-bold tracking-tight sm:text-3xl">{item.originCity} <span className="text-slate-400">→</span> {item.destinationCity}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm"><span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">{isRequest ? (de ? "Begleitung gesucht" : "Hamroh izlayapman") : (de ? "Begleitung angeboten" : "Hamroh bo‘la olaman")}</span>{isRequest && c.relationship && <span className="rounded-full bg-slate-200 px-3 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{companionRelationshipLabels[c.relationship][locale]}</span>}{item.womenOnly && <span className="rounded-full bg-rose-100 px-3 py-1 font-semibold text-rose-700 dark:bg-rose-950 dark:text-rose-300">{de ? "Nur für Frauen" : "Faqat ayollar uchun"}</span>}</div>
        </header>
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-start">
          <div className="min-w-0 space-y-4">
            <section className={card}>
              <h2 className="flex items-center gap-2 text-base font-bold"><Plane size={19} className="text-emerald-700"/>{de ? "Fluginformationen" : "Parvoz ma’lumotlari"}</h2>
              <div className="mx-auto mt-3 grid w-full max-w-[540px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-0 border-y border-slate-100 py-3 dark:border-slate-800">
                <div className="min-w-0 justify-self-end"><div className="flex items-center gap-1.5 font-semibold"><MapPin size={16} className="shrink-0 text-emerald-700"/><span className="break-words">{item.originCity}</span></div><p className="mt-1 break-words pl-5 text-xs text-slate-500">{item.originCountryCode}{c.originAirport ? ` · ${c.originAirport}` : ""}</p></div>
                <div className="flex min-w-0 items-center justify-center gap-1.5 px-2"><span aria-hidden="true" className="h-px w-[clamp(12px,7vw,90px)] bg-slate-300 dark:bg-slate-600"/><Plane size={21} className="shrink-0 text-slate-400"/><span aria-hidden="true" className="h-px w-[clamp(12px,7vw,90px)] bg-slate-300 dark:bg-slate-600"/></div>
                <div className="min-w-0 justify-self-start"><div className="flex items-center gap-1.5 font-semibold"><MapPin size={16} className="shrink-0 text-emerald-700"/><span className="break-words">{item.destinationCity}</span></div><p className="mt-1 break-words pl-5 text-xs text-slate-500">{item.destinationCountryCode}{c.destinationAirport ? ` · ${c.destinationAirport}` : ""}</p></div>
              </div>
              <dl className="mt-3 grid gap-x-4 gap-y-3 sm:grid-cols-2 xl:grid-cols-4">{info.map(({label,value,icon:InfoIcon})=><div key={label} className="flex min-w-0 items-start gap-2"><InfoIcon size={17} className="mt-0.5 h-[17px] w-[17px] shrink-0 text-slate-500"/><div className="min-w-0"><dt className="text-xs text-slate-500 dark:text-slate-400">{label}</dt><dd className="break-words text-sm font-semibold">{value}</dd></div></div>)}</dl>
            </section>
            {c.helpTypes.length > 0 && <section className={card}><h2 className="flex items-center gap-2 text-base font-bold"><CheckCircle2 size={18} className="text-emerald-700"/>{isRequest ? (de ? "Benötigte Hilfe" : "Kerakli yordam") : (de ? "Angebotene Hilfe" : "Taklif qilinayotgan yordam")}</h2><div className="mt-3 flex flex-wrap gap-2">{c.helpTypes.map(x=><span key={x} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"><CheckCircle2 size={14}/>{companionHelpLabels[x][locale]}</span>)}</div></section>}
            {description && <section className={card}><h2 className="text-base font-bold">{de ? "Weitere Angaben" : "Qo‘shimcha ma’lumot"}</h2><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700 dark:text-slate-300">{description}</p></section>}
          </div>
          <aside className="min-w-0 space-y-4 ">
            <section className={card}>
              <div className="flex flex-wrap items-center gap-3"><h2 className="text-base font-bold">{de ? "Anzeige" : "E’lon"}</h2>{money && <span className="inline-flex items-baseline gap-1.5"><span className="text-sm font-medium text-slate-700 dark:text-slate-300">{de ? "Preis:" : "Narx:"}</span><span className="text-base font-bold text-emerald-700 dark:text-emerald-400">{money}</span></span>}</div>
              {item.publishedAt && <p className="mt-2 flex items-center gap-2 text-xs text-slate-500"><CalendarDays size={15}/>{de ? "Veröffentlicht:" : "E’lon sanasi:"} {datum(item.publishedAt)}</p>}
              <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800"><h3 className="flex items-center gap-2 text-sm font-semibold"><UserRound size={18}/>{de ? "Inserent" : "E’lon beruvchi"}</h3><div className="mt-3 flex min-w-0 items-center gap-3"><PublicUserAvatar name={companionAuthor?.displayName} avatarUrl={companionAuthor?.avatarUrl} size="md" /><span className="min-w-0 truncate text-sm font-semibold">{companionAuthor?.displayName || (de ? "Mitglied" : "Foydalanuvchi")}</span></div></div>
              <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800"><CompanionShareButton de={de} title={`${isRequest ? (de ? "Begleitung gesucht" : "Hamroh izlayapman") : (de ? "Begleitung angeboten" : "Hamroh bo‘la olaman")} — ${item.originCity} → ${item.destinationCity}`} /></div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-800 dark:bg-slate-900"><h2 className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck size={18} className="text-amber-600"/>{de ? "Sicherheitshinweis" : "Xavfsizlik tavsiyasi"}</h2><p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">{de ? "Teilen Sie keine vertraulichen Reisedokumente öffentlich. Klären Sie Details vor der Reise." : "Maxfiy sayohat hujjatlarini ommaga ulashmang. Safardan oldin barcha tafsilotlarni aniqlashtiring."}</p></section>
          </aside>
        </div>
      </main><Footer /></div>;
  }
  return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white"><Header /><main className="mx-auto max-w-5xl px-5 pb-20 pt-28 sm:px-8">
    <Link href="/safar" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400"><ArrowLeft size={16} />{de ? "Reisen" : "Safarlar"}</Link>
    <div className="mt-7 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Icon size={17} aria-hidden="true" />{travelKinds[item.kind][locale]} · {travelModes[item.transportMode][locale]}</div>
    <h1 className="mt-2 text-xl font-bold leading-snug sm:text-2xl">{item.originCity} <span className="text-slate-400">→</span> {item.destinationCity}</h1>
    {item.womenOnly && <p className="mt-4 inline-flex rounded-full bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-700 dark:bg-rose-950 dark:text-rose-300"><span aria-hidden="true" className="mr-1">🌸</span>{de ? "Nur für Frauen" : "Faqat ayollar uchun"}</p>}
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7"><TravelRouteSummary listing={item} locale={locale} />
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-sm dark:border-slate-800">
        <span className="inline-flex items-center gap-2"><CalendarDays size={16} className="text-slate-500" />{formattedDate}</span>
        <span className="inline-flex items-center gap-2"><Clock3 size={16} className="text-slate-500" />{item.kind.startsWith("companion_") && item.companionDetails && !item.companionDetails.departureTimeKnown ? (de ? "Uhrzeit offen" : "Vaqti noma’lum") : formattedTime}</span>
        {!item.kind.startsWith("companion_") && item.seatsAvailable !== null && <span className="inline-flex items-center gap-2"><Armchair size={16} className="text-slate-500" />{item.seatsAvailable} {de ? "Plätze" : "o‘rin"}</span>}
        {item.priceAmount !== null && <span className="inline-flex items-center gap-2 font-semibold"><Wallet size={16} className="text-slate-500" />{Number(item.priceAmount) === 0 ? (de ? "Kostenlos" : "Bepul") : `${new Intl.NumberFormat(de ? "de-DE" : "uz-UZ", { maximumFractionDigits: 2 }).format(Number(item.priceAmount))} ${item.priceCurrency ?? ""}`}</span>}
      </div>
    </section>
    {item.kind.startsWith("companion_") && item.companionDetails && <section className="mt-5 space-y-3 rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
      <h2 className="text-lg font-bold">{de ? "Flugbegleitung" : "Parvoz hamrohligi"}</h2>
      <p className="text-sm font-semibold text-emerald-700">{item.kind === "companion_request" ? (de ? "Begleitung gesucht" : "Hamroh izlayapman") : (de ? "Begleitung angeboten" : "Hamroh bo‘la olaman")}</p>
      {item.companionDetails.relationship && <p className="text-sm"><strong>{de ? "Für wen:" : "Kim uchun:"}</strong> {companionRelationshipLabels[item.companionDetails.relationship][locale]}</p>}
      {(item.companionDetails.originAirport || item.companionDetails.destinationAirport) && <p className="text-sm"><strong>{de ? "Flughäfen:" : "Aeroportlar:"}</strong> {item.companionDetails.originAirport || item.originCity} → {item.companionDetails.destinationAirport || item.destinationCity}</p>}
      <p className="text-sm"><strong>{de ? "Flugart:" : "Parvoz turi:"}</strong> {item.companionDetails.flightType === "direct" ? (de ? "Direktflug" : "To‘g‘ridan-to‘g‘ri") : (de ? "Mit Umstieg" : "Tranzit orqali")}</p>
      {item.companionDetails.transitAirports.length > 0 && <p className="text-sm"><strong>{de ? "Transit:" : "Tranzit:"}</strong> {item.companionDetails.transitAirports.join(" → ")}</p>}
      {item.companionDetails.airline && <p className="text-sm"><strong>{de ? "Fluggesellschaft:" : "Aviakompaniya:"}</strong> {item.companionDetails.airline}</p>}
      {item.companionDetails.arrivalAt && <p className="text-sm"><strong>{de ? "Ankunft:" : "Yetib kelish:"}</strong> {new Date(item.companionDetails.arrivalAt).toLocaleString(de ? "de-DE" : "uz-UZ", {timeZone:item.departureTimezone,dateStyle:"medium",timeStyle:"short"})}</p>}
      <div><strong className="text-sm">{item.kind === "companion_request" ? (de ? "Benötigte Hilfe:" : "Kerakli yordam:") : (de ? "Angebotene Hilfe:" : "Taklif qilinadigan yordam:")}</strong><ul className="mt-2 list-inside list-disc space-y-1 text-sm">{item.companionDetails.helpTypes.map(x => <li key={x}>{companionHelpLabels[x][locale]}</li>)}</ul></div>
    </section>}
    {(item.flightNumber || (!item.companionDetails && item.assistanceDetails) || item.parcelDetails || description) && <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7"><h2 className="mb-4 text-lg font-bold">{de ? "Weitere Angaben" : "Qo‘shimcha ma’lumot"}</h2>
      {item.flightNumber && <p className="mb-3 text-sm text-slate-700 dark:text-slate-200"><strong>{de ? "Flug:" : "Reys:"}</strong> {item.flightNumber}</p>}
      {!item.companionDetails && item.assistanceDetails && <p className="mb-3 whitespace-pre-wrap break-words text-sm leading-7 text-slate-700 dark:text-slate-200">{item.assistanceDetails}</p>}
      {item.parcelDetails && <p className="mb-3 whitespace-pre-wrap break-words text-sm leading-7 text-slate-700 dark:text-slate-200">{item.parcelDetails}</p>}
      {description && <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700 dark:text-slate-300">{description}</p>}
    </section>}
    <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-600 dark:bg-slate-900 dark:text-slate-300">{de ? "Direkte Kontaktaufnahme ist noch nicht verfügbar. Teilen Sie keine sensiblen Reisedokumente öffentlich." : "Muallif bilan bevosita bog‘lanish hozircha mavjud emas. Maxfiy sayohat hujjatlarini ommaga ulashmang."}</p>
    {item.imageKey && <img src={`/api/travel/images/${item.id}`} alt={`${item.originCity} → ${item.destinationCity}`} className="mt-5 max-h-[460px] w-full rounded-2xl object-cover" />}
  </main><Footer /></div>;
}
