"use client";

import {
  createEventAction,
} from "@/app/[locale]/admin/events/new/actions";

import EventForm from "./EventForm";

type EventCreateFormProps = {
  locale: "uz" | "de";
};

export default function EventCreateForm({
  locale,
}: EventCreateFormProps) {
  return (
    <EventForm
      locale={locale}
      mode="create"
      formAction={createEventAction}
    />
  );
}
