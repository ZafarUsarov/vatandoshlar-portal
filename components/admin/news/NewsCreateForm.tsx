"use client";

import {
  createNewsAction,
} from "@/app/[locale]/admin/news/new/actions";

import NewsArticleForm from "./NewsArticleForm";

type NewsCreateFormProps = {
  locale: "uz" | "de";
};

export default function NewsCreateForm({
  locale,
}: NewsCreateFormProps) {
  return (
    <NewsArticleForm
      locale={locale}
      mode="create"
      formAction={createNewsAction}
    />
  );
}
