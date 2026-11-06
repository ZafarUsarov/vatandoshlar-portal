export type PlaceExtra = {
  manager?: string;
  owner?: string;
  instagram?: string;
  email?: string;
  phone?: string;
  websiteLabelUz?: string;
  websiteLabelDe?: string;
  branches?: readonly { name: string; address: string }[];
};

const extras: Record<string, PlaceExtra> = {
  "polar-dent": {
    phone: "+498954803093",
  },

  "bildung-beruf": {
    phone: "+498319606650",
  },
  "marakand-restaurant": {
    phone: "+4982147016321",
    owner: "Omatjon Azizov",
    instagram: "https://www.instagram.com/marakand_augsburg/",
    email: "marakand.restaurant@gmail.com",
  },
  "dill-vegan": {
    phone: "+4982147013829",
    owner: "Omatjon Azizov",
    instagram: "https://www.instagram.com/dill_vegan/",
    email: "info@dill-vegan.de",
  },
  "uzb-sprachzentrum": {
    phone: "+493028619007",
    email: "info@uzb-schule.de",
  },
  "davra-ev": {
    phone: "+493028619007",
    email: "info@davra-ev.de",
  },
  "taste-of-samarkand": {
    phone: "+493036444426",
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
