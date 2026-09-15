import { getDb } from "@/lib/db";
import { userInterestKeys, type UserInterestKey } from "@/lib/users/profile-options";
import type { UserPreferredLocale, UserResidencyStage } from "@/types/user";

export class InvalidHomeLocationError extends Error {
  constructor() {
    super("Selected home location is not a valid active city.");
    this.name = "InvalidHomeLocationError";
  }
}

type UpdateProfileInput = Readonly<{
  userId: string;
  displayName: string | null;
  preferredLocale: UserPreferredLocale;
  homeLocationId: string | null;
  residencyStage: UserResidencyStage | null;
  interests: ReadonlyArray<UserInterestKey>;
}>;

function isAllowedInterest(value: string): value is UserInterestKey {
  return (userInterestKeys as readonly string[]).includes(value);
}

export async function updatePublicUserProfile(input: UpdateProfileInput): Promise<void> {
  const client = await getDb().connect();

  try {
    await client.query("BEGIN");

    if (input.homeLocationId) {
      const locationResult = await client.query<{ id: string }>(
        `
          SELECT id::text
          FROM locations
          WHERE id = $1
            AND location_type = 'city'
            AND status = 'active'
          LIMIT 1
        `,
        [input.homeLocationId],
      );

      if (!locationResult.rows[0]) {
        throw new InvalidHomeLocationError();
      }
    }

    await client.query(
      `
        INSERT INTO user_profiles (
          user_id, display_name, preferred_locale,
          home_location_id, residency_stage, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, NOW())
        ON CONFLICT (user_id)
        DO UPDATE SET
          display_name = EXCLUDED.display_name,
          preferred_locale = EXCLUDED.preferred_locale,
          home_location_id = EXCLUDED.home_location_id,
          residency_stage = EXCLUDED.residency_stage,
          updated_at = NOW()
      `,
      [
        input.userId,
        input.displayName,
        input.preferredLocale,
        input.homeLocationId,
        input.residencyStage,
      ],
    );

    await client.query("DELETE FROM user_interests WHERE user_id = $1", [input.userId]);

    for (const interestKey of [...new Set(input.interests)].filter(isAllowedInterest)) {
      await client.query(
        `
          INSERT INTO user_interests (user_id, interest_key)
          VALUES ($1, $2)
          ON CONFLICT (user_id, interest_key) DO NOTHING
        `,
        [input.userId, interestKey],
      );
    }

    await client.query("COMMIT");
  } catch (error) {
    try { await client.query("ROLLBACK"); } catch {}
    throw error;
  } finally {
    client.release();
  }
}
