import type { TravelListingKind, TravelTransportMode } from "@/types/travel";
export const travelKinds: Record<TravelListingKind, { uz: string; de: string }> = {
  ride_offer: { uz: "Safar taklif qilaman", de: "Mitfahrt anbieten" },
  ride_request: { uz: "Safar qidiraman", de: "Mitfahrt suchen" },
  companion_request: { uz: "Hamroh qidiraman", de: "Reisebegleitung suchen" },
  companion_offer: { uz: "Hamroh bo‘la olaman", de: "Reisebegleitung anbieten" },
  parcel_request: { uz: "Jo‘natma yuboraman", de: "Sendung verschicken" },
  parcel_offer: { uz: "Jo‘natma olib ketaman", de: "Sendung mitnehmen" },
};
export const travelModes: Record<TravelTransportMode, { uz: string; de: string }> = {
  car: { uz: "Avtomobil", de: "Auto" }, plane: { uz: "Samolyot", de: "Flugzeug" },
  train: { uz: "Poyezd", de: "Zug" }, bus: { uz: "Avtobus", de: "Bus" },
  other: { uz: "Boshqa", de: "Sonstiges" },
};
