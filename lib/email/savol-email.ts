import { getSiteUrl, sendTransactionalEmail } from "@/lib/email/email-client";
import type { UserPreferredLocale } from "@/types/user";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

export async function sendSavolNewAnswerEmail(input: Readonly<{
  to: string;
  locale: UserPreferredLocale;
  questionSlug: string;
  questionTitle: string;
}>): Promise<void> {
  const url = `${getSiteUrl()}/${input.locale}/savol/${encodeURIComponent(input.questionSlug)}`;
  const isGerman = input.locale === "de";
  const subject = isGerman
    ? `Neue Antwort: ${input.questionTitle} – UzDe`
    : `Yangi javob: ${input.questionTitle} – UzDe`;
  const title = isGerman ? "Neue Antwort auf eine Frage" : "Savolga yangi javob";
  const intro = isGerman
    ? `Zu „${input.questionTitle}“ wurde eine neue Antwort veröffentlicht.`
    : `“${input.questionTitle}” savoliga yangi javob yozildi.`;
  const action = isGerman ? "Antwort ansehen" : "Javobni ko‘rish";

  await sendTransactionalEmail({
    to: input.to,
    subject,
    text: `${intro}\n\n${action}: ${url}`,
    html: `<!doctype html><html lang="${input.locale}"><body style="margin:0;padding:0;background:#f4f7f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:32px 16px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border:1px solid #e2e8f0;border-radius:20px;"><tr><td style="padding:32px;"><div style="font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#159a9c;">VATANDOSHLAR SAVOL</div><h1 style="margin:10px 0 16px;font-size:28px;line-height:36px;color:#0f2744;">${escapeHtml(title)}</h1><p style="margin:0 0 26px;font-size:16px;line-height:26px;color:#475569;">${escapeHtml(intro)}</p><a href="${escapeHtml(url)}" style="display:inline-block;padding:14px 22px;background:#159a9c;color:#fff;text-decoration:none;font-size:15px;font-weight:700;border-radius:10px;">${escapeHtml(action)}</a></td></tr></table></td></tr></table></body></html>`,
  });
}

export async function sendSavolAnswerReplyEmail(input: Readonly<{
  to: string;
  locale: UserPreferredLocale;
  questionSlug: string;
  questionTitle: string;
}>): Promise<void> {
  const url = `${getSiteUrl()}/${input.locale}/savol/${encodeURIComponent(input.questionSlug)}`;
  const de = input.locale === 'de';
  const subject = de ? `Neue Reaktion auf Ihre Antwort – UzDe` : `Javobingizga yangi izoh – UzDe`;
  const intro = de ? `Zu Ihrer Antwort auf „${input.questionTitle}“ gibt es eine neue Reaktion.` : `“${input.questionTitle}” savolidagi javobingizga yangi izoh yozildi.`;
  const action = de ? 'Reaktion ansehen' : 'Izohni ko‘rish';
  await sendTransactionalEmail({
    to: input.to, subject,
    text: `${intro}\n\n${action}: ${url}`,
    html: `<!doctype html><html lang="${input.locale}"><body style="margin:0;padding:32px 16px;background:#f4f7f9;font-family:Arial,sans-serif;color:#0f172a"><div style="max-width:600px;margin:auto;padding:32px;border-radius:18px;background:white;border:1px solid #e2e8f0"><p style="font-size:12px;font-weight:bold;color:#047857">VATANDOSHLAR SAVOL</p><h1 style="font-size:24px">${escapeHtml(subject)}</h1><p style="line-height:1.6">${escapeHtml(intro)}</p><a href="${escapeHtml(url)}" style="display:inline-block;padding:13px 20px;background:#047857;color:white;border-radius:10px;text-decoration:none">${escapeHtml(action)}</a></div></body></html>`,
  });
}
