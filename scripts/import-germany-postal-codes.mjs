/** Import GeoNames postal DE.txt (CC BY 4.0). Dry-run unless --apply. */
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { Pool } from 'pg';

const apply = process.argv.includes('--apply');
const file = process.argv.find((arg, index) => index > 1 && !arg.startsWith('--'));
if (!file) throw new Error('Usage: node scripts/import-germany-postal-codes.mjs <DE.txt> [--apply]');

const states = new Map(Object.entries({
  'Baden-Württemberg': 'DE-BW', 'Bayern': 'DE-BY',
  'Berlin': 'DE-BE', 'Brandenburg': 'DE-BB',
  'Bremen': 'DE-HB', 'Hamburg': 'DE-HH',
  'Hessen': 'DE-HE', 'Mecklenburg-Vorpommern': 'DE-MV',
  'Niedersachsen': 'DE-NI', 'Nordrhein-Westfalen': 'DE-NW',
  'Rheinland-Pfalz': 'DE-RP', 'Saarland': 'DE-SL',
  'Sachsen': 'DE-SN', 'Sachsen-Anhalt': 'DE-ST',
  'Schleswig-Holstein': 'DE-SH', 'Thüringen': 'DE-TH',
}));

const text = await readFile(file, 'utf8');
const rows = new Map();
let skipped = 0;

for (const line of text.split(/\r?\n/)) {
  if (!line.trim()) continue;
  const parts = line.split('\t');
  const [country, postal, city, stateName, , , , , , lat, lon] = parts;
  const stateCode = states.get(stateName);

  if (country !== 'DE' || !/^\d{5}$/.test(postal ?? '') ||
      !stateCode || !city?.trim()) {
    skipped++;
    continue;
  }

  const cityName = city.trim();
  const key = `${stateCode}\u0000${cityName.toLocaleLowerCase('de-DE')}\u0000${postal}`;
  const latitude = Number(lat);
  const longitude = Number(lon);

  rows.set(key, {
    stateCode, cityName, postal,
    latitude: Number.isFinite(latitude) && Math.abs(latitude) <= 90 ? latitude : null,
    longitude: Number.isFinite(longitude) && Math.abs(longitude) <= 180 ? longitude : null,
  });
}

const entries = [...rows.values()].sort(
  (a, b) => a.stateCode.localeCompare(b.stateCode) ||
    a.cityName.localeCompare(b.cityName, 'de') ||
    a.postal.localeCompare(b.postal)
);

console.log(JSON.stringify({
  mode: apply ? 'APPLY' : 'DRY RUN',
  sourceRows: entries.length,
  skipped,
  exampleGreven: entries.filter(x => x.cityName.toLowerCase() === 'greven').slice(0, 8),
}, null, 2));

if (!apply) process.exit(0);
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');

const slugify = (v) => v.normalize('NFKD')
  .replace(/ß/g, 'ss').replace(/ẞ/g, 'ss')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '').slice(0, 110);

const digest = (v) => createHash('sha256')
  .update(v).digest('hex').slice(0, 12);

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
let client;
let inTransaction = false;

