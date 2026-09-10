"use client";

import { useState, type ReactNode } from "react";

import TelegramGuidePromo from "../TelegramGuidePromo";

type Locale = "uz" | "de";

type Props = Readonly<{
  locale: Locale;
}>;

type Template = Readonly<{
  title: string;
  subject: string;
  body: string;
}>;

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {children}
    </section>
  );
}

function Heading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
        {title}
      </h2>
      {body ? (
        <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
          {body}
        </p>
      ) : null}
    </div>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.4 11.6-8.9 8.9a6 6 0 0 1-8.5-8.5l9.6-9.6a4 4 0 0 1 5.7 5.7l-9.6 9.6a2 2 0 1 1-2.8-2.8l8.9-8.9" />
    </svg>
  );
}

function Marker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white dark:bg-emerald-400 dark:text-slate-950">
      {children}
    </span>
  );
}

function Intro({ locale }: { locale: Locale }) {
  const uz = locale === "uz";
  return (
    <Card>
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <Heading
            eyebrow={uz ? "Boshlang‘ich mini-kurs" : "Mini-Kurs für Einsteiger"}
            title={uz ? "E-mail nima?" : "Was ist eine E-Mail?"}
            body={
              uz
                ? "E-mail — internet orqali yozma xabar, hujjat, rasm yoki boshqa fayllarni yuborish usuli. To‘g‘ri yozilgan E-mail qabul qiluvchiga siz nima demoqchi ekaningizni tez tushunishga yordam beradi."
                : "Eine E-Mail ist eine Nachricht, die über das Internet verschickt wird. Sie kann Text, Dokumente, Bilder oder andere Dateien enthalten. Eine gute E-Mail macht sofort klar, worum es geht."
            }
          />
          <div className="mt-5 inline-flex max-w-full items-center gap-3 rounded-2xl bg-slate-950 px-4 py-3 font-mono text-sm font-bold text-white dark:bg-white dark:text-slate-950">
            <MailIcon />
            <span className="break-all">ali.valiyev@example.com</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {uz
              ? "ali.valiyev — foydalanuvchi nomi · @ — ajratgich · example.com — domen"
              : "ali.valiyev — Benutzername · @ — Trennzeichen · example.com — Domain"}
          </p>
        </div>
        <div className="flex size-24 items-center justify-center rounded-[2rem] bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
          <MailIcon />
        </div>
      </div>
    </Card>
  );
}

