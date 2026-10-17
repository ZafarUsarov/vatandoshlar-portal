/** M18.5.2: isolated Server Action integration tests; no .env.local loading. */
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const { Client } = require('pg');
const Module = require('node:module');
const url = process.env.TRAVEL_TEST_DATABASE_URL;
if (!url) throw new Error('TRAVEL_TEST_DATABASE_URL is required; DATABASE_URL is ignored.');
const parsed = new URL(url);
if (!['postgres:', 'postgresql:'].includes(parsed.protocol) ||
    !['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname) ||
    decodeURIComponent(parsed.pathname) !== '/vatandoshlar_travel_test') {
  throw new Error('REFUSED: only local vatandoshlar_travel_test is permitted.');
}
const client = new Client({ connectionString: url });
await client.connect();
const originalResolve = Module._resolveFilename;
const originalTs = require.extensions['.ts'];
const stubIds = ['travel-test-db-stub', 'travel-test-auth-stub', 'travel-test-cache-stub', 'travel-test-intl-stub', 'travel-test-types-stub'];
const cached = [];
const assert = (condition, label) => { if (!condition) throw new Error('FAIL: ' + label); console.log('PASS:', label); };
let authenticated = true;
let locale = 'uz';
let revalidated = [];
try {
  const check = await client.query('SELECT current_database() AS name');
  if (check.rows[0].name !== 'vatandoshlar_travel_test') throw new Error('REFUSED: unexpected database');
  await client.query('BEGIN');
  await client.query('INSERT INTO public_users(id) VALUES ($1) ON CONFLICT DO NOTHING', ['900001']);
  const stubs = {
    'travel-test-db-stub': { getDb: () => ({ query: (...args) => client.query(...args) }) },
    'travel-test-auth-stub': { requirePublicUser: async () => { if (!authenticated) throw new Error('AUTH_REDIRECT'); return { user: { id: '900001' } }; } },
    'travel-test-cache-stub': { revalidatePath: path => revalidated.push(path) },
    'travel-test-intl-stub': { getLocale: async () => locale },
    'travel-test-types-stub': { TRAVEL_LISTING_KINDS: ['ride_offer','ride_request','companion_request','companion_offer','parcel_request','parcel_offer'], TRAVEL_TRANSPORT_MODES: ['car','plane','train','bus','other'] },
  };
  for (const [id, exports] of Object.entries(stubs)) require.cache[id] = { id, filename: id, loaded: true, exports };
  Module._resolveFilename = function(request, parent, ...rest) {
    const mapping = {
      '@/lib/db': 'travel-test-db-stub', '@/lib/auth/user': 'travel-test-auth-stub',
      'next/cache': 'travel-test-cache-stub', 'next-intl/server': 'travel-test-intl-stub',
      '@/types/travel': 'travel-test-types-stub',
    };
    if (mapping[request]) return mapping[request];
    if (request.startsWith('@/')) return resolve(process.cwd(), request.slice(2)) + '.ts';
    return originalResolve.call(this, request, parent, ...rest);
  };
  require.extensions['.ts'] = (mod, filename) => {
    const js = ts.transpileModule(readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
    mod._compile(js, filename);
  };
  const createPath = resolve(process.cwd(), 'app/travel/new/actions.ts');
  const minePath = resolve(process.cwd(), 'app/travel/mine/actions.ts');
  const repoPath = resolve(process.cwd(), 'lib/travel/travel-repository.ts');
  const create = require(createPath);
  const mine = require(minePath);
  const repo = require(repoPath);
  cached.push(createPath, minePath, repoPath);
  const departure = new Date(Date.now() + 14 * 86400000).toISOString();
  const base = () => new FormData();
  const form = () => {
    const f = base();
    for (const [key, value] of Object.entries({ locale: 'uz', kind: 'ride_offer', transportMode: 'car', title: 'Action integration test', description: 'Testing the travel action with a safe test database.', originCountryCode: 'DE', originCity: 'Hamburg', destinationCountryCode: 'DE', destinationCity: 'Berlin', departureAt: departure, departureTimezone: 'Europe/Berlin', seatsAvailable: '2', priceAmount: '10.00', priceCurrency: 'EUR' })) f.set(key, value);
    return f;
  };
  const prev = { error: null };
  let f = form(); f.set('kind', 'bad');
  assert(Boolean((await create.createTravelDraftAction(prev, f)).error), 'reject invalid listing kind');
  f = form(); f.set('priceAmount', '');
  assert(Boolean((await create.createTravelDraftAction(prev, f)).error), 'reject currency without price');
  f = form(); f.set('priceAmount', '-2');
  assert(Boolean((await create.createTravelDraftAction(prev, f)).error), 'reject negative price');
  f = form(); f.set('departureTimezone', 'Not/AZone');
  assert(Boolean((await create.createTravelDraftAction(prev, f)).error), 'reject invalid timezone');
  f = form(); f.set('departureAt', '2026-10-20T10:00');
  assert(Boolean((await create.createTravelDraftAction(prev, f)).error), 'reject unzoned departure');
  authenticated = false;
  try { await create.createTravelDraftAction(prev, form()); throw new Error('authentication was bypassed'); }
  catch (e) { assert(e.message === 'AUTH_REDIRECT', 'unauthenticated creation is rejected'); }
  authenticated = true;
  const result = await create.createTravelDraftAction(prev, form());
  assert(!result.error && /^\d+$/.test(result.createdId ?? ''), 'create action inserts draft');
  assert(revalidated.includes('/uz/travel/mine'), 'creation revalidates mine');
  const id = result.createdId;
  const mutationPrev = { error: null, success: false };
  const mutationForm = (operation, listingId = id) => { const f = base(); f.set('listingId', listingId); if (operation) f.set('operation', operation); return f; };
  assert(Boolean((await mine.changeTravelStatusAction(mutationPrev, mutationForm('bad'))).error), 'reject invalid operation');
  assert(Boolean((await mine.changeTravelStatusAction(mutationPrev, mutationForm('publish', '999999999'))).error), 'reject nonexistent listing');
  assert((await mine.changeTravelStatusAction(mutationPrev, mutationForm('publish'))).success, 'publish action succeeds');
  assert(Boolean((await mine.changeTravelStatusAction(mutationPrev, mutationForm('publish'))).error), 'reject duplicate publish');
  assert((await mine.changeTravelStatusAction(mutationPrev, mutationForm('close'))).success, 'close action succeeds');
  assert((await mine.removeTravelListingAction(mutationPrev, mutationForm(null))).success, 'remove action succeeds');
  assert(!(await repo.getOwnTravelListings('900001')).some(x => x.id === id), 'removed listing hidden from mine');
  authenticated = false;
  try { await mine.removeTravelListingAction(mutationPrev, mutationForm(null)); throw new Error('authentication was bypassed'); }
  catch (e) { assert(e.message === 'AUTH_REDIRECT', 'unauthenticated mutation is rejected'); }
  authenticated = true;
  locale = 'de';
  assert(Boolean((await mine.changeTravelStatusAction(mutationPrev, mutationForm('bad'))).error), 'German action validation');
  assert(revalidated.includes('/uz/travel'), 'mutation revalidates public listings');
  console.log('ALL SERVER ACTION TESTS PASSED');
} finally {
  try { await client.query('ROLLBACK'); console.log('ROLLBACK complete; no test data persisted.'); }
  finally {
    Module._resolveFilename = originalResolve;
    if (originalTs) require.extensions['.ts'] = originalTs; else delete require.extensions['.ts'];
    for (const id of stubIds) delete require.cache[id];
    for (const id of cached) delete require.cache[id];
    await client.end();
  }
}
