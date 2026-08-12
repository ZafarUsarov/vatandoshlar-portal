"use client";

import { createSpecialistAction } from "@/app/[locale]/admin/specialists/new/actions";

import SpecialistForm from "./SpecialistForm";

type SpecialistCreateFormProps = {
  locale: "uz" | "de";
};

export default function SpecialistCreateForm({
  locale,
}: SpecialistCreateFormProps) {
  return (
    <SpecialistForm
      locale={locale}
      mode="create"
      formAction={createSpecialistAction}
    />
  );
}
