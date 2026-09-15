type Locale = "uz" | "de";

type TemplateInput = Readonly<{
  locale: Locale;
  eyebrow: string;
  title: string;
  intro: string;
  actionLabel: string;
  actionUrl: string;
  expiry: string;
  securityNote: string;
}>;

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required email environment variable: ${name}`);
  return value;
}

function siteUrl(): string {
  return requireEnv("APP_URL").replace(/\/$/, "");
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[c] ?? c);
}

function renderEmailTemplate(input: TemplateInput): string {
  const logoUrl = `${siteUrl()}/images/brand/Logo_New_Transparent.png`;
  const footer = input.locale === "de"
    ? "Diese E-Mail wurde automatisch von Vatandoshlar.de gesendet."
    : "Ushbu xat Vatandoshlar.de tomonidan avtomatik yuborildi.";
  const fallback = input.locale === "de"
    ? "Falls die Schaltfläche nicht funktioniert, kopieren Sie diesen Link und öffnen Sie ihn in Ihrem Browser:"
    : "Agar tugma ishlamasa, quyidagi havolani nusxalab brauzeringizda oching:";

  return `<!doctype html>
<html lang="${input.locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(input.title)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f7f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f4f7f9;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;">
<tr><td style="padding:32px 32px 24px;text-align:center;border-bottom:1px solid #eef2f6;">
<img src="${escapeHtml(logoUrl)}" width="64" height="64" alt="Vatandoshlar.de" style="display:block;width:64px;height:64px;margin:0 auto 14px;border:0;outline:none;text-decoration:none;">
<div style="font-size:22px;line-height:28px;font-weight:800;letter-spacing:-0.5px;color:#0f2744;">Vatandoshlar<span style="color:#159a9c;">.de</span></div>
</td></tr>
<tr><td style="padding:32px;">
<div style="margin:0 0 10px;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#159a9c;">${escapeHtml(input.eyebrow)}</div>
<h1 style="margin:0 0 16px;font-size:28px;line-height:36px;font-weight:800;letter-spacing:-0.6px;color:#0f2744;">${escapeHtml(input.title)}</h1>
<p style="margin:0 0 26px;font-size:16px;line-height:26px;color:#475569;">${escapeHtml(input.intro)}</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 26px;"><tr><td bgcolor="#159a9c" style="border-radius:10px;">
<a href="${escapeHtml(input.actionUrl)}" style="display:inline-block;padding:14px 22px;font-size:15px;line-height:20px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;">${escapeHtml(input.actionLabel)}</a>
</td></tr></table>
<div style="margin:0 0 24px;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;"><p style="margin:0;font-size:14px;line-height:22px;color:#475569;">${escapeHtml(input.expiry)}</p></div>
<p style="margin:0 0 8px;font-size:13px;line-height:20px;color:#64748b;">${escapeHtml(fallback)}</p>
<p style="margin:0 0 26px;font-size:12px;line-height:19px;word-break:break-all;"><a href="${escapeHtml(input.actionUrl)}" style="color:#0f766e;text-decoration:underline;">${escapeHtml(input.actionUrl)}</a></p>
<p style="margin:0;padding-top:22px;border-top:1px solid #eef2f6;font-size:13px;line-height:21px;color:#64748b;">${escapeHtml(input.securityNote)}</p>
</td></tr>
<tr><td style="padding:22px 32px;background:#f8fafc;border-top:1px solid #eef2f6;border-radius:0 0 20px 20px;text-align:center;">
<p style="margin:0 0 6px;font-size:12px;line-height:18px;color:#64748b;">${escapeHtml(footer)}</p>
<p style="margin:0;font-size:12px;line-height:18px;"><a href="${escapeHtml(siteUrl())}" style="color:#0f766e;text-decoration:none;font-weight:700;">vatandoshlar.de</a></p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
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

export async function sendVerificationEmail(email: string, token: string, locale: Locale) {
  const url = `${siteUrl()}/${locale}/id/verify-email?token=${encodeURIComponent(token)}`;
  const subject = locale === "de" ? "E-Mail-Adresse bestätigen – Vatandoshlar.de" : "E-mail manzilingizni tasdiqlang – Vatandoshlar.de";
  const intro = locale === "de" ? "Bestätigen Sie Ihre E-Mail-Adresse, um Ihr Vatandoshlar.de Konto zu aktivieren." : "Vatandoshlar.de hisobingizni faollashtirish uchun e-mail manzilingizni tasdiqlang.";
  const actionLabel = locale === "de" ? "E-Mail bestätigen" : "E-mailni tasdiqlash";
  const expiry = locale === "de" ? "Dieser Bestätigungslink ist 24 Stunden gültig." : "Ushbu tasdiqlash havolasi 24 soat amal qiladi.";
  const securityNote = locale === "de" ? "Falls Sie kein Vatandoshlar.de Konto erstellt haben, können Sie diese E-Mail ignorieren." : "Agar siz Vatandoshlar.de hisobini yaratmagan bo‘lsangiz, ushbu xatni e’tiborsiz qoldirishingiz mumkin.";

  await sendEmail({
    to: email,
    subject,
    text: `${intro}\n\n${actionLabel}: ${url}\n\n${expiry}\n\n${securityNote}`,
    html: renderEmailTemplate({
      locale,
      eyebrow: locale === "de" ? "Konto bestätigen" : "Hisobni tasdiqlash",
      title: locale === "de" ? "E-Mail-Adresse bestätigen" : "E-mail manzilingizni tasdiqlang",
      intro, actionLabel, actionUrl: url, expiry, securityNote,
    }),
  });
}

export async function sendPasswordResetEmail(email: string, token: string, locale: Locale) {
  const url = `${siteUrl()}/${locale}/id/reset-password?token=${encodeURIComponent(token)}`;
  const subject = locale === "de" ? "Passwort zurücksetzen – Vatandoshlar.de" : "Parolni tiklash – Vatandoshlar.de";
  const intro = locale === "de" ? "Sie haben eine Zurücksetzung Ihres Vatandoshlar.de Passworts angefordert." : "Siz Vatandoshlar.de hisobingiz parolini tiklashni so‘radingiz.";
  const actionLabel = locale === "de" ? "Neues Passwort festlegen" : "Yangi parol o‘rnatish";
  const expiry = locale === "de" ? "Dieser Link ist 60 Minuten gültig." : "Ushbu havola 60 daqiqa amal qiladi.";
  const securityNote = locale === "de" ? "Falls Sie diese Passwort-Zurücksetzung nicht angefordert haben, können Sie diese E-Mail ignorieren. Ihr Passwort bleibt unverändert." : "Agar siz parolni tiklashni so‘ramagan bo‘lsangiz, ushbu xatni e’tiborsiz qoldirishingiz mumkin. Parolingiz o‘zgarmaydi.";

  await sendEmail({
    to: email,
    subject,
    text: `${intro}\n\n${actionLabel}: ${url}\n\n${expiry}\n\n${securityNote}`,
    html: renderEmailTemplate({
      locale,
      eyebrow: locale === "de" ? "Passwort-Sicherheit" : "Parol xavfsizligi",
      title: locale === "de" ? "Passwort zurücksetzen" : "Parolni tiklash",
      intro, actionLabel, actionUrl: url, expiry, securityNote,
    }),
  });
}
