import { getDb } from "@/lib/db";

import type {
  Location,
  LocationStatus,
  LocationType,
} from "@/types/location";

type LocationRow = {
  id: string;
  country_code: string;
  location_type: string;
  state_code: string;
  state_name: string;
  city_name: string | null;
  slug: string;
  parent_id: string | null;
  latitude: string | number | null;
  longitude: string | number | null;
  status: string;
};

const locationSelect = `
  SELECT
    id::text,
    country_code,
    location_type,
    state_code,
    state_name,
    city_name,
    slug,
    parent_id::text,
    latitude,
    longitude,
    status
  FROM locations
`;

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

function toLocation(
  row: LocationRow,
): Location {
  return {
    id: row.id,
    countryCode: row.country_code,
    type: normalizeLocationType(row.location_type),
    stateCode: row.state_code,
    stateName: row.state_name,
    cityName: row.city_name,
    slug: row.slug,
    parentId: row.parent_id,
    latitude: toNullableNumber(row.latitude),
    longitude: toNullableNumber(row.longitude),
    status: normalizeLocationStatus(row.status),
  };
}

export async function getActiveFederalStates(): Promise<
  ReadonlyArray<Location>
> {
  const result =
    await getDb().query<LocationRow>(
      `
        ${locationSelect}
        WHERE
          status = 'active'
          AND location_type = 'state'
          AND country_code = 'DE'
        ORDER BY
          state_name ASC,
          id ASC
      `,
    );

  return result.rows.map(toLocation);
}


export async function getActiveProfileLocations(): Promise<
  ReadonlyArray<Location>
> {
  const result =
    await getDb().query<LocationRow>(
      `
        ${locationSelect}
        WHERE
          status = 'active'
          AND country_code IN ('DE', 'UZ')
        ORDER BY
          country_code ASC,
          location_type DESC,
          state_name ASC,
          city_name ASC NULLS FIRST,
          id ASC
      `,
    );

  return result.rows.map(toLocation);
}

export async function getActiveCities(): Promise<
  ReadonlyArray<Location>
> {
  const result =
    await getDb().query<LocationRow>(
      `
        ${locationSelect}
        WHERE
          status = 'active'
          AND location_type = 'city'
        ORDER BY
          city_name ASC,
          state_name ASC,
          id ASC
      `,
    );

  return result.rows.map(toLocation);
}

export async function getActiveCitiesByStateCode(
  stateCode: string,
): Promise<ReadonlyArray<Location>> {
  const result =
    await getDb().query<LocationRow>(
      `
        ${locationSelect}
        WHERE
          status = 'active'
          AND location_type = 'city'
          AND state_code = $1
        ORDER BY
          city_name ASC,
          id ASC
      `,
      [stateCode],
    );

  return result.rows.map(toLocation);
}

export async function getActiveLocationBySlug(
  slug: string,
): Promise<Location | null> {
  const result =
    await getDb().query<LocationRow>(
      `
        ${locationSelect}
        WHERE
          status = 'active'
          AND slug = $1
        LIMIT 1
      `,
      [slug],
    );

  const row = result.rows[0];

  return row
    ? toLocation(row)
    : null;
}
