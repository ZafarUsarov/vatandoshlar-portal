import { join } from "node:path";

import {
  open,
  validate,
  type CountryResponse,
  type Reader,
} from "maxmind";

const DEFAULT_DATABASE_PATH = join(
  process.cwd(),
  "data",
  "geoip",
  "GeoLite2-Country.mmdb",
);

const COUNTRY_CODE_PATTERN = /^[A-Z]{2}$/;

let readerPromise:
  | Promise<Reader<CountryResponse>>
  | null = null;

function getDatabasePath(): string {
  const configuredPath =
    process.env.GEOIP_DATABASE_PATH?.trim();

  return configuredPath || DEFAULT_DATABASE_PATH;
}

function normalizeIpAddress(
  value: string | null | undefined,
): string | null {
  if (!value) {
    return null;
  }

  const firstAddress =
    value.split(",")[0]?.trim();

  if (!firstAddress) {
    return null;
  }

  const normalized =
    firstAddress.startsWith("::ffff:")
      ? firstAddress.slice(7)
      : firstAddress;

  return validate(normalized)
    ? normalized
    : null;
}

async function getReader(): Promise<
  Reader<CountryResponse>
> {
  if (!readerPromise) {
    readerPromise = open<CountryResponse>(
      getDatabasePath(),
      {
        cache: {
          max: 10_000,
        },
        watchForUpdates: false,
      },
    ).catch((error) => {
      readerPromise = null;
      throw error;
    });
  }

  return readerPromise;
}

export async function resolveCountryCode(
  ipAddress: string | null | undefined,
): Promise<string | null> {
  const normalizedIp =
    normalizeIpAddress(ipAddress);

  if (!normalizedIp) {
    return null;
  }

  try {
    const reader = await getReader();
    const result =
      reader.get(normalizedIp);

    const countryCode =
      result?.country?.iso_code?.toUpperCase();

    if (
      !countryCode ||
      !COUNTRY_CODE_PATTERN.test(countryCode)
    ) {
      return null;
    }

    return countryCode;
  } catch {
    // Geo lookup must never make a public
    // request fail. Missing or unreadable
    // database files are treated as unknown.
    return null;
  }
}
