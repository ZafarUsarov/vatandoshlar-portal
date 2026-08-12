"use client";

import {
  updateEventAction,
} from "@/app/[locale]/admin/events/[id]/edit/actions";
import type {
  AdminEvent,
} from "@/lib/events/admin-events-repository";

import EventForm from "./EventForm";

type EventEditFormProps = {
  locale: "uz" | "de";
  event: AdminEvent;
};

export default function EventEditForm({
  locale,
  event,
}: EventEditFormProps) {
  return (
    <EventForm
      locale={locale}
      mode="edit"
      event={event}
      formAction={updateEventAction}
    />
  );
}
