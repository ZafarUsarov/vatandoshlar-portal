import type {
  LocalizedSpecialist,
  Specialist,
  SupportedLocale,
} from "@/types/specialist";

/**
 * Only real and reviewed specialist profiles belong in this array.
 * Do not add example people or unverified contact details.
 */
export const specialists: ReadonlyArray<Specialist> = [];

export function localizeSpecialist(
  specialist: Specialist,
  locale: SupportedLocale,
): LocalizedSpecialist {
  return {
    ...specialist,
    profession: specialist.profession[locale],
    shortDescription: specialist.shortDescription[locale],
    services: specialist.services.map(
      (service) => service[locale],
    ),
  };
}

export function getFeaturedSpecialists(
  locale: SupportedLocale,
  limit = 3,
): ReadonlyArray<LocalizedSpecialist> {
  return specialists
    .filter(
      (specialist) =>
        specialist.status.featured &&
        specialist.status.verified,
    )
    .slice(0, limit)
    .map((specialist) =>
      localizeSpecialist(specialist, locale),
    );
}

export function getSpecialistBySlug(
  slug: string,
  locale: SupportedLocale,
): LocalizedSpecialist | undefined {
  const specialist = specialists.find(
    (item) => item.slug === slug,
  );

  return specialist
    ? localizeSpecialist(specialist, locale)
    : undefined;
}
