/** Structured parcel metadata; older listings without this field remain readable. */
export const parcelCargoTypes = ["parcel", "documents", "both"] as const;
export const parcelPaymentTypes = ["paid", "free", "negotiable"] as const;
export type ParcelDetails = Readonly<{
 cargoType: typeof parcelCargoTypes[number]; paymentType: typeof parcelPaymentTypes[number];
 flexibleDate: boolean; weightKg: number | null; dimensions: string | null; handover: string | null;
}>;
export function parseParcelDetails(raw: unknown): ParcelDetails | null {
 if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
 const v = raw as Record<string, unknown>;
 if (!parcelCargoTypes.includes(v.cargoType as ParcelDetails["cargoType"]) || !parcelPaymentTypes.includes(v.paymentType as ParcelDetails["paymentType"])) return null;
 return { cargoType: v.cargoType as ParcelDetails["cargoType"], paymentType: v.paymentType as ParcelDetails["paymentType"], flexibleDate: v.flexibleDate === true,
 weightKg: typeof v.weightKg === "number" && Number.isFinite(v.weightKg) && v.weightKg > 0 ? v.weightKg : null,
 dimensions: typeof v.dimensions === "string" ? v.dimensions : null, handover: typeof v.handover === "string" ? v.handover : null };
}
export const parcelCargoLabels = { parcel:{uz:"Yuk",de:"Paket"}, documents:{uz:"Hujjat",de:"Dokumente"}, both:{uz:"Yuk va hujjat",de:"Paket und Dokumente"} } as const;
export const parcelPaymentLabels = { paid:{uz:"To‘lovli",de:"Kostenpflichtig"}, free:{uz:"Bepul",de:"Kostenlos"}, negotiable:{uz:"Narx kelishiladi",de:"Preis verhandelbar"} } as const;
