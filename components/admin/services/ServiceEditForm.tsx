"use client";

import {
  updateServiceAction,
} from "@/app/[locale]/admin/services/[id]/edit/actions";
import type {
  AdminService,
} from "@/lib/services/admin-services-repository";

import ServiceForm from "./ServiceForm";

type ServiceEditFormProps = {
  locale: "uz" | "de";
  service: AdminService;
};

export default function ServiceEditForm({
  locale,
  service,
}: ServiceEditFormProps) {
  return (
    <ServiceForm
      locale={locale}
      mode="edit"
      service={service}
      formAction={
        updateServiceAction
      }
    />
  );
}
