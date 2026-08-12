"use client";

import {
  createGuideArticleAction,
} from "@/app/[locale]/admin/guide/new/actions";

import GuideCreateForm from "./GuideCreateForm";

type GuideCreateFormClientProps = {
  locale: "uz" | "de";
};

export default function GuideCreateFormClient({
  locale,
}: GuideCreateFormClientProps) {
  return (
    <GuideCreateForm
      locale={locale}
      formAction={
        createGuideArticleAction
      }
    />
  );
}
