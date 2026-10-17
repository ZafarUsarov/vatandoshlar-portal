/** M18.4: isolated repository integration test. No .env.local loading. */
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const { Client } = require('pg');
const Module = require('node:module');
const url = process.env.TRAVEL_TEST_DATABASE_URL;
if (!url) throw new Error('Set TRAVEL_TEST_DATABASE_URL explicitly. DATABASE_URL is deliberately ignored.');
const parsed = new URL(url);
if (!['postgres:', 'postgresql:'].includes(parsed.protocol) ||
    !['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname) ||
    decodeURIComponent(parsed.pathname) !== '/vatandoshlar_travel_test') {
  throw new Error('REFUSED: only local vatandoshlar_travel_test is permitted.');
}
const client = new Client({ connectionString: url });
await client.connect();
try {
  const db = await client.query('SELECT current_database() AS name, inet_server_addr() AS addr');
  if (db.rows[0].name !== 'vatandoshlar_travel_test') throw new Error('REFUSED: unexpected database.');
  await client.query('BEGIN');
  const oldResolve = Module._resolveFilename;
  const oldTs = require.extensions['.ts'];
  try {
    Module._resolveFilename = function(request, parent, ...rest) {
      if (request === '@/lib/db') return 'travel-test-db-stub';
      if (request.startsWith('@/')) return resolve(process.cwd(), request.slice(2)) + '.ts';
      return oldResolve.call(this, request, parent, ...rest);
    };
    require.cache['travel-test-db-stub'] = { id: 'travel-test-db-stub', filename: 'travel-test-db-stub', loaded: true, exports: { getDb: () => ({ query: (...args) => client.query(...args) }) } };
    require.extensions['.ts'] = (mod, filename) => {
      const source = readFileSync(filename, 'utf8');
      const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
      mod._compile(js, filename);
    };
    const repo = require(resolve(process.cwd(), 'lib/travel/travel-repository.ts'));
    const assert = (ok, label) => { if (!ok) throw new Error('FAIL: ' + label); console.log('PASS:', label); };
    const userId = '900001';
    await client.query('INSERT INTO public_users(id) VALUES ($1) ON CONFLICT DO NOTHING', [userId]);
    const departure = new Date(Date.now() + 14 * 86400000).toISOString();
    const id = await repo.createTravelDraft({ authorUserId: userId, kind: 'ride_offer', contentLanguage: 'uz', title: 'Repository integration test', description: 'Test travel from Hamburg to Berlin.', transportMode: 'car', originCountryCode: 'DE', originCity: 'Hamburg', destinationCountryCode: 'DE', destinationCity: 'Berlin', departureAt: departure, departureTimezone: 'Europe/Berlin', arrivalAt: null, flightNumber: null, transitDetails: null, seatsAvailable: 2, assistanceDetails: null, parcelDetails: null, priceAmount: '10.00', priceCurrency: 'EUR' });
    assert(/^\d+$/.test(id), 'createTravelDraft returns ID');
    const mine = await repo.getOwnTravelListings(userId);
    const own = mine.find(x => x.id === id);
    assert(own?.status === 'draft' && own.priceAmount === '10.00', 'getOwnTravelListings maps draft');
    assert(!(await repo.getPublishedTravelListings()).some(x => x.id === id), 'draft not public');
    assert(await repo.changeOwnTravelStatus({ listingId: id, authorUserId: userId, from: 'draft', to: 'published' }), 'publish own draft');
    assert(!(await repo.changeOwnTravelStatus({ listingId: id, authorUserId: '900002', from: 'published', to: 'closed' })), 'other author cannot close');
    assert((await repo.getPublishedTravelListings({ kind: 'ride_offer', originCountryCode: 'DE' })).some(x => x.id === id), 'published search');
    assert((await repo.getPublishedTravelBySlug(own.slug))?.id === id, 'published detail by slug');
    assert(await repo.changeOwnTravelStatus({ listingId: id, authorUserId: userId, from: 'published', to: 'closed' }), 'close own listing');
    assert(!(await repo.getPublishedTravelListings()).some(x => x.id === id), 'closed not public');
    assert(await repo.removeOwnTravelListing(id, userId), 'soft delete own listing');
    assert(!(await repo.getOwnTravelListings(userId)).some(x => x.id === id), 'removed not in mine');
    console.log('ALL REPOSITORY TESTS PASSED');
  } finally {
    await client.query('ROLLBACK');
    Module._resolveFilename = oldResolve;
    if (oldTs) require.extensions['.ts'] = oldTs; else delete require.extensions['.ts'];
    delete require.cache['travel-test-db-stub'];
    console.log('ROLLBACK complete; no test data persisted.');
  }
} finally {
  await client.end();
}
