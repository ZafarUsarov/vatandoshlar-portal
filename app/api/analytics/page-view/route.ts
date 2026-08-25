import { NextResponse } from "next/server";

import {
  recordDailyPageView,
  type AnalyticsLocale,
} from "@/lib/analytics/analytics-repository";
import { resolveCountryCode } from "@/lib/analytics/geo-country";

type PageViewRequestBody = Readonly<{
  locale?: unknown;
  path?: unknown;
}>;

function isAnalyticsLocale(
  value: unknown,
): value is AnalyticsLocale {
  return (
    value === "uz" ||
    value === "de"
  );
}

function isLikelyBot(
  userAgent: string | null,
): boolean {
  if (!userAgent) {
    return false;
  }

  return /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegrambot|discordbot|preview/i.test(
    userAgent,
  );
}

function resolveClientIp(
  request: Request,
): string | null {
  const realIp =
    request.headers
      .get("x-real-ip")
      ?.trim();

  if (realIp) {
    return realIp;
  }

  const forwardedFor =
    request.headers.get(
      "x-forwarded-for",
    );

  return (
    forwardedFor
      ?.split(",")[0]
      ?.trim() ||
    null
  );
}

function normalizePublicPath(
  value: string,
  locale: AnalyticsLocale,
): string | null {
  const path =
    value
      .split("?")[0]
      ?.split("#")[0]
      ?.trim();

  if (
    !path ||
    !path.startsWith("/") ||
    path.length > 512
  ) {
    return null;
  }

  const localePrefix =
    `/${locale}`;

  if (path === localePrefix) {
    return "/";
  }

  if (
    !path.startsWith(
      `${localePrefix}/`,
    )
  ) {
    return null;
  }

  const internalPath =
    path.slice(
      localePrefix.length,
    );

  if (
    internalPath === "/admin" ||
    internalPath.startsWith(
      "/admin/",
    ) ||
    internalPath === "/login"
  ) {
    return null;
  }

  return internalPath;
}

export async function POST(
  request: Request,
) {
  try {
    if (
      isLikelyBot(
        request.headers.get(
          "user-agent",
        ),
      )
    ) {
      return new NextResponse(null, {
        status: 204,
      });
    }

    const body =
      (await request.json()) as PageViewRequestBody;

    if (
      !isAnalyticsLocale(
        body.locale,
      ) ||
      typeof body.path !==
        "string"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid analytics payload.",
        },
        {
          status: 400,
        },
      );
    }

    const path =
      normalizePublicPath(
        body.path,
        body.locale,
      );

    if (!path) {
      return new NextResponse(null, {
        status: 204,
      });
    }

    const countryCode =
      await resolveCountryCode(
        resolveClientIp(
          request,
        ),
      );

    const recorded =
      await recordDailyPageView({
        countryCode,
        locale:
          body.locale,
        path,
      });

    return NextResponse.json({
      recorded,
    });
  } catch {
    // Analytics must never make a public
    // page request fail.
    return new NextResponse(null, {
      status: 204,
    });
  }
}
