import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { SupportedTelegramLocale } from "@/types/telegram";

type GuideSection = Readonly<{
  number: string;
  title: string;
  description: string;
  bullets?: readonly string[];
  note?: string;
}>;

type TelegramCultureGuideProps = Readonly<{
  variant?: "embedded" | "standalone";
}>;

function ArrowRightIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function BookIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M4.75 5.75A2.75 2.75 0 0 1 7.5 3h10.75a1 1 0 0 1 1 1v14.25a1 1 0 0 1-1 1H7.5a2.75 2.75 0 0 0-2.75 2.75V5.75Zm0 0V19.5A2.5 2.5 0 0 1 7.25 17h12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ShieldIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 3.5 19 6v5.25c0 4.3-2.8 7.75-7 9.25-4.2-1.5-7-4.95-7-9.25V6l7-2.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function getCultureCopy(locale: SupportedTelegramLocale) {
  return locale === "uz"
    ? {
        preview: {
          eyebrow: "Foydali qo‘llanmalar",
          title: "Telegramdan foydaliroq foydalanish uchun",
          description:
            "Guruhlarni topishdan tashqari, hamjamiyatdagi muloqotni aniq, xavfsiz va hammaga foydali qilishga yordam beradigan qisqa qo‘llanmalarni ham shu yerda jamlaymiz.",
          cardEyebrow: "Muloqot madaniyati",
          cardTitle: "Guruhda qanday qilib to‘g‘ri savol berish kerak?",
          cardDescription:
            "Telegram guruhlarida savolni tushunarli yozish, kerakli kontekstni berish va tezroq foydali javob olish bo‘yicha amaliy qo‘llanma.",
          action: "Qo‘llanmani o‘qish",
          ariaLabel:
            "Guruhda qanday qilib to‘g‘ri savol berish kerak qo‘llanmasini o‘qish",
          meta: "Amaliy qo‘llanma",
        },
        article: {
          badge: "Telegram · Amaliy qo‘llanma",
          title: "Guruhda qanday qilib to‘g‘ri savol berish kerak?",
          lead:
            "Yaxshi savol murakkab bo‘lishi shart emas. Yetarli kontekst, aniq muammo va bitta tushunarli xabar ko‘pincha foydali javob olishni ancha osonlashtiradi.",
          intro:
            "Bu qo‘llanmaning maqsadi kimnidir tanqid qilish emas. Maqsad — Telegram guruhlaridagi muloqotni tartibli, xavfsiz va barcha a’zolar uchun o‘qishga qulay saqlash.",
          readingLabel: "Qisqa va amaliy",
          rulesLabel: "10 ta qoida",
          principlesLabel: "Asosiy tamoyillar",
          principles: [
            "Savolni bitta tushunarli xabarda yozing",
            "Javob berish uchun kerakli kontekstni qo‘shing",
            "Shaxsiy ma’lumotlarni ochiq guruhda ulashmang",
          ],
          sections: [
            {
              number: "01",
              title: "Bitta fikrni bitta to‘liq xabarda yozing",
              description:
                "Savolni ketma-ket bir nechta qisqa xabarga bo‘lib yuborish o‘rniga, vaziyat va savolni imkon qadar bitta tushunarli xabarda yozing.",
              bullets: [
                "“Salom”, “Bir savolim bor”, “Kim biladi?”, “Anmeldung haqida” kabi xabarlarni alohida-alohida yubormang.",
                "Bitta to‘liq xabar boshqa a’zolarga kontekstni darhol tushunishga yordam beradi.",
              ],
            },
            {
              number: "02",
              title: "Kerakli kontekstni qo‘shing",
              description:
                "Faqat savolning o‘zini emas, uni tushunish uchun zarur bo‘lgan qisqa kontekstni ham yozing.",
              bullets: [
                "Qaysi shahar yoki Bundeslandda ekaningiz.",
                "Qanday vaziyat yuz bergani.",
                "Aynan nimada muammo borligi.",
                "Nimani bilmoqchi ekaningiz.",
              ],
              note:
                "Savolga aloqasi bo‘lmagan ortiqcha shaxsiy ma’lumotlarni qo‘shish shart emas.",
            },
            {
              number: "03",
              title: "Muammoni aniq tushuntiring",
              description:
                "“Nima qilishim kerak?” kabi juda umumiy savol o‘rniga aynan qaysi qism tushunarsiz yoki qayerda muammo paydo bo‘lganini yozing.",
            },
            {
              number: "04",
              title: "Oldin nimalarni sinab ko‘rganingizni ayting",
              description:
                "Rasmiy saytni ko‘rgan, idoraga yozgan yoki boshqa usulni sinab ko‘rgan bo‘lsangiz, buni qisqacha yozing. Shunda boshqalar sizga bir xil maslahatni qayta berib o‘tirmaydi.",
            },
            {
              number: "05",
              title: "Kerak bo‘lsa screenshot yoki link qo‘shing",
              description:
                "Rasmiy sahifa, xatolik yoki screenshot muammoni tushunishga yordam bersa, uni qo‘shishingiz mumkin.",
              note:
                "Screenshot yuborishdan oldin ism, manzil, hujjat raqami, QR-kod va boshqa maxfiy ma’lumotlar ko‘rinmayotganini tekshiring.",
            },
            {
              number: "06",
              title: "Shaxsiy ma’lumotlarni ochiq guruhga yubormang",
              description:
                "Passport raqami, Aufenthaltstitel ma’lumotlari, telefon raqami, to‘liq manzil, bank ma’lumotlari, login ma’lumotlari va maxfiy hujjatlarni ochiq guruhga joylamang.",
            },
            {
              number: "07",
              title: "Foydali savol va javobni guruhda qoldiring",
              description:
                "Agar savol va javob boshqa a’zolarga ham foydali bo‘lishi mumkin bo‘lsa, suhbatni darhol shaxsiy chatga olib ketishga shoshilmang. Guruhda qolgan javob keyinchalik shu muammoga duch keladigan odamlarga ham yordam beradi.",
            },
            {
              number: "08",
              title: "Tajribali a’zolarning vaqtini hurmat qiling",
              description:
                "Professional yoki tajribali a’zolar har doim darhol javob bera olmasligi tabiiy. Biror kishidan javob talab qilish yoki uni qayta-qayta belgilash o‘rniga savolni aniq qoldiring va biroz vaqt bering.",
            },
            {
              number: "09",
              title: "Bir xil savolni qayta-qayta yubormang",
              description:
                "Javob darhol kelmasa, qisqa vaqt ichida savolni qayta yuborish yoki “??”, “javob bormi?”, “kim biladi?” kabi xabarlar bilan guruhni to‘ldirmang.",
            },
            {
              number: "10",
              title: "Muammo hal bo‘lgach natijani bo‘lishing",
              description:
                "Muammo hal bo‘lsa, imkon qadar qanday yo‘l ishlaganini qisqacha yozib qoldiring. Sizning yakuniy xabaringiz keyingi foydalanuvchi uchun eng foydali javobga aylanishi mumkin.",
            },
          ] satisfies GuideSection[],
          groupCulture: {
            eyebrow: "Guruh madaniyati",
            title: "Umumiy guruh ekanini yodda tuting",
            description:
              "Telegram guruhi barcha a’zolar uchun umumiy axborot va muloqot maydoni. Maqsad suhbatni cheklash emas — uni tartibli, foydali va o‘qishga qulay saqlash.",
            points: [
              "Bir mavzu bo‘yicha fikrni imkon qadar mazmunli va to‘liq xabarda ifodalang.",
              "“Ha”, “to‘g‘ri”, “men ham”, “keyin-chi?”, “nima bo‘ldi?”, “??” kabi alohida qisqa xabarlarni ketma-ket yuborib guruhni ikki kishilik chatga aylantirmang.",
              "Har bir yangi xabar ko‘plab guruh a’zolariga notification bo‘lishi mumkinligini hisobga oling.",
            ],
            publicLabel: "Guruhda qoladi",
            publicText:
              "Boshqalarga ham foydali savol, tajriba yoki javob.",
            privateLabel: "Private chatga o‘tadi",
            privateText:
              "Faqat ikki kishiga tegishli bo‘lib qolgan va boshqalarga foyda bermaydigan shaxsiy suhbat.",
          },
          example: {
            eyebrow: "Amaliy misol",
            title: "Savolni qanday yaxshilash mumkin?",
            improveLabel: "Yaxshilash mumkin",
            improveMessages: [
              "Salom",
              "Kim bor?",
              "Bir savolim bor edi",
              "Anmeldung haqida",
              "Kim biladi?",
              "Javob bormi?",
              "??",
            ],
            goodLabel: "Yaxshi",
            goodMessage:
              "Assalomu alaykum. Anmeldung bo‘yicha bir savolim bor. Men Kiel shahrida yangi kvartiraga ko‘chdim va Bürgeramt uchun Wohnungsgeberbestätigungning PDF nusxasi yetarlimi yoki originalini olib borishim kerakmi, tushunmadim. Kiel Bürgeramt bilan yaqinda shu jarayondan o‘tganlar bo‘lsa, tajribangizni bo‘lishsangiz xursand bo‘lardim.",
            whyTitle: "Nega bu variant yaxshiroq?",
            whyItems: [
              "Joy ko‘rsatilgan",
              "Vaziyat tushunarli",
              "Aniq savol berilgan",
              "Hammasi bitta to‘liq xabarda",
              "Javob beruvchi nimaga javob berishini darhol tushunadi",
            ],
          },
          privacy: {
            eyebrow: "Xavfsizlik",
            title: "Yuborishdan oldin maxfiy ma’lumotlarni tekshiring",
            description:
              "Hujjat yoki screenshot savolni tushuntirishga yordam berishi mumkin, lekin ochiq guruhga yuborilgan ma’lumotni ko‘plab odamlar ko‘rishi mumkin.",
            items: [
              "Passport va Aufenthaltstitel raqamlari",
              "To‘liq manzil va telefon raqami",
              "Bank va login ma’lumotlari",
              "Aktenzeichen, QR-kod va maxfiy hujjatlar",
            ],
          },
          checklist: {
            eyebrow: "Yuborishdan oldin",
            title: "10 soniyalik tekshiruv",
            items: [
              "Muammo aniq yozildimi?",
              "Kerakli joy va kontekst bormi?",
              "Aynan nimani bilmoqchi ekanim tushunarlimi?",
              "Shaxsiy yoki maxfiy ma’lumot yo‘qmi?",
              "Savol bitta to‘liq xabarda yozildimi?",
            ],
          },
          backAction: "Telegram guruhlariga qaytish",
        },
      }
    : {
        preview: {
          eyebrow: "Hilfreiche Leitfäden",
          title: "Telegram sinnvoller nutzen",
          description:
            "Neben der Gruppensuche sammeln wir hier kurze Leitfäden, die zu einer klaren, sicheren und für alle hilfreichen Kommunikation in der Community beitragen.",
          cardEyebrow: "Kommunikationskultur",
          cardTitle: "Wie stellt man eine gute Frage in der Gruppe?",
          cardDescription:
            "Ein praktischer Leitfaden für verständliche Fragen, den nötigen Kontext und bessere Chancen auf hilfreiche Antworten in Telegram-Gruppen.",
          action: "Leitfaden lesen",
          ariaLabel:
            "Leitfaden zum Stellen guter Fragen in Telegram-Gruppen lesen",
          meta: "Praktischer Leitfaden",
        },
        article: {
          badge: "Telegram · Praktischer Leitfaden",
          title: "Wie stellt man eine gute Frage in der Gruppe?",
          lead:
            "Eine gute Frage muss nicht kompliziert sein. Der nötige Kontext, ein klar beschriebenes Problem und eine verständliche Nachricht erleichtern hilfreiche Antworten deutlich.",
          intro:
            "Dieser Leitfaden soll niemanden kritisieren. Er hilft dabei, die Kommunikation in Telegram-Gruppen übersichtlich, sicher und für alle Mitglieder gut lesbar zu halten.",
          readingLabel: "Kurz und praxisnah",
          rulesLabel: "10 Regeln",
          principlesLabel: "Grundprinzipien",
          principles: [
            "Die Frage in einer verständlichen Nachricht formulieren",
            "Den für eine Antwort nötigen Kontext nennen",
            "Persönliche Daten nicht in öffentlichen Gruppen teilen",
          ],
          sections: [
            {
              number: "01",
              title: "Einen Gedanken in einer vollständigen Nachricht formulieren",
              description:
                "Verteilen Sie Ihre Frage möglichst nicht auf viele kurze Nachrichten. Beschreiben Sie Situation und Frage stattdessen zusammenhängend.",
              bullets: [
                "Nachrichten wie „Hallo“, „Ich hätte eine Frage“, „Weiß das jemand?“ und „Wegen Anmeldung“ nicht einzeln nacheinander senden.",
                "Eine vollständige Nachricht hilft anderen, den Kontext sofort zu verstehen.",
              ],
            },
            {
              number: "02",
              title: "Den nötigen Kontext nennen",
              description:
                "Nennen Sie neben der eigentlichen Frage kurz die Informationen, die zum Verständnis wirklich notwendig sind.",
              bullets: [
                "Stadt oder Bundesland.",
                "Die konkrete Situation.",
                "Wo genau das Problem liegt.",
                "Was Sie konkret wissen möchten.",
              ],
              note:
                "Persönliche Informationen, die für die Frage nicht relevant sind, gehören nicht in die Gruppe.",
            },
            {
              number: "03",
              title: "Das Problem konkret beschreiben",
              description:
                "Statt einer sehr allgemeinen Frage wie „Was soll ich tun?“ schreiben Sie, welcher Schritt unklar ist oder an welcher Stelle das Problem auftritt.",
            },
            {
              number: "04",
              title: "Kurz erwähnen, was Sie bereits versucht haben",
              description:
                "Wenn Sie bereits eine offizielle Website geprüft, eine Behörde kontaktiert oder einen anderen Weg versucht haben, erwähnen Sie das kurz. So werden dieselben Hinweise nicht mehrfach gegeben.",
            },
            {
              number: "05",
              title: "Bei Bedarf Screenshot oder Link ergänzen",
              description:
                "Eine offizielle Seite, eine Fehlermeldung oder ein Screenshot kann helfen, das Problem schneller zu verstehen.",
              note:
                "Prüfen Sie vor dem Senden, dass Name, Adresse, Dokumentnummern, QR-Codes und andere vertrauliche Angaben nicht sichtbar sind.",
            },
            {
              number: "06",
              title: "Keine persönlichen Daten in öffentliche Gruppen senden",
              description:
                "Passnummern, Daten des Aufenthaltstitels, Telefonnummern, vollständige Adressen, Bankdaten, Zugangsdaten und vertrauliche Dokumente gehören nicht in eine öffentliche Gruppe.",
            },
            {
              number: "07",
              title: "Hilfreiche Fragen und Antworten in der Gruppe lassen",
              description:
                "Wenn eine Frage und ihre Antwort auch anderen helfen können, sollte das Gespräch nicht vorschnell in einen privaten Chat verlagert werden. Eine sichtbare Antwort kann später weiteren Mitgliedern helfen.",
            },
            {
              number: "08",
              title: "Die Zeit erfahrener Mitglieder respektieren",
              description:
                "Fachkundige oder erfahrene Mitglieder können nicht immer sofort antworten. Fordern Sie keine Antwort ein und markieren Sie Personen nicht wiederholt. Eine klare Frage und etwas Geduld sind meist hilfreicher.",
            },
            {
              number: "09",
              title: "Dieselbe Frage nicht ständig wiederholen",
              description:
                "Wenn nicht sofort eine Antwort kommt, senden Sie die Frage nicht nach kurzer Zeit erneut und füllen Sie die Gruppe nicht mit Nachrichten wie „??“, „Gibt es eine Antwort?“ oder „Weiß das jemand?“.",
            },
            {
              number: "10",
              title: "Nach der Lösung kurz Rückmeldung geben",
              description:
                "Wenn sich das Problem gelöst hat, schreiben Sie nach Möglichkeit kurz, welcher Weg funktioniert hat. Diese Rückmeldung kann für spätere Leser besonders wertvoll sein.",
            },
          ] satisfies GuideSection[],
          groupCulture: {
            eyebrow: "Gruppenkultur",
            title: "Den gemeinsamen Gruppenraum im Blick behalten",
            description:
              "Eine Telegram-Gruppe ist ein gemeinsamer Informations- und Gesprächsraum für alle Mitglieder. Es geht nicht darum, Gespräche einzuschränken, sondern sie übersichtlich, hilfreich und gut lesbar zu halten.",
            points: [
              "Einen Gedanken möglichst in einer inhaltlich vollständigen Nachricht formulieren.",
              "Kurze Nachrichten wie „Ja“, „stimmt“, „ich auch“, „und dann?“, „was ist passiert?“ oder „??“ nicht dauerhaft nacheinander senden und die Gruppe damit wie einen Zweier-Chat nutzen.",
              "Bedenken Sie, dass jede neue Nachricht bei vielen Mitgliedern eine Benachrichtigung auslösen kann.",
            ],
            publicLabel: "Bleibt in der Gruppe",
            publicText:
              "Fragen, Erfahrungen und Antworten, die auch für andere Mitglieder nützlich sind.",
            privateLabel: "Weiter im privaten Chat",
            privateText:
              "Ein persönliches Gespräch, das nur noch zwei Personen betrifft und für die übrige Gruppe keinen Mehrwert mehr hat.",
          },
          example: {
            eyebrow: "Praxisbeispiel",
            title: "Wie lässt sich eine Frage verbessern?",
            improveLabel: "Kann verbessert werden",
            improveMessages: [
              "Hallo",
              "Ist jemand da?",
              "Ich hätte eine Frage",
              "Wegen Anmeldung",
              "Weiß das jemand?",
              "Gibt es eine Antwort?",
              "??",
            ],
            goodLabel: "Gut",
            goodMessage:
              "Hallo zusammen. Ich habe eine Frage zur Anmeldung. Ich bin in Kiel in eine neue Wohnung gezogen und bin unsicher, ob für den Termin beim Bürgeramt eine PDF-Kopie der Wohnungsgeberbestätigung ausreicht oder ob ich das Original mitbringen muss. Falls jemand den Vorgang beim Bürgeramt Kiel kürzlich gemacht hat, würde ich mich über einen kurzen Erfahrungsbericht freuen.",
            whyTitle: "Warum ist diese Variante hilfreicher?",
            whyItems: [
              "Der Ort ist genannt",
              "Die Situation ist verständlich",
              "Die konkrete Frage ist klar",
              "Alles steht in einer vollständigen Nachricht",
              "Antwortende erkennen sofort, worauf sie eingehen sollen",
            ],
          },
          privacy: {
            eyebrow: "Sicherheit",
            title: "Vor dem Senden vertrauliche Angaben prüfen",
            description:
              "Dokumente oder Screenshots können eine Frage verständlicher machen. In einer öffentlichen Gruppe können diese Inhalte jedoch von vielen Personen gesehen werden.",
            items: [
              "Pass- und Aufenthaltstitelnummern",
              "Vollständige Adresse und Telefonnummer",
              "Bank- und Zugangsdaten",
              "Aktenzeichen, QR-Codes und vertrauliche Dokumente",
            ],
          },
          checklist: {
            eyebrow: "Vor dem Absenden",
            title: "10-Sekunden-Check",
            items: [
              "Ist mein Problem klar beschrieben?",
              "Sind Ort und nötiger Kontext genannt?",
              "Ist verständlich, was ich konkret wissen möchte?",
              "Enthält die Nachricht keine vertraulichen Daten?",
              "Steht die Frage in einer vollständigen Nachricht?",
            ],
          },
          backAction: "Zurück zu den Telegram-Gruppen",
        },
      };
}