try {
  client = await pool.connect();
  await client.query('BEGIN');
  inTransaction = true;

  await client.query('SELECT pg_advisory_xact_lock($1)', [720072]);

  const stateResult = await client.query(`
    SELECT id::text, state_code, state_name
    FROM locations
    WHERE country_code = 'DE' AND location_type = 'state'
  `);
  const stateMap = new Map(stateResult.rows.map(s => [s.state_code, s]));

  if (stateMap.size !== 16) {
    throw new Error(`Expected 16 German states, found ${stateMap.size}`);
  }

  const existing = await client.query(`
    SELECT id::text, state_code, city_name
    FROM locations
    WHERE country_code = 'DE' AND location_type = 'city'
  `);
  const cityMap = new Map(existing.rows.map(c => [
    `${c.state_code}\u0000${c.city_name.toLocaleLowerCase('de-DE')}`, c.id
  ]));

  await client.query(`
    CREATE TEMP TABLE import_postal_stage (
      state_code text NOT NULL,
      state_name text NOT NULL,
      city_name text NOT NULL,
      city_slug text NOT NULL,
      existing_city_id text,
      postal_code text NOT NULL,
      latitude double precision,
      longitude double precision
    ) ON COMMIT DROP
  `);

  const staged = entries.map(row => {
    const key = `${row.stateCode}\u0000${row.cityName.toLocaleLowerCase('de-DE')}`;
    const state = stateMap.get(row.stateCode);

    return {
      state_code: row.stateCode,
      state_name: state.state_name,
      city_name: row.cityName,
      city_slug: `de-${slugify(row.cityName) || 'ort'}-${row.stateCode.slice(3).toLowerCase()}-${digest(key)}`,
      existing_city_id: cityMap.get(key) ?? null,
      postal_code: row.postal,
      latitude: row.latitude,
      longitude: row.longitude,
    };
  });

  const batchSize = 500;

  for (let i = 0; i < staged.length; i += batchSize) {
    const batch = staged.slice(i, i + batchSize);

    await client.query(`
      INSERT INTO import_postal_stage
        (state_code, state_name, city_name, city_slug,
         existing_city_id, postal_code, latitude, longitude)
      SELECT state_code, state_name, city_name, city_slug,
             existing_city_id, postal_code, latitude, longitude
      FROM jsonb_to_recordset($1::jsonb) AS x(
        state_code text, state_name text, city_name text,
        city_slug text, existing_city_id text, postal_code text,
        latitude double precision, longitude double precision
      )
    `, [JSON.stringify(batch)]);
  }

  console.log(`Staged ${staged.length} postal records`);

  const cities = await client.query(`
    INSERT INTO locations
      (country_code, location_type, state_code, state_name,
       city_name, slug, parent_id, latitude, longitude, status)
    SELECT 'DE', 'city', s.state_code, s.state_name,
           s.city_name, s.city_slug, parent.id,
           s.latitude, s.longitude, 'active'
    FROM (
      SELECT DISTINCT ON (city_slug)
        state_code, state_name, city_name, city_slug,
        latitude, longitude
      FROM import_postal_stage
      WHERE existing_city_id IS NULL
      ORDER BY city_slug, postal_code
    ) s
    JOIN locations parent
      ON parent.country_code = 'DE'
     AND parent.location_type = 'state'
     AND parent.state_code = s.state_code
    ON CONFLICT (slug) DO NOTHING
    RETURNING id
  `);

  console.log(`Inserted ${cities.rowCount} cities`);

  const unresolved = await client.query(`
    SELECT COUNT(*)::int AS count
    FROM import_postal_stage s
    LEFT JOIN locations l
      ON l.slug = s.city_slug
     AND l.country_code = 'DE'
     AND l.location_type = 'city'
     AND l.state_code = s.state_code
    WHERE s.existing_city_id IS NULL AND l.id IS NULL
  `);

  if (unresolved.rows[0].count !== 0) {
    throw new Error(`${unresolved.rows[0].count} postal rows have unresolved cities`);
  }

  const postals = await client.query(`
    INSERT INTO location_postal_codes
      (location_id, postal_code, country_code)
    SELECT DISTINCT
      COALESCE(existing.id, created.id),
      s.postal_code,
      'DE'
    FROM import_postal_stage s
    LEFT JOIN locations existing
      ON existing.id::text = s.existing_city_id
    LEFT JOIN locations created
      ON created.slug = s.city_slug
     AND created.country_code = 'DE'
     AND created.location_type = 'city'
     AND created.state_code = s.state_code
    WHERE COALESCE(existing.id, created.id) IS NOT NULL
    ON CONFLICT (location_id, postal_code) DO NOTHING
    RETURNING id
  `);

  const missing = await client.query(`
    SELECT COUNT(*)::int AS count
    FROM import_postal_stage s
    LEFT JOIN locations existing ON existing.id::text = s.existing_city_id
    LEFT JOIN locations created
      ON created.slug = s.city_slug
     AND created.country_code = 'DE'
     AND created.location_type = 'city'
     AND created.state_code = s.state_code
    WHERE COALESCE(existing.id, created.id) IS NULL
  `);

  if (missing.rows[0].count !== 0) {
    throw new Error(`${missing.rows[0].count} postal rows have no matching city`);
  }

  await client.query('COMMIT');
  inTransaction = false;

  console.log(JSON.stringify({
    status: 'PASS',
    newCities: cities.rowCount,
    newPostals: postals.rowCount,
    processed: entries.length,
  }, null, 2));

} catch (error) {
  if (client && inTransaction) {
    try {
      await client.query('ROLLBACK');
    } catch (rollbackError) {
      console.error('Rollback failed:', rollbackError);
    }
  }
  throw error;
} finally {
  client?.release();
  await pool.end();
}
