/** Import GeoNames postal DE.txt (CC BY 4.0). Dry-run unless --apply. */
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { Pool } from 'pg';

const apply = process.argv.includes('--apply');
const file = process.argv.find((arg, index) => index > 1 && !arg.startsWith('--'));
if (!file) throw new Error('Usage: node scripts/import-germany-postal-codes.mjs <DE.txt> [--apply]');
const states = new Map(Object.entries({
  'Baden-Württemberg':'DE-BW', 'Bayern':'DE-BY', 'Berlin':'DE-BE', 'Brandenburg':'DE-BB',
  'Bremen':'DE-HB', 'Hamburg':'DE-HH', 'Hessen':'DE-HE', 'Mecklenburg-Vorpommern':'DE-MV',
  'Niedersachsen':'DE-NI', 'Nordrhein-Westfalen':'DE-NW', 'Rheinland-Pfalz':'DE-RP',
  'Saarland':'DE-SL', 'Sachsen':'DE-SN', 'Sachsen-Anhalt':'DE-ST',
  'Schleswig-Holstein':'DE-SH', 'Thüringen':'DE-TH',
}));
const text = await readFile(file, 'utf8');
const rows = new Map();
let skipped = 0;
for (const line of text.split(/\r?\n/)) {
  if (!line.trim()) continue;
  const parts = line.split('\t');
  const [country, postal, city, stateName, , , , , , lat, lon] = parts;
  const stateCode = states.get(stateName);
  if (country !== 'DE' || !/^\d{5}$/.test(postal ?? '') || !stateCode || !city?.trim()) { skipped++; continue; }
  const cityName = city.trim();
  const key = `${stateCode}\u0000${cityName.toLocaleLowerCase('de-DE')}\u0000${postal}`;
  const latitude = Number(lat), longitude = Number(lon);
  rows.set(key, { stateCode, cityName, postal, latitude: Number.isFinite(latitude) && Math.abs(latitude)<=90 ? latitude : null, longitude: Number.isFinite(longitude) && Math.abs(longitude)<=180 ? longitude : null });
}
const entries = [...rows.values()].sort((a,b) => a.stateCode.localeCompare(b.stateCode) || a.cityName.localeCompare(b.cityName,'de') || a.postal.localeCompare(b.postal));
console.log(JSON.stringify({ mode: apply ? 'APPLY' : 'DRY RUN', sourceRows: entries.length, skipped, exampleGreven: entries.filter(x=>x.cityName.toLowerCase()==='greven').slice(0,8) },null,2));
if (!apply) process.exit(0);
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required. Confirm this is NOT production before --apply.');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const client = await pool.connect();
const slugify = (v) => v.normalize('NFKD').replace(/ß/g,'ss').replace(/ẞ/g,'ss').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,110);
const digest = (v) => createHash('sha256').update(v).digest('hex').slice(0,12);
let newCities = 0, newPostals = 0;
try {
  await client.query('BEGIN');
  await client.query('SELECT pg_advisory_xact_lock($1)', [720072]);
  const stateResult = await client.query("SELECT id::text, state_code, state_name FROM locations WHERE country_code='DE' AND location_type='state'");
  const stateMap = new Map(stateResult.rows.map(s=>[s.state_code,s]));
  if (stateMap.size !== 16) throw new Error(`Expected 16 German states, found ${stateMap.size}`);
  const existing = await client.query("SELECT id::text, state_code, city_name FROM locations WHERE country_code='DE' AND location_type='city'");
  const cityMap = new Map(existing.rows.map(c=>[`${c.state_code}\u0000${c.city_name.toLocaleLowerCase('de-DE')}`,c.id]));
  for (const row of entries) {
    const key = `${row.stateCode}\u0000${row.cityName.toLocaleLowerCase('de-DE')}`;
    let id = cityMap.get(key);
    if (!id) {
      const state = stateMap.get(row.stateCode);
      const slug = `de-${slugify(row.cityName) || 'ort'}-${row.stateCode.slice(3).toLowerCase()}-${digest(key)}`;
      const result = await client.query(`INSERT INTO locations (country_code,location_type,state_code,state_name,city_name,slug,parent_id,latitude,longitude,status)
        VALUES ('DE','city',$1,$2,$3,$4,$5,$6,$7,'active') ON CONFLICT (slug) DO NOTHING RETURNING id::text`,
        [row.stateCode,state.state_name,row.cityName,slug,state.id,row.latitude,row.longitude]);
      id = result.rows[0]?.id;
      if (!id) {
        const found = await client.query('SELECT id::text FROM locations WHERE slug=$1',[slug]);
        id = found.rows[0]?.id;
      }
      if (!id) throw new Error(`Unable to insert ${key}`);
      cityMap.set(key,id); newCities++;
    }
    const p = await client.query(`INSERT INTO location_postal_codes (location_id,postal_code,country_code) VALUES ($1,$2,'DE') ON CONFLICT (location_id,postal_code) DO NOTHING RETURNING id`,[id,row.postal]);
    newPostals += p.rowCount;
  }
  await client.query('COMMIT');
  console.log(JSON.stringify({ status:'PASS', newCities, newPostals, processed:entries.length },null,2));
} catch (error) { await client.query('ROLLBACK'); throw error; }
finally { client.release(); await pool.end(); }
