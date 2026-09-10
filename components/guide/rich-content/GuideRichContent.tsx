"use client";

import type {
  GuideArticle,
  SupportedGuideLocale,
} from "../../../types/guide";
import EmailWritingGuide from "./EmailWritingGuide";

type Props = Readonly<{
  article: GuideArticle;
  locale: SupportedGuideLocale;
}>;

export default function GuideRichContent({
  article,
  locale,
}: Props) {
  if (article.slug !== "email-yozishni-organamiz") {
    return null;
  }

  return <EmailWritingGuide locale={locale} />;
}
