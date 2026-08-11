"use client";

import {
  createJobAction,
} from "@/app/[locale]/admin/jobs/new/actions";

import JobGuideForm from "./JobGuideForm";

type JobCreateFormProps = {
  locale: "uz" | "de";
};

export default function JobCreateForm({
  locale,
}: JobCreateFormProps) {
  return (
    <JobGuideForm
      locale={locale}
      formAction={createJobAction}
    />
  );
}
