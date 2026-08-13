import {
  cp,
  mkdtemp,
  mkdir,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import {
  existsSync,
} from "node:fs";
import {
  tmpdir,
} from "node:os";
import {
  dirname,
  join,
  resolve,
} from "node:path";
import {
  pathToFileURL,
} from "node:url";

import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not configured.",
  );
}

const projectRoot =
  process.cwd();

const sourceGuideDirectory =
  join(
    projectRoot,
    "data",
    "guide",
  );

const sourceGuideTypeFile =
  join(
    projectRoot,
    "types",
    "guide.ts",
  );

if (
  !existsSync(
    sourceGuideDirectory,
  )
) {
  throw new Error(
    "data/guide directory was not found.",
  );
}

if (
  !existsSync(
    sourceGuideTypeFile,
  )
) {
  throw new Error(
    "types/guide.ts was not found.",
  );
}

async function getTypeScriptFiles(
  directory,
) {
  const {
    readdir,
  } = await import(
    "node:fs/promises"
  );

  const entries =
    await readdir(
      directory,
      {
        withFileTypes: true,
      },
    );

  const files = [];

  for (
    const entry
    of entries
  ) {
    const fullPath =
      join(
        directory,
        entry.name,
      );

    if (
      entry.isDirectory()
    ) {
      files.push(
        ...await getTypeScriptFiles(
          fullPath,
        ),
      );

      continue;
    }

    if (
      entry.isFile() &&
      entry.name.endsWith(
        ".ts",
      )
    ) {
      files.push(
        fullPath,
      );
    }
  }

  return files;
}

function resolveRelativeTypeScriptSpecifier(
  currentFile,
  specifier,
) {
  if (
    !specifier.startsWith(
      ".",
    )
  ) {
    return specifier;
  }

  if (
    specifier.endsWith(
      ".ts",
    ) ||
    specifier.endsWith(
      ".tsx",
    ) ||
    specifier.endsWith(
      ".js",
    ) ||
    specifier.endsWith(
      ".mjs",
    ) ||
    specifier.endsWith(
      ".json",
    )
  ) {
    return specifier;
  }

  const candidate =
    resolve(
      dirname(
        currentFile,
      ),
      `${specifier}.ts`,
    );

  if (
    existsSync(
      candidate,
    )
  ) {
    return `${specifier}.ts`;
  }

  return specifier;
}

async function rewriteRelativeImports(
  filePath,
) {
  const source =
    await readFile(
      filePath,
      "utf8",
    );

  const rewritten =
    source.replace(
      /(from\s+["'])(\.[^"']+)(["'])/g,
      (
        fullMatch,
        prefix,
        specifier,
        suffix,
      ) => {
        const resolvedSpecifier =
          resolveRelativeTypeScriptSpecifier(
            filePath,
            specifier,
          );

        return (
          prefix +
          resolvedSpecifier +
          suffix
        );
      },
    );

  if (
    rewritten !== source
  ) {
    await writeFile(
      filePath,
      rewritten,
      "utf8",
    );
  }
}

async function loadStaticGuideArticles() {
  const temporaryRoot =
    await mkdtemp(
      join(
        tmpdir(),
        "vatandoshlar-guide-seed-",
      ),
    );

  try {
    const temporaryGuideDirectory =
      join(
        temporaryRoot,
        "data",
        "guide",
      );

    const temporaryTypesDirectory =
      join(
        temporaryRoot,
        "types",
      );

    await mkdir(
      temporaryTypesDirectory,
      {
        recursive: true,
      },
    );

    await cp(
      sourceGuideDirectory,
      temporaryGuideDirectory,
      {
        recursive: true,
      },
    );

    await cp(
      sourceGuideTypeFile,
      join(
        temporaryTypesDirectory,
        "guide.ts",
      ),
    );

    const temporaryFiles =
      await getTypeScriptFiles(
        temporaryRoot,
      );

    for (
      const filePath
      of temporaryFiles
    ) {
      await rewriteRelativeImports(
        filePath,
      );
    }

    const aggregatorPath =
      join(
        temporaryGuideDirectory,
        "articles.ts",
      );

    const guideModule =
      await import(
        `${pathToFileURL(
          aggregatorPath,
        ).href}?seed=${Date.now()}`
      );

    if (
      !Array.isArray(
        guideModule.localizedGuideArticles,
      )
    ) {
      throw new Error(
        "localizedGuideArticles could not be loaded from the temporary Guide source tree.",
      );
    }

    return [
      guideModule.localizedGuideArticles,
      temporaryRoot,
    ];
  } catch (error) {
    await rm(
      temporaryRoot,
      {
        recursive: true,
        force: true,
      },
    );

    throw error;
  }
}

function localizeFacts(
  facts,
  locale,
) {
  return facts.map(
    (fact) => ({
      label:
        fact.label[
          locale
        ],

      value:
        fact.value[
          locale
        ],
    }),
  );
}

function localizeSections(
  sections,
  locale,
) {
  return Object.fromEntries(
    Object.entries(
      sections,
    ).flatMap(
      (
        [
          key,
          section,
        ],
      ) => {
        if (!section) {
          return [];
        }

        return [
          [
            key,
            {
              title:
                section.title[
                  locale
                ],

              paragraphs:
                section.paragraphs?.map(
                  (
                    paragraph,
                  ) =>
                    paragraph[
                      locale
                    ],
                ) ?? [],

              items:
                section.items?.map(
                  (
                    item,
                  ) =>
                    item[
                      locale
                    ],
                ) ?? [],
            },
          ],
        ];
      },
    ),
  );
}

