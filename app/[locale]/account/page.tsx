import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import AccountSignOutButton from "@/components/account/AccountSignOutButton";
import AccountActionsMenu from "@/components/account/AccountActionsMenu";
import { Link } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";

export const metadata: Metadata = {
  title: "UzDe ID",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale);
  const profileComplete = Boolean(
    context.profile?.homeLocationId ||
    context.profile?.residencyStage ||
    context.interests.length > 0,
  );
  const hasHomeLocation = Boolean(context.profile?.homeLocationId);

  const copy = locale === "de"
    ? {
        eyebrow: "UZDE ID",
        title: "Ihr Konto ist aktiv",
        description: "Ihre UzDe ID ist bereit. Ergänzen Sie Ihr Profil, damit wir Inhalte später besser personalisieren können.",
        email: "E-Mail",
        profile: profileComplete ? "Profil bearbeiten" : "Profil einrichten",
        myCity: "Meine Stadt",
        notifications: "Benachrichtigungen",
        myListings: "Meine Anzeigen",
        myCityDisabled: "Wählen Sie zuerst einen Wohnort in Ihrem Profil aus.",
        myCityDescription: "Stadtinformationen ansehen und bearbeiten.",
        profileDescription: "Persönliche Angaben aktualisieren.",
        listingsDescription: "Anzeigen ansehen und verwalten.",
        notificationsDescription: "Neuigkeiten und Aktivitäten ansehen.",
        homeDescription: "Zur Startseite des Portals.",
        editEmail: "Bearbeiten",
        home: "Zur Startseite",
      }
    : {
        eyebrow: "UZDE ID",
        title: "Akkauntingiz faol",
        description: "UzDe ID tayyor. Portalni sizga moslashtirish uchun profilingizni to‘ldiring.",
        email: "E-mail",
        profile: profileComplete ? "Profilni tahrirlash" : "Profilni sozlash",
        myCity: "Mening shahrim",
        notifications: "Bildirishnomalar",
        myListings: "Mening e’lonlarim",
        myCityDisabled: "Avval profilingizda yashash joyingizni tanlang.",
        myCityDescription: "Shahringiz ma’lumotlarini ko‘ring va tahrirlang.",
        profileDescription: "Shaxsiy ma’lumotlaringizni yangilang.",
        listingsDescription: "E’lonlaringizni ko‘ring, tahrirlang va boshqaring.",
        notificationsDescription: "Yangi xabarlar va faoliyatlar haqida.",
        homeDescription: "Portalning bosh sahifasiga qayting.",
        editEmail: "Tahrirlash",
        home: "Bosh sahifaga qaytish",
      };

  const tileBase = "group flex min-h-28 items-center gap-4 rounded-2xl border px-4 py-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 sm:px-5";
  const tileText = "min-w-0 flex-1";
  const tileTitle = "block font-bold text-slate-950 dark:text-white";
  const tileDescription = "mt-1 block text-sm leading-5 text-slate-600 dark:text-slate-300";
  const iconCircle = "flex size-14 shrink-0 items-center justify-center rounded-full";

  return (
    <main className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 sm:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-12rem] h-[30rem] w-[48rem] -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />
        <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl dark:bg-cyan-500/10" />
      </div>

      <div className="relative mx-auto max-w-2xl rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-2xl shadow-slate-900/8 backdrop-blur-sm dark:border-slate-800/90 dark:bg-slate-900/90 sm:p-9">
        <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">{copy.eyebrow}</p>
            <AccountActionsMenu locale={locale}>
              <AccountSignOutButton locale={locale} />
            </AccountActionsMenu>
          </div>
        <h1 className="mt-4 text-3xl font-black tracking-[-0.03em] text-slate-950 dark:text-white sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">{copy.description}</p>

        <div className="mt-8 flex items-center gap-4 rounded-[1.5rem] border border-slate-200/90 bg-slate-50/80 p-4 shadow-inner shadow-slate-900/[0.02] dark:border-slate-700 dark:bg-slate-800/50 sm:p-5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
            <AccountIcon name="user" />
          </span>
          <div className="min-w-0">
            <p className="break-words text-lg font-bold text-slate-950 dark:text-white">
              {context.profile?.displayName || context.user.email}
            </p>
            <p className="mt-1 break-all text-sm text-slate-600 dark:text-slate-300">
              {context.user.email}
            </p>
          </div>
        </div>

        <nav aria-label={locale === "de" ? "Kontobereiche" : "Akkaunt bo‘limlari"} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {hasHomeLocation ? (
            <Link href="/my-city" className={`${tileBase} border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/80 dark:border-emerald-800 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/60`}>
              <span className={`${iconCircle} bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-300`}><AccountIcon name="user" /></span>
              <span className={tileText}><span className={tileTitle}>{copy.myCity}</span><span className={tileDescription}>{copy.myCityDescription}</span></span>
              <AccountIcon name="chevron" size={19} />
            </Link>
          ) : (
            <div aria-disabled="true" className={`${tileBase} cursor-not-allowed border-emerald-200 bg-emerald-50/50 opacity-70 dark:border-emerald-900 dark:bg-emerald-950/20`} title={copy.myCityDisabled}>
              <span className={`${iconCircle} bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-300`}><AccountIcon name="user" /></span>
              <span className={tileText}><span className={tileTitle}>{copy.myCity}</span><span className={tileDescription}>{copy.myCityDisabled}</span></span>
            </div>
          )}

          <Link href="/account/profile" className={`${tileBase} border-blue-200 bg-blue-50/70 hover:bg-blue-100/80 dark:border-blue-900 dark:bg-blue-950/30 dark:hover:bg-blue-950/60`}>
            <span className={`${iconCircle} bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-300`}><AccountIcon name="file" /></span>
            <span className={tileText}><span className={tileTitle}>{copy.profile}</span><span className={tileDescription}>{copy.profileDescription}</span></span>
            <AccountIcon name="chevron" size={19} />
          </Link>

          <Link href="/market/mine" className={`${tileBase} border-amber-200 bg-amber-50/70 hover:bg-amber-100/80 dark:border-amber-900 dark:bg-amber-950/30 dark:hover:bg-amber-950/60`}>
            <span className={`${iconCircle} bg-amber-100 text-amber-600 dark:bg-amber-900/60 dark:text-amber-300`}><AccountIcon name="megaphone" /></span>
            <span className={tileText}><span className={tileTitle}>{copy.myListings}</span><span className={tileDescription}>{copy.listingsDescription}</span></span>
            <AccountIcon name="chevron" size={19} />
          </Link>

          <Link href="/account/notifications" className={`${tileBase} border-violet-200 bg-violet-50/70 hover:bg-violet-100/80 dark:border-violet-900 dark:bg-violet-950/30 dark:hover:bg-violet-950/60`}>
            <span className={`${iconCircle} bg-violet-100 text-violet-600 dark:bg-violet-900/60 dark:text-violet-300`}><AccountIcon name="bell" /></span>
            <span className={tileText}><span className={tileTitle}>{copy.notifications}</span><span className={tileDescription}>{copy.notificationsDescription}</span></span>
            <AccountIcon name="chevron" size={19} />
          </Link>

          <Link href="/" className={`${tileBase} border-slate-200 bg-slate-50/80 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800 sm:col-span-2`}>
            <span className={`${iconCircle} bg-slate-200/70 text-slate-700 dark:bg-slate-700 dark:text-slate-200`}><AccountIcon name="arrow" /></span>
            <span className={tileText}><span className={tileTitle}>{copy.home}</span><span className={tileDescription}>{copy.homeDescription}</span></span>
            <AccountIcon name="chevron" size={19} />
          </Link>
        </nav>


      </div>
    </main>
  );
}


type AccountIconName = "mail" | "pencil" | "user" | "file" | "megaphone" | "bell" | "arrow" | "chevron";

function AccountIcon({ name, size = 26 }: { name: AccountIconName; size?: number }) {
  const paths: Record<AccountIconName, ReactNode> = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    pencil: <><path d="m15 5 4 4" /><path d="M4 20l4.5-1 11-11a2.12 2.12 0 0 0-3-3l-11 11L4 20Z" /></>,
    user: <><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2H4Z" /></>,
    file: <><path d="M6 3h8l5 5v13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v6h5M8 13h8M8 17h8" /></>,
    megaphone: <><path d="m3 11 13-5v12L3 14v-3ZM16 9a3 3 0 0 1 0 6M6 15l2 6h3l-2-5" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></>,
    arrow: <><path d="m12 19-7-7 7-7M5 12h15" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
