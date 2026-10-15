import { getDb } from "@/lib/db";
import type { MarketListing } from "@/lib/market/market-repository";

type Language = "uz" | "de";
const enabled = () => process.env.GEMINI_TRANSLATION_ENABLED === "true";

/** Translations are read only; page views never invoke Gemini. */
export async function localizeMarketListings<T extends MarketListing>(items: readonly T[], language: Language): Promise<T[]> {
  if (!enabled() || items.length === 0) return [...items];
  const ids = items.filter(item => item.contentLanguage !== language).map(item => item.id);
  if (!ids.length) return [...items];
  const result = await getDb().query<{ listing_id: string; title: string; description: string }>(
    `SELECT t.listing_id::text, t.title, t.description
     FROM market_listing_translations t JOIN market_listings m ON m.id = t.listing_id
     WHERE t.listing_id = ANY($1::bigint[]) AND t.language = $2 AND t.status = 'ready'
       AND t.title IS NOT NULL AND t.description IS NOT NULL AND m.content_language <> t.language`, [ids, language]);
  const byId = new Map(result.rows.map(row => [row.listing_id, row]));
  return items.map(item => {
    const translated = byId.get(item.id);
    return translated ? { ...item, title: translated.title, description: translated.description } : item;
  });
}

/** Best-effort, bounded translation after a user saves. Never blocks saving on API errors. */
export async function translateMarketListing(listingId: string): Promise<void> {
  if (!enabled() || !process.env.GEMINI_API_KEY || !/^[1-9]\d*$/.test(listingId)) return;
  try {
    const db = getDb();
    const result = await db.query<{ title: string; description: string; content_language: Language }>(
      `SELECT title, description, content_language FROM market_listings WHERE id = $1::bigint
       AND status IN ('draft', 'published')`, [listingId]);
    const source = result.rows[0];
    if (!source || source.title.length > 250 || source.description.length > 10000) return;
    const target: Language = source.content_language === "uz" ? "de" : "uz";
    const existing = await db.query<{ status: string }>(
      `SELECT status FROM market_listing_translations WHERE listing_id = $1::bigint AND language = $2`, [listingId, target]);
    if (existing.rows[0]?.status === "ready") return;
    // Fixed free-tier guard: one call per listing save, limited payload and output.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    let response: Response;
    try {
      response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`, {
        method: "POST", signal: controller.signal, cache: "no-store",
        headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text:
            `Translate this marketplace advertisement from ${source.content_language === "uz" ? "Uzbek" : "German"} to ${target === "uz" ? "Uzbek" : "German"}. Preserve meaning, proper names, numbers, and contact details. Do not add information. Return ONLY a JSON object with string fields title and description.\n${JSON.stringify({ title: source.title, description: source.description })}`
          }] }], generationConfig: { responseMimeType: "application/json", temperature: 0.1, maxOutputTokens: 4096 },
        }),
      });
    } finally { clearTimeout(timeout); }
    if (!response.ok) return;
    const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) return;
    const translated: unknown = JSON.parse(raw);
    if (!translated || typeof translated !== "object") return;
    const fields = translated as { title?: unknown; description?: unknown };
    if (typeof fields.title !== "string" || typeof fields.description !== "string") return;
    const title = fields.title.trim(), description = fields.description.trim();
    if (!title || !description || title.length > 500 || description.length > 20000) return;
    // Conditional write prevents a late API response overwriting a newer edit.
    await db.query(`INSERT INTO market_listing_translations
      (listing_id, language, title, description, status, source_updated_at, translated_at)
      SELECT m.id, $2, $3, $4, 'ready', m.updated_at, NOW() FROM market_listings m
      WHERE m.id = $1::bigint AND m.title = $5 AND m.description = $6 AND m.content_language = $7
      ON CONFLICT (listing_id, language) DO UPDATE SET
        title = EXCLUDED.title, description = EXCLUDED.description, status = 'ready',
        source_updated_at = EXCLUDED.source_updated_at, translated_at = NOW(),
        error_message = NULL, updated_at = NOW()`,
      [listingId, target, title, description, source.title, source.description, source.content_language]);
  } catch (error) {
    // Do not log original user content or API credentials.
    console.warn("Market translation unavailable", error instanceof Error ? error.name : "unknown");
  }
}
