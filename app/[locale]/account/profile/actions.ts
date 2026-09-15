"use server";

import { redirect } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";
import {
  userInterestKeys,
  type UserInterestKey,
} from "@/lib/users/profile-options";
import { updatePublicUserProfile } from "@/lib/users/profile-repository";
import type { UserResidencyStage } from "@/types/user";

export type ProfileSetupState = Readonly<{
  error: string | null;
}>;

export const initialProfileSetupState: ProfileSetupState = {
  error: null,
};

function getLocale(formData: FormData): "uz" | "de" {
  return formData.get("locale") === "de" ? "de" : "uz";
}

function clean(
  value: FormDataEntryValue | null,
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed ? trimmed : null;
}

function isResidencyStage(
  value: string | null,
): value is UserResidencyStage {
  return (
    value === "planning_move" ||
    value === "new_arrival" ||
    value === "settling_in" ||
    value === "citizen" ||
    value === "planning_germany" ||
    value === "au_pair" ||
    value === "fsj_bfd" ||
    value === "language_course" ||
    value === "ausbildung" ||
    value === "bachelor" ||
    value === "master" ||
    value === "phd" ||
    value === "internship" ||
    value === "skilled_worker" ||
    value === "employed" ||
    value === "entrepreneur" ||
    value === "family" ||
    value === "long_term_resident" ||
    value === "other" ||
    value === "prefer_not_to_say"
  );
}

function isInterestKey(
  value: string,
): value is UserInterestKey {
  return (
    userInterestKeys as readonly string[]
  ).includes(value);
}

export async function saveProfileSetupAction(
  _previousState: ProfileSetupState,
  formData: FormData,
): Promise<ProfileSetupState> {
  const locale = getLocale(formData);

  const context = await requirePublicUser(locale);

  const displayName = clean(
    formData.get("displayName"),
  );

  const homeLocationId = clean(
    formData.get("homeLocationId"),
  );

  const residencyStageValue = clean(
    formData.get("residencyStage"),
  );

  const interests = formData
    .getAll("interests")
    .filter(
      (value): value is string =>
        typeof value === "string",
    )
    .filter(isInterestKey);

  if (
    displayName &&
    displayName.length > 80
  ) {
    return {
      error:
        locale === "de"
          ? "Der Name darf höchstens 80 Zeichen lang sein."
          : "Ism 80 ta belgidan oshmasligi kerak.",
    };
  }

  if (
    residencyStageValue !== null &&
    !isResidencyStage(residencyStageValue)
  ) {
    return {
      error:
        locale === "de"
          ? "Bitte wählen Sie eine gültige Lebenssituation."
          : "To‘g‘ri hayot holatini tanlang.",
    };
  }

  const residencyStage: UserResidencyStage | null =
    residencyStageValue === null
      ? null
      : residencyStageValue;

  try {
    await updatePublicUserProfile({
      userId: context.user.id,
      displayName,
      preferredLocale: locale,
      homeLocationId,
      residencyStage,
      interests,
    });
  } catch (error) {
    console.error(
      "Failed to update public user profile.",
      error,
    );

    return {
      error:
        locale === "de"
          ? "Profil konnte nicht gespeichert werden."
          : "Profilni saqlab bo‘lmadi.",
    };
  }

  return redirect({
    href: "/account",
    locale,
  });
}