type Locale = "uz" | "de";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required email environment variable: ${name}`);
  return value;
}

function siteUrl(): string {
  return requireEnv("APP_URL").replace(/\/$/, "");
}

async function sendEmail(input: { to: string; subject: string; html: string; text: string }) {
  const apiKey = requireEnv("RESEND_API_KEY");
  const from = requireEnv("EMAIL_FROM");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [input.to], subject: input.subject, html: input.html, text: input.text }),
    cache: "no-store",
  });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("Auth email delivery failed", { status: response.status, body: body.slice(0, 500) });
    throw new Error("Auth email delivery failed.");
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}

export async function sendVerificationEmail(email: string, token: string, locale: Locale) {
  const url = `${siteUrl()}/${locale}/id/verify-email?token=${encodeURIComponent(token)}`;
  const subject = locale === "de" ? "E-Mail-Adresse bestätigen – Vatandoshlar.de" : "E-mail manzilingizni tasdiqlang – Vatandoshlar.de";
  const intro = locale === "de" ? "Bestätigen Sie Ihre E-Mail-Adresse, um Ihr Vatandoshlar.de Konto zu aktivieren." : "Vatandoshlar.de hisobingizni faollashtirish uchun e-mail manzilingizni tasdiqlang.";
  const label = locale === "de" ? "E-Mail bestätigen" : "E-mailni tasdiqlash";
  await sendEmail({
    to: email,
    subject,
    text: `${intro}\n\n${url}\n\n${locale === "de" ? "Der Link ist 24 Stunden gültig." : "Havola 24 soat amal qiladi."}`,
    html: `<p>${escapeHtml(intro)}</p><p><a href="${escapeHtml(url)}">${escapeHtml(label)}</a></p><p>${locale === "de" ? "Der Link ist 24 Stunden gültig." : "Havola 24 soat amal qiladi."}</p>`,
  });
}

export async function sendPasswordResetEmail(email: string, token: string, locale: Locale) {
  const url = `${siteUrl()}/${locale}/id/reset-password?token=${encodeURIComponent(token)}`;
  const subject = locale === "de" ? "Passwort zurücksetzen – Vatandoshlar.de" : "Parolni tiklash – Vatandoshlar.de";
  const intro = locale === "de" ? "Sie haben eine Passwort-Zurücksetzung angefordert." : "Siz parolni tiklashni so‘radingiz.";
  const label = locale === "de" ? "Neues Passwort festlegen" : "Yangi parol o‘rnatish";
  await sendEmail({
    to: email,
    subject,
    text: `${intro}\n\n${url}\n\n${locale === "de" ? "Der Link ist 60 Minuten gültig." : "Havola 60 daqiqa amal qiladi."}`,
    html: `<p>${escapeHtml(intro)}</p><p><a href="${escapeHtml(url)}">${escapeHtml(label)}</a></p><p>${locale === "de" ? "Der Link ist 60 Minuten gültig." : "Havola 60 daqiqa amal qiladi."}</p>`,
  });
}
