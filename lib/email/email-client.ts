function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required email environment variable: ${name}`);
  return value;
}

export function getSiteUrl(): string {
  return requireEnv("APP_URL").replace(/\/$/, "");
}

export async function sendTransactionalEmail(input: Readonly<{
  to: string;
  subject: string;
  html: string;
  text: string;
}>): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${requireEnv("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: requireEnv("EMAIL_FROM"),
      to: [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("Transactional email delivery failed", {
      status: response.status,
      body: body.slice(0, 500),
    });
    throw new Error("Transactional email delivery failed.");
  }
}
