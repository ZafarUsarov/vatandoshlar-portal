/** M18.1 domain vocabulary. Not yet wired to public routes or database queries. */
export const TRAVEL_LISTING_KINDS = [
  "ride_offer",
  "ride_request",
  "companion_request",
  "companion_offer",
  "parcel_request",
  "parcel_offer",
] as const;
export type TravelListingKind = (typeof TRAVEL_LISTING_KINDS)[number];

export const TRAVEL_TRANSPORT_MODES = ["car", "plane", "train", "bus", "other"] as const;
export type TravelTransportMode = (typeof TRAVEL_TRANSPORT_MODES)[number];

export const TRAVEL_LISTING_STATUSES = ["draft", "published", "hidden", "closed", "removed"] as const;
export type TravelListingStatus = (typeof TRAVEL_LISTING_STATUSES)[number];

export type TravelListing = Readonly<{
  id: string;
  authorUserId: string;
  slug: string;
  kind: TravelListingKind;
  status: TravelListingStatus;
  contentLanguage: "uz" | "de";
  title: string;
  description: string;
  womenOnly: boolean;
  transportMode: TravelTransportMode;
  originCountryCode: string;
  originCity: string;
  originRegionCode: string | null;
  destinationRegionCode: string | null;
  destinationCountryCode: string;
  destinationCity: string;
  departureAt: string;
  departureTimezone: string;
  arrivalAt: string | null;
  flightNumber: string | null;
  transitDetails: string | null;
  seatsAvailable: number | null;
  passengerCount: number | null;
  parcelStructured: import("@/lib/travel/parcel-details").ParcelDetails | null;
  companionDetails: import("@/lib/travel/companion-details").CompanionDetails | null;
  assistanceDetails: string | null;
  parcelDetails: string | null;
  priceAmount: string | null;
  priceCurrency: string | null;
  imageKey: string | null;
  imageThumbKey: string | null;
  publishedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}>;
