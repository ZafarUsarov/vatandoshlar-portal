/** Vacancy data is intentionally separate from the existing job-guide content. */
export type VacancyKind = "external" | "partner" | "managed";
export type VacancyEmployment = "Vollzeit" | "Teilzeit" | "Minijob" | "Ausbildung" | "Werkstudent" | "Praktikum" | "Sonstige";
export type VacancyWorkMode = "remote" | "hybrid" | "onsite";
export type VacancyStatus = "open" | "closed";
export type Vacancy = Readonly<{
  id: string;
  slug: string;
  kind: VacancyKind;
  status: VacancyStatus;
  title: string;
  company: string;
  city: string;
  employment: VacancyEmployment;
  workMode: VacancyWorkMode;
  publishedAt: string;
  salary?: string;
  summary: string;
  responsibilities: readonly string[];
  requirements: readonly string[];
  benefits: readonly string[];
  /** Required for external postings; verified destination owned by the employer. */
  applicationUrl?: string;
  /** Managed/partner applications will be integrated only after an approved workflow exists. */
  applicationMethod: "external" | "contact" | "internal-pending";
  featured?: boolean;
  sponsored?: boolean;
}>;

/** Only verified, approved vacancies should be published here. No demo records in production. */
export const publishedVacancies: readonly Vacancy[] = [];
