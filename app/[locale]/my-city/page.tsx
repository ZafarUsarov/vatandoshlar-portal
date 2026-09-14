import type {
  Metadata,
} from "next";

import {
  getLocale,
} from "next-intl/server";

import MyCityDashboard from "@/components/my-city/MyCityDashboard";
import {
  requirePublicUser,
} from "@/lib/auth/user";
import {
  getMyCityDashboardData,
} from "@/lib/my-city/my-city-dashboard";
import {
  toMyCityUserContext,
} from "@/lib/users/my-city-context";

export const dynamic =
  "force-dynamic";

export const metadata: Metadata = {
  title:
    "Mening shahrim",
  robots: {
    index:
      false,
    follow:
      false,
  },
};

export default async function MyCityPage() {
  const locale: "uz" | "de" =
    (await getLocale()) === "de"
      ? "de"
      : "uz";

  const user =
    await requirePublicUser(
      locale,
    );

  const baseContext =
    toMyCityUserContext(
      user,
    );

  const context = {
    ...baseContext,
    locale,
  };

  const data =
    await getMyCityDashboardData(
      context,
    );

  return (
    <MyCityDashboard
      data={data}
    />
  );
}
