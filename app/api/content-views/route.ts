import { createHash, randomUUID } from "node:crypto";

import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

import {
  recordContentView,
  type ViewableContentType,
} from "@/lib/content-views/content-view-repository";

const VISITOR_COOKIE_NAME =
  "vatandoshlar_view_visitor";

const VISITOR_COOKIE_MAX_AGE =
  60 * 60 * 24 * 365;

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

function createVisitorKey(
  visitorId: string,
): string {
  return createHash("sha256")
    .update(visitorId)
    .digest("hex");
}

export async function POST(
  request: Request,
) {
  try {
    const requestHeaders =
      await headers();

    if (
      isLikelyBot(
        requestHeaders.get(
          "user-agent",
        ),
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

    const cookieStore =
      await cookies();

    const existingVisitorId =
      cookieStore.get(
        VISITOR_COOKIE_NAME,
      )?.value;

    const visitorId =
      existingVisitorId ??
      randomUUID();

    const counted =
      await recordContentView({
        contentType:
          body.contentType,
        contentId:
          body.contentId,
        visitorKey:
          createVisitorKey(
            visitorId,
          ),
      });

    const response =
      NextResponse.json({
        counted,
      });

    if (!existingVisitorId) {
      response.cookies.set(
        VISITOR_COOKIE_NAME,
        visitorId,
        {
          httpOnly: true,
          sameSite: "lax",
          secure:
            process.env.NODE_ENV ===
            "production",
          maxAge:
            VISITOR_COOKIE_MAX_AGE,
          path: "/",
        },
      );
    }

    return response;
  } catch {
    return new NextResponse(null, {
      status: 204,
    });
  }
}
