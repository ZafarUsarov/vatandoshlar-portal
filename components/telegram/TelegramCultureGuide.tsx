import { getLocale } from "next-intl/server";

import Card from "@/components/ui/Card";
import type { SupportedTelegramLocale } from "@/types/telegram";

type CommunicationRule = Readonly<{
  number: string;
  title: string;
  description: string;
}>;

type TelegramCultureGuideProps = Readonly<{
  variant?: "embedded" | "standalone";
}>;

function getCultureCopy(locale: SupportedTelegramLocale) {
  return locale === "uz"
    ? {
        eyebrow: "Muloqot madaniyati",
        standaloneBadge: "Amaliy qo‘llanma",
        title: "Guruhda qanday qilib to‘g‘ri savol berish kerak?",
        subtitle:
          "Aniq yozilgan savol — tezroq va foydaliroq javob olishning eng yaxshi yo‘li.",
        intro:
          "Telegram guruhidagi savol qancha tushunarli bo‘lsa, boshqa a’zolar vaziyatni shuncha tez anglaydi. Quyidagi oddiy odatlar suhbatni hamma uchun foydaliroq qiladi.",
        rules: [
          {
            number: "01",
            title: "Bitta fikrni bitta to‘liq xabarda yozing",
            description:
              "Savolni bir necha qisqa xabarga bo‘lib yubormang. Vaziyat va savolni bir xabarda tartibli yozsangiz, boshqalar kontekstni darhol tushunadi.",
          },
          {
            number: "02",
            title: "Kerakli kontekstni qo‘shing",
            description:
              "Qaysi shahar yoki Bundeslandda ekaningizni, vaziyatni va aynan nimaga yordam kerakligini qisqa yozing. Pasport raqami, manzil, telefon yoki hujjat raqami kabi shaxsiy ma’lumotlarni ochiq guruhga joylamang.",
          },
          {
            number: "03",
            title: "Savolni imkon qadar guruhning o‘zida qoldiring",
            description:
              "Umumiy mavzudagi savol va javob guruhda qolsa, keyinchalik xuddi shu muammoga duch kelgan boshqa a’zolar ham undan foydalanadi. “PN yozing” yoki “lichkaga yozing” kabi noaniq chaqiriqlar o‘rniga savolni guruhda to‘liq bayon qilish ma’qul.",
          },
          {
            number: "04",
            title: "Maslahat beradigan odamning vaqtini qadrlang",
            description:
              "Tajribali yoki professional a’zolar har doim shaxsiy xabarlarga javob bera olmasligi tabiiy. Savolni guruhda aniq qoldiring — vaqti va imkoniyati bo‘lgan kishi javob beradi.",
          },
          {
            number: "05",
            title: "Javobni talab qilmang",
            description:
              "Bir xil savolni qayta-qayta yuborish, odamlarni ketma-ket belgilash yoki “Nega hech kim javob bermayapti?” deb yozish o‘rniga biroz sabr qiling.",
          },
          {
            number: "06",
            title: "Natijani guruh bilan baham ko‘ring",
            description:
              "Muammo hal bo‘lsa, qanday yo‘l bilan hal qilganingizni qisqacha yozib qoldiring. Bu keyingi foydalanuvchilar uchun amaliy va qimmatli tajribaga aylanadi.",
          },
        ] satisfies CommunicationRule[],
        example: {
          eyebrow: "Noto‘g‘ri / Yaxshiroq",
          badLabel: "Bo‘lib yuborilgan xabar",
          badMessages: [
            "Salom",
            "Menda savol bor edi",
            "Ausländerbehörde haqida",
            "Termin ololmayapman",
          ],
          goodLabel: "Bitta tushunarli xabar",
          goodMessage:
            "Assalomu alaykum. Men Hamburgda yashayman. Aufenthaltstitel muddatini uzaytirish uchun Ausländerbehörde’dan termin olishga harakat qilyapman, lekin bo‘sh termin topolmayapman. Shunday holatda qanday yo‘l tutish mumkin?",
        },
        checklist: {
          eyebrow: "Savol yuborishdan oldin 10 soniyalik tekshiruv",
          items: [
            "Muammo aniqmi?",
            "Hududni yozdimmi?",
            "Kerakli kontekst bormi?",
            "Shaxsiy ma’lumot yo‘qmi?",
            "Bitta xabarda yozdimmi?",
          ],
        },
        authorLabel: "Tavsiya muallifi",
        authorName: "Zafar Usarov",
        authorDescription:
          "Vatandoshlar.de loyiha asoschisi va dasturchisi",
      }
    : {
        eyebrow: "Kommunikationskultur",
        standaloneBadge: "Praktischer Leitfaden",
        title: "Wie stellt man eine gute Frage in der Gruppe?",
        subtitle:
          "Eine klar formulierte Frage erhöht die Chance auf eine schnelle und hilfreiche Antwort.",
        intro:
          "Je verständlicher eine Frage formuliert ist, desto leichter können andere Mitglieder die Situation einordnen. Einige einfache Gewohnheiten machen den Austausch für die ganze Community hilfreicher.",
        rules: [
          {
            number: "01",
            title:
              "Eine Frage möglichst in einer vollständigen Nachricht formulieren",
            description:
              "Verteilen Sie einen Gedanken nicht auf mehrere kurze Nachrichten. Beschreiben Sie Situation und Frage möglichst zusammenhängend, damit der Kontext sofort erkennbar ist.",
          },
          {
            number: "02",
            title: "Den nötigen Kontext nennen",
            description:
              "Nennen Sie kurz Stadt oder Bundesland, die konkrete Situation und wobei Sie Hilfe benötigen. Persönliche Daten wie Passnummer, Adresse, Telefonnummer oder Aktenzeichen gehören nicht in eine öffentliche Gruppe.",
          },
          {
            number: "03",
            title: "Allgemeine Fragen möglichst in der Gruppe weiterführen",
            description:
              "Bleiben Frage und Antwort in der Gruppe, können später auch andere Mitglieder mit demselben Problem davon profitieren. Statt unklarer Aufforderungen wie „PN“ oder „privat schreiben“ ist eine vollständige Frage in der Gruppe meist hilfreicher.",
          },
          {
            number: "04",
            title: "Die Zeit der helfenden Personen respektieren",
            description:
              "Erfahrene oder fachkundige Mitglieder können nicht immer auf private Nachrichten reagieren. Stellen Sie die Frage klar in der Gruppe — wer Zeit und passende Erfahrung hat, kann darauf antworten.",
          },
          {
            number: "05",
            title: "Keine sofortige Antwort einfordern",
            description:
              "Wiederholen Sie dieselbe Frage nicht mehrfach und markieren Sie nicht fortlaufend andere Personen. Etwas Geduld sorgt meist für einen angenehmeren Austausch.",
          },
          {
            number: "06",
            title: "Die Lösung später kurz zurückmelden",
            description:
              "Wenn sich das Problem gelöst hat, schreiben Sie kurz, welcher Weg funktioniert hat. So wird eine einzelne Antwort zu nützlichem Wissen für die Community.",
          },
        ] satisfies CommunicationRule[],
        example: {
          eyebrow: "Ungünstig / Besser",
          badLabel: "Auf mehrere Nachrichten verteilt",
          badMessages: [
            "Hallo",
            "Ich hätte eine Frage",
            "Wegen der Ausländerbehörde",
            "Ich bekomme keinen Termin",
          ],
          goodLabel: "Eine vollständige Nachricht",
          goodMessage:
            "Hallo zusammen. Ich wohne in Hamburg und versuche für die Verlängerung meines Aufenthaltstitels einen Termin bei der Ausländerbehörde zu bekommen. Aktuell finde ich keinen freien Termin. Welche Möglichkeiten gibt es in dieser Situation?",
        },
        checklist: {
          eyebrow: "10-Sekunden-Check vor dem Absenden",
          items: [
            "Ist mein Problem klar?",
            "Habe ich meinen Ort genannt?",
            "Ist der nötige Kontext vorhanden?",
            "Enthält die Nachricht keine persönlichen Daten?",
            "Steht alles in einer Nachricht?",
          ],
        },
        authorLabel: "Empfehlung von",
        authorName: "Zafar Usarov",
        authorDescription:
          "Projektgründer und Entwickler von Vatandoshlar.de",
      };
}

