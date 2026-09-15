import type {
  CanonicalUserResidencyStage,
} from "@/types/user";

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

export type UserInterestKey =
  (typeof userInterestKeys)[number];

export const residencyStageOptions = [
  {
    value: "planning_germany",
    uz: "Germaniyaga kelishni rejalashtiryapman",
    de: "Ich plane, nach Deutschland zu kommen",
  },
  {
    value: "au_pair",
    uz: "Au-pair",
    de: "Au-pair",
  },
  {
    value: "fsj_bfd",
    uz: "FSJ / BFD",
    de: "FSJ / BFD",
  },
  {
    value: "language_course",
    uz: "Til kursi",
    de: "Sprachkurs",
  },
  {
    value: "ausbildung",
    uz: "Ausbildung",
    de: "Ausbildung",
  },
  {
    value: "bachelor",
    uz: "Bakalavr",
    de: "Bachelor",
  },
  {
    value: "master",
    uz: "Magistr / Master",
    de: "Master",
  },
  {
    value: "phd",
    uz: "PhD / Doktorantura",
    de: "PhD / Promotion",
  },
  {
    value: "internship",
    uz: "Praktikum",
    de: "Praktikum",
  },
  {
    value: "skilled_worker",
    uz: "Ishchi viza / Malakali mutaxassis",
    de: "Arbeitsvisum / Fachkraft",
  },
  {
    value: "employed",
    uz: "Ishlayman",
    de: "Ich arbeite",
  },
  {
    value: "entrepreneur",
    uz: "Tadbirkorman",
    de: "Ich bin selbstständig",
  },
  {
    value: "family",
    uz: "Oila bilan yashayman",
    de: "Ich lebe mit meiner Familie",
  },
  {
    value: "long_term_resident",
    uz: "Germaniyada anchadan beri yashayman",
    de: "Ich lebe schon länger in Deutschland",
  },
  {
    value: "other",
    uz: "Boshqa",
    de: "Andere Situation",
  },
  {
    value: "prefer_not_to_say",
    uz: "Ko‘rsatishni istamayman",
    de: "Möchte ich nicht angeben",
  },
] as const satisfies ReadonlyArray<{
  value: CanonicalUserResidencyStage;
  uz: string;
  de: string;
}>;

export const interestOptions = [
  {
    value: "career",
    uz: "Ish va karera",
    de: "Arbeit und Karriere",
  },
  {
    value: "education",
    uz: "Ta’lim va o‘qish",
    de: "Bildung und Studium",
  },
  {
    value: "family",
    uz: "Oila va bolalar",
    de: "Familie und Kinder",
  },
  {
    value: "business",
    uz: "Biznes va tadbirkorlik",
    de: "Business und Unternehmertum",
  },
  {
    value: "language",
    uz: "Nemis tili",
    de: "Deutsch lernen",
  },
  {
    value: "events",
    uz: "Tadbirlar",
    de: "Veranstaltungen",
  },
  {
    value: "community",
    uz: "Hamjamiyat",
    de: "Community",
  },
  {
    value: "daily-life",
    uz: "Kundalik hayot",
    de: "Alltag",
  },
] as const;
