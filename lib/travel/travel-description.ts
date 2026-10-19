/**
 * Remove legacy machine-generated travel metadata from the free-text description.
 * Route and departure time are already rendered from structured listing fields.
 * Preserve all other user-authored content and leave the database unchanged.
 */
export function readableTravelDescription(raw: string, origin: string, destination: string): string {
  if (!raw) return "";

  const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const route = new RegExp(`${escapeRegExp(origin.trim())}\\s*(?:→|->)\\s*${escapeRegExp(destination.trim())}`, "gu");
  const iso = String.raw`\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})`;
  const departure = new RegExp(String.raw`(?:Jo[‘’']nash|Abreise)\s*:\s*${iso}`, "giu");

  // Legacy descriptions may contain the route/departure pair multiple times,
  // sometimes concatenated on one line. Remove only these exact machine fields.
  const cleaned = raw.replace(/\r\n?/g, "\n")
    .replace(route, "")
    .replace(departure, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");

  return cleaned.trim();
}
