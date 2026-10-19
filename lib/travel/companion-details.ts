export const companionHelp = ["orientation", "checkin", "transfer", "onboard", "translation", "pickup", "other"] as const;
export type CompanionHelp = typeof companionHelp[number];
export const companionHelpLabels: Record<CompanionHelp, {uz:string;de:string}> = {
 orientation:{uz:"Aeroportda yo‘l ko‘rsatish",de:"Orientierung am Flughafen"},
 checkin:{uz:"Ro‘yxatdan o‘tishda yordam",de:"Hilfe beim Check-in"},
 transfer:{uz:"Tranzitda boshqa reysga o‘tish",de:"Hilfe beim Umsteigen"},
 onboard:{uz:"Samolyotda hamrohlik",de:"Begleitung im Flugzeug"},
 translation:{uz:"Til yoki tarjima bo‘yicha yordam",de:"Sprach- oder Übersetzungshilfe"},
 pickup:{uz:"Aeroportda kutib olish yoki kuzatish",de:"Abholen oder Begleiten am Flughafen"},
 other:{uz:"Boshqa yordam",de:"Sonstige Hilfe"},
};
export const companionRelationships = ["self", "parents", "relative", "acquaintance", "other"] as const;
export const companionRelationshipLabels: Record<typeof companionRelationships[number],{uz:string;de:string}> = {
 self:{uz:"O‘zimga",de:"Für mich"}, parents:{uz:"Ota-onamga",de:"Für meine Eltern"}, relative:{uz:"Qarindoshimga",de:"Für Verwandte"}, acquaintance:{uz:"Tanishimga",de:"Für Bekannte"}, other:{uz:"Boshqa",de:"Sonstige"},
};
export type CompanionDetails = { relationship: typeof companionRelationships[number] | null; originAirport: string | null; destinationAirport: string | null; flightType: "direct" | "transit"; transitAirports: string[]; departureTimeKnown: boolean; arrivalAt: string | null; airline: string | null; helpTypes: CompanionHelp[]; };
export function parseCompanionDetails(value: unknown): CompanionDetails | null {
 if (!value || typeof value !== "object" || Array.isArray(value)) return null;
 const o = value as Record<string,unknown>;
 if ((o.flightType !== "direct" && o.flightType !== "transit") || !Array.isArray(o.transitAirports) || !Array.isArray(o.helpTypes)) return null;
 return {relationship: typeof o.relationship === "string" && companionRelationships.includes(o.relationship as typeof companionRelationships[number]) ? o.relationship as CompanionDetails["relationship"] : null,
 originAirport: typeof o.originAirport === "string" ? o.originAirport : null, destinationAirport: typeof o.destinationAirport === "string" ? o.destinationAirport : null,
 flightType:o.flightType, transitAirports:o.transitAirports.filter((x):x is string => typeof x === "string"),
 departureTimeKnown:o.departureTimeKnown === true, arrivalAt:typeof o.arrivalAt === "string" ? o.arrivalAt : null,
 airline:typeof o.airline === "string" ? o.airline : null, helpTypes:o.helpTypes.filter((x):x is CompanionHelp => typeof x === "string" && companionHelp.includes(x as CompanionHelp))};
}
