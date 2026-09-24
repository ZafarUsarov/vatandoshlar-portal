"use client";

import type {
  GuideArticle,
  SupportedGuideLocale,
} from "../../../types/guide";
import EmailWritingGuide from "./EmailWritingGuide";
import DrivingLicenceExchangeGuide from "./DrivingLicenceExchangeGuide";
import HousingSearchGuide from "./HousingSearchGuide";

type Props = Readonly<{
  article: GuideArticle;
  locale: SupportedGuideLocale;
}>;

export default function GuideRichContent({
  article,
  locale,
}: Props) {
  if (article.slug === "email-yozishni-organamiz") {
    return <EmailWritingGuide locale={locale} />;
  }

  if (article.slug === "housing-in-germany") {
    return (
      <HousingSearchGuide
        article={article}
        locale={locale}
      />
    );
  }

  if (article.slug === "uzbek-driving-licence-umschreibung") {
    return (
      <DrivingLicenceExchangeGuide
        article={article}
        locale={locale}
      />
    );
  }

  return null;
}
