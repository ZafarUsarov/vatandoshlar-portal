"use client";

import {
  updateJobAction,
} from "@/app/[locale]/admin/jobs/[id]/edit/actions";
import type {
  AdminJobGuide,
} from "@/lib/jobs/admin-jobs-repository";

import JobGuideForm from "./JobGuideForm";

type JobEditFormProps = {
  locale: "uz" | "de";
  guide: AdminJobGuide;
};

export default function JobEditForm({
  locale,
  guide,
}: JobEditFormProps) {
  return (
    <JobGuideForm
      locale={locale}
      mode="edit"
      guide={guide}
      formAction={
        updateJobAction
      }
    />
  );
}
