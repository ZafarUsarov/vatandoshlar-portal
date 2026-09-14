import type {
  PublicUserProfile,
  PublicUserProfileCompletion,
} from "@/types/user";

type ProfileCompletionInput = Readonly<{
  profile: PublicUserProfile | null;
  interests: ReadonlyArray<string>;
}>;

export function getPublicUserProfileCompletion({
  profile,
  interests,
}: ProfileCompletionInput): PublicUserProfileCompletion {
  const hasDisplayName =
    Boolean(
      profile?.displayName?.trim(),
    );

  const hasHomeLocation =
    Boolean(
      profile?.homeLocationId,
    );

  const hasResidencyStage =
    Boolean(
      profile?.residencyStage,
    );

  const hasInterests =
    interests.length > 0;

  const completedFields =
    [
      hasDisplayName,
      hasHomeLocation,
      hasResidencyStage,
      hasInterests,
    ].filter(Boolean).length;

  const totalFields = 4;

  return {
    isComplete:
      completedFields === totalFields,

    completedFields,
    totalFields,

    hasDisplayName,
    hasHomeLocation,
    hasResidencyStage,
    hasInterests,
  };
}