function GuidePreview({
  copy,
}: {
  copy: ReturnType<typeof getCultureCopy>["preview"];
}) {
  return (
    <section
      aria-labelledby="telegram-guides-heading"
      className="relative overflow-hidden border-y border-slate-200/80 bg-[radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.09),transparent_28%),linear-gradient(180deg,rgba(248,250,252,0.9),rgba(255,255,255,0.98))] py-16 sm:py-20 dark:border-slate-800 dark:bg-[radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.025),transparent_28%),linear-gradient(180deg,#020617,#07111f)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
            {copy.eyebrow}
          </p>

          <h2
            id="telegram-guides-heading"
            className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl dark:text-white"
          >
            {copy.title}
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
            {copy.description}
          </p>
        </div>

        <Link
          href="/telegram/how-to-ask"
          aria-label={copy.ariaLabel}
          className="
            group mt-9 grid overflow-hidden rounded-[2rem]
            border border-sky-200/80 bg-white
            shadow-[0_22px_70px_-48px_rgba(14,165,233,0.65)]
            transition duration-300
            hover:-translate-y-1 hover:border-sky-300
            hover:shadow-[0_28px_80px_-46px_rgba(14,165,233,0.55)]
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-sky-500 focus-visible:ring-offset-4
            motion-reduce:transform-none motion-reduce:transition-none
            md:grid-cols-[auto_1fr_auto] md:items-center
            dark:border-slate-800 dark:bg-slate-900
            dark:hover:border-sky-400/30
            dark:focus-visible:ring-offset-slate-950
          "
        >
          <div className="flex items-center justify-center border-b border-slate-200/80 bg-gradient-to-br from-sky-50 to-cyan-50 p-7 md:h-full md:border-b-0 md:border-r dark:border-slate-800 dark:from-sky-400/[0.08] dark:to-cyan-400/[0.03]">
            <span className="flex size-14 items-center justify-center rounded-2xl border border-sky-200 bg-white text-sky-600 shadow-sm dark:border-sky-400/20 dark:bg-slate-950 dark:text-sky-300">
              <BookIcon className="size-6" />
            </span>
          </div>

          <div className="p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400">
                {copy.cardEyebrow}
              </p>
              <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {copy.meta}
              </span>
            </div>

            <h3 className="mt-3 text-xl font-bold tracking-[-0.025em] text-slate-950 sm:text-2xl dark:text-white">
              {copy.cardTitle}
            </h3>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
              {copy.cardDescription}
            </p>
          </div>

          <div className="flex items-center gap-2 px-6 pb-7 text-sm font-bold text-sky-700 md:px-8 md:pb-0 dark:text-sky-300">
            {copy.action}
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
          </div>
        </Link>
      </div>
    </section>
  );
}

