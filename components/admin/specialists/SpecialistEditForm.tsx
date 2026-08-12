"use client";

import {
  updateSpecialistAction,
} from "@/app/[locale]/admin/specialists/[id]/edit/actions";
import type {
  AdminSpecialist,
} from "@/lib/specialists/admin-specialists-repository";

import SpecialistForm from "./SpecialistForm";

type SpecialistEditFormProps = {
  locale: "uz" | "de";
  specialist: AdminSpecialist;
};

export default function SpecialistEditForm({
  locale,
  specialist,
}: SpecialistEditFormProps) {
  return (
    <SpecialistForm
      locale={locale}
      mode="edit"
      specialist={specialist}
      formAction={updateSpecialistAction}
    />
  );
}