export default async function TelegramCultureGuide({
  variant = "embedded",
}: TelegramCultureGuideProps) {
  const locale =
    (await getLocale()) as SupportedTelegramLocale;

  const copy = getCultureCopy(locale);
  const isStandalone =
    variant === "standalone";

  return (
    <section
      aria-labelledby="telegram-culture-heading"
      className={`
        relative isolate overflow-hidden
        border-y border-sky-100/80
        bg-slate-50/70
        dark:border-slate-800
        dark:bg-slate-950
        ${
          isStandalone
            ? "py-16 sm:py-20 lg:py-24"
            : "py-20 sm:py-24"
        }
      `}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-56 -top-40 size-[40rem] rounded-full bg-sky-200/28 blur-[135px] sm:size-[46rem] dark:bg-sky-400/[0.035]" />
        <div className="absolute -bottom-52 -left-44 size-[38rem] rounded-full bg-cyan-200/24 blur-[130px] sm:size-[44rem] dark:bg-cyan-400/[0.03]" />
        <div className="absolute left-[18%] top-[48%] size-[28rem] rounded-full bg-blue-100/24 blur-[120px] dark:bg-blue-400/[0.02]" />
        <div className="absolute bottom-[12%] right-[16%] size-[24rem] rounded-full bg-emerald-100/18 blur-[115px] dark:bg-emerald-400/[0.018]" />
        <div className="absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/65 blur-[120px] dark:bg-white/[0.01]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {isStandalone && (
          <div className="mb-12 max-w-4xl sm:mb-14 lg:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-700 shadow-sm backdrop-blur dark:border-sky-400/20 dark:bg-white/[0.04] dark:text-sky-300">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-sky-500 shadow-[0_0_0_5px_rgba(14,165,233,0.10)]"
              />
              {copy.standaloneBadge}
            </div>

            <h1
              id="telegram-culture-heading"
              className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl dark:text-white"
            >
              {copy.title}
            </h1>

            <p className="mt-6 max-w-3xl text-xl font-semibold leading-9 text-slate-700 dark:text-slate-300">
              {copy.subtitle}
            </p>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg dark:text-slate-400">
              {copy.intro}
            </p>
          </div>
        )}

        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start xl:gap-16">
          <div className="lg:sticky lg:top-28">
            {!isStandalone && (
              <>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                  {copy.eyebrow}
                </p>

                <h2
                  id="telegram-culture-heading"
                  className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl dark:text-white"
                >
                  {copy.title}
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                  {copy.subtitle}
                </p>

                <p className="mt-6 max-w-xl leading-7 text-slate-500 dark:text-slate-400">
                  {copy.intro}
                </p>
              </>
            )}

            {isStandalone && (
              <div className="rounded-[2rem] border border-sky-200/80 bg-white/75 p-6 shadow-[0_24px_70px_-42px_rgba(14,165,233,0.45)] backdrop-blur sm:p-7 dark:border-sky-400/15 dark:bg-white/[0.035]">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                  {copy.checklist.eyebrow}
                </p>

                <div className="mt-5 grid gap-3">
                  {copy.checklist.items.map(
                    (item, index) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3.5 text-sm font-semibold leading-6 text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[0.7rem] font-black text-sky-700 dark:bg-sky-400/10 dark:text-sky-300"
                        >
                          {index + 1}
                        </span>
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            <div
              className={`
                rounded-2xl border
                border-sky-200/80
                bg-sky-50/70 p-5
                dark:border-sky-400/15
                dark:bg-sky-400/[0.05]
                ${
                  isStandalone
                    ? "mt-5"
                    : "mt-8"
                }
              `}
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                {copy.authorLabel}
              </p>
              <p className="mt-2 font-bold text-slate-950 dark:text-white">
                {copy.authorName}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {copy.authorDescription}
              </p>
            </div>
          </div>

          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {copy.rules.map(
                (rule, index) => (
                  <Card
                    key={rule.number}
                    variant="interactive"
                    padding="none"
                    className={`
                      group relative overflow-hidden p-6
                      border-sky-100/90
                      bg-gradient-to-br
                      from-white via-sky-50/55 to-cyan-50/35
                      shadow-[0_14px_36px_-28px_rgba(14,165,233,0.45)]
                      hover:border-sky-200
                      hover:shadow-[0_22px_48px_-26px_rgba(14,165,233,0.38)]
                      motion-reduce:transform-none
                      motion-reduce:transition-none
                      dark:border-slate-800
                      dark:from-slate-900/95
                      dark:via-slate-900/90
                      dark:to-sky-950/20
                      dark:hover:border-sky-400/20
                      ${
                        index % 3 === 1
                          ? "from-cyan-50/70 via-white to-sky-50/40 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-cyan-950/20"
                          : ""
                      }
                      ${
                        index % 3 === 2
                          ? "from-white via-blue-50/50 to-sky-50/35 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-blue-950/20"
                          : ""
                      }
                    `}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-sky-300/0 blur-3xl transition duration-500 group-hover:bg-sky-300/14 motion-reduce:transition-none dark:group-hover:bg-sky-400/[0.04]"
                    />

                    <div className="relative">
                      <span className="text-xs font-black tracking-[0.14em] text-sky-600 dark:text-sky-400">
                        {rule.number}
                      </span>

                      <h3 className="mt-3 text-lg font-bold text-slate-950 dark:text-white">
                        {rule.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                        {rule.description}
                      </p>
                    </div>
                  </Card>
                ),
              )}
            </div>

            <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800 sm:px-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400">
                  {copy.example.eyebrow}
                </p>
              </div>

              <div className="grid lg:grid-cols-2">
                <div className="border-b border-slate-200 p-6 dark:border-slate-800 sm:p-7 lg:border-b-0 lg:border-r">
                  <p className="text-sm font-bold text-rose-700 dark:text-rose-300">
                    {copy.example.badLabel}
                  </p>

                  <div className="mt-4 space-y-2">
                    {copy.example.badMessages.map(
                      (message) => (
                        <div
                          key={message}
                          className="w-fit max-w-full rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200"
                        >
                          {message}
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    {copy.example.goodLabel}
                  </p>

                  <div className="mt-4 rounded-2xl rounded-bl-md border border-emerald-200/80 bg-emerald-50/80 px-5 py-4 text-sm leading-7 text-slate-700 dark:border-emerald-400/15 dark:bg-emerald-400/[0.06] dark:text-slate-200">
                    {copy.example.goodMessage}
                  </div>
                </div>
              </div>
            </div>

            {!isStandalone && (
              <div className="mt-6 rounded-3xl border border-sky-200/80 bg-sky-50/70 p-6 sm:p-7 dark:border-sky-400/15 dark:bg-sky-400/[0.05]">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                  {copy.checklist.eyebrow}
                </p>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {copy.checklist.items.map(
                    (item, index) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full border border-white bg-white/90 px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
                      >
                        <span
                          aria-hidden="true"
                          className="flex size-5 items-center justify-center rounded-full bg-sky-100 text-[0.65rem] font-black text-sky-700 dark:bg-sky-400/10 dark:text-sky-300"
                        >
                          {index + 1}
                        </span>
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
