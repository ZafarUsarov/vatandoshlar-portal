import { createHmac } from "node:crypto";

import { headers } from "next/headers";
import { NextResponse } from "next/server";

import {
  recordContentView,
  type ViewableContentType,
} from "@/lib/content-views/content-view-repository";

const LEGACY_VISITOR_COOKIE_NAME =
  "vatandoshlar_view_visitor";

type ContentViewRequestBody = Readonly<{
  contentType?: unknown;
  contentId?: unknown;
}>;

function isViewableContentType(
  value: unknown,
): value is ViewableContentType {
  return (
    value === "news" ||
    value === "guide"
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
  requestHeaders: Headers,
): string {
  const realIp =
    requestHeaders
      .get("x-real-ip")
      ?.trim();

  if (realIp) {
    return realIp.slice(0, 128);
  }

  const forwardedFor =
    requestHeaders.get(
      "x-forwarded-for",
    );

  return (
    forwardedFor
      ?.split(",")[0]
      ?.trim()
      .slice(0, 128) ||
    "unknown"
  );
}

function hasLegacyVisitorCookie(
  requestHeaders: Headers,
): boolean {
  const cookieHeader =
    requestHeaders.get("cookie");

  if (!cookieHeader) {
    return false;
  }

  return cookieHeader
    .split(";")
    .some((cookie) =>
      cookie
        .trim()
        .startsWith(
          `${LEGACY_VISITOR_COOKIE_NAME}=`,
        ),
    );
}

function createVisitorKey({
  contentType,
  contentId,
  clientIp,
  userAgent,
}: Readonly<{
  contentType: ViewableContentType;
  contentId: string;
  clientIp: string;
  userAgent: string | null;
}>): string | null {
  const secret =
    process.env.CONTENT_VIEW_DEDUP_SECRET?.trim();

  if (!secret) {
    return null;
  }

  return createHmac(
    "sha256",
    secret,
  )
    .update(contentType)
    .update("\0")
    .update(contentId)
    .update("\0")
    .update(clientIp)
    .update("\0")
    .update(
      userAgent
        ?.slice(0, 512) ??
        "unknown",
    )
    .digest("hex");
}

export async function POST(
  request: Request,
) {
  try {
    const requestHeaders =
      await headers();

    const userAgent =
      requestHeaders.get(
        "user-agent",
      );

    if (
      isLikelyBot(
        userAgent,
      )
    ) {
      return new NextResponse(null, {
        status: 204,
      });
    }

    const body =
      (await request.json()) as ContentViewRequestBody;

    if (
      !isViewableContentType(
        body.contentType,
      ) ||
      typeof body.contentId !==
        "string" ||
      body.contentId.length === 0 ||
      body.contentId.length > 128
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid content view payload.",
        },
        {
          status: 400,
        },
      );
    }

    const visitorKey =
      createVisitorKey({
        contentType:
          body.contentType,
        contentId:
          body.contentId,
        clientIp:
          resolveClientIp(
            requestHeaders,
          ),
        userAgent,
      });

    if (!visitorKey) {
      return new NextResponse(null, {
        status: 204,
      });
    }

    const counted =
      await recordContentView({
        contentType:
          body.contentType,
        contentId:
          body.contentId,
        visitorKey,
      });

    const response =
      NextResponse.json({
        counted,
      });

    if (
      hasLegacyVisitorCookie(
        requestHeaders,
      )
    ) {
      response.cookies.delete(
        LEGACY_VISITOR_COOKIE_NAME,
      );
    }

    return response;
  } catch {
    return new NextResponse(null, {
      status: 204,
    });
  }
}
