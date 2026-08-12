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
  "lib",
  "data",
  "i18n",
];

const codeExtensions =
  new Set([
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
  ]);

const allowedStaticDefinitions =
  new Set([
    "data/telegram.ts",
  ]);

const forbiddenPatterns = [
  {
    name:
      "static Telegram data import",
    pattern:
      /(?:from\s+["'][^"']*(?:data\/telegram|@\/data\/telegram)["']|import\s*\(\s*["'][^"']*(?:data\/telegram|@\/data\/telegram)["']\s*\))/,
  },

  {
    name:
      "legacy static Telegram selector",
    pattern:
      /\bgetTelegramGroups\b/,
  },

  {
    name:
      "legacy Telegram static source",
    pattern:
      /\btelegramGroupSources\b/,
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
    allowedStaticDefinitions.has(
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
  "Telegram runtime dependency audit",
);
console.log(
  "---------------------------------",
);

if (
  violations.length === 0
) {
  console.log(
    "No public/runtime dependency on static Telegram data was found.",
  );

  console.log("");

  console.log(
    "Audit PASSED.",
  );
} else {
  console.error(
    `Found ${violations.length} static Telegram runtime dependency violation(s):`,
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