function ArticleSection({ section }: { section: GuideSection }) {
  const isAccent =
    section.number === "06" ||
    section.number === "07" ||
    section.number === "08";

  return (
    <section
      className={`
        group relative border-t
        border-slate-200/80 py-10
        first:border-t-0 first:pt-0
        sm:py-12
        dark:border-slate-800
        ${
          isAccent
            ? "before:absolute before:-left-4 before:top-10 before:bottom-10 before:w-px before:bg-gradient-to-b before:from-transparent before:via-cyan-400/55 before:to-transparent sm:before:-left-6"
            : ""
        }
      `}
    >
      <div className="grid gap-5 sm:grid-cols-[4rem_1fr]">
        <div className="relative">
          <span className="relative z-10 flex size-12 items-center justify-center rounded-2xl border border-sky-200/90 bg-gradient-to-br from-white to-sky-50 text-xs font-black tracking-[0.12em] text-sky-700 shadow-[0_10px_30px_-22px_rgba(14,165,233,0.9)] transition duration-200 group-hover:-translate-y-0.5 group-hover:border-sky-300 group-hover:shadow-[0_16px_34px_-20px_rgba(14,165,233,0.75)] motion-reduce:transform-none motion-reduce:transition-none dark:border-sky-400/20 dark:from-slate-900 dark:to-sky-950/30 dark:text-sky-300">
            {section.number}
          </span>
          <span
            aria-hidden="true"
            className="absolute left-6 top-12 hidden h-[calc(100%+2.7rem)] w-px bg-gradient-to-b from-sky-200/80 via-slate-200/70 to-transparent sm:block dark:from-sky-400/15 dark:via-slate-800"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
            {section.title}
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
            {section.description}
          </p>

          {section.bullets && (
            <ul className="mt-5 space-y-3">
              {section.bullets.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400"
                >
                  <span
                    aria-hidden="true"
                    className="mt-3 size-1.5 shrink-0 rounded-full bg-sky-500"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {section.note && (
            <div className="mt-7 overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/90 via-white to-amber-50/45 shadow-[0_18px_42px_-34px_rgba(245,158,11,0.55)] dark:border-amber-400/15 dark:from-amber-400/[0.055] dark:via-slate-900/80 dark:to-slate-900/80">
              <div className="flex">
                <span
                  aria-hidden="true"
                  className="w-1 shrink-0 bg-amber-400/80 dark:bg-amber-400/45"
                />
                <div className="flex gap-3 px-5 py-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-amber-700 shadow-sm dark:bg-slate-800 dark:text-amber-300"
                  >
                    !
                  </span>
                  <p>{section.note}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function GuideArticle({
  copy,
}: {
  copy: ReturnType<typeof getCultureCopy>["article"];
}) {
  return (
    <article className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_38%,#ffffff_74%,#f8fbfd_100%)] dark:bg-[linear-gradient(180deg,#020617_0%,#07111f_42%,#020617_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-36 top-[8%] size-[34rem] rounded-full bg-cyan-200/16 blur-[120px] dark:bg-cyan-400/[0.025]" />
        <div className="absolute -left-40 top-[36%] size-[30rem] rounded-full bg-sky-200/13 blur-[110px] dark:bg-sky-400/[0.02]" />
        <div className="absolute right-[8%] top-[68%] size-[26rem] rounded-full bg-emerald-200/11 blur-[115px] dark:bg-emerald-400/[0.018]" />
      </div>

      <header className="relative overflow-hidden border-b border-slate-200/80 bg-white/35 backdrop-blur-[2px] dark:border-slate-800 dark:bg-slate-950/20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-24 -top-28 size-[28rem] rounded-full bg-sky-200/30 blur-[100px] dark:bg-sky-400/[0.045]" />
          <div className="absolute right-[4%] -top-10 size-[27rem] rounded-full bg-emerald-200/20 blur-[100px] dark:bg-emerald-400/[0.03]" />
          <div className="absolute right-[18%] top-[58%] size-[18rem] rounded-full bg-cyan-200/14 blur-[95px] dark:bg-cyan-400/[0.02]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-14 pt-14 sm:pb-16 sm:pt-18 lg:grid-cols-[minmax(0,1.85fr)_minmax(15rem,1fr)] lg:items-center lg:gap-12 lg:px-8 lg:pb-20 lg:pt-20">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-sky-700 shadow-sm backdrop-blur dark:border-sky-400/20 dark:bg-white/[0.04] dark:text-sky-300">
              <BookIcon className="size-4" />
              {copy.badge}
            </div>

            <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              {copy.title}
            </h1>

            <p className="mt-7 max-w-3xl text-xl font-semibold leading-9 text-slate-700 dark:text-slate-300">
              {copy.lead}
            </p>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
              {copy.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.10)] dark:bg-emerald-300"
                />
                {copy.readingLabel}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/90 bg-sky-50/80 px-4 py-2 text-sm font-bold text-sky-700 shadow-sm backdrop-blur dark:border-sky-400/15 dark:bg-sky-400/[0.055] dark:text-sky-300">
                <span
                  aria-hidden="true"
                  className="flex size-6 items-center justify-center rounded-full bg-white text-[0.68rem] font-black text-sky-700 shadow-sm dark:bg-slate-900 dark:text-sky-300"
                >
                  10
                </span>
                {copy.rulesLabel}
              </span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="relative hidden min-h-[19rem] lg:block"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_45%_35%,rgba(56,189,248,0.12),transparent_38%),radial-gradient(circle_at_70%_68%,rgba(52,211,153,0.11),transparent_34%)] dark:bg-[radial-gradient(circle_at_45%_35%,rgba(56,189,248,0.05),transparent_38%),radial-gradient(circle_at_70%_68%,rgba(52,211,153,0.045),transparent_34%)]" />

            <div className="absolute left-[4%] top-[16%] w-[78%] rounded-[1.4rem] border border-sky-200/65 bg-white/58 p-5 shadow-[0_18px_50px_-36px_rgba(14,165,233,0.75)] backdrop-blur-xl dark:border-sky-400/12 dark:bg-slate-900/42">
              <div className="flex items-center gap-3">
                <span className="size-2.5 rounded-full bg-sky-400 shadow-[0_0_0_5px_rgba(56,189,248,0.08)]" />
                <span className="h-2 w-20 rounded-full bg-sky-200/80 dark:bg-sky-400/12" />
                <span className="h-px flex-1 bg-gradient-to-r from-sky-200/70 to-transparent dark:from-sky-400/12" />
              </div>
              <div className="mt-5 space-y-3">
                <span className="block h-2.5 w-[82%] rounded-full bg-slate-200/70 dark:bg-slate-700/65" />
                <span className="block h-2.5 w-[66%] rounded-full bg-slate-200/55 dark:bg-slate-700/50" />
              </div>
            </div>

            <div className="absolute right-[2%] top-[46%] w-[70%] rounded-[1.4rem] border border-emerald-200/65 bg-white/56 p-5 shadow-[0_18px_50px_-38px_rgba(16,185,129,0.72)] backdrop-blur-xl dark:border-emerald-400/12 dark:bg-slate-900/40">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <span className="block h-2.5 w-[78%] rounded-full bg-slate-200/65 dark:bg-slate-700/60" />
                  <span className="block h-2.5 w-[55%] rounded-full bg-slate-200/50 dark:bg-slate-700/45" />
                </div>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-emerald-200/80 bg-emerald-50/90 text-sm font-black text-emerald-700 shadow-sm dark:border-emerald-400/15 dark:bg-emerald-400/[0.06] dark:text-emerald-300">
                  ✓
                </span>
              </div>
            </div>

            <div className="absolute bottom-[9%] left-[18%] flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/55 px-3.5 py-2 shadow-[0_12px_34px_-26px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/38">
              <span className="size-1.5 rounded-full bg-cyan-400" />
              <span className="h-1.5 w-10 rounded-full bg-slate-200/80 dark:bg-slate-700/70" />
              <span className="h-1.5 w-5 rounded-full bg-emerald-200/90 dark:bg-emerald-400/15" />
            </div>

            <div className="absolute right-[8%] top-[28%] h-px w-[28%] bg-gradient-to-r from-transparent via-sky-300/45 to-transparent dark:via-sky-400/12" />
            <div className="absolute bottom-[24%] left-[5%] h-px w-[24%] bg-gradient-to-r from-transparent via-emerald-300/45 to-transparent dark:via-emerald-400/12" />
          </div>
        </div>
      </header>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-8 lg:py-20">
        <div className="min-w-0">
          <section className="relative mb-14 overflow-hidden rounded-[2rem] border border-sky-200/80 bg-gradient-to-br from-sky-50/85 via-white to-cyan-50/55 p-6 shadow-[0_22px_58px_-42px_rgba(14,165,233,0.55)] sm:p-8 dark:border-sky-400/15 dark:from-sky-400/[0.055] dark:via-slate-900/80 dark:to-cyan-400/[0.025]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 size-52 rounded-full border border-sky-200/45 dark:border-sky-400/[0.08]"
            />
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
              {copy.principlesLabel}
            </p>

            <ul className="mt-5 grid gap-4">
              {copy.principles.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-semibold leading-7 text-slate-700 sm:text-base dark:text-slate-300"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-sky-700 shadow-sm dark:bg-slate-900 dark:text-sky-300"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div>
            {copy.sections.slice(0, 6).map((section) => (
              <ArticleSection key={section.number} section={section} />
            ))}
          </div>

          <section className="my-14 overflow-hidden rounded-[2rem] border border-cyan-200/75 bg-gradient-to-br from-white via-cyan-50/35 to-sky-50/45 shadow-[0_22px_64px_-48px_rgba(6,182,212,0.48)] dark:border-cyan-400/15 dark:from-slate-900 dark:via-cyan-950/10 dark:to-sky-950/10">
            <div className="border-b border-slate-200 p-6 sm:p-8 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400">
                {copy.groupCulture.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:text-3xl dark:text-white">
                {copy.groupCulture.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-400">
                {copy.groupCulture.description}
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <ul className="space-y-4">
                {copy.groupCulture.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-2 shrink-0 rounded-full bg-sky-500"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-5 dark:border-emerald-400/15 dark:bg-emerald-400/[0.05]">
                  <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                    {copy.groupCulture.publicLabel}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {copy.groupCulture.publicText}
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-200/80 bg-violet-50/70 p-5 dark:border-violet-400/15 dark:bg-violet-400/[0.05]">
                  <p className="text-sm font-bold text-violet-800 dark:text-violet-300">
                    {copy.groupCulture.privateLabel}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {copy.groupCulture.privateText}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div>
            {copy.sections.slice(6).map((section) => (
              <ArticleSection key={section.number} section={section} />
            ))}
          </div>

          <section className="my-14 overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white shadow-[0_28px_80px_-52px_rgba(15,23,42,0.45)] dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 p-6 sm:p-8 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400">
                {copy.example.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:text-3xl dark:text-white">
                {copy.example.title}
              </h2>
            </div>

            <div className="grid lg:grid-cols-2">
              <div className="border-b border-rose-200/70 bg-gradient-to-br from-rose-50/80 via-orange-50/30 to-white p-6 sm:p-8 lg:border-b-0 lg:border-r dark:border-slate-800 dark:from-rose-400/[0.055] dark:via-orange-400/[0.018] dark:to-slate-900">
                <p className="text-sm font-bold text-rose-700 dark:text-rose-300">
                  {copy.example.improveLabel}
                </p>

                <div className="mt-5 space-y-2">
                  {copy.example.improveMessages.map((message) => (
                    <div
                      key={message}
                      className="w-fit max-w-full rounded-2xl rounded-bl-md border border-rose-200/70 bg-white/90 px-4 py-2.5 text-sm text-slate-700 shadow-[0_10px_24px_-18px_rgba(244,63,94,0.45)] transition duration-200 hover:-translate-y-0.5 hover:border-rose-300 motion-reduce:transform-none motion-reduce:transition-none dark:border-rose-400/10 dark:bg-slate-800/90 dark:text-slate-200"
                    >
                      {message}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50/80 via-cyan-50/25 to-white p-6 sm:p-8 dark:from-emerald-400/[0.055] dark:via-cyan-400/[0.018] dark:to-slate-900">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  {copy.example.goodLabel}
                </p>

                <div className="mt-5 rounded-2xl rounded-bl-md border border-emerald-200 bg-white/95 px-5 py-4 text-sm leading-7 text-slate-700 shadow-[0_14px_30px_-22px_rgba(16,185,129,0.5)] transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 motion-reduce:transform-none motion-reduce:transition-none dark:border-emerald-400/15 dark:bg-slate-800/90 dark:text-slate-200">
                  {copy.example.goodMessage}
                </div>

                <p className="mt-7 text-sm font-bold text-slate-950 dark:text-white">
                  {copy.example.whyTitle}
                </p>

                <ul className="mt-3 space-y-2">
                  {copy.example.whyItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-6 text-slate-600 dark:text-slate-400"
                    >
                      <span className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[2rem] border border-amber-200/80 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/40 p-6 shadow-[0_22px_62px_-48px_rgba(245,158,11,0.48)] sm:p-8 dark:border-amber-400/15 dark:from-amber-400/[0.055] dark:via-slate-900 dark:to-orange-400/[0.018]">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-300 via-amber-500 to-orange-400 dark:from-amber-400/40 dark:via-amber-400/70 dark:to-orange-400/35"
            />
            <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm dark:bg-slate-900 dark:text-amber-300">
              <ShieldIcon className="size-5" />
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">
              {copy.privacy.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
              {copy.privacy.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
              {copy.privacy.description}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {copy.privacy.items.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-sm font-semibold leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-sky-200/70 bg-white/75 p-5 shadow-[0_22px_58px_-42px_rgba(14,165,233,0.5)] backdrop-blur-xl dark:border-sky-400/15 dark:bg-slate-900/75">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-14 -top-14 size-36 rounded-full bg-cyan-200/25 blur-3xl dark:bg-cyan-400/[0.04]"
            />
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400">
              {copy.checklist.eyebrow}
            </p>
            <h2 className="mt-2 text-lg font-bold text-slate-950 dark:text-white">
              {copy.checklist.title}
            </h2>

            <ol className="relative mt-6 space-y-2">
              <span
                aria-hidden="true"
                className="absolute bottom-4 left-[0.8rem] top-4 w-px bg-gradient-to-b from-sky-200 via-cyan-200 to-emerald-200 dark:from-sky-400/15 dark:via-cyan-400/15 dark:to-emerald-400/15"
              />

              {copy.checklist.items.map((item, index) => (
                <li
                  key={item}
                  className="group/item relative flex items-start gap-3 rounded-xl px-1 py-2 text-sm leading-6 text-slate-600 transition duration-200 hover:bg-sky-50/70 hover:text-slate-800 focus-within:bg-sky-50/70 dark:text-slate-400 dark:hover:bg-sky-400/[0.04] dark:hover:text-slate-200 motion-reduce:transition-none"
                >
                  <span className="relative z-10 flex size-7 shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-white text-[0.68rem] font-black text-sky-700 shadow-sm transition duration-200 group-hover/item:border-sky-300 group-hover/item:bg-sky-50 dark:border-sky-400/15 dark:bg-slate-800 dark:text-sky-300 dark:group-hover/item:bg-sky-400/[0.06] motion-reduce:transition-none">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <Link
            href="/telegram"
            className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky-700 transition hover:text-sky-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-4 dark:text-sky-300 dark:hover:text-sky-200 dark:focus-visible:ring-offset-slate-950"
          >
            <span
              aria-hidden="true"
              className="transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
            >
              ←
            </span>
            {copy.backAction}
          </Link>
        </aside>
      </div>
    </article>
  );
}

export default async function TelegramCultureGuide({
  variant = "embedded",
}: TelegramCultureGuideProps) {
  const locale =
    (await getLocale()) as SupportedTelegramLocale;

  const copy = getCultureCopy(locale);

  return variant === "standalone" ? (
    <GuideArticle copy={copy.article} />
  ) : (
    <GuidePreview copy={copy.preview} />
  );
}
