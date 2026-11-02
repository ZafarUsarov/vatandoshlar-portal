export type PlaceExtra = {
  manager?: string;
  instagram?: string;
  email?: string;
  websiteLabelUz?: string;
  websiteLabelDe?: string;
  branches?: readonly { name: string; address: string }[];
};

const extras: Record<string, PlaceExtra> = {
  "taste-of-samarkand": {
    manager: "Aktam Makhmaziiatov",
    instagram: "https://www.instagram.com/tasteofsamarkand_berlin/",
    email: "tasteofsamarkandcooperation@gmail.com",
    websiteLabelUz: "Onlayn menyu",
    websiteLabelDe: "Online-Speisekarte",
    branches: [
      { name: "Kreuzberg", address: "Oranienstraße 187, Berlin" },
      { name: "Westend", address: "Reichsstraße 87, Berlin" },
    ],
  },
};

export function getPlaceExtra(slug: string): PlaceExtra | null {
  return extras[slug] ?? null;
}
