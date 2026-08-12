import {
  readdir,
  readFile,
} from "node:fs/promises";
import {
  extname,
  join,
  relative,
  resolve,
} from "node:path";

const projectRoot =
  process.cwd();

const scanRoots = [
  "app",
  "components",
  "data",
  "lib",
  "i18n",
];

const allowedStaticGuideFiles =
  new Set([
    "data/guide/articles.ts",
  ]);

const allowedStaticGuidePrefixes = [
  "data/guide/articles/",
];

const allowedMigrationConsumers =
  new Set([
    "scripts/seed-static-guide.mjs",
  ]);

const codeExtensions =
  new Set([
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
  ]);

const forbiddenPatterns = [
  {
    name:
      "direct Guide articles module import",
    pattern:
      /(?:from\s+["'][^"']*guide\/articles(?:["'/])|import\s*\(\s*["'][^"']*guide\/articles(?:["'/]))/,
  },
  {
    name:
      "legacy static Guide article selector",
    pattern:
      /\b(?:getGuideArticlesByCategory|getGuideArticleBySlug|getGuideArticleStaticParams|localizedGuideArticles)\b/,
  },
];

async function collectCodeFiles(
  directory,
) {
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
        ...await collectCodeFiles(
          fullPath,
        ),
      );

      continue;
    }

    if (
      entry.isFile() &&
      codeExtensions.has(
        extname(
          entry.name,
        ),
      )
    ) {
      files.push(
        fullPath,
      );
    }
  }

  return files;
}

function normalizePath(
  value,
) {
  return value.replaceAll(
    "\\",
    "/",
  );
}

function isAllowedStaticDefinition(
  projectRelativePath,
) {
  if (
    allowedStaticGuideFiles.has(
      projectRelativePath,
    )
  ) {
    return true;
  }

  return allowedStaticGuidePrefixes.some(
    (prefix) =>
      projectRelativePath.startsWith(
        prefix,
      ),
  );
}

function isAllowedMigrationConsumer(
  projectRelativePath,
) {
  return allowedMigrationConsumers.has(
    projectRelativePath,
  );
}

const files = [];

for (
  const rootName
  of scanRoots
) {
  const absoluteRoot =
    resolve(
      projectRoot,
      rootName,
    );

  try {
    files.push(
      ...await collectCodeFiles(
        absoluteRoot,
      ),
    );
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      continue;
    }

    throw error;
  }
}

const violations = [];

for (
  const filePath
  of files
) {
  const projectRelativePath =
    normalizePath(
      relative(
        projectRoot,
        filePath,
      ),
    );

  if (
    isAllowedStaticDefinition(
      projectRelativePath,
    ) ||
    isAllowedMigrationConsumer(
      projectRelativePath,
    )
  ) {
    continue;
  }

  const source =
    await readFile(
      filePath,
      "utf8",
    );

  for (
    const rule
    of forbiddenPatterns
  ) {
    if (
      rule.pattern.test(
        source,
      )
    ) {
      violations.push({
        file:
          projectRelativePath,
        rule:
          rule.name,
      });
    }
  }
}

console.log("");
console.log(
  "Guide runtime dependency audit",
);
console.log(
  "------------------------------",
);

if (
  violations.length === 0
) {
  console.log(
    "No public/runtime dependency on static Guide article data was found.",
  );

  console.log("");

  console.log(
    "Audit PASSED.",
  );
} else {
  console.error(
    `Found ${violations.length} static Guide runtime dependency violation(s):`,
  );

  for (
    const violation
    of violations
  ) {
    console.error(
      `- ${violation.file}: ${violation.rule}`,
    );
  }

  console.error("");

  console.error(
    "Audit FAILED.",
  );

  process.exitCode = 1;
}