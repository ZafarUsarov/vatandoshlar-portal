"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import type {
  AnalyticsLocale,
} from "@/lib/analytics/analytics-repository";

type PageViewTrackerProps = Readonly<{
  locale: AnalyticsLocale;
}>;

export default function PageViewTracker({
  locale,
}: PageViewTrackerProps) {
  const pathname =
    usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const controller =
      new AbortController();

    void fetch(
      "/api/analytics/page-view",
      {
        method: "POST",
        headers: {
          "content-type":
            "application/json",
        },
        body: JSON.stringify({
          locale,
          path: pathname,
        }),
        cache: "no-store",
        keepalive: true,
        signal:
          controller.signal,
      },
    ).catch(() => {
      // Analytics failures must never
      // affect navigation or rendering.
    });

    return () => {
      controller.abort();
    };
  }, [
    locale,
    pathname,
  ]);

  return null;
}
