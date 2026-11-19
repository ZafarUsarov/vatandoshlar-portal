import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { imprint } from "@/data/legal/imprint";

export async function generateMetadata(): Promise<Metadata> {
  const de = (await getLocale()) === "de";
  const locale = de ? "de" : "uz";
  const title = de ? "Partnerschaft mit UzDe" : "UzDe bilan hamkorlik";
  const description = de ? "Entdecken Sie Möglichkeiten für eine Zusammenarbeit mit UzDe." : "UzDe bilan hamkorlik imkoniyatlarini keşf eting.";
  return { title, description, alternates: { canonical: `/${locale}/partners`, languages: { uz: "/uz/partners", de: "/de/partners" } } };
}

export default async function PartnersPage() {
  const de = (await getLocale()) === "de";
  const subject = de ? "Partnerschaftsanfrage an UzDe" : "UzDe bilan hamkorlik taklifi";
  const emailHref = `mailto:${imprint.email}?subject=${encodeURIComponent(subject)}`;
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <Header />
      <main className="px-[clamp(16px,3.3vw,112px)] pb-28 pt-36 sm:pt-44">
        <div className="border-t border-zinc-300 pt-8 dark:border-zinc-700">
          <p className="mb-10 text-xs font-medium tracking-[0.15em] text-zinc-500">UZDE / {de ? "PARTNERSCHAFTEN" : "HAMKORLIK"}</p>
          <h1 className="max-w-[18ch] text-[clamp(40px,6vw,100px)] font-semibold leading-[1.06] tracking-[-0.03em]">{de ? "GEMEINSAM MEHR ERREICHEN." : "BIRGALIKDA KÖPROQ IMKONIYAT."}</h1>
          <div className="mt-12 grid gap-8 border-t border-zinc-300 pt-10 dark:border-zinc-700 lg:grid-cols-2">
            <p className="max-w-[52ch] text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">{de ? "Sie möchten Ihr Unternehmen, Ihre Organisation oder Ihr Projekt der usbekischsprachigen Community in Deutschland vorstellen? Sprechen Sie mit uns über eine mögliche Zusammenarbeit." : "Kompaniyangiz, taşkilotingiz yoki loyihangizni Germaniyadagi özbek tilida sözlaşuvçi auditoriyaga tanitmoqçimisiz? Hamkorlik imkoniyatlarini birgalikda muhokama qilaylik."}</p>
            <div className="flex flex-col items-start justify-end gap-5">
              <a href={emailHref} className="inline-flex min-h-12 items-center border-b border-current pb-2 text-lg font-semibold hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4">{de ? "Partnerschaft per E-Mail anfragen" : "Email orqali boglaning"}<span aria-hidden="true" className="ml-8">↗</span></a>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{imprint.email}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
