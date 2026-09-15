"use server";

import { requirePublicUser } from "@/lib/auth/user";
import {
  residencyStageOptions,
  userInterestKeys,
  type UserInterestKey,
} from "@/lib/users/profile-options";
import {
  InvalidHomeLocationError,
  updatePublicUserProfile,
} from "@/lib/users/profile-repository";
import type {
  CanonicalUserResidencyStage,
  LegacyUserResidencyStage,
  UserResidencyStage,
} from "@/types/user";

export type ProfileSetupState = Readonly<{
  error: string | null;
  success: string | null;
}>;

function getLocale(formData: FormData): "uz" | "de" {
  return formData.get("locale") === "de" ? "de" : "uz";
}

function clean(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function isCanonicalResidencyStage(
  value: string,
): value is CanonicalUserResidencyStage {
  return residencyStageOptions.some((option) => option.value === value);
}

function isLegacyResidencyStage(
  value: UserResidencyStage | null | undefined,
): value is LegacyUserResidencyStage {
  return (
    value === "planning_move" ||
    value === "new_arrival" ||
    value === "settling_in" ||
    value === "citizen"
  );
}

function isInterestKey(value: string): value is UserInterestKey {
  return (userInterestKeys as readonly string[]).includes(value);
}

export async function saveProfileSetupAction(
  _previousState: ProfileSetupState,
  formData: FormData,
): Promise<ProfileSetupState> {
  const locale = getLocale(formData);

  try {
    const context = await requirePublicUser(locale);
    const displayName = clean(formData.get("displayName"));
    const homeLocationId = clean(formData.get("homeLocationId"));
    const residencyStageValue = clean(formData.get("residencyStage"));
    const residencyStageTouched = formData.get("residencyStageTouched") === "1";

    const interests = formData
      .getAll("interests")
      .filter((value): value is string => typeof value === "string")
      .filter(isInterestKey);

    if (displayName && displayName.length > 80) {
      return {
        error: locale === "de"
          ? "Der Name darf höchstens 80 Zeichen lang sein."
          : "Ism 80 ta belgidan oshmasligi kerak.",
        success: null,
      };
    }

    let residencyStage: UserResidencyStage | null = null;

    if (residencyStageValue !== null) {
      if (!isCanonicalResidencyStage(residencyStageValue)) {
        return {
          error: locale === "de"
            ? "Bitte wählen Sie eine gültige Lebenssituation."
            : "To‘g‘ri hayot holatini tanlang.",
          success: null,
        };
      }
      residencyStage = residencyStageValue;
    } else if (
      !residencyStageTouched &&
      isLegacyResidencyStage(context.profile?.residencyStage)
    ) {
      // A legacy value is intentionally not rendered as a selectable option.
      // Preserve it on an unchanged save until the user explicitly chooses
      // a canonical value or clears the field.
      residencyStage = context.profile.residencyStage;
    }

    await updatePublicUserProfile({
      userId: context.user.id,
      displayName,
      preferredLocale: locale,
      homeLocationId,
      residencyStage,
      interests,
    });

    return {
      error: null,
      success: locale === "de" ? "Profil gespeichert." : "Profil saqlandi.",
    };
  } catch (error) {
    console.error("Failed to update public user profile.", error);

    if (error instanceof InvalidHomeLocationError) {
      return {
        error: locale === "de"
          ? "Bitte wählen Sie einen gültigen Wohnort."
          : "To‘g‘ri yashash joyini tanlang.",
        success: null,
      };
    }

    return {
      error: locale === "de"
        ? "Profil konnte nicht gespeichert werden. Bitte versuchen Sie es erneut."
        : "Profilni saqlab bo‘lmadi. Iltimos, qayta urinib ko‘ring.",
      success: null,
    };
  }
}
