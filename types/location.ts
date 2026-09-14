export type LocationType =
  | "state"
  | "city";

export type LocationStatus =
  | "active"
  | "inactive";

export type Location = Readonly<{
  id: string;

  countryCode: string;
  type: LocationType;

  stateCode: string;
  stateName: string;
  cityName: string | null;

  slug: string;
  parentId: string | null;

  latitude: number | null;
  longitude: number | null;

  status: LocationStatus;
}>;
