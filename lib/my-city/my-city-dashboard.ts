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

  city: Readonly<{
    events: ReadonlyArray<PublicEventItem>;
    specialists: ReadonlyArray<LocalizedSpecialist>;
  }>;

  region: Readonly<{
    events: ReadonlyArray<PublicEventItem>;
    specialists: ReadonlyArray<LocalizedSpecialist>;
    communities: ReadonlyArray<TelegramGroup>;
  }>;

  localEditorial: Readonly<{
    newsAvailable: false;
    guidesAvailable: false;
  }>;
}>;

export async function getMyCityDashboardData(
  context: MyCityUserContext,
): Promise<MyCityDashboardData> {
  const location =
    context.homeLocation;

  if (!location) {
    return {
      context,

      city: {
        events: [],
        specialists: [],
      },

      region: {
        events: [],
        specialists: [],
        communities: [],
      },

      localEditorial: {
        newsAvailable:
          false,
        guidesAvailable:
          false,
      },
    };
  }

  const locale =
    context.locale as SupportedLocale;

  const regionLocationId =
    location.parentId;

  const [
    cityEvents,
    citySpecialists,
    regionEvents,
    regionSpecialists,
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

      regionLocationId
        ? getUpcomingPublishedEventsByLocationId(
            regionLocationId,
            locale as SupportedEventLocale,
            3,
          )
        : Promise.resolve([]),

      regionLocationId
        ? getPublishedSpecialistsByLocationId(
            regionLocationId,
            locale,
            3,
          )
        : Promise.resolve([]),

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

    city: {
      events:
        cityEvents,
      specialists:
        citySpecialists,
    },

    region: {
      events:
        regionEvents,
      specialists:
        regionSpecialists,
      communities,
    },

    localEditorial: {
      newsAvailable:
        false,
      guidesAvailable:
        false,
    },
  };
}
