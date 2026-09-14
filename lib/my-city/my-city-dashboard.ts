import {
  getUpcomingPublishedEventsByLocationId,
} from "@/lib/events/public-events-repository";
import {
  getPublishedSpecialistsByLocationId,
} from "@/lib/specialists/public-specialists-repository";
import {
  getPublicTelegramGroups,
} from "@/lib/telegram/public-telegram-repository";

import type {
  PublicEventItem,
  SupportedEventLocale,
} from "@/lib/events/public-events-repository";
import type {
  MyCityUserContext,
} from "@/lib/users/my-city-context";
import type {
  LocalizedSpecialist,
  SupportedLocale,
} from "@/types/specialist";
import type {
  TelegramGroup,
} from "@/types/telegram";

export type MyCityDashboardData = Readonly<{
  context: MyCityUserContext;

  events: ReadonlyArray<PublicEventItem>;
  specialists: ReadonlyArray<LocalizedSpecialist>;
  communities: ReadonlyArray<TelegramGroup>;
}>;

export async function getMyCityDashboardData(
  context: MyCityUserContext,
): Promise<MyCityDashboardData> {
  const location =
    context.homeLocation;

  if (!location) {
    return {
      context,
      events: [],
      specialists: [],
      communities: [],
    };
  }

  const locale =
    context.locale as SupportedLocale;

  const [
    events,
    specialists,
    telegramGroups,
  ] =
    await Promise.all([
      getUpcomingPublishedEventsByLocationId(
        location.id,
        locale as SupportedEventLocale,
        3,
      ),

      getPublishedSpecialistsByLocationId(
        location.id,
        locale,
        3,
      ),

      getPublicTelegramGroups(
        locale,
      ),
    ]);

  const communities =
    telegramGroups.filter(
      (group) =>
        group.state ===
        location.stateName,
    );

  return {
    context,
    events,
    specialists,
    communities,
  };
}
