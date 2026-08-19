"use client";

import { useEffect } from "react";

import type {
  ViewableContentType,
} from "@/lib/content-views/content-view-repository";

type ContentViewTrackerProps = Readonly<{
  contentType: ViewableContentType;
  contentId: string | number;
}>;

export default function ContentViewTracker({
  contentType,
  contentId,
}: ContentViewTrackerProps) {
  useEffect(() => {
    const controller =
      new AbortController();

    void fetch(
      "/api/content-views",
      {
        method: "POST",
        headers: {
          "content-type":
            "application/json",
        },
        body: JSON.stringify({
          contentType,
          contentId:
            String(contentId),
        }),
        credentials: "same-origin",
        cache: "no-store",
        signal: controller.signal,
      },
    ).catch(() => {
      // View tracking must never affect page usability.
    });

    return () => {
      controller.abort();
    };
  }, [
    contentType,
    contentId,
  ]);

  return null;
}
