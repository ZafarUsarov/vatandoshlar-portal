import { getDb } from "@/lib/db";
import {
  getPublicUserProfileCompletion,
} from "@/lib/users/profile-completion";

import type {
  Location,
  LocationStatus,
  LocationType,
} from "@/types/location";
import type {
  PublicUser,
  PublicUserContext,
  PublicUserProfile,
  PublicUserStatus,
  UserPreferredLocale,
  UserResidencyStage,
} from "@/types/user";

type PublicUserRow = {
  id: string;
  email: string;
  account_status: string;
  email_verified_at: string | Date | null;
  last_login_at: string | Date | null;
  created_at: string | Date;
  updated_at: string | Date;
};

type PublicUserProfileRow = {
  user_id: string;
  display_name: string | null;
  preferred_locale: string;
  home_location_id: string | null;
  residency_stage: string | null;
  created_at: string | Date;
  updated_at: string | Date;
};

type PublicUserContextRow =
  PublicUserRow & {
    profile_user_id: string | null;
    display_name: string | null;
    preferred_locale: string | null;
    home_location_id: string | null;
    residency_stage: string | null;
    profile_created_at: string | Date | null;
    profile_updated_at: string | Date | null;

    location_id: string | null;
    location_country_code: string | null;
    location_type: string | null;
    location_state_code: string | null;
    location_state_name: string | null;
    location_city_name: string | null;
    location_slug: string | null;
    location_parent_id: string | null;
    location_latitude: string | number | null;
    location_longitude: string | number | null;
    location_status: string | null;

    interests: string[] | null;
  };

function toDateTimeString(
  value: string | Date,
): string {
  return value instanceof Date
    ? value.toISOString()
    : value;
}

function toNullableDateTimeString(
  value: string | Date | null,
): string | null {
  if (value === null) {
    return null;
  }

  return toDateTimeString(
    value,
  );
}

function normalizeStatus(
  value: string,
): PublicUserStatus {
  if (
    value === "disabled" ||
    value === "deleted"
  ) {
    return value;
  }

  return "active";
}

function normalizeLocale(
  value: string | null,
): UserPreferredLocale {
  return value === "de"
    ? "de"
    : "uz";
}

function normalizeResidencyStage(
  value: string | null,
): UserResidencyStage | null {
  if (
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
  ) {
    return value;
  }

  return null;
}

function normalizeLocationType(
  value: string,
): LocationType {
  return value === "city"
    ? "city"
    : "state";
}

function normalizeLocationStatus(
  value: string,
): LocationStatus {
  return value === "inactive"
    ? "inactive"
    : "active";
}

function toNullableNumber(
  value: string | number | null,
): number | null {
  if (value === null) {
    return null;
  }

  const parsed =
    typeof value === "number"
      ? value
      : Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : null;
}

function toPublicUser(
  row: PublicUserRow,
): PublicUser {
  return {
    id:
      row.id,

    email:
      row.email,

    status:
      normalizeStatus(
        row.account_status,
      ),

    emailVerifiedAt:
      toNullableDateTimeString(
        row.email_verified_at,
      ),

    lastLoginAt:
      toNullableDateTimeString(
        row.last_login_at,
      ),

    createdAt:
      toDateTimeString(
        row.created_at,
      ),

    updatedAt:
      toDateTimeString(
        row.updated_at,
      ),
  };
}

function toPublicUserProfile(
  row: PublicUserProfileRow,
): PublicUserProfile {
  return {
    userId:
      row.user_id,

    displayName:
      row.display_name,

    preferredLocale:
      normalizeLocale(
        row.preferred_locale,
      ),

    homeLocationId:
      row.home_location_id,

    residencyStage:
      normalizeResidencyStage(
        row.residency_stage,
      ),

    createdAt:
      toDateTimeString(
        row.created_at,
      ),

    updatedAt:
      toDateTimeString(
        row.updated_at,
      ),
  };
}

function toHomeLocation(
  row: PublicUserContextRow,
): Location | null {
  if (
    !row.location_id ||
    !row.location_country_code ||
    !row.location_type ||
    !row.location_state_code ||
    !row.location_state_name ||
    !row.location_slug ||
    !row.location_status
  ) {
    return null;
  }

  return {
    id:
      row.location_id,

    countryCode:
      row.location_country_code,

    type:
      normalizeLocationType(
        row.location_type,
      ),

    stateCode:
      row.location_state_code,

    stateName:
      row.location_state_name,

    cityName:
      row.location_city_name,

    slug:
      row.location_slug,

    parentId:
      row.location_parent_id,

    latitude:
      toNullableNumber(
        row.location_latitude,
      ),

    longitude:
      toNullableNumber(
        row.location_longitude,
      ),

    status:
      normalizeLocationStatus(
        row.location_status,
      ),
  };
}

