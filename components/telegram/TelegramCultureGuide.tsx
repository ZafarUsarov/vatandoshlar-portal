import { getLocale } from "next-intl/server";
import { Inter_Tight } from "next/font/google";


import { Link } from "@/i18n/navigation";
import type { SupportedTelegramLocale } from "@/types/telegram";
import ShareButton from "@/components/shared/ShareButton";
import GuideInfoBox from "@/components/guide/GuideInfoBox";
import TelegramGuideConversation from "./TelegramGuideConversation";
import TelegramArticleConversation from "./TelegramArticleConversation";


const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  weight: "600",
  display: "swap",
});


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


function ArrowUpRightIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}


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
          mobileDescription: "Savolni aniq yozing, kontekst bering va foydali javob oling.",
          mobileBenefits: ["Aniq savol", "Kontekst", "Maxfiylik"],
          action: "Qo‘llanmani o‘qish",
          ariaLabel:
            "Guruhda qanday qilib to‘g‘ri savol berish kerak qo‘llanmasini o‘qish",
          meta: "Amaliy qo‘llanma",
          benefits: ["Savolni aniq yozish", "Kerakli kontekstni berish", "Maxfiylikni saqlash"],
          conversation: {
            questionLabel: "Savol",
            question: "Salom! Kiel shahrida Anmeldung uchun Wohnungsgeberbestätigung asl nusxasi kerakmi?",
            typing: "Javob yozilmoqda…",
            answerLabel: "Hamjamiyat javobi",
            answer: "Bürgeramt Kiel rasmiy sahifasidagi talablarni tekshiring. Uchrashuvga hujjatning asl nusxasini ham olib borish xavfsizroq.",
          },
        },
        article: {
          badge: "Telegram / Amaliy qöllanma",
          title: "Guruhda qanday qilib töǵri savol beriş kerak?",
          lead:
            "Aniq savol. Tuşunarli kontekst. Foydali javob.",
          intro:
            "Telegram guruhlarida samarali, hurmatli va xavfsiz muloqot qiliş uçun 10 ta amaliy tavsiya.",
          readingLabel: "Qisqa va amaliy",
          rulesLabel: "10 ta qoida",
          principlesLabel: "Asosiy tamoyillar",
          principles: [
            "Savolni bitta tuşunarli xabarda yozing",
            "Javob beriş uçun kerakli kontekstni qöşing",
            "Şaxsiy ma’lumotlarni oçiq guruhda ulaşmang",
          ],
          sections: [
{"number": "01", "title": "Savolingizni bitta töliq xabarda yozing", "description": "Salomlaşiş, vaziyat va savolingizni imkon qadar bitta xabarda ifodalang. Bu boşqa a’zolarga murojaatingizni tezroq tuşunişga yordam beradi. «Salom», «Bir savolim bor», «Kim biladi?» kabi ketma-ket alohida xabarlar örniga töliq savol yozing."},
{"number": "02", "title": "Kerakli kontekstni qöşing", "description": "Savolingizga javob beriş uçun zarur bölgan tafsilotlarni kiriting. Masalan, qaysi şaharda yaşayotganingiz, qaysi idoraga murojaat qilganingiz yoki qanday jarayonda ekaningizni körsating. Savolga aloqasi bölmagan şaxsiy ma’lumotlarni yoziş şart emas."},
{"number": "03", "title": "Muammoni aniq tuşuntiring", "description": "Aynan nimani bilmoqçi ekaningizni yoki qaysi bosqiçda muammoga duç kelganingizni tuşunarli yozing. Umumiy savollarga qaraganda aniq savollarga foydali javob beriş osonroq."},
{"number": "04", "title": "Oldin nimalarni sinab körganingizni ayting", "description": "Agar rasmiy saytni tekşirgan, tegişli idoraga murojaat qilgan yoki boşqa yeçimlarni sinab körgan bölsangiz, buni qisqaça ayting. Bu takroriy maslahatlarning oldini oladi."},
{"number": "05", "title": "Zarur bölsa, havola yoki skrinşot qöşing", "description": "Rasmiy manba, xatolik xabari yoki skrinşot vaziyatni yaxşiroq tuşuntirişga yordam berişi mumkin. Ulaşişdan oldin şaxsiy va maxfiy ma’lumotlar körinmayotganini tekşiring."},
{"number": "06", "title": "Şaxsiy ma’lumotlaringizni himoya qiling", "description": "Pasport, Aufenthaltstitel, bank ma’lumotlari, telefon raqami, töliq manzil va maxfiy hujjatlarni oçiq guruhlarga joylamang."},
{"number": "07", "title": "Foydali savol va javoblarni guruhda qoldiring", "description": "Agar suhbat boşqa a’zolar uçun ham foydali bölsa, uni darhol şaxsiy chatga olib ötişga şoşilmang. Guruhda qolgan javoblar kelajakda boşqa vatandoşlarga ham yordam berişi mumkin. Şaxsiy yoki maxfiy masalalarni esa şaxsiy muloqotda davom ettiring."},
{"number": "08", "title": "Boşqalarning vaqtini hurmat qiling", "description": "Guruh a’zolari har doim ham darhol javob bera olmasligi tabiiy. Biror kişidan javob talab qiliş yoki uni qayta-qayta belgilaş örniga, savolingizni aniq qoldiring va javob uçun vaqt bering."},
{"number": "09", "title": "Bir xil savolni takrorlamang", "description": "Savolga javob darhol kelmasa, uni qisqa vaqt içida qayta-qayta yubormang. Yangi ma’lumot paydo bölsa, imkon qadar avvalgi xabaringizni töldiring."},
{"number": "10", "title": "Natijani boşqalar bilan bölişing", "description": "Muammo hal bölgaç, qanday yeçim yordam berganini qisqaça yozing. Sizning tajribangiz keyinçalik şu vaziyatga duç keladigan boşqa vatandoşlar uçun foydali bölişi mumkin."}
] satisfies GuideSection[],
          groupCulture: {
            eyebrow: "Guruh madaniyati",
            title: "Birgalikda foydali hamjamiyat yarataylik",
            description:
              "Telegram guruhlari — vatandoşlarimiz tajriba almaşadigan, bir-biriga yordam beradigan va foydali ma’lumotlarni ulaşadigan umumiy muloqot maydoni. Har bir xabar boşqa a’zolarning ham vaqtiga va e’tiboriga ta’sir qilişini hisobga olaylik.",
            points: [
              "Bir mavzu böyiça fikrni imkon qadar mazmunli va töliq xabarda ifodalang.",
              "“Ha”, “töǵri”, “men ham”, “keyin-çi?”, “nima böldi?”, “??” kabi alohida qisqa xabarlarni ketma-ket yuborib guruhni ikki kişilik çatga aylantirmang.",
              "Har bir yangi xabar köplab guruh a’zolariga notification bölişi mumkinligini hisobga oling.",
            ],
            publicLabel: "Guruhda qoladi",
            publicText:
              "Boşqalarga ham foydali savol, tajriba yoki javob.",
            privateLabel: "Şaxsiy chatga ötadi",
            privateText:
              "Faqat ikki kişiga tegişli bölib qolgan va boşqalarga foyda bermaydigan şaxsiy suhbat.",
          },
          example: {
            eyebrow: "Amaliy misol",
            title: "Bitta savol. Ikki xil yondaşuv.",
            improveLabel: "Yaxşilaş kerak",
            improveMessages: [
              "Salom",
              "Kim bor?",
              "Bir savolim bor edi",
              "Anmeldung haqida",
              "Kim biladi?",
              "Javob bormi?",
              "??",
            ],
            goodLabel: "Tavsiya etiladigan variant",
            goodMessage:
              "Assalomu alaykum! Anmeldung böyiça savolim bor. Yaqinda Kiel şahrida yangi kvartiraga köçdim.\n\nBürgeramtga Wohnungsgeberbestätigung hujjatining PDF nusxasini olib boriş yetarlimi yoki asl nusxasi ham kerakmi?\n\nKielda yaqinda şu jarayondan ötgan vatandoşlar bölsa, tajribangiz bilan bölişsangiz, xursand bölardim. Rahmat!",
            whyTitle: "Nega bu variant yaxşiroq?",
            whyItems: [
              "Joy körsatilgan",
              "Vaziyat tuşunarli",
              "Aniq savol berilgan",
              "Hammasi bitta töliq xabarda",
              "Javob beruvçi nimaga javob berişini darhol tuşunadi",
            ],
          },
          privacy: {
            eyebrow: "Maxfiylik va xavfsizlik",
            title: "Şaxsiy ma’lumotlaringizni himoya qiling",
            description:
              "Hujjat yoki skrinşot savolingizni tuşuntirişga yordam berişi mumkin. Biroq guruhga yuborilgan ma’lumotlarni köplab odamlar körişi, saqlaşi yoki boşqalarga yuborişi mumkin.",
            items: [
              "Pasport va Aufenthaltstitel raqamlari",
              "Töliq manzil va telefon raqami",
              "Bank ma’lumotlari, parollar va login ma’lumotlari",
              "Aktenzeichen, QR-kod va maxfiy hujjatlar",
            ],
          },
          checklist: {
            eyebrow: "Yuborişdan oldin",
            title: "10 soniyalik tekşiruv",
            items: [
              "Muammomni aniq tuşuntirdimmi?",
              "Kerakli kontekstni qöşdimmi?",
              "Savolim tuşunarlimi?",
              "Maxfiy ma’lumotlar yöqmi?",
              "Savolim bitta töliq xabardami?",
            ],
          },
          backAction: "Telegram guruhlariga qaytiş",
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
          mobileDescription: "Klar fragen, Kontext nennen und hilfreiche Antworten erhalten.",
          mobileBenefits: ["Klare Frage", "Kontext", "Privatsphäre"],
          action: "Leitfaden lesen",
          ariaLabel:
            "Leitfaden zum Stellen guter Fragen in Telegram-Gruppen lesen",
          meta: "Praktischer Leitfaden",
          benefits: ["Klar fragen", "Kontext nennen", "Privatsphäre schützen"],
          conversation: {
            questionLabel: "Frage",
            question: "Hallo! Brauche ich in Kiel für die Anmeldung die Wohnungsgeberbestätigung im Original?",
            typing: "Antwort wird geschrieben…",
            answerLabel: "Antwort aus der Community",
            answer: "Prüfe die Vorgaben auf der offiziellen Website des Bürgeramts Kiel. Nimm vorsichtshalber auch das Original mit.",
          },
        },
        article: {
          badge: "Telegram / Praktischer Leitfaden",
          title: "Wie stellt man eine gute Frage in der Gruppe?",
          lead:
            "Klare Frage. Verständlicher Kontext. Hilfreiche Antwort.",
          intro:
            "10 praktische Tipps für eine hilfreiche, respektvolle und sichere Kommunikation in Telegram-Gruppen.",
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
            title: "Gemeinsam eine hilfreiche Community gestalten",
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
            title: "Eine Frage. Zwei Ansätze.",
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
            goodLabel: "Empfohlene Variante",
            goodMessage:
              "Hallo zusammen! Ich habe eine Frage zur Anmeldung. Ich bin vor Kurzem in Kiel in eine neue Wohnung gezogen.\n\nReicht beim Bürgeramt eine PDF-Kopie der Wohnungsgeberbestätigung aus oder muss ich das Original mitbringen?\n\nFalls jemand diesen Vorgang kürzlich in Kiel erledigt hat, freue ich mich über einen kurzen Erfahrungsbericht. Vielen Dank!",
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
            title: "Schützen Sie Ihre persönlichen Daten",
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
              "Ist der nötige Kontext genannt?",
              "Ist meine Frage verständlich?",
              "Keine vertraulichen Daten?",
              "Alles in einer Nachricht?",
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
      className="relative border-y border-slate-200/80 bg-[#F7F7F7] py-12 sm:py-14 lg:py-16 dark:border-[var(--telegram-border,#1e293b)] dark:bg-[var(--telegram-section,#202124)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-700 dark:text-[var(--telegram-accent,#5eead4)]">
            {copy.eyebrow}
          </p>


          <h2
            id="telegram-guides-heading"
            className={`${interTight.className} mt-4 text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl dark:text-white`}
          >
            {copy.title}
          </h2>


          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-[var(--telegram-secondary,#94a3b8)]">
            {copy.description}
          </p>
        </div>


      </div>
      <div className="mx-auto w-full px-5 sm:px-6 lg:px-8">
        <Link
          href="/telegram/how-to-ask"
          aria-label={copy.ariaLabel}
          className="group relative mt-5 block overflow-hidden rounded-[14px] md:mt-9 border border-[#55D7C3]/20 bg-[var(--telegram-card-guide,#202124)] text-white transition-colors duration-200 hover:border-[#55D7C3]/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#55D7C3] motion-reduce:transition-none"
        >
          <div className="relative grid min-w-0 gap-0 p-5 md:p-9 md:gap-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-14 xl:p-16">
            <div className="min-w-0 max-md:contents">
              <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5 max-md:order-1 md:gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#55D7C3]/30 bg-[#55D7C3]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.11em] text-[#55D7C3] sm:text-xs md:gap-2 md:px-3 md:py-1.5 md:tracking-[0.16em]">
                  <BookIcon className="size-4" />
                  {copy.cardEyebrow}
                </span>
                <span className="text-xs font-medium text-slate-400">{copy.meta}</span>
              </div>
              <h3 className="mt-3 max-w-2xl text-[clamp(1.5rem,6.5vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.035em] text-white max-md:order-1 md:mt-6 md:text-3xl md:leading-tight lg:text-[2.1rem]">
                {copy.cardTitle}
              </h3>
              <p className="mt-2 max-w-xl text-[13px] leading-5 text-slate-300 max-md:order-1 md:mt-4 md:text-base md:leading-7">
                <span className="md:hidden">{copy.mobileDescription}</span>
                <span className="hidden md:inline">{copy.cardDescription}</span>
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 max-md:order-1 md:mt-6 md:grid md:grid-cols-3 md:gap-3 lg:grid-cols-1 xl:grid-cols-3">
                {copy.benefits.map((benefit, index) => (
                  <li key={benefit} className="flex items-center gap-1.5 text-xs leading-5 text-slate-200 md:items-start md:gap-2 md:text-sm">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 font-bold text-[#55D7C3]">✓</span>
                    <span className="md:hidden">{copy.mobileBenefits[index]}</span>
                    <span className="hidden md:inline">{benefit}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-flex min-h-11 w-fit max-w-full items-center justify-center gap-2 rounded-[11px] border border-[#55D7C3]/70 bg-[#55D7C3] px-4 py-2 text-sm font-semibold text-[#102B27] max-md:order-2 md:mt-7 transition-colors duration-200 group-hover:bg-[#D9FBF5] motion-reduce:transition-none">
                {copy.action}
                <ArrowUpRightIcon className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
              </span>
            </div>
            <div className="min-w-0 max-md:order-3 max-md:mt-[18px]">
              <TelegramGuideConversation conversation={copy.conversation} />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}


function GuideArticle({ copy, locale }: { copy: ReturnType<typeof getCultureCopy>["article"]; locale: SupportedTelegramLocale }) {
  const uz = locale === "uz";
  const heading = `${interTight.className} text-2xl font-semibold tracking-normal sm:text-3xl`;
  const eyebrow = "text-sm font-medium uppercase tracking-[0.16em] text-teal-700 dark:text-[var(--telegram-accent)]";
  const body = "text-base leading-7 text-slate-600 dark:text-[var(--telegram-secondary)]";
  const border = "border-slate-200 dark:border-[var(--telegram-border)]";
  const principles = uz ? [
    ["Bitta töliq xabar", "Vaziyat va savolingizni imkon qadar bitta tuşunarli xabarda ifodalang."],
    ["Yetarli kontekst", "Javob beriş uçun zarur bölgan joy, vaziyat va muhim tafsilotlarni kiriting."],
    ["Maxfiylik va xavfsizlik", "Şaxsiy va maxfiy ma’lumotlaringizni oçiq guruhlarda ulaşmang."],
  ] : [
    ["Eine vollständige Nachricht", "Beschreiben Sie Situation und Frage möglichst in einer verständlichen Nachricht."],
    ["Ausreichender Kontext", "Nennen Sie den Ort, die Situation und relevante Einzelheiten."],
    ["Privatsphäre und Sicherheit", "Teilen Sie keine persönlichen oder vertraulichen Daten in öffentlichen Gruppen."],
  ];
  const culture = uz ? [["Guruhda muhokama qiliş", "Boşqalarga ham foydali savollar", "Amaliy tajribalar va yeçimlar", "Muhim yangiliklar va foydali manbalar", "Umumiy mavzudagi muhokamalar"], ["Şaxsiy chatda davom ettiriş", "Faqat ikki kişiga tegişli suhbatlar", "Şaxsiy va maxfiy masalalar", "Individual kelişuvlar", "Umumiy mavzuga aloqasi bölmagan suhbatlar"]] : [["In der Gruppe besprechen", "Fragen von allgemeinem Interesse", "Praktische Erfahrungen und Lösungen", "Wichtige Neuigkeiten und hilfreiche Quellen", "Diskussionen zu gemeinsamen Themen"], ["Im privaten Chat fortsetzen", "Gespräche zwischen zwei Personen", "Persönliche und vertrauliche Anliegen", "Individuelle Absprachen", "Gespräche ohne Bezug zum Gruppenthema"]];
  return (
    <article className="uzde-telegram-page uzde-home-frame bg-[var(--uzde-page-bg)] pb-24 dark:text-[var(--telegram-text)]">
      <header className={`border-b ${border}`}>
        <div className="mx-auto max-w-7xl px-5 pb-7 pt-3 sm:px-6 lg:px-8 lg:pb-9">
          <Link href="/telegram" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">← {copy.backAction}</Link>
          <div className="mx-auto mt-2 max-w-5xl text-center sm:mt-3">
            <p className={eyebrow}>{copy.badge}</p>
            <h1 className={`${interTight.className} mt-3 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-normal [text-wrap:balance]`}>{copy.title}</h1>
            <p className="mt-3 text-base font-medium sm:text-lg">{copy.lead}</p>
            <p className={`mx-auto mt-2 max-w-3xl ${body}`}>{copy.intro}</p>
          </div>
          <div className="relative left-1/2 mt-5 w-[calc(100vw-16px)] -translate-x-1/2 sm:mt-6 sm:w-[calc(100vw-24px)] lg:w-[calc(100vw-32px)]"><TelegramArticleConversation locale={locale} /></div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <section className={`border-b py-10 ${border}`}>
          <div className="flex items-center justify-between gap-4"><h2 className={eyebrow}>{copy.principlesLabel}</h2><div className="md:hidden"><ShareButton title={copy.title} shareUrl={`https://uzde.de/${locale}/telegram/how-to-ask`} locale={locale} variant="guide" iconOnly /></div></div>
          <div className="mt-5 grid gap-6 md:grid-cols-3 md:gap-10">{principles.map(([title, description], index) => <div key={title}><span className={eyebrow}>0{index + 1}</span><h3 className="mt-2 text-xl font-semibold">{title}</h3><p className={`mt-2 ${body}`}>{description}</p></div>)}</div>
        </section>
        <div className="grid items-start gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
          <section className="min-w-0"><h2 className={heading}>{uz ? "Önta asosiy qoida" : "Zehn Grundregeln"}</h2>
            <ol className="mt-5">{(copy.sections as readonly GuideSection[]).map(section => <li key={section.number} className={`grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-b py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5 ${border}`}><span className={`${interTight.className} text-xl font-semibold text-teal-700 dark:text-[var(--telegram-accent)]`}>{section.number}</span><div><h3 className="text-xl font-semibold">{section.title}</h3><p className={`mt-2 ${body}`}>{section.description}</p>{"bullets" in section && section.bullets && <ul className={`mt-3 list-disc space-y-1 pl-5 ${body}`}>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}{"note" in section && section.note && <p className={`mt-3 ${body}`}>{section.note}</p>}</div></li>)}</ol>
          </section>
          <aside className={`rounded-[14px] border p-5 lg:sticky lg:top-28 ${border} dark:bg-[var(--telegram-card)]`}><p className={eyebrow}>{copy.checklist.eyebrow}</p><h2 className="mt-2 text-xl font-semibold">{copy.checklist.title}</h2><div className="mt-4 space-y-3">{copy.checklist.items.map(item => <label key={item} className={`grid cursor-pointer grid-cols-[18px_minmax(0,1fr)] items-start gap-3 ${body}`}><span className="flex h-7 items-center translate-y-px"><input type="checkbox" className="size-[18px] shrink-0 cursor-pointer appearance-none rounded-[4px] border border-slate-400 bg-white checked:border-teal-700 checked:bg-teal-700 checked:after:block checked:after:mx-auto checked:after:mt-[1px] checked:after:h-[10px] checked:after:w-[5px] checked:after:rotate-45 checked:after:border-b-2 checked:after:border-r-2 checked:after:border-white checked:after:content-[''] hover:border-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-[var(--telegram-muted)] dark:bg-[var(--telegram-section)] dark:checked:border-[var(--telegram-accent)] dark:checked:bg-[var(--telegram-accent)] dark:checked:after:border-[var(--telegram-section)] dark:hover:border-[var(--telegram-accent)] dark:focus-visible:outline-[var(--telegram-accent)] forced-colors:appearance-auto" /></span><span>{item}</span></label>)}</div></aside>
        </div>
        <section className={`border-t py-10 ${border}`}><p className={eyebrow}>{copy.groupCulture.eyebrow}</p><h2 className={`mt-3 ${heading}`}>{copy.groupCulture.title}</h2><p className={`mt-4 max-w-3xl ${body}`}>{copy.groupCulture.description}</p><div className="mt-7 grid gap-8 md:grid-cols-2">{culture.map(([title,...items]) => <div key={title}><h3 className="text-xl font-semibold">{title}</h3><ul className={`mt-3 list-disc space-y-2 pl-5 ${body}`}>{items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></section>
        <section className={`border-t py-10 ${border}`}><p className={eyebrow}>{copy.example.eyebrow}</p><h2 className={`mt-3 ${heading}`}>{copy.example.title}</h2><p className={`mt-3 ${body}`}>{uz ? "Savolni qanday ifodalaşimiz boşqalarning uni tuşunişi va javob berişiga ta’sir qiladi." : "Die Formulierung einer Frage beeinflusst, wie gut andere sie verstehen und beantworten können."}</p><div className="mt-7 grid gap-5 md:grid-cols-2"><div className={`rounded-[14px] border p-5 ${border} dark:bg-[var(--telegram-card)]`}><h3 className="font-semibold text-rose-700 dark:text-rose-300">{copy.example.improveLabel}</h3><div className="mt-5 flex flex-col items-start gap-2">{copy.example.improveMessages.filter(item => item !== "??").map(item => <p key={item} className={`rounded-xl rounded-bl-sm border px-4 py-2 ${border} ${body}`}>{item}</p>)}</div></div><div className={`rounded-[14px] border p-5 ${border} dark:bg-[var(--telegram-card)]`}><h3 className="font-semibold text-teal-700 dark:text-[var(--telegram-accent)]">{copy.example.goodLabel}</h3><p className={`mt-5 whitespace-pre-line rounded-xl rounded-br-sm border border-teal-600/30 px-4 py-3 ${body}`}>{copy.example.goodMessage}</p><h4 className="mt-5 font-semibold">{copy.example.whyTitle}</h4><ul className={`mt-3 space-y-2 ${body}`}>{copy.example.whyItems.map(item => <li key={item} className="flex gap-2"><span aria-hidden="true" className="text-teal-600 dark:text-[var(--telegram-accent)]">✓</span>{item}</li>)}</ul></div></div><p className={`mt-4 text-sm ${body}`}>{uz ? "Bu misol faqat savol yoziş uslubini körsatadi, rasmiy ma’muriy maslahat emas." : "Dieses Beispiel zeigt nur die Frageformulierung und ist keine verbindliche Auskunft zur Anmeldung."}</p></section>
        <section className={`border-t py-10 ${border}`}><p className={`mb-4 ${eyebrow}`}>{copy.privacy.eyebrow}</p><GuideInfoBox title={copy.privacy.title} variant="warning"><p>{copy.privacy.description}</p><ul className="my-3 list-disc space-y-1 pl-5">{copy.privacy.items.map(item => <li key={item}>{item}</li>)}</ul><p>{uz ? "Skrinşot yoki hujjat yuborişdan oldin şaxsiy ma’lumotlarni xavfsiz tarzda yaşiring yoki olib taşlang." : "Machen Sie persönliche Daten vor dem Teilen von Screenshots oder Dokumenten unkenntlich oder entfernen Sie sie."}</p></GuideInfoBox></section>
        <section className={`border-t py-10 ${border}`}><h2 className={heading}>{uz ? "Hamjamiyatingizni toping" : "Finden Sie Ihre Community"}</h2><p className={`mt-3 max-w-2xl ${body}`}>{uz ? "Germaniyadagi vatandoşlarimiz bilan boǵlaning, tajriba almaşing va özingizga kerakli Telegram guruhiga qöşiling." : "Vernetzen Sie sich mit Landsleuten in Deutschland, tauschen Sie Erfahrungen aus und finden Sie die passende Telegram-Gruppe."}</p><Link href="/telegram" className="mt-5 inline-flex min-h-11 items-center gap-3 border-b border-current font-semibold hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4">{uz ? "Telegram guruhlarini köriş" : "Telegram-Gruppen entdecken"}<ArrowRightIcon /></Link></section>
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
    <GuideArticle copy={copy.article} locale={locale} />
  ) : (
    <GuidePreview copy={copy.preview} />
  );
}
