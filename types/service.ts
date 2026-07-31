export type ServiceCategory =
  | "Tarjima"
  | "Huquq"
  | "Soliq"
  | "Tibbiyot"
  | "Hunarmandchilik"
  | "Iste’molchi huquqlari";

export type ServiceItem = {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: ServiceCategory;
  icon: string;
  services: string[];
  verificationSteps: string[];
  importantNotes: string[];
  officialSourceName: string;
  officialSourceUrl: string;
  sourceDescription: string;
  location: string;
  featured?: boolean;
};