function Anatomy({ locale }: { locale: Locale }) {
  const uz = locale === "uz";
  const labels = uz
    ? [
        ["1", "Kimga / To", "Asosiy qabul qiluvchining E-mail manzili."],
        ["2", "CC / BCC", "Qo‘shimcha nusxa oluvchilarni boshqaradi."],
        ["3", "Subject", "Xatning qisqa va aniq mazmuni."],
        ["4", "Salomlashish", "Xatni odob bilan boshlash."],
        ["5", "Asosiy matn", "Nega yozayotganingiz va nima kerakligini tushuntiring."],
        ["6", "Yakun va imzo", "Muloyim xayrlashuv va ismingiz."],
        ["7", "Attachment", "PDF, rasm yoki hujjatni biriktirish."],
        ["8", "Send", "Tekshiruvdan keyin xatni yuborish."],
      ]
    : [
        ["1", "An / To", "E-Mail-Adresse der wichtigsten empfangenden Person."],
        ["2", "CC / BCC", "Steuert zusätzliche Empfängerinnen und Empfänger."],
        ["3", "Betreff / Subject", "Kurze und klare Zusammenfassung der Nachricht."],
        ["4", "Anrede", "Die E-Mail höflich beginnen."],
        ["5", "Haupttext", "Erklären, warum Sie schreiben und was Sie benötigen."],
        ["6", "Abschluss und Signatur", "Höflicher Abschluss mit Ihrem Namen."],
        ["7", "Anhang", "PDF, Bild oder Dokument anhängen."],
        ["8", "Senden", "Nach einer kurzen Kontrolle abschicken."],
      ];

  return (
    <Card>
      <Heading
        eyebrow={uz ? "1. E-mail anatomiyasi" : "1. Aufbau einer E-Mail"}
        title={uz ? "E-mail oynasidagi har bir qism nima qiladi?" : "Welche Funktion hat jeder Bereich?"}
        body={
          uz
            ? "Quyidagi maket real E-mail yozish oynasining soddalashtirilgan ko‘rinishi."
            : "Die folgende Darstellung zeigt vereinfacht ein typisches E-Mail-Fenster."
        }
      />

      <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(18rem,.7fr)]">
        <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-inner dark:border-slate-700 dark:bg-slate-950">
          <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <span className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="ml-2 text-sm font-semibold text-slate-500">
              {uz ? "Yangi xat" : "Neue Nachricht"}
            </span>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            <div className="flex min-w-0 items-center gap-3 px-4 py-3">
              <Marker>1</Marker>
              <span className="w-14 shrink-0 text-sm text-slate-500">{uz ? "Kimga" : "An"}</span>
              <span className="min-w-0 truncate text-sm font-medium">info@example.org</span>
              <span className="ml-auto shrink-0 text-xs font-semibold text-slate-500">
                CC BCC
              </span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3">
              <Marker>3</Marker>
              <span className="w-14 shrink-0 text-sm text-slate-500">{uz ? "Mavzu" : "Betreff"}</span>
              <span className="min-w-0 text-sm font-semibold">
                {uz ? "Kursga ro‘yxatdan o‘tish haqida" : "Frage zur Kursanmeldung"}
              </span>
            </div>
            <div className="space-y-4 px-4 py-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
              <p><Marker>4</Marker> <span className="ml-2">{uz ? "Assalomu alaykum," : "Guten Tag Frau Beispiel,"}</span></p>
              <p><Marker>5</Marker> <span className="ml-2">{uz
                ? "Men kursga ro‘yxatdan o‘tish bo‘yicha ma’lumot olmoqchi edim. Ro‘yxatdan o‘tish uchun qaysi hujjatlar kerakligini ayta olasizmi?"
                : "Ich möchte mich gern für Ihren Kurs anmelden. Könnten Sie mir bitte mitteilen, welche Unterlagen dafür benötigt werden?"}</span></p>
              <p className="whitespace-pre-line"><Marker>6</Marker> <span className="ml-2">{uz
                ? "Oldindan rahmat.\nHurmat bilan,\nAli Valiyev"
                : "Vielen Dank im Voraus.\nMit freundlichen Grüßen\nAli Valiyev"}</span></p>
            </div>
            <div className="flex flex-wrap items-center gap-3 px-4 py-4">
              <div className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold dark:border-slate-700 dark:bg-slate-900">
                <Marker>7</Marker>
                <PaperclipIcon />
                {uz ? "Fayl biriktirish" : "Datei anhängen"}
              </div>
              <div className="ml-auto inline-flex min-h-10 items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white dark:bg-emerald-500 dark:text-slate-950">
                <Marker>8</Marker>
                {uz ? "Yuborish" : "Senden"}
              </div>
            </div>
          </div>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {labels.map(([number, title, body]) => (
            <li key={number} className="flex gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
              <Marker>{number}</Marker>
              <div>
                <p className="font-bold text-slate-950 dark:text-white">{title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Card>
  );
}

function SixSteps({ locale }: { locale: Locale }) {
  const steps =
    locale === "uz"
      ? [
          ["Qabul qiluvchini kiriting", "Kimga / To maydoniga to‘g‘ri E-mail manzilini yozing."],
          ["Subject yozing", "Xat nima haqida ekanini bir jumlada ayting."],
          ["Salomlashing", "Rasmiy yoki norasmiy vaziyatga mos murojaat qiling."],
          ["Sababni tushuntiring", "Nima uchun yozayotganingizni qisqa ayting."],
          ["Savol yoki iltimosni aniq yozing", "Qabul qiluvchi nima qilishi kerakligini tushunsin."],
          ["Tekshirib, yuboring", "Manzil, subject, matn va attachmentni yana bir marta tekshiring."],
        ]
      : [
          ["Empfänger eintragen", "Tragen Sie die richtige E-Mail-Adresse in das Feld An / To ein."],
          ["Betreff schreiben", "Fassen Sie den Inhalt der E-Mail in einem Satz zusammen."],
          ["Begrüßen", "Wählen Sie eine passende formelle oder informelle Anrede."],
          ["Grund nennen", "Erklären Sie kurz, warum Sie schreiben."],
          ["Frage oder Bitte klar formulieren", "Die empfangende Person soll sofort verstehen, was Sie benötigen."],
          ["Prüfen und senden", "Kontrollieren Sie Adresse, Betreff, Text und Anhänge noch einmal."],
        ];

  return (
    <Card>
      <Heading
        eyebrow={locale === "uz" ? "2. Amaliy jarayon" : "2. Praktischer Ablauf"}
        title={locale === "uz" ? "E-mailni 6 qadamda yozish" : "Eine E-Mail in 6 Schritten"}
      />
      <ol className="mt-7 grid gap-4 md:grid-cols-2">
        {steps.map(([title, body], index) => (
          <li key={title} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5 pl-16 dark:border-slate-800 dark:bg-slate-950">
            <span className="absolute left-5 top-5 flex size-8 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">
              {index + 1}
            </span>
            <p className="font-bold">{title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{body}</p>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function GoodBadList({
  title,
  items,
  good,
}: {
  title: string;
  items: string[];
  good: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${
      good
        ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/70 dark:bg-emerald-950/20"
        : "border-rose-200 bg-rose-50/70 dark:border-rose-900/70 dark:bg-rose-950/20"
    }`}>
      <p className="font-bold">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6">
            <span className={good ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}>
              {good ? "✓" : "✕"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubjectBlock({ locale }: { locale: Locale }) {
  const uz = locale === "uz";
  return (
    <Card>
      <Heading
        eyebrow={uz ? "3. Subject" : "3. Betreff"}
        title={uz ? "Subject qanday yoziladi?" : "Wie schreibt man einen guten Betreff?"}
        body={uz
          ? "Subject — xatning qisqa mazmuni. Qabul qiluvchi xatni ochmasdan turib nima haqida ekanini tushunishi kerak."
          : "Der Betreff ist die Kurzfassung Ihrer E-Mail. Die empfangende Person sollte schon vor dem Öffnen erkennen, worum es geht."}
      />
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <GoodBadList
          title={uz ? "Yomon subject" : "Schlechter Betreff"}
          items={uz ? ["Savol", "Salom", "Muhim!!!"] : ["Frage", "Hallo", "Wichtig!!!"]}
          good={false}
        />
        <GoodBadList
          title={uz ? "Yaxshi subject" : "Guter Betreff"}
          items={uz
            ? ["15-sentabrdagi uchrashuv haqida savol", "Arizam uchun yetishmayotgan hujjat", "Kursga ro‘yxatdan o‘tish haqida"]
            : ["Frage zum Termin am 15. September", "Fehlende Unterlage für meine Bewerbung", "Frage zur Kursanmeldung"]}
          good
        />
      </div>
    </Card>
  );
}

function EmailSample({
  good,
  title,
  subject,
  body,
  notes,
}: {
  good: boolean;
  title: string;
  subject: string;
  body: string;
  notes: string[];
}) {
  return (
    <div className={`rounded-2xl border p-5 ${
      good ? "border-emerald-200 dark:border-emerald-900/70" : "border-rose-200 dark:border-rose-900/70"
    }`}>
      <p className="font-bold">{good ? "✓" : "✕"} {title}</p>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 px-4 py-3 text-sm dark:border-slate-800">
          <span className="text-slate-500">Subject: </span>
          <strong>{subject}</strong>
        </div>
        <p className="whitespace-pre-line px-4 py-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
          {body}
        </p>
      </div>
      <ul className="mt-4 space-y-2">
        {notes.map((note) => (
          <li key={note} className="flex gap-2 text-sm">
            <span className={good ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}>
              {good ? "✓" : "✕"}
            </span>
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Comparison({ locale }: { locale: Locale }) {
  const uz = locale === "uz";
  return (
    <Card>
      <Heading
        eyebrow={uz ? "4. Taqqoslash" : "4. Vergleich"}
        title={uz ? "Yaxshi E-mail vs yomon E-mail" : "Gute E-Mail vs. schlechte E-Mail"}
      />
      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <EmailSample
          good={false}
          title={uz ? "Yomon E-mail" : "Schlechte E-Mail"}
          subject={uz ? "Salom" : "Hallo"}
          body={uz
            ? "salom men hujjat yuborgandim hali nima bo‘ldi bilmadim javob bering iltimos men kutyapman"
            : "hallo ich habe was geschickt und weiß nicht was jetzt ist bitte antworten ich warte"}
          notes={uz
            ? ["Mavzu aniq emas", "Murojaat yo‘q", "Sabab chalkash", "Aniq savol yo‘q", "Yakun va ism yo‘q"]
            : ["Betreff unklar", "Keine Anrede", "Grund unübersichtlich", "Keine klare Frage", "Kein Abschluss und kein Name"]}
        />
        <EmailSample
          good
          title={uz ? "Yaxshi E-mail" : "Gute E-Mail"}
          subject={uz ? "Yuborilgan hujjat holati haqida" : "Rückfrage zum eingereichten Dokument"}
          body={uz
            ? "Assalomu alaykum,\n\nmen 10-sentabr kuni so‘ralgan hujjatni E-mail orqali yuborgan edim. Hujjat sizga yetib borganini tasdiqlab bera olasizmi?\n\nOldindan rahmat.\nHurmat bilan,\nAli Valiyev"
            : "Guten Tag,\n\nich habe Ihnen das angeforderte Dokument am 10. September per E-Mail zugesandt. Könnten Sie mir bitte kurz bestätigen, ob es angekommen ist?\n\nVielen Dank im Voraus.\nMit freundlichen Grüßen\nAli Valiyev"}
          notes={uz
            ? ["Aniq subject", "To‘g‘ri murojaat", "Qisqa kontekst", "Bitta aniq savol", "Odobli yakun va ism"]
            : ["Klarer Betreff", "Passende Anrede", "Kurzer Kontext", "Eine klare Frage", "Höflicher Abschluss mit Name"]}
        />
      </div>
    </Card>
  );
}

function ToneBlock({ locale }: { locale: Locale }) {
  const uz = locale === "uz";
  return (
    <Card>
      <Heading
        eyebrow={uz ? "5. Uslub" : "5. Stil"}
        title={uz ? "Rasmiy va norasmiy E-mail" : "Formelle und informelle E-Mail"}
        body={uz
          ? "Tashkilot, ish beruvchi, o‘qituvchi yoki notanish odamga odatda rasmiyroq yoziladi. Do‘st yoki yaqindan tanish odam bilan uslub erkinroq bo‘lishi mumkin."
          : "An Behörden, Arbeitgeber, Lehrkräfte oder unbekannte Personen schreibt man meist formeller. Bei Freunden oder gut bekannten Personen darf der Ton lockerer sein."}
      />
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {[
          {
            title: uz ? "Rasmiy" : "Formell",
            use: uz ? "Tashkilot, ish, o‘qish, xizmat ko‘rsatuvchi" : "Behörde, Arbeit, Bildung, Dienstleister",
            greeting: uz ? "Hurmatli xonim / janob …" : "Sehr geehrte Frau … / Sehr geehrter Herr …",
            closing: uz ? "Hurmat bilan,\nAli Valiyev" : "Mit freundlichen Grüßen\nAli Valiyev",
          },
          {
            title: uz ? "Norasmiy" : "Informell",
            use: uz ? "Do‘st, tanish, yaqin hamkasb" : "Freunde, Bekannte, enge Kolleginnen und Kollegen",
            greeting: uz ? "Salom Aziza," : "Hallo Aziza,",
            closing: uz ? "Rahmat,\nAli" : "Viele Grüße\nAli",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
            <p className="text-lg font-bold">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.use}</p>
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
              <p>{item.greeting}</p>
              <p className="my-4 text-slate-400">…</p>
              <p className="whitespace-pre-line">{item.closing}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AttachmentBlock({ locale }: { locale: Locale }) {
  const uz = locale === "uz";
  return (
    <Card>
      <Heading
        eyebrow={uz ? "6. Attachment" : "6. Anhang"}
        title={uz ? "Fayl qanday yuboriladi?" : "Wie verschickt man eine Datei?"}
        body={uz
          ? "Paperclip belgisi odatda fayl biriktirish uchun ishlatiladi. PDF, rasm yoki hujjatni tanlab, xatga qo‘shasiz."
          : "Das Büroklammer-Symbol steht meist für Anhänge. Darüber können Sie PDFs, Bilder oder Dokumente auswählen."}
      />
      <div className="mt-7 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
              <PaperclipIcon />
            </span>
            <div className="min-w-0">
              <p className="truncate font-bold">{uz ? "CV_Ali_Valiyev.pdf" : "Lebenslauf_Ali_Valiyev.pdf"}</p>
              <p className="text-sm text-slate-500">PDF · 420 KB</p>
            </div>
          </div>
        </div>
        <div className="max-w-md rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 dark:border-amber-900/70 dark:bg-amber-950/20">
          <strong>{uz ? "Eslatma:" : "Hinweis:"}</strong>{" "}
          {uz
            ? "“Faylni biriktirdim” deb yozib, faylni biriktirishni unutib qo‘ymang."
            : "Wenn Sie „im Anhang“ schreiben, prüfen Sie vor dem Senden, ob die Datei wirklich angehängt ist."}
        </div>
      </div>
    </Card>
  );
}

function CcBcc({ locale }: { locale: Locale }) {
  const uz = locale === "uz";
  const items = uz
    ? [
        ["To", "Asosiy qabul qiluvchi", "Javob berishi yoki ishni bajarishi kutilayotgan odam."],
        ["CC", "Xabardor bo‘lishi kerak", "Xatni ko‘radi, lekin asosiy qabul qiluvchi emas."],
        ["BCC", "Yashirin nusxa", "Boshqa qabul qiluvchilar uning manzilini ko‘rmaydi."],
      ]
    : [
        ["To", "Hauptempfänger", "Von dieser Person wird meist eine Antwort oder Handlung erwartet."],
        ["CC", "Zur Information", "Sie erhält eine sichtbare Kopie, ist aber nicht die Hauptperson."],
        ["BCC", "Verdeckte Kopie", "Andere Empfänger sehen diese Adresse nicht."],
      ];

  return (
    <Card>
      <Heading
        eyebrow={uz ? "7. Qabul qiluvchilar" : "7. Empfänger"}
        title={uz ? "CC va BCC nima?" : "Was bedeuten CC und BCC?"}
      />
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {items.map(([key, title, body]) => (
          <div key={key} className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
            <span className="flex size-10 items-center justify-center rounded-xl bg-slate-950 text-xs font-black text-white dark:bg-white dark:text-slate-950">
              {key}
            </span>
            <p className="mt-4 font-bold">{title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{body}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ReplyBlock({ locale }: { locale: Locale }) {
  const uz = locale === "uz";
  const items = uz
    ? [
        ["↩", "Reply", "Faqat xatni yuborgan odamga javob beradi."],
        ["↩↩", "Reply all", "Xatdagi barcha To va CC qabul qiluvchilarga javob beradi."],
        ["→", "Forward", "Kelgan xatni boshqa odamga yuboradi."],
      ]
    : [
        ["↩", "Antworten", "Antwortet nur der Person, die die Nachricht gesendet hat."],
        ["↩↩", "Allen antworten", "Antwortet allen Empfängern in An und CC."],
        ["→", "Weiterleiten", "Sendet die erhaltene Nachricht an eine andere Person weiter."],
      ];

  return (
    <Card>
      <Heading
        eyebrow={uz ? "8. Kelgan xat bilan ishlash" : "8. Mit eingegangenen E-Mails arbeiten"}
        title={uz ? "Reply / Reply all / Forward" : "Antworten / Allen antworten / Weiterleiten"}
      />
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {items.map(([icon, title, body]) => (
          <div key={title} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-slate-100 text-lg font-black text-slate-800 dark:bg-slate-800 dark:text-slate-100">
              {icon}
            </span>
            <p className="mt-4 font-bold">{title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{body}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
        {uz
          ? "Reply all tugmasini bosishdan oldin hamma qabul qiluvchi sizning javobingizni ko‘rishi kerakmi, deb o‘ylab ko‘ring."
          : "Prüfen Sie vor „Allen antworten“, ob wirklich alle Empfänger Ihre Antwort sehen sollen."}
      </p>
    </Card>
  );
}

function Security({ locale }: { locale: Locale }) {
  const uz = locale === "uz";
  const items = uz
    ? [
        "Jo‘natuvchi manzili g‘alati yoki tanish nomga o‘xshatib yozilgan.",
        "Link manzili xatdagi matnga mos kelmaydi.",
        "Parol, karta ma’lumoti yoki maxfiy kod so‘raladi.",
        "“Darhol bosmasangiz hisob yopiladi” kabi shoshiltiruvchi jumlalar bor.",
        "Kutilmagan attachment yoki noma’lum fayl kelgan.",
      ]
    : [
        "Die Absenderadresse wirkt ungewöhnlich oder ahmt einen bekannten Namen nach.",
        "Die tatsächliche Linkadresse passt nicht zum sichtbaren Text.",
        "Passwort, Kartendaten oder Sicherheitscodes werden verlangt.",
        "Die Nachricht setzt Sie stark unter Zeitdruck.",
        "Ein unerwarteter oder unbekannter Anhang ist beigefügt.",
      ];

  return (
    <Card>
      <Heading
        eyebrow={uz ? "9. Xavfsizlik" : "9. Sicherheit"}
        title={uz ? "Phishingni qanday tanish mumkin?" : "Wie erkennt man Phishing?"}
        body={uz
          ? "Phishing — sizni aldab parol, pul yoki maxfiy ma’lumot olishga urinish. Xat ishonchli ko‘rinsa ham, shoshmasdan tekshiring."
          : "Phishing versucht, Sie zur Herausgabe von Passwörtern, Geld oder vertraulichen Daten zu verleiten. Auch professionell wirkende Nachrichten sollten geprüft werden."}
      />
      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 rounded-2xl border border-rose-200/70 bg-rose-50/50 p-4 text-sm leading-6 dark:border-rose-900/60 dark:bg-rose-950/20">
            <span className="font-black text-rose-600">!</span>
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {uz
          ? "Shubha bo‘lsa, xatdagi linkni bosmang. Tashkilotning rasmiy saytini brauzerga o‘zingiz yozib oching yoki ma’lum telefon raqami orqali tekshiring."
          : "Bei Zweifeln klicken Sie nicht auf den Link. Öffnen Sie die offizielle Website selbst oder prüfen Sie die Nachricht über eine bekannte Telefonnummer."}
      </p>
    </Card>
  );
}

function Checklist({ locale }: { locale: Locale }) {
  const items = locale === "uz"
    ? [
        "To‘g‘ri odamga yuboryapmanmi?",
        "Subject aniqmi?",
        "Ismni to‘g‘ri yozdimmi?",
        "Xatim tushunarlimi?",
        "Savolim yoki iltimosim aniqmi?",
        "Attachment kerak bo‘lsa biriktirdimmi?",
        "Imlo xatolarini tekshirdimmi?",
        "Shaxsiy yoki maxfiy ma’lumotni noto‘g‘ri odamga yubormayapmanmi?",
      ]
    : [
        "Sende ich an die richtige Person?",
        "Ist der Betreff klar?",
        "Ist der Name richtig geschrieben?",
        "Ist meine Nachricht verständlich?",
        "Ist meine Frage oder Bitte eindeutig?",
        "Ist der benötigte Anhang beigefügt?",
        "Habe ich Rechtschreibfehler geprüft?",
        "Sende ich keine persönlichen oder vertraulichen Daten an die falsche Person?",
      ];

  return (
    <Card className="border-emerald-200 dark:border-emerald-900/60">
      <Heading
        eyebrow={locale === "uz" ? "10. Oxirgi tekshiruv" : "10. Letzte Kontrolle"}
        title={locale === "uz" ? "Yuborishdan oldin 10 soniya" : "10 Sekunden vor dem Senden"}
      />
      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 rounded-2xl bg-emerald-50/70 p-4 text-sm font-medium dark:bg-emerald-950/20">
            <span className="text-emerald-700 dark:text-emerald-300">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Templates({ locale }: { locale: Locale }) {
  const [copied, setCopied] = useState<string | null>(null);

  const templates: Template[] =
    locale === "uz"
      ? [
          {title:"Ma’lumot so‘rash",subject:"[MAVZU] haqida ma’lumot so‘rovi",body:"Assalomu alaykum,\n\nmen [MAVZU] bo‘yicha ma’lumot olmoqchi edim. Iltimos, [ANIQ SAVOL] haqida ma’lumot bera olasizmi?\n\nOldindan rahmat.\nHurmat bilan,\n[ISM FAMILIYA]"},
          {title:"Uchrashuv so‘rash",subject:"[MAVZU] bo‘yicha uchrashuv so‘rovi",body:"Assalomu alaykum,\n\nmen [MAVZU] bo‘yicha siz bilan qisqa uchrashuv belgilamoqchi edim. Menga [SANA/VAQT ORALIG‘I] mos keladi. Sizga qaysi vaqt qulay?\n\nHurmat bilan,\n[ISM FAMILIYA]"},
          {title:"Hujjat yuborish",subject:"[HUJJAT NOMI] — [ISM FAMILIYA]",body:"Assalomu alaykum,\n\nso‘ralgan [HUJJAT NOMI]ni ushbu E-mailga ilova qilib yuboryapman. Agar qo‘shimcha hujjat yoki ma’lumot kerak bo‘lsa, menga xabar bering.\n\nHurmat bilan,\n[ISM FAMILIYA]"},
          {title:"Ish bo‘yicha murojaat",subject:"[LAVOZIM] bo‘yicha murojaat — [ISM FAMILIYA]",body:"Hurmatli [ISM/XONIM/JANOB],\n\nmen [LAVOZIM] bo‘yicha murojaat qilmoqdaman. Qisqacha: [1–2 JUMLADA TAJRIBA/YONDASHUV]. Rezyume va kerakli hujjatlarni ilova qildim.\n\nSizdan javob olishdan mamnun bo‘laman.\nHurmat bilan,\n[ISM FAMILIYA]"},
          {title:"Javob kelmaganda eslatma",subject:"[OLDINGI MAVZU] bo‘yicha qisqa eslatma",body:"Assalomu alaykum,\n\nmen [SANA] kuni [MAVZU] bo‘yicha E-mail yuborgan edim. Imkoningiz bo‘lsa, murojaatim holati haqida qisqacha ma’lumot bera olasizmi?\n\nOldindan rahmat.\nHurmat bilan,\n[ISM FAMILIYA]"},
          {title:"Uchrashuvni o‘zgartirish/bekor qilish",subject:"[SANA] kungi uchrashuvni o‘zgartirish",body:"Assalomu alaykum,\n\nafsuski, [SANA/VAQT] dagi uchrashuvga qatnasha olmayman. Noqulaylik uchun uzr so‘rayman. Uchrashuvni [YANGI TAKLIF]ga ko‘chirish imkoniyati bormi?\n\nHurmat bilan,\n[ISM FAMILIYA]"},
          {title:"Rahmat aytish",subject:"[MAVZU] uchun rahmat",body:"Assalomu alaykum,\n\n[MAVZU/YORDAM] uchun katta rahmat. Siz bergan ma’lumot menga juda foydali bo‘ldi.\n\nYaxshi kun tilayman.\nHurmat bilan,\n[ISM FAMILIYA]"},
        ]
      : [
          {title:"Information anfragen",subject:"Anfrage zu [THEMA]",body:"Guten Tag,\n\nich möchte mich gern über [THEMA] informieren. Könnten Sie mir bitte mitteilen, [KONKRETE FRAGE]?\n\nVielen Dank im Voraus.\nMit freundlichen Grüßen\n[VOR- UND NACHNAME]"},
          {title:"Termin anfragen",subject:"Terminanfrage zu [THEMA]",body:"Guten Tag,\n\nich würde gern einen kurzen Termin zu [THEMA] vereinbaren. Für mich passen [DATUM/ZEITRAUM]. Wann würde es Ihnen passen?\n\nMit freundlichen Grüßen\n[VOR- UND NACHNAME]"},
          {title:"Dokument senden",subject:"[DOKUMENT] — [VOR- UND NACHNAME]",body:"Guten Tag,\n\nanbei sende ich Ihnen das angeforderte Dokument [DOKUMENT]. Falls Sie weitere Unterlagen oder Informationen benötigen, geben Sie mir bitte kurz Bescheid.\n\nMit freundlichen Grüßen\n[VOR- UND NACHNAME]"},
          {title:"Berufliche Anfrage",subject:"Bewerbung als [POSITION] — [VOR- UND NACHNAME]",body:"Sehr geehrte Frau / Sehr geehrter Herr [NAME],\n\nich bewerbe mich bei Ihnen als [POSITION]. Kurz zu mir: [1–2 SÄTZE ZU ERFAHRUNG/QUALIFIKATION]. Meinen Lebenslauf und die erforderlichen Unterlagen finden Sie im Anhang.\n\nIch freue mich auf Ihre Rückmeldung.\nMit freundlichen Grüßen\n[VOR- UND NACHNAME]"},
          {title:"Höflich nachfassen",subject:"Kurze Rückfrage zu [THEMA]",body:"Guten Tag,\n\nich hatte Ihnen am [DATUM] eine E-Mail zu [THEMA] geschickt. Wenn es Ihre Zeit erlaubt, würde ich mich über eine kurze Rückmeldung zum aktuellen Stand freuen.\n\nVielen Dank.\nMit freundlichen Grüßen\n[VOR- UND NACHNAME]"},
          {title:"Termin ändern oder absagen",subject:"Änderung des Termins am [DATUM]",body:"Guten Tag,\n\nleider kann ich den Termin am [DATUM/UHRZEIT] nicht wahrnehmen. Ich bitte die Umstände zu entschuldigen. Wäre eine Verschiebung auf [NEUER VORSCHLAG] möglich?\n\nMit freundlichen Grüßen\n[VOR- UND NACHNAME]"},
          {title:"Danke sagen",subject:"Vielen Dank für [THEMA]",body:"Guten Tag,\n\nvielen Dank für [INFORMATION/HILFE]. Ihre Rückmeldung hat mir sehr weitergeholfen.\n\nIch wünsche Ihnen einen schönen Tag.\nMit freundlichen Grüßen\n[VOR- UND NACHNAME]"},
        ];

  async function copy(template: Template) {
    try {
      await navigator.clipboard.writeText(`Subject: ${template.subject}\n\n${template.body}`);
      setCopied(template.title);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  }

  return (
    <Card>
      <Heading
        eyebrow={locale === "uz" ? "11. Tayyor shablonlar" : "11. Vorlagen"}
        title={locale === "uz" ? "Copy qilib moslashtiring" : "Kopieren und anpassen"}
        body={locale === "uz"
          ? "Kvadrat qavs [ ] ichidagi joylarni o‘zingizga moslab almashtiring. Tayyor matnni ko‘r-ko‘rona yubormang."
          : "Ersetzen Sie alle Angaben in eckigen Klammern [ ] durch Ihre eigenen Informationen. Prüfen Sie die Vorlage immer vor dem Senden."}
      />
      <div className="mt-7 space-y-4">
        {templates.map((template) => (
          <article key={template.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-bold">{template.title}</h3>
              <button
                type="button"
                onClick={() => void copy(template)}
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                {copied === template.title
                  ? locale === "uz" ? "Nusxalandi ✓" : "Kopiert ✓"
                  : locale === "uz" ? "Nusxa olish" : "Kopieren"}
              </button>
            </div>
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-200 px-4 py-3 text-sm dark:border-slate-800">
                <span className="text-slate-500">Subject: </span>
                <strong>{template.subject}</strong>
              </div>
              <pre className="whitespace-pre-wrap break-words px-4 py-4 font-sans text-sm leading-7 text-slate-700 dark:text-slate-300">
                {template.body}
              </pre>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}

export default function EmailWritingGuide({ locale }: Props) {
  return (
    <div className="mt-10 space-y-8">
      <div id="guide-section-email-basics" className="scroll-mt-32">
        <Intro locale={locale} />
      </div>
      <div id="guide-section-email-anatomy" className="scroll-mt-32">
        <Anatomy locale={locale} />
      </div>
      <div id="guide-section-email-writing" className="scroll-mt-32">
        <SixSteps locale={locale} />
      </div>
      <div id="guide-section-email-subject" className="scroll-mt-32">
        <SubjectBlock locale={locale} />
      </div>
      <div id="guide-section-email-comparison" className="scroll-mt-32">
        <Comparison locale={locale} />
      </div>
      <div id="guide-section-email-style" className="scroll-mt-32">
        <ToneBlock locale={locale} />
      </div>
      <div id="guide-section-email-attachments" className="scroll-mt-32">
        <AttachmentBlock locale={locale} />
      </div>
      <div id="guide-section-email-cc-bcc" className="scroll-mt-32">
        <CcBcc locale={locale} />
      </div>
      <div id="guide-section-email-reply" className="scroll-mt-32">
        <ReplyBlock locale={locale} />
      </div>
      <div id="guide-section-email-security" className="scroll-mt-32">
        <Security locale={locale} />
      </div>
      <div id="guide-section-email-checklist" className="scroll-mt-32">
        <Checklist locale={locale} />
      </div>
      <div id="guide-section-email-templates" className="scroll-mt-32">
        <Templates locale={locale} />
      </div>

      <TelegramGuidePromo
        locale={locale}
        href="https://t.me/Nemistili_uz"
      />
    </div>
  );
}
