import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { professionalServices } from "@/lib/uzde-professional-services";
export default async function ProfessionalServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = professionalServices.find(item => item.slug === slug);
  if (!service) notFound();
  const de = (await getLocale()) === "de";
  return <main className="min-h-screen bg-[#f7f7f7] px-[clamp(16px,3.3vw,112px)] pb-24 pt-36 text-[#202020] dark:bg-zinc-950 dark:text-white"><Link href="/uzde-services" className="text-sm underline underline-offset-4">{de ? "Alle Dienstleistungen" : "Barça xizmatlar"}</Link><p className="mt-12 text-xs tracking-widest text-zinc-500">UZDE / SERVICES</p><h1 className="mt-4 max-w-[24ch] text-[clamp(40px,6vw,100px)] font-semibold leading-tight tracking-[-0.05em]">{de ? service.de : service.uz}</h1><p className="mt-8 max-w-[65ch] text-xl text-zinc-600 dark:text-zinc-400">{de ? service.deDescription : service.uzDescription}</p><div className="mt-12 border-y border-zinc-300 py-8 dark:border-zinc-700"><p className="text-xs uppercase tracking-widest text-zinc-500">{de ? "Preis" : "Narx"}</p><p className="mt-2 text-xl font-medium">{de ? "Individuelles Angebot" : "Individual taklif"}</p></div><Link href="/support" className="mt-8 inline-block border-b border-current pb-1">{de ? "Kontakt aufnehmen" : "Murojaat qiliş"} ↗</Link></main>;
}
