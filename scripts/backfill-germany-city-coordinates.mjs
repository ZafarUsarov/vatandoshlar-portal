/** GeoNames DE dump city-centre backfill. Default DRY RUN; --apply writes only unambiguous matches.
 * Source: https://download.geonames.org/export/dump/DE.zip (CC BY 4.0).
 * Usage: node --env-file=.env.local scripts/backfill-germany-city-coordinates.mjs [--apply]
 */
import { readFile } from 'node:fs/promises';
import { Pool } from 'pg';

const apply = process.argv.includes('--apply');
const admin1 = {
  'DE-BW':'01','DE-BY':'02','DE-HB':'03','DE-HH':'04','DE-HE':'05','DE-NI':'06',
  'DE-NW':'07','DE-RP':'08','DE-SL':'09','DE-SH':'10','DE-BB':'11','DE-MV':'12',
  'DE-SN':'13','DE-ST':'14','DE-TH':'15','DE-BE':'16',
};
const normalize = (s) => String(s ?? '').normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '').replace(/ß/g,'ss')
  .toLocaleLowerCase('de-DE').replace(/[^a-z0-9]/g,'');

const file = process.env.GEONAMES_DE_PLACES_FILE ?? 'data/geonames/DE-places.txt';
const source = await readFile(file, 'utf8');
const byStateAndName = new Map();
for (const line of source.split(/\r?\n/)) {
  if (!line) continue;
  const r = line.split('\t');
  if (r[6] !== 'P' || !r[10] || !/^PPL/.test(r[7])) continue;
  const p = { id:r[0], name:r[1], lat:Number(r[4]), lon:Number(r[5]),
    feature:r[7], state:r[10], population:Number(r[14]) || 0 };
  if (!(p.lat >= 47 && p.lat <= 56 && p.lon >= 5 && p.lon <= 16)) continue;
  const names = new Set([r[1],r[2],...(r[3] || '').split(',')].map(normalize).filter(Boolean));
  for (const name of names) {
    const key = `${p.state}|${name}`;
    const list = byStateAndName.get(key) ?? new Map();
    list.set(p.id, p);
    byStateAndName.set(key, list);
  }
}
const pool = new Pool({ connectionString:process.env.DATABASE_URL, max:1 });
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ');
  const { rows } = await client.query(`
    SELECT id, city_name, state_code, latitude, longitude
    FROM locations
    WHERE country_code='DE' AND location_type='city' AND status='active'
      AND (latitude IS NULL OR longitude IS NULL)
    ORDER BY id
    FOR UPDATE
  `);
  const decisions = rows.map(row => {
    const key = `${admin1[row.state_code] ?? '?'}|${normalize(row.city_name)}`;
    const candidates = [...(byStateAndName.get(key)?.values() ?? [])]
      .sort((a,b) => b.population-a.population || a.id.localeCompare(b.id));
    const best = candidates[0], second = candidates[1];
    // A city must be populated and either unique or strongly distinguishable
    // from same-name settlements in the same state. Ambiguous rows are skipped.
    const safe = !!best && best.population >= 1000 &&
      (!second || (best.population >= 10000 && best.population >= second.population * 5));
    return { row, best, candidates, safe,
      reason: !best ? 'NO_MATCH' : !safe ? 'AMBIGUOUS_OR_LOW_POPULATION' : 'READY' };
  });
  console.log(JSON.stringify({mode:apply?'APPLY':'DRY_RUN',missing:rows.length,
    ready:decisions.filter(d=>d.safe).length,
    skipped:decisions.filter(d=>!d.safe).map(d=>({id:d.row.id,city:d.row.city_name,
      state:d.row.state_code,reason:d.reason,candidates:d.candidates.slice(0,5)})),
    preview:decisions.filter(d=>d.safe).map(d=>({id:d.row.id,city:d.row.city_name,
      state:d.row.state_code,geonameId:d.best.id,latitude:d.best.lat,longitude:d.best.lon}))
  },null,2));
  if (apply) {
    let updated = 0;
    for (const d of decisions) {
      if (!d.safe) continue;
      const result = await client.query(`
        UPDATE locations SET latitude=$1, longitude=$2, updated_at=NOW()
        WHERE id=$3 AND country_code='DE' AND location_type='city' AND status='active'
          AND latitude IS NULL AND longitude IS NULL
      `,[d.best.lat,d.best.lon,d.row.id]);
      updated += result.rowCount;
    }
    console.log(`UPDATED=${updated}; SKIPPED=${decisions.length-updated}`);
    await client.query('COMMIT');
  } else await client.query('ROLLBACK');
} catch (err) {
  await client.query('ROLLBACK').catch(()=>{});
  throw err;
} finally {
  client.release();
  await pool.end();
}