function localizeSteps(
  steps,
  locale,
) {
  return steps.map(
    (step) => ({
      title:
        step.title[
          locale
        ],

      description:
        step.description[
          locale
        ],
    }),
  );
}

function localizeFaq(
  faq,
  locale,
) {
  return faq.map(
    (item) => ({
      question:
        item.question[
          locale
        ],

      answer:
        item.answer[
          locale
        ],
    }),
  );
}

function getDbStatus(
  article,
) {
  return (
    article.status ===
    "published"
  )
    ? "published"
    : "draft";
}

async function findExistingArticle(
  client,
  article,
) {
  const result =
    await client.query(
      `
        SELECT
          id::text,
          legacy_id,
          category_slug,
          slug
        FROM guide_articles
        WHERE
          legacy_id = $1
          OR (
            category_slug = $2
            AND slug = $3
          )
        LIMIT 1
      `,
      [
        article.id,
        article.categorySlug,
        article.slug,
      ],
    );

  return (
    result.rows[0] ??
    null
  );
}

async function insertArticle(
  client,
  article,
) {
  const status =
    getDbStatus(
      article,
    );

  await client.query(
    `
      INSERT INTO guide_articles (
        legacy_id,
        slug,
        category_slug,

        title_uz,
        title_de,

        excerpt_uz,
        excerpt_de,

        intro_uz,
        intro_de,

        reading_time_uz,
        reading_time_de,

        facts_uz,
        facts_de,

        sections_uz,
        sections_de,

        steps_uz,
        steps_de,

        faq_uz,
        faq_de,

        sources,

        related_article_slugs,

        last_reviewed_at,

        status,
        featured
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12::jsonb,
        $13::jsonb,
        $14::jsonb,
        $15::jsonb,
        $16::jsonb,
        $17::jsonb,
        $18::jsonb,
        $19::jsonb,
        $20::jsonb,
        $21,
        $22,
        $23,
        $24
      )
    `,
    [
      article.id,
      article.slug,
      article.categorySlug,

      article.title.uz,
      article.title.de,

      article.excerpt.uz,
      article.excerpt.de,

      article.intro.uz,
      article.intro.de,

      article.readingTime.uz,
      article.readingTime.de,

      JSON.stringify(
        localizeFacts(
          article.facts,
          "uz",
        ),
      ),

      JSON.stringify(
        localizeFacts(
          article.facts,
          "de",
        ),
      ),

      JSON.stringify(
        localizeSections(
          article.sections,
          "uz",
        ),
      ),

      JSON.stringify(
        localizeSections(
          article.sections,
          "de",
        ),
      ),

      JSON.stringify(
        localizeSteps(
          article.steps,
          "uz",
        ),
      ),

      JSON.stringify(
        localizeSteps(
          article.steps,
          "de",
        ),
      ),

      JSON.stringify(
        localizeFaq(
          article.faq,
          "uz",
        ),
      ),

      JSON.stringify(
        localizeFaq(
          article.faq,
          "de",
        ),
      ),

      JSON.stringify(
        article.sources,
      ),

      [
        ...article.relatedArticleSlugs,
      ],

      article.lastReviewedAt,

      status,

      status ===
      "published"
        ? Boolean(
            article.featured,
          )
        : false,
    ],
  );
}

const [
  localizedGuideArticles,
  temporaryGuideRoot,
] =
  await loadStaticGuideArticles();

if (
  localizedGuideArticles.length === 0
) {
  await rm(
    temporaryGuideRoot,
    {
      recursive: true,
      force: true,
    },
  );

  throw new Error(
    "No Guide articles were found. Seed stopped without changing the database.",
  );
}

const pool =
  new Pool({
    connectionString,
    max: 2,
    idleTimeoutMillis:
      10_000,
    connectionTimeoutMillis:
      5_000,
  });

const client =
  await pool.connect();

let inserted = 0;
let skipped = 0;

const categoryCounts =
  new Map();

try {
  await client.query(
    "BEGIN",
  );

  for (
    const article
    of localizedGuideArticles
  ) {
    const existing =
      await findExistingArticle(
        client,
        article,
      );

    if (existing) {
      console.log(
        `SKIP   ${article.categorySlug}/${article.slug} (already exists)`,
      );

      skipped += 1;
      continue;
    }

    await insertArticle(
      client,
      article,
    );

    categoryCounts.set(
      article.categorySlug,
      (
        categoryCounts.get(
          article.categorySlug,
        ) ??
        0
      ) + 1,
    );

    console.log(
      `INSERT ${article.categorySlug}/${article.slug} [${getDbStatus(
        article,
      )}]${
        article.featured
          ? " [featured]"
          : ""
      }`,
    );

    inserted += 1;
  }

  await client.query(
    "COMMIT",
  );
} catch (error) {
  await client.query(
    "ROLLBACK",
  );

  throw error;
} finally {
  client.release();

  await pool.end();

  await rm(
    temporaryGuideRoot,
    {
      recursive: true,
      force: true,
    },
  );
}

console.log("");
console.log(
  "Static Guide seed completed.",
);

console.log(
  `Source articles: ${localizedGuideArticles.length}`,
);

console.log(
  `Inserted: ${inserted}`,
);

console.log(
  `Skipped:  ${skipped}`,
);

if (
  categoryCounts.size > 0
) {
  console.log("");
  console.log(
    "Inserted by category:",
  );

  for (
    const [
      category,
      count,
    ]
    of [
      ...categoryCounts.entries(),
    ].sort(
      (
        [first],
        [second],
      ) =>
        first.localeCompare(
          second,
        ),
    )
  ) {
    console.log(
      `- ${category}: ${count}`,
    );
  }
}