import {
  readdir,
  readFile,
  stat,
} from "node:fs/promises";

import {
  join,
  relative,
  sep,
} from "node:path";

const ROOTS = [
  "app",
  "components",
  "lib",
  "data",
  "types",
];

const SKIP_DIRECTORIES = new Set([
  ".git",
  ".next",
  "node_modules",
  "scripts",
  "db",
  "docs",
]);

const TEXT_EXTENSIONS = new Set([
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
]);

const STATIC_JOBS_PATTERNS = [
  {
    label:
      "direct static Jobs module import",

    pattern:
      /(?:from\s+["'][^"']*data\/jobs(?:\.[^"']+)?["']|import\s*\(\s*["'][^"']*data\/jobs(?:\.[^"']+)?["']\s*\))/,
  },

  {
    label:
      "direct static Jobs module require",

    pattern:
      /require\s*\(\s*["'][^"']*data\/jobs(?:\.[^"']+)?["']\s*\)/,
  },
];

function extension(path) {
  const index =
    path.lastIndexOf(".");

  return index === -1
    ? ""
    : path.slice(index);
}

async function collectFiles(
  path,
  files = [],
) {
  let info;

  try {
    info = await stat(path);
  } catch {
    return files;
  }

  if (info.isFile()) {
    if (
      TEXT_EXTENSIONS.has(
        extension(path),
      )
    ) {
      files.push(path);
    }

    return files;
  }

  if (!info.isDirectory()) {
    return files;
  }

  const entries =
    await readdir(path, {
      withFileTypes: true,
    });

  for (const entry of entries) {
    if (
      entry.isDirectory() &&
      SKIP_DIRECTORIES.has(
        entry.name,
      )
    ) {
      continue;
    }

    await collectFiles(
      join(
        path,
        entry.name,
      ),
      files,
    );
  }

  return files;
}

const files = [];

for (const root of ROOTS) {
  await collectFiles(
    root,
    files,
  );
}

const violations = [];

for (const file of files) {
  const normalized =
    relative(
      process.cwd(),
      file,
    )
      .split(sep)
      .join("/");

  /*
   * data/jobs.ts is allowed to remain
   * temporarily as migration/seed input.
   *
   * Runtime code must not import or require it.
   */
  if (
    normalized ===
    "data/jobs.ts"
  ) {
    continue;
  }

  const source =
    await readFile(
      file,
      "utf8",
    );

  for (
    const rule
    of STATIC_JOBS_PATTERNS
  ) {
    if (
      rule.pattern.test(
        source,
      )
    ) {
      violations.push({
        file: normalized,
        reason:
          rule.label,
      });
    }
  }
}

console.log("");
console.log(
  "Jobs runtime dependency audit",
);
console.log(
  "-----------------------------",
);

if (
  violations.length > 0
) {
  console.log(
    `Found ${violations.length} static Jobs runtime dependency violation(s):`,
  );

  for (
    const violation
    of violations
  ) {
    console.log(
      `- ${violation.file}: ${violation.reason}`,
    );
  }

  console.log("");
  console.log(
    "Audit FAILED.",
  );

  process.exitCode = 1;
} else {
  console.log(
    "No public/runtime dependency on static Jobs guide data was found.",
  );

  console.log("");
  console.log(
    "Audit PASSED.",
  );
}