const publicUserSelect = `
  SELECT
    id::text,
    email,
    account_status,
    email_verified_at,
    last_login_at,
    created_at,
    updated_at
  FROM public_users
`;

const publicUserProfileSelect = `
  SELECT
    user_id::text,
    display_name,
    preferred_locale,
    home_location_id::text,
    residency_stage,
    created_at,
    updated_at
  FROM user_profiles
`;

export async function getPublicUserById(
  userId: string,
): Promise<PublicUser | null> {
  const result =
    await getDb().query<PublicUserRow>(
      `
        ${publicUserSelect}

        WHERE id = $1

        LIMIT 1
      `,
      [
        userId,
      ],
    );

  const row =
    result.rows[0];

  return row
    ? toPublicUser(row)
    : null;
}

export async function getPublicUserByEmail(
  email: string,
): Promise<PublicUser | null> {
  const normalizedEmail =
    email.trim().toLowerCase();

  const result =
    await getDb().query<PublicUserRow>(
      `
        ${publicUserSelect}

        WHERE email = $1

        LIMIT 1
      `,
      [
        normalizedEmail,
      ],
    );

  const row =
    result.rows[0];

  return row
    ? toPublicUser(row)
    : null;
}

export async function getPublicUserProfile(
  userId: string,
): Promise<PublicUserProfile | null> {
  const result =
    await getDb().query<PublicUserProfileRow>(
      `
        ${publicUserProfileSelect}

        WHERE user_id = $1

        LIMIT 1
      `,
      [
        userId,
      ],
    );

  const row =
    result.rows[0];

  return row
    ? toPublicUserProfile(row)
    : null;
}

export async function getPublicUserContext(
  userId: string,
): Promise<PublicUserContext | null> {
  const result =
    await getDb().query<PublicUserContextRow>(
      `
        SELECT
          u.id::text,
          u.email,
          u.account_status,
          u.email_verified_at,
          u.last_login_at,
          u.created_at,
          u.updated_at,

          p.user_id::text AS profile_user_id,
          p.display_name,
          p.preferred_locale,
          p.home_location_id::text,
          p.residency_stage,
          p.created_at AS profile_created_at,
          p.updated_at AS profile_updated_at,

          l.id::text AS location_id,
          l.country_code AS location_country_code,
          l.location_type AS location_type,
          l.state_code AS location_state_code,
          l.state_name AS location_state_name,
          l.city_name AS location_city_name,
          l.slug AS location_slug,
          l.parent_id::text AS location_parent_id,
          l.latitude AS location_latitude,
          l.longitude AS location_longitude,
          l.status AS location_status,

          COALESCE(
            ARRAY_AGG(
              i.interest_key
              ORDER BY i.interest_key
            ) FILTER (
              WHERE i.interest_key IS NOT NULL
            ),
            ARRAY[]::text[]
          ) AS interests

        FROM public_users u

        LEFT JOIN user_profiles p
          ON p.user_id = u.id

        LEFT JOIN locations l
          ON l.id = p.home_location_id
          AND l.location_type = 'city'
          AND l.status = 'active'

        LEFT JOIN user_interests i
          ON i.user_id = u.id

        WHERE u.id = $1

        GROUP BY
          u.id,
          p.user_id,
          l.id

        LIMIT 1
      `,
      [
        userId,
      ],
    );

  const row =
    result.rows[0];

  if (!row) {
    return null;
  }

  const profile =
    row.profile_user_id &&
    row.profile_created_at &&
    row.profile_updated_at
      ? toPublicUserProfile({
          user_id:
            row.profile_user_id,
          display_name:
            row.display_name,
          preferred_locale:
            row.preferred_locale ?? "uz",
          home_location_id:
            row.home_location_id,
          residency_stage:
            row.residency_stage,
          created_at:
            row.profile_created_at,
          updated_at:
            row.profile_updated_at,
        })
      : null;

  const interests =
    row.interests ?? [];

  return {
    user:
      toPublicUser(row),

    profile,

    homeLocation:
      toHomeLocation(row),

    interests,

    completion:
      getPublicUserProfileCompletion({
        profile,
        interests,
      }),
  };
}
