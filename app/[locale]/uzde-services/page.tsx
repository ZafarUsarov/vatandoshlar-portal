import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { professionalServices } from "@/lib/uzde-professional-services";
export default async function ProfessionalServicesPage() {
  const de = (await getLocale()) === "de";
  return <main className="min-h-screen bg-[#f7f7f7] px-[clamp(16px,3.3vw,112px)] pb-24 pt-36 text-[#202020] dark:bg-zinc-950 dark:text-white"><p className="mb-4 text-xs tracking-widest text-zinc-500">UZDE / SERVICES</p><h1 className="mb-10 text-[clamp(40px,6vw,100px)] font-semibold tracking-[-0.05em]">{de ? "Unsere Dienstleistungen" : "UzDe xizmatlari"}</h1><div className="grid gap-6 md:grid-cols-2">{professionalServices.map((service, i) => <Link key={service.slug} href={`/uzde-services/${service.slug}`} className="group border-t border-zinc-300 py-6 dark:border-zinc-700"><p className="text-xs text-zinc-500">{String(i + 1).padStart(2,"0")}</p><h2 className="mt-3 text-3xl font-semibold">{de ? service.de : service.uz} <span aria-hidden="true">↗</span></h2><p className="mt-3 max-w-[65ch] text-zinc-600 dark:text-zinc-400">{de ? service.deDescription : service.uzDescription}</p></Link>)}</div></main>;
}
