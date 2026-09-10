import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const pool = new Pool({
  connectionString,
  max: 2,
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 5_000,
});

const slug = "email-yozishni-organamiz";
const categorySlug = "education";

const article = {
  titleUz:
    "E-mail yozishni o‘rganamiz: noldan boshlab to‘g‘ri va professional E-mail yozish",
  titleDe:
    "E-Mails richtig schreiben lernen: von den Grundlagen bis zur professionellen E-Mail",

  excerptUz:
    "E-mail nima, uni qanday yozish, mavzu qatorini to‘g‘ri tanlash, fayl biriktirish, CC va BCC’dan foydalanish hamda professional javob yozishni bosqichma-bosqich o‘rganing.",
  excerptDe:
    "Lernen Sie Schritt für Schritt, was eine E-Mail ist, wie man sie richtig schreibt, einen passenden Betreff formuliert, Anhänge versendet, CC und BCC nutzt und professionell antwortet.",

  introUz:
    "E-mail kundalik hayot, ta’lim va ish jarayonida eng muhim yozma aloqa vositalaridan biridir. Ushbu qo‘llanma E-maildan hali yaxshi foydalana olmaydiganlar uchun noldan boshlab tuzilgan. Siz E-mail manzilining tuzilishidan tortib yangi xat yozish, to‘g‘ri mavzu tanlash, rasmiy va norasmiy murojaat, fayl biriktirish, CC va BCC, Reply, Reply all va Forward funksiyalari, xavfsizlik hamda yuborishdan oldingi tekshiruvgacha bo‘lgan asosiy ko‘nikmalarni o‘rganasiz.",
  introDe:
    "E-Mails gehören zu den wichtigsten schriftlichen Kommunikationsmitteln im Alltag, in der Ausbildung und im Berufsleben. Dieser Leitfaden beginnt bei den Grundlagen und richtet sich besonders an Menschen, die bisher wenig Erfahrung mit E-Mails haben. Sie lernen den Aufbau einer E-Mail-Adresse, das Verfassen einer neuen Nachricht, einen passenden Betreff, formelle und informelle Anreden, Anhänge, CC und BCC, Antworten, Allen antworten und Weiterleiten sowie wichtige Sicherheitsregeln und die Kontrolle vor dem Absenden.",

  readingTimeUz: "5 daqiqa",
  readingTimeDe: "5 Minuten",

  factsUz: [
    {
      label: "Kimlar uchun?",
      value: "E-maildan foydalanishni noldan o‘rganmoqchi bo‘lganlar",
    },
    {
      label: "Nimalarni o‘rganasiz?",
      value: "Yozish, javob berish, fayl yuborish, CC/BCC va xavfsizlik",
    },
    {
      label: "Amaliy qism",
      value: "Tayyor namunalar va nusxalash mumkin bo‘lgan E-mail shablonlari",
    },
    {
      label: "Daraja",
      value: "Boshlang‘ich",
    },
  ],

  factsDe: [
    {
      label: "Für wen?",
      value: "Für alle, die den Umgang mit E-Mails von Grund auf lernen möchten",
    },
    {
      label: "Was lernen Sie?",
      value: "Schreiben, Antworten, Anhänge, CC/BCC und Sicherheit",
    },
    {
      label: "Praxis",
      value: "Beispiele und kopierbare E-Mail-Vorlagen",
    },
    {
      label: "Niveau",
      value: "Einsteiger",
    },
  ],

  faqUz: [
    {
      question: "E-mailda mavzu (Subject) yozish shartmi?",
      answer:
        "Texnik jihatdan har doim majburiy bo‘lmasligi mumkin, lekin professional E-mailda mavzu yozish juda muhim. Qisqa va aniq mavzu qabul qiluvchiga xat nima haqida ekanini darhol tushunishga yordam beradi.",
    },
    {
      question: "Yuborilgan E-mailni qaytarib olish mumkinmi?",
      answer:
        "Bu foydalanayotgan E-mail xizmatiga bog‘liq. Ayrim xizmatlarda yuborilgandan keyin juda qisqa vaqt davomida Undo Send funksiyasi mavjud. Bu imkoniyat doimiy emas, shuning uchun yuborishdan oldin xatni tekshirish muhim.",
    },
    {
      question: "CC va BCC o‘rtasidagi farq nima?",
      answer:
        "CC orqali qo‘shilgan manzillar barcha qabul qiluvchilarga ko‘rinadi. BCC orqali qo‘shilgan manzillar esa boshqa qabul qiluvchilardan yashiriladi.",
    },
    {
      question: "Katta hajmdagi faylni qanday yuboraman?",
      answer:
        "E-mail xizmatlarida biriktirma hajmiga cheklov bo‘lishi mumkin. Fayl juda katta bo‘lsa, ishonchli bulutli saqlash xizmatidagi havoladan foydalanish mumkin. Havola ruxsatlarini yuborishdan oldin tekshiring.",
    },
    {
      question: "E-mailni noto‘g‘ri odamga yuborsam nima qilishim kerak?",
      answer:
        "Agar Undo Send hali mavjud bo‘lsa, undan darhol foydalaning. Aks holda vaziyatga qarab qisqa tushuntirish yuboring. Maxfiy yoki shaxsiy ma’lumot yuborilgan bo‘lsa, tashkilotingizdagi mas’ul shaxsga ham tezda xabar berish kerak bo‘lishi mumkin.",
    },
    {
      question: "E-mailimga javob kelmasa nima qilaman?",
      answer:
        "Masala shoshilinch bo‘lmasa, odatda bir necha ish kuni kutib, keyin qisqa va muloyim follow-up E-mail yuborish mumkin. Avvalgi xatni eslatib, savol yoki so‘rovingizni qisqa takrorlang.",
    },
    {
      question: "Reply all funksiyasini qachon ishlatish kerak?",
      answer:
        "Javobingiz xatdagi barcha qabul qiluvchilar uchun muhim bo‘lsagina Reply all’dan foydalaning. Aks holda oddiy Reply ortiqcha E-maillarni kamaytiradi.",
    },
    {
      question: "Noma’lum E-maildagi havola yoki faylni ochish xavfsizmi?",
      answer:
        "Yo‘q. Jo‘natuvchini tanimasangiz yoki xat shubhali ko‘rinsa, havola va biriktirmalarni ochmang. Jo‘natuvchi manzilini tekshiring va parol, bank ma’lumotlari yoki tasdiqlash kodlarini E-mail orqali bermang.",
    },
  ],

  faqDe: [
    {
      question: "Muss eine E-Mail immer einen Betreff haben?",
      answer:
        "Technisch ist ein Betreff nicht bei jedem Dienst zwingend erforderlich. Bei professionellen E-Mails ist er jedoch sehr wichtig. Ein kurzer und präziser Betreff zeigt sofort, worum es in der Nachricht geht.",
    },
    {
      question: "Kann ich eine bereits gesendete E-Mail zurückholen?",
      answer:
        "Das hängt vom verwendeten E-Mail-Dienst ab. Manche Dienste bieten für kurze Zeit eine Funktion wie „Senden rückgängig machen“ an. Verlassen Sie sich darauf jedoch nicht und prüfen Sie Ihre Nachricht vor dem Absenden.",
    },
    {
      question: "Was ist der Unterschied zwischen CC und BCC?",
      answer:
        "Adressen im CC-Feld sind für die anderen Empfänger sichtbar. Adressen im BCC-Feld bleiben für die übrigen Empfänger verborgen.",
    },
    {
      question: "Wie verschicke ich sehr große Dateien?",
      answer:
        "E-Mail-Dienste begrenzen häufig die Größe von Anhängen. Bei großen Dateien kann ein Link zu einem vertrauenswürdigen Cloud-Speicher verwendet werden. Prüfen Sie vor dem Versand die Freigabeberechtigungen des Links.",
    },
    {
      question: "Was mache ich, wenn ich eine E-Mail an die falsche Person gesendet habe?",
      answer:
        "Nutzen Sie sofort „Senden rückgängig machen“, falls die Funktion noch verfügbar ist. Andernfalls kann je nach Situation eine kurze erklärende Nachricht sinnvoll sein. Bei vertraulichen oder personenbezogenen Daten sollte gegebenenfalls auch die zuständige Stelle in Ihrer Organisation schnell informiert werden.",
    },
    {
      question: "Was kann ich tun, wenn ich keine Antwort erhalte?",
      answer:
        "Wenn die Angelegenheit nicht dringend ist, können Sie nach einigen Werktagen eine kurze und höfliche Nachfrage senden. Verweisen Sie auf Ihre vorherige Nachricht und formulieren Sie Ihr Anliegen noch einmal knapp.",
    },
    {
      question: "Wann sollte ich „Allen antworten“ verwenden?",
      answer:
        "Verwenden Sie „Allen antworten“ nur, wenn Ihre Antwort für alle Empfänger der ursprünglichen Nachricht relevant ist. Andernfalls reicht eine normale Antwort.",
    },
    {
      question: "Ist es sicher, Links oder Anhänge aus unbekannten E-Mails zu öffnen?",
      answer:
        "Nein. Wenn Sie den Absender nicht kennen oder die Nachricht verdächtig wirkt, öffnen Sie keine Links oder Anhänge. Prüfen Sie die Absenderadresse und geben Sie Passwörter, Bankdaten oder Bestätigungscodes nicht per E-Mail weiter.",
    },
  ],
};

