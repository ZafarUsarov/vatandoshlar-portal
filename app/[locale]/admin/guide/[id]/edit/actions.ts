"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  adminGuideCategorySlugs,
  updateAdminGuideArticle,
  type AdminGuideArticleInput,
  type AdminGuideCategorySlug,
  type AdminGuideFact,
  type AdminGuideFaq,
  type AdminGuideSection,
  type AdminGuideSource,
  type AdminGuideStep,
} from "@/lib/guide/admin-guide-repository";

export type GuideEditActionState = {
  error: string | null;
};

function getString(
  formData: FormData,
  key: string,
): string {
  const value =
    formData.get(key);

  return typeof value === "string"
    ? value.trim()
    : "";
}

function normalizeSlug(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(
      /[^a-z0-9-]+/g,
      "-",
    )
    .replace(
      /-{2,}/g,
      "-",
    )
    .replace(
      /^-|-$/g,
      "",
    );
}

function isCategorySlug(
  value: string,
): value is AdminGuideCategorySlug {
  return adminGuideCategorySlugs.includes(
    value as AdminGuideCategorySlug,
  );
}

function isIsoDate(
  value: string,
): boolean {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(
      value,
    )
  ) {
    return false;
  }

  return !Number.isNaN(
    new Date(
      `${value}T12:00:00Z`,
    ).getTime(),
  );
}

function splitLines(
  value: string,
): string[] {
  return value
    .split(/\r?\n/)
    .map(
      (line) =>
        line.trim(),
    )
    .filter(Boolean);
}

function parsePairLines(
  value: string,
  itemName: string,
): Array<[string, string]> {
  return splitLines(
    value,
  ).map(
    (
      line,
      index,
    ) => {
      const separatorIndex =
        line.indexOf("|");

      if (
        separatorIndex <= 0 ||
        separatorIndex >=
          line.length - 1
      ) {
        throw new Error(
          `${itemName} ${index + 1}: use "left | right" format.`,
        );
      }

      const left =
        line
          .slice(
            0,
            separatorIndex,
          )
          .trim();

      const right =
        line
          .slice(
            separatorIndex + 1,
          )
          .trim();

      if (
        !left ||
        !right
      ) {
        throw new Error(
          `${itemName} ${index + 1}: both values are required.`,
        );
      }

      return [
        left,
        right,
      ];
    },
  );
}

function parseFacts(
  value: string,
): AdminGuideFact[] {
  return parsePairLines(
    value,
    "Fact",
  ).map(
    ([
      label,
      factValue,
    ]) => ({
      label,
      value:
        factValue,
    }),
  );
}

function parseSteps(
  value: string,
): AdminGuideStep[] {
  return parsePairLines(
    value,
    "Step",
  ).map(
    ([
      title,
      description,
    ]) => ({
      title,
      description,
    }),
  );
}

function parseFaq(
  value: string,
): AdminGuideFaq[] {
  return parsePairLines(
    value,
    "FAQ",
  ).map(
    ([
      question,
      answer,
    ]) => ({
      question,
      answer,
    }),
  );
}

function parseSources(
  value: string,
): AdminGuideSource[] {
  return splitLines(
    value,
  ).map(
    (
      line,
      index,
    ) => {
      const parts =
        line
          .split("|")
          .map(
            (part) =>
              part.trim(),
          );

      if (
        parts.length !== 4
      ) {
        throw new Error(
          `Source ${index + 1}: use "title | organization | url | de/en" format.`,
        );
      }

      const [
        title,
        organization,
        url,
        language,
      ] = parts;

      if (
        !title ||
        !organization ||
        !url ||
        (
          language !== "de" &&
          language !== "en"
        )
      ) {
        throw new Error(
          `Source ${index + 1}: invalid source data.`,
        );
      }

      try {
        const parsedUrl =
          new URL(url);

        if (
          parsedUrl.protocol !== "https:" &&
          parsedUrl.protocol !== "http:"
        ) {
          throw new Error();
        }
      } catch {
        throw new Error(
          `Source ${index + 1}: URL must be a valid http(s) URL.`,
        );
      }

      return {
        title,
        organization,
        url,
        language,
      };
    },
  );
}

function parseSections(
  value: string,
): Record<
  string,
  AdminGuideSection
