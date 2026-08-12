import { getLocale } from "next-intl/server";

import TelegramCard from "@/components/cards/TelegramCard";
import Card from "@/components/ui/Card";
import { getPublicTelegramGroups } from "@/lib/telegram/public-telegram-repository";
import type { SupportedTelegramLocale } from "@/types/telegram";

interface IconProps {
  className?: string;
}

function TelegramIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M21.5 3.5 2.8 10.7c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.9 6c.2.6.1.8.8.8.5 0 .8-.2 1.1-.5l2.7-2.6 5.6 4.1c1 .6 1.8.3 2.1-.9L23 4.8c.4-1.7-.6-2.5-1.5-1.3Z" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

type CommunicationRule = Readonly<{
  number: string;
  title: string;
  description: string;
}>;

export default async function TelegramSection() {
  const locale =
    (await getLocale()) as SupportedTelegramLocale;

  const telegramGroups =
    await getPublicTelegramGroups(
      locale,
    );

  const copy =
    locale === "uz"
      ? {
          groups: {
            badge: "Telegram hamjamiyati",
            title:
              "Germaniya bo‘ylab vatandoshlar Telegram hamjamiyatlari",
            description:
              "O‘zingiz yashayotgan federal yer guruhiga qo‘shiling, tajriba almashing, foydali ma’lumotlar va e’lonlarni birinchi bo‘lib oling.",
            officialChannel: "Rasmiy Telegram kanali",
            officialChannelAria:
              "Vatandoshlar.de rasmiy Telegram kanalini ochish",
          },
          culture: {
            eyebrow: "Muloqot madaniyati",
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
          },
        }
      : {
          groups: {
            badge: "Telegram-Community",
            title:
              "Usbekische Telegram-Communitys in ganz Deutschland",
            description:
              "Finden Sie die passende regionale Gruppe, tauschen Sie Erfahrungen aus und erhalten Sie hilfreiche Hinweise und lokale Informationen.",
            officialChannel: "Offizieller Telegram-Kanal",
            officialChannelAria:
              "Offiziellen Telegram-Kanal von Vatandoshlar.de öffnen",
          },
          culture: {
            eyebrow: "Kommunikationskultur",
            title: "Wie stellt man eine gute Frage in der Gruppe?",
            subtitle:
              "Eine klar formulierte Frage erhöht die Chance auf eine schnelle und hilfreiche Antwort.",
            intro:
              "Je verständlicher eine Frage formuliert ist, desto leichter können andere Mitglieder die Situation einordnen. Einige einfache Gewohnheiten machen den Austausch für die ganze Community hilfreicher.",
            rules: [
              {
                number: "01",
                title: "Eine Frage möglichst in einer vollständigen Nachricht formulieren",
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
          },
        };

  return (
    <>
      <section
        id="telegram"
        aria-labelledby="telegram-heading"
        className="
          relative isolate overflow-hidden
          bg-gradient-to-b
          from-sky-50
          via-white
          to-slate-50
          py-24 sm:py-28 lg:py-32
          dark:from-slate-950
          dark:via-slate-950
          dark:to-slate-900
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_28%)]
          "
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <div
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  border border-sky-200
                  bg-sky-100/80
                  px-3 py-1.5
                  text-xs font-semibold
                  uppercase tracking-[0.16em]
                  text-sky-700
                  dark:border-sky-400/20
                  dark:bg-sky-400/10
                  dark:text-sky-300
                "
              >
                <TelegramIcon className="size-4" />
                {copy.groups.badge}
              </div>

              <h2
                id="telegram-heading"
                className="
                  mt-6
                  text-3xl
                  font-semibold
                  tracking-[-0.04em]
                  text-slate-950
                  sm:text-4xl
                  lg:text-5xl
                  dark:text-white
                "
              >
                {copy.groups.title}
              </h2>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-base
                  leading-8
                  text-slate-600
                  sm:text-lg
                  dark:text-slate-400
                "
              >
                {copy.groups.description}
              </p>
            </div>

            <a
              href="https://t.me/Vatandoshlar_de"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.groups.officialChannelAria}
              className="
                group hidden
                items-center gap-2
                rounded-full
                bg-sky-600
                px-5 py-3
                text-sm font-semibold
                text-white
                shadow-lg shadow-sky-600/25
                transition
                hover:-translate-y-0.5
                hover:bg-sky-700
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-sky-500
                focus-visible:ring-offset-2
                lg:inline-flex
                dark:focus-visible:ring-offset-slate-950
              "
            >
              {copy.groups.officialChannel}

              <ArrowUpRightIcon
                className="
                  size-4
                  transition-transform duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </a>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {telegramGroups.map((group, index) => (
              <TelegramCard
                key={group.shortName}
                group={group}
                index={index}
              />
            ))}
          </div>

          <div className="mt-10 flex justify-center lg:hidden">
            <a
              href="https://t.me/Vatandoshlar_de"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.groups.officialChannelAria}
              className="
                group inline-flex
                items-center gap-2
                rounded-full
                bg-sky-600
                px-5 py-3
                text-sm font-semibold
                text-white
                shadow-lg shadow-sky-600/25
                transition
                hover:-translate-y-0.5
                hover:bg-sky-700
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-sky-500
                focus-visible:ring-offset-2
                dark:focus-visible:ring-offset-slate-950
              "
            >
              {copy.groups.officialChannel}

              <ArrowUpRightIcon
                className="
                  size-4
                  transition-transform duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </a>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="telegram-culture-heading"
        className="relative isolate overflow-hidden border-y border-sky-100/80 bg-slate-50/70 py-20 sm:py-24 dark:border-slate-800 dark:bg-slate-950"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-56 -top-40 size-[40rem] rounded-full bg-sky-200/28 blur-[135px] sm:size-[46rem] dark:bg-sky-400/[0.035]" />
          <div className="absolute -bottom-52 -left-44 size-[38rem] rounded-full bg-cyan-200/24 blur-[130px] sm:size-[44rem] dark:bg-cyan-400/[0.03]" />
          <div className="absolute left-[18%] top-[48%] size-[28rem] rounded-full bg-blue-100/24 blur-[120px] dark:bg-blue-400/[0.02]" />
          <div className="absolute right-[16%] bottom-[12%] size-[24rem] rounded-full bg-emerald-100/18 blur-[115px] dark:bg-emerald-400/[0.018]" />
          <div className="absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/65 blur-[120px] dark:bg-white/[0.01]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start xl:gap-16">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                {copy.culture.eyebrow}
              </p>

              <h2
                id="telegram-culture-heading"
                className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl dark:text-white"
              >
                {copy.culture.title}
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                {copy.culture.subtitle}
              </p>

              <p className="mt-6 max-w-xl leading-7 text-slate-500 dark:text-slate-400">
                {copy.culture.intro}
              </p>

              <div className="mt-8 rounded-2xl border border-sky-200/80 bg-sky-50/70 p-5 dark:border-sky-400/15 dark:bg-sky-400/[0.05]">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                  {copy.culture.authorLabel}
                </p>
                <p className="mt-2 font-bold text-slate-950 dark:text-white">
                  {copy.culture.authorName}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {copy.culture.authorDescription}
                </p>
              </div>
            </div>

            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                {copy.culture.rules.map((rule, index) => (
                  <Card
                    key={rule.number}
                    variant="interactive"
                    padding="none"
                    className={`
                      group relative overflow-hidden p-6
                      border-sky-100/90
                      bg-gradient-to-br from-white via-sky-50/55 to-cyan-50/35
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
                      className="
                        pointer-events-none
                        absolute -right-16 -top-16
                        size-40 rounded-full
                        bg-sky-300/0 blur-3xl
                        transition duration-500
                        group-hover:bg-sky-300/14
                        motion-reduce:transition-none
                        dark:group-hover:bg-sky-400/[0.04]
                      "
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
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800 sm:px-7">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400">
                    {copy.culture.example.eyebrow}
                  </p>
                </div>

                <div className="grid lg:grid-cols-2">
                  <div className="border-b border-slate-200 p-6 dark:border-slate-800 lg:border-b-0 lg:border-r sm:p-7">
                    <p className="text-sm font-bold text-rose-700 dark:text-rose-300">
                      {copy.culture.example.badLabel}
                    </p>

                    <div className="mt-4 space-y-2">
                      {copy.culture.example.badMessages.map((message) => (
                        <div
                          key={message}
                          className="w-fit max-w-full rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200"
                        >
                          {message}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                      {copy.culture.example.goodLabel}
                    </p>

                    <div className="mt-4 rounded-2xl rounded-bl-md border border-emerald-200/80 bg-emerald-50/80 px-5 py-4 text-sm leading-7 text-slate-700 dark:border-emerald-400/15 dark:bg-emerald-400/[0.06] dark:text-slate-200">
                      {copy.culture.example.goodMessage}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-sky-200/80 bg-sky-50/70 p-6 dark:border-sky-400/15 dark:bg-sky-400/[0.05] sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                  {copy.culture.checklist.eyebrow}
                </p>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {copy.culture.checklist.items.map((item, index) => (
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
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