const client = await pool.connect();

try {
  await client.query("BEGIN");

  const existing = await client.query(
    `
      SELECT id::text, status
      FROM guide_articles
      WHERE LOWER(slug) = LOWER($1)
      LIMIT 1
    `,
    [slug],
  );

  if (existing.rows.length > 0) {
    await client.query("ROLLBACK");
    console.log(
      `Guide article already exists: ${slug} (id=${existing.rows[0].id}, status=${existing.rows[0].status}). No changes made.`,
    );
    process.exitCode = 0;
  } else {
    const legacyId = `email-guide-${Date.now()}`;

    const result = await client.query(
      `
        INSERT INTO guide_articles (
          legacy_id,
          slug,
          category_slug,
          title_uz,
          title_de,
          excerpt_uz,
          excerpt_de,
          intro_uz,
          intro_de,
          reading_time_uz,
          reading_time_de,
          facts_uz,
          facts_de,
          sections_uz,
          sections_de,
          steps_uz,
          steps_de,
          faq_uz,
          faq_de,
          sources,
          related_article_slugs,
          last_reviewed_at,
          status,
          featured
        )
        VALUES (
          $1, $2, $3,
          $4, $5,
          $6, $7,
          $8, $9,
          $10, $11,
          $12::jsonb, $13::jsonb,
          $14::jsonb, $15::jsonb,
          $16::jsonb, $17::jsonb,
          $18::jsonb, $19::jsonb,
          $20::jsonb,
          $21,
          $22,
          'draft',
          FALSE
        )
        RETURNING id::text, slug, status
      `,
      [
        legacyId,
        slug,
        categorySlug,
        article.titleUz,
        article.titleDe,
        article.excerptUz,
        article.excerptDe,
        article.introUz,
        article.introDe,
        article.readingTimeUz,
        article.readingTimeDe,
        JSON.stringify(article.factsUz),
        JSON.stringify(article.factsDe),
        JSON.stringify({}),
        JSON.stringify({}),
        JSON.stringify([]),
        JSON.stringify([]),
        JSON.stringify(article.faqUz),
        JSON.stringify(article.faqDe),
        JSON.stringify([]),
        [],
        "2026-09-10",
      ],
    );

    await client.query("COMMIT");

    const created = result.rows[0];
    console.log(
      `Created Guide draft: ${created.slug} (id=${created.id}, status=${created.status}).`,
    );
  }
} catch (error) {
  try {
    await client.query("ROLLBACK");
  } catch {
    // Preserve the original error.
  }

  throw error;
} finally {
  client.release();
  await pool.end();
}
