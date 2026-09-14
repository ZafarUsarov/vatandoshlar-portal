import { getDb } from "@/lib/db";

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

type InterestRow = { interest_key: string };

function toDateTimeString(value: string | Date): string {
  return value instanceof Date ? value.toISOString() : value;
}

function toNullableDateTimeString(value: string | Date | null): string | null {
  return value === null ? null : toDateTimeString(value);
}

function normalizeStatus(value: string): PublicUserStatus {
  if (value === "disabled" || value === "deleted") return value;
  return "active";
}

function normalizeLocale(value: string): UserPreferredLocale {
  return value === "de" ? "de" : "uz";
}

function normalizeResidencyStage(value: string | null): UserResidencyStage | null {
  if (
    value === "planning_move" ||
    value === "new_arrival" ||
    value === "settling_in" ||
    value === "long_term_resident" ||
    value === "citizen" ||
    value === "prefer_not_to_say"
  ) return value;
  return null;
}

function toPublicUser(row: PublicUserRow): PublicUser {
  return {
    id: row.id,
    email: row.email,
    status: normalizeStatus(row.account_status),
    emailVerifiedAt: toNullableDateTimeString(row.email_verified_at),
    lastLoginAt: toNullableDateTimeString(row.last_login_at),
    createdAt: toDateTimeString(row.created_at),
    updatedAt: toDateTimeString(row.updated_at),
  };
}

function toPublicUserProfile(row: PublicUserProfileRow): PublicUserProfile {
  return {
    userId: row.user_id,
    displayName: row.display_name,
    preferredLocale: normalizeLocale(row.preferred_locale),
    homeLocationId: row.home_location_id,
    residencyStage: normalizeResidencyStage(row.residency_stage),
    createdAt: toDateTimeString(row.created_at),
    updatedAt: toDateTimeString(row.updated_at),
  };
}

const publicUserSelect = `
  SELECT
    id::text, email, account_status, email_verified_at, last_login_at, created_at, updated_at
  FROM public_users
`;

const publicUserProfileSelect = `
  SELECT
    user_id::text, display_name, preferred_locale, home_location_id::text, residency_stage, created_at, updated_at
  FROM user_profiles
`;

export async function getPublicUserById(userId: string): Promise<PublicUser | null> {
  const result = await getDb().query<PublicUserRow>(
    `${publicUserSelect} WHERE id = $1 LIMIT 1`,
    [userId],
  );
  const row = result.rows[0];
  return row ? toPublicUser(row) : null;
}

export async function getPublicUserByEmail(email: string): Promise<PublicUser | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const result = await getDb().query<PublicUserRow>(
    `${publicUserSelect} WHERE email = $1 LIMIT 1`,
    [normalizedEmail],
  );
  const row = result.rows[0];
  return row ? toPublicUser(row) : null;
}

export async function getPublicUserProfile(userId: string): Promise<PublicUserProfile | null> {
  const result = await getDb().query<PublicUserProfileRow>(
    `${publicUserProfileSelect} WHERE user_id = $1 LIMIT 1`,
    [userId],
  );
  const row = result.rows[0];
  return row ? toPublicUserProfile(row) : null;
}

export async function getPublicUserContext(userId: string): Promise<PublicUserContext | null> {
  const user = await getPublicUserById(userId);
  if (!user) return null;

  const profile = await getPublicUserProfile(userId);
  const interestsResult = await getDb().query<InterestRow>(
    `SELECT interest_key FROM user_interests WHERE user_id = $1 ORDER BY interest_key ASC`,
    [userId],
  );

  return {
    user,
    profile,
    interests: interestsResult.rows.map((row) => row.interest_key),
  };
}
