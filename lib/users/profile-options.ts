import type { UserResidencyStage } from "@/types/user";

export const userInterestKeys = [
  "career",
  "education",
  "family",
  "business",
  "language",
  "events",
  "community",
  "daily-life",
] as const;

export type UserInterestKey = (typeof userInterestKeys)[number];

export const residencyStageOptions = [
  { value: "planning_move", uz: "Germaniyaga kelishni rejalashtiryapman", de: "Ich plane meinen Umzug nach Deutschland" },
  { value: "new_arrival", uz: "Yaqinda Germaniyaga keldim", de: "Ich bin neu in Deutschland" },
  { value: "settling_in", uz: "Germaniyada yashashga moslashyapman", de: "Ich lebe mich in Deutschland ein" },
  { value: "long_term_resident", uz: "Germaniyada anchadan beri yashayman", de: "Ich lebe schon länger in Deutschland" },
  { value: "citizen", uz: "Germaniya fuqarosiman", de: "Ich bin deutscher Staatsbürger" },
  { value: "prefer_not_to_say", uz: "Ko‘rsatishni istamayman", de: "Möchte ich nicht angeben" },
] as const satisfies ReadonlyArray<{
  value: UserResidencyStage;
  uz: string;
  de: string;
}>;

export const interestOptions = [
  { value: "career", uz: "Ish va karera", de: "Arbeit und Karriere" },
  { value: "education", uz: "Ta’lim va o‘qish", de: "Bildung und Studium" },
  { value: "family", uz: "Oila va bolalar", de: "Familie und Kinder" },
  { value: "business", uz: "Biznes va tadbirkorlik", de: "Business und Unternehmertum" },
  { value: "language", uz: "Nemis tili", de: "Deutsch lernen" },
  { value: "events", uz: "Tadbirlar", de: "Veranstaltungen" },
  { value: "community", uz: "Hamjamiyat", de: "Community" },
  { value: "daily-life", uz: "Kundalik hayot", de: "Alltag" },
] as const;
