import type {
  Location,
} from "@/types/location";
import type {
  PublicUserContext,
  UserPreferredLocale,
  UserResidencyStage,
} from "@/types/user";

export type MyCityUserContext = Readonly<{
  userId: string;
  locale: UserPreferredLocale;

  displayName: string | null;

  homeLocation: Location | null;
  residencyStage: UserResidencyStage | null;

  interests: ReadonlyArray<string>;

  profileComplete: boolean;
}>;

export function toMyCityUserContext(
  context: PublicUserContext,
): MyCityUserContext {
  return {
    userId:
      context.user.id,

    locale:
      context.profile?.preferredLocale ??
      "uz",

    displayName:
      context.profile?.displayName ??
      null,

    homeLocation:
      context.homeLocation,

    residencyStage:
      context.profile?.residencyStage ??
      null,

    interests:
      context.interests,

    profileComplete:
      context.completion.isComplete,
  };
}
