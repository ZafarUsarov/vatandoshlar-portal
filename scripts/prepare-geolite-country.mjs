import {
  access,
  copyFile,
  mkdir,
  mkdtemp,
  readdir,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const DATABASE_FILENAME =
  "GeoLite2-Country.mmdb";

const TARGET_DIRECTORY = join(
  process.cwd(),
  "data",
  "geoip",
);

const TARGET_PATH = join(
  TARGET_DIRECTORY,
  DATABASE_FILENAME,
);

const DOWNLOAD_URL =
  "https://download.maxmind.com/geoip/databases/GeoLite2-Country/download?suffix=tar.gz";

const MIN_DATABASE_SIZE_BYTES =
  1_000_000;

async function isUsableDatabase(
  filePath,
) {
  try {
    await access(filePath);

    const fileStat =
      await stat(filePath);

    return (
      fileStat.isFile() &&
      fileStat.size >=
        MIN_DATABASE_SIZE_BYTES
    );
  } catch {
    return false;
  }
}

async function findDatabaseFile(
  directory,
) {
  const entries =
    await readdir(directory, {
      withFileTypes: true,
    });

  for (const entry of entries) {
    const entryPath =
      join(directory, entry.name);

    if (
      entry.isFile() &&
      entry.name ===
        DATABASE_FILENAME
    ) {
      return entryPath;
    }

    if (entry.isDirectory()) {
      const nestedResult =
        await findDatabaseFile(
          entryPath,
        );

      if (nestedResult) {
        return nestedResult;
      }
    }
  }

  return null;
}

async function prepareGeoLiteCountry() {
  await mkdir(
    TARGET_DIRECTORY,
    {
      recursive: true,
    },
  );

  if (
    await isUsableDatabase(
      TARGET_PATH,
    )
  ) {
    console.log(
      "GeoLite2 Country database is ready.",
    );

    return;
  }

  const accountId =
    process.env.MAXMIND_ACCOUNT_ID?.trim();

  const licenseKey =
    process.env.MAXMIND_LICENSE_KEY?.trim();

  if (
    !accountId ||
    !licenseKey
  ) {
    console.warn(
      "GeoLite2 Country database is unavailable because MAXMIND_ACCOUNT_ID or MAXMIND_LICENSE_KEY is not configured. Country analytics will fall back to ZZ.",
    );

    return;
  }

  const temporaryDirectory =
    await mkdtemp(
      join(
        tmpdir(),
        "vatandoshlar-geolite-",
      ),
    );

  const archivePath =
    join(
      temporaryDirectory,
      "GeoLite2-Country.tar.gz",
    );

  const temporaryTargetPath =
    `${TARGET_PATH}.tmp-${process.pid}`;

  try {
    const authorization =
      Buffer.from(
        `${accountId}:${licenseKey}`,
      ).toString("base64");

    const response =
      await fetch(
        DOWNLOAD_URL,
        {
          headers: {
            authorization:
              `Basic ${authorization}`,
            "user-agent":
              "Vatandoshlar.de Analytics",
          },
          redirect: "follow",
        },
      );

    if (!response.ok) {
      throw new Error(
        `MaxMind download failed with HTTP ${response.status}.`,
      );
    }

    const archiveBuffer =
      Buffer.from(
        await response.arrayBuffer(),
      );

    await writeFile(
      archivePath,
      archiveBuffer,
    );

    await execFileAsync(
      "tar",
      [
        "-xzf",
        archivePath,
        "-C",
        temporaryDirectory,
      ],
    );

    const extractedDatabasePath =
      await findDatabaseFile(
        temporaryDirectory,
      );

    if (
      !extractedDatabasePath
    ) {
      throw new Error(
        `${DATABASE_FILENAME} was not found in the downloaded archive.`,
      );
    }

    if (
      !(
        await isUsableDatabase(
          extractedDatabasePath,
        )
      )
    ) {
      throw new Error(
        "Downloaded GeoLite2 Country database is unexpectedly small or unreadable.",
      );
    }

    await copyFile(
      extractedDatabasePath,
      temporaryTargetPath,
    );

    await rename(
      temporaryTargetPath,
      TARGET_PATH,
    );

    console.log(
      "GeoLite2 Country database downloaded successfully.",
    );
  } catch (error) {
    await rm(
      temporaryTargetPath,
      {
        force: true,
      },
    );

    console.warn(
      "GeoLite2 Country preparation failed. The application will continue and country analytics will fall back to ZZ.",
    );

    if (
      error instanceof Error
    ) {
      console.warn(
        error.message,
      );
    }
  } finally {
    await rm(
      temporaryDirectory,
      {
        recursive: true,
        force: true,
      },
    );
  }
}

await prepareGeoLiteCountry();