> {
  if (!value.trim()) {
    return {};
  }

  let parsed: unknown;

  try {
    parsed =
      JSON.parse(
        value,
      );
  } catch {
    throw new Error(
      "Sections JSON is invalid.",
    );
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    Array.isArray(parsed)
  ) {
    throw new Error(
      "Sections must be a JSON object.",
    );
  }

  const result: Record<
    string,
    AdminGuideSection
  > = {};

  for (
    const [
      key,
      rawSection,
    ]
    of Object.entries(
      parsed,
    )
  ) {
    if (
      typeof rawSection !== "object" ||
      rawSection === null ||
      Array.isArray(
        rawSection,
      )
    ) {
      throw new Error(
        `Section "${key}" is invalid.`,
      );
    }

    const section =
      rawSection as Record<
        string,
        unknown
      >;

    const title =
      section.title;

    const paragraphs =
      section.paragraphs;

    const items =
      section.items;

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      throw new Error(
        `Section "${key}" requires a title.`,
      );
    }

    if (
      !Array.isArray(
        paragraphs,
      ) ||
      !paragraphs.every(
        (
          paragraph,
        ) =>
          typeof paragraph === "string",
      )
    ) {
      throw new Error(
        `Section "${key}" paragraphs must be a string array.`,
      );
    }

    if (
      !Array.isArray(
        items,
      ) ||
      !items.every(
        (
          item,
        ) =>
          typeof item === "string",
      )
    ) {
      throw new Error(
        `Section "${key}" items must be a string array.`,
      );
    }

    result[key] = {
      title:
        title.trim(),
      paragraphs:
        paragraphs.map(
          (paragraph) =>
            paragraph.trim(),
        ),
      items:
        items.map(
          (item) =>
            item.trim(),
        ),
    };
  }

  return result;
}

function parseRelatedSlugs(
  value: string,
): string[] {
  const seen =
    new Set<string>();

  return value
    .split(/[\n,]/)
    .map(
      (item) =>
        normalizeSlug(
          item,
        ),
    )
    .filter(
      (item) => {
        if (
          !item ||
          seen.has(item)
        ) {
          return false;
        }

        seen.add(
          item,
        );

        return true;
      },
    );
}

function isUniqueViolation(
  error: unknown,
): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}

