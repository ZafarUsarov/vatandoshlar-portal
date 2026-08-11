"use client";

import {
  createServiceAction,
} from "@/app/[locale]/admin/services/new/actions";

import ServiceForm from "./ServiceForm";

type ServiceCreateFormProps = {
  locale: "uz" | "de";
};

export default function ServiceCreateForm({
  locale,
}: ServiceCreateFormProps) {
  return (
    <ServiceForm
      locale={locale}
      formAction={
        createServiceAction
      }
    />
  );
}
