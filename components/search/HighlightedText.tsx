import type { ReactNode } from "react";

import { normalizeSearchText } from "@/lib/search/search-normalization";
import type { SearchLocale } from "@/data/searchIndex";

type HighlightedTextProps = Readonly<{
  text: string;
  query: string;
  locale: SearchLocale;
}>;

function normalizeCharacter(value: string, locale: SearchLocale): string {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase(locale === "de" ? "de-DE" : "uz-UZ")
    .replace(/[ʻʼ’‘`´]/g, "'");
}

export default function HighlightedText({
  text,
  query,
  locale,
}: HighlightedTextProps) {
  const normalizedQuery = normalizeSearchText(query, locale);

  if (!normalizedQuery) {
    return <>{text}</>;
  }

  let normalizedText = "";
  const sourceIndexes: number[] = [];

  for (let sourceIndex = 0; sourceIndex < text.length; sourceIndex += 1) {
    const normalizedCharacter = normalizeCharacter(text[sourceIndex], locale);

    for (const character of normalizedCharacter) {
      normalizedText += character;
      sourceIndexes.push(sourceIndex);
    }
  }

  const matches: Array<Readonly<{ start: number; end: number }>> = [];
  let offset = 0;

  while (offset < normalizedText.length) {
    const matchIndex = normalizedText.indexOf(normalizedQuery, offset);

    if (matchIndex === -1) {
      break;
    }

    const normalizedEnd = matchIndex + normalizedQuery.length - 1;
    const start = sourceIndexes[matchIndex];
    const end = (sourceIndexes[normalizedEnd] ?? start) + 1;

    matches.push({ start, end });
    offset = normalizedEnd + 1;
  }

  if (matches.length === 0) {
    return <>{text}</>;
  }

  const parts: ReactNode[] = [];
  let sourceOffset = 0;

  matches.forEach((match, index) => {
    if (match.start > sourceOffset) {
      parts.push(text.slice(sourceOffset, match.start));
    }

    parts.push(
      <mark
        key={`${match.start}-${match.end}-${index}`}
        className="rounded bg-emerald-100/90 px-0.5 text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-200"
      >
        {text.slice(match.start, match.end)}
      </mark>,
    );

    sourceOffset = match.end;
  });

  if (sourceOffset < text.length) {
    parts.push(text.slice(sourceOffset));
  }

  return <>{parts}</>;
}