export async function updateGuideArticleAction(
  _previousState: GuideEditActionState,
  formData: FormData,
): Promise<GuideEditActionState> {
  const locale =
    await getLocale();

  const appLocale:
    | "uz"
    | "de" =
    locale === "de"
      ? "de"
      : "uz";

  await requireAdmin(
    appLocale,
  );

  const articleId =
    getString(
      formData,
      "articleId",
    );

  const slug =
    normalizeSlug(
      getString(
        formData,
        "slug",
      ),
    );

  const categorySlug =
    getString(
      formData,
      "categorySlug",
    );

  const titleUz =
    getString(
      formData,
      "titleUz",
    );

  const titleDe =
    getString(
      formData,
      "titleDe",
    );

  const excerptUz =
    getString(
      formData,
      "excerptUz",
    );

  const excerptDe =
    getString(
      formData,
      "excerptDe",
    );

  const introUz =
    getString(
      formData,
      "introUz",
    );

  const introDe =
    getString(
      formData,
      "introDe",
    );

  const readingTimeUz =
    getString(
      formData,
      "readingTimeUz",
    );

  const readingTimeDe =
    getString(
      formData,
      "readingTimeDe",
    );

  const lastReviewedAt =
    getString(
      formData,
      "lastReviewedAt",
    );

  if (
    !articleId ||
    !slug ||
    !isCategorySlug(
      categorySlug,
    ) ||
    !titleUz ||
    !titleDe ||
    !excerptUz ||
    !excerptDe ||
    !introUz ||
    !introDe ||
    !readingTimeUz ||
    !readingTimeDe ||
    !lastReviewedAt
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bitte füllen Sie alle Pflichtfelder aus."
          : "Barcha majburiy maydonlarni to‘ldiring.",
    };
  }

  if (
    !isIsoDate(
      lastReviewedAt,
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Das Prüfdatum ist ungültig."
          : "Tekshiruv sanasi noto‘g‘ri.",
    };
  }

  let factsUz: AdminGuideFact[];
  let factsDe: AdminGuideFact[];
  let sectionsUz: Record<
    string,
    AdminGuideSection
  >;
  let sectionsDe: Record<
    string,
    AdminGuideSection
  >;
  let stepsUz: AdminGuideStep[];
  let stepsDe: AdminGuideStep[];
  let faqUz: AdminGuideFaq[];
  let faqDe: AdminGuideFaq[];
  let sources: AdminGuideSource[];

  try {
    factsUz =
      parseFacts(
        getString(
          formData,
          "factsUz",
        ),
      );

    factsDe =
      parseFacts(
        getString(
          formData,
          "factsDe",
        ),
      );

    sectionsUz =
      parseSections(
        getString(
          formData,
          "sectionsUz",
        ),
      );

    sectionsDe =
      parseSections(
        getString(
          formData,
          "sectionsDe",
        ),
      );

    stepsUz =
      parseSteps(
        getString(
          formData,
          "stepsUz",
        ),
      );

    stepsDe =
      parseSteps(
        getString(
          formData,
          "stepsDe",
        ),
      );

    faqUz =
      parseFaq(
        getString(
          formData,
          "faqUz",
        ),
      );

    faqDe =
      parseFaq(
        getString(
          formData,
          "faqDe",
        ),
      );

    sources =
      parseSources(
        getString(
          formData,
          "sources",
        ),
      );
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : (
              appLocale === "de"
                ? "Strukturierte Inhalte sind ungültig."
                : "Strukturali kontent noto‘g‘ri."
            ),
    };
  }

  if (
    factsUz.length !==
    factsDe.length
  ) {
    return {
      error:
        appLocale === "de"
          ? "UZ- und DE-Fakten müssen gleich viele Einträge haben."
          : "UZ va DE faktlar soni bir xil bo‘lishi kerak.",
    };
  }

  if (
    stepsUz.length !==
    stepsDe.length
  ) {
    return {
      error:
        appLocale === "de"
          ? "UZ- und DE-Schritte müssen gleich viele Einträge haben."
          : "UZ va DE bosqichlar soni bir xil bo‘lishi kerak.",
    };
  }

  if (
    faqUz.length !==
    faqDe.length
  ) {
    return {
      error:
        appLocale === "de"
          ? "UZ- und DE-FAQ müssen gleich viele Einträge haben."
          : "UZ va DE FAQ soni bir xil bo‘lishi kerak.",
    };
  }

  const uzSectionKeys =
    Object.keys(
      sectionsUz,
    ).sort();

  const deSectionKeys =
    Object.keys(
      sectionsDe,
    ).sort();

  if (
    JSON.stringify(
      uzSectionKeys,
    ) !==
    JSON.stringify(
      deSectionKeys,
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "UZ- und DE-Sections müssen dieselben Keys verwenden."
          : "UZ va DE sections bir xil keylardan foydalanishi kerak.",
    };
  }

  const input: AdminGuideArticleInput = {
    slug,
    categorySlug,

    titleUz,
    titleDe,

    excerptUz,
    excerptDe,

    introUz,
    introDe,

    readingTimeUz,
    readingTimeDe,

    factsUz,
    factsDe,

    sectionsUz,
    sectionsDe,

    stepsUz,
    stepsDe,

    faqUz,
    faqDe,

    sources,

    relatedArticleSlugs:
      parseRelatedSlugs(
        getString(
          formData,
          "relatedArticleSlugs",
        ),
      ),

    lastReviewedAt,
  };

  try {
    const updated =
      await updateAdminGuideArticle(
        articleId,
        input,
      );

    if (!updated) {
      return {
        error:
          appLocale === "de"
            ? "Der Guide-Artikel wurde nicht gefunden."
            : "Guide maqolasi topilmadi.",
      };
    }
  } catch (error) {
    if (
      isUniqueViolation(
        error,
      )
    ) {
      return {
        error:
          appLocale === "de"
            ? "Dieser Kategorie/Slug wird bereits verwendet."
            : "Bu kategoriya/slug allaqachon mavjud.",
      };
    }

    console.error(
      "Failed to update Guide article:",
      error,
    );

    return {
      error:
        appLocale === "de"
          ? "Der Guide-Artikel konnte nicht gespeichert werden."
          : "Guide maqolasini saqlab bo‘lmadi.",
    };
  }

  revalidatePath(
    "/[locale]/admin/guide",
    "page",
  );

  return redirect({
    href:
      "/admin/guide",
    locale:
      appLocale,
  });
}
