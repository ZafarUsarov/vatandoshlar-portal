import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import {
  getPathname,
} from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const handleI18nRouting =
  createMiddleware(routing);

const RAILWAY_HOSTNAME =
  "vatandoshlar-portal-production.up.railway.app";

const CANONICAL_HOSTNAME =
  "vatandoshlar.de";

type AppLocale =
  (typeof routing.locales)[number];

function resolveLocale(
  pathname: string,
): AppLocale {
  const localeCandidate =
    pathname
      .split("/")
      .filter(Boolean)[0];

  if (
    routing.locales.includes(
      localeCandidate as AppLocale,
    )
  ) {
    return localeCandidate as AppLocale;
  }

  return routing.defaultLocale;
}

function getInternalPathname(
  pathname: string,
): string {
  const segments =
    pathname
      .split("/")
      .filter(Boolean);

  const firstSegment =
    segments[0];

  const hasLocalePrefix =
    routing.locales.includes(
      firstSegment as AppLocale,
    );

  if (!hasLocalePrefix) {
    return pathname;
  }

  const internalSegments =
    segments.slice(1);

  return internalSegments.length
    ? `/${internalSegments.join("/")}`
    : "/";
}

function isAdminPath(
  pathname: string,
): boolean {
  const internalPathname =
    getInternalPathname(pathname);

  return (
    internalPathname === "/admin" ||
    internalPathname.startsWith(
      "/admin/",
    )
  );
}

export default auth((request) => {
  if (
    request.nextUrl.hostname ===
    RAILWAY_HOSTNAME
  ) {
    const canonicalUrl =
      request.nextUrl.clone();

    canonicalUrl.protocol = "https:";
    canonicalUrl.hostname =
      CANONICAL_HOSTNAME;
    canonicalUrl.port = "";

    return NextResponse.redirect(
      canonicalUrl,
      308,
    );
  }

  const pathname =
    request.nextUrl.pathname;

  if (
    isAdminPath(pathname) &&
    request.auth?.user?.role !== "admin"
  ) {
    const locale =
      resolveLocale(pathname);

    const loginUrl =
      request.nextUrl.clone();

    loginUrl.pathname =
      getPathname({
        locale,
        href: "/login",
      });

    loginUrl.search = "";

    return NextResponse.redirect(
      loginUrl,
    );
  }

  return handleI18nRouting(request);
});

export const config = {
  matcher: [
    "/",
    "/(uz|de)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
