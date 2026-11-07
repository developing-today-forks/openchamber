import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { readManagedOpenCodeState, readDrainingOpenCodeRecords } from './packages/web/server/lib/opencode/managed-opencode-state.js';
import { registerSessionFoldersRoutes } from './packages/web/server/lib/session-folders/routes.js';
import { readPlanStore } from './packages/web/server/lib/routing/plans.js';
import { readPoolPlanLinks } from './packages/web/server/lib/routing/pool-plan-links.js';
import { createOverrideStore as cos2 } from './packages/web/server/lib/routing/route-overrides-store.js';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'oc-probe-'));
const MB = 1024 * 1024;
const mode = process.argv[2];

// ---------- oversized (whole-buffer) probes ----------
if (mode === 'big') {
  // 1. managed state: 33 MiB password string is schema-valid
  const state = { version: 1, pid: 4242, port: 4096, binary: '/bin/opencode', fingerprint: 'abc', password: 'x'.repeat(33 * MB), agentToolToken: null };
  const sp = path.join(root, 'state.json');
  fs.writeFileSync(sp, JSON.stringify(state));
  const got = readManagedOpenCodeState(sp);
  console.log('managed-state big:', got && got.password.length === 33 * MB ? 'PARSED-WHOLE' : 'NOT-PARSED', 'pwlen=', got?.password.length);
  const dp = path.join(root, 'draining.json');
  fs.writeFileSync(dp, JSON.stringify({ version: 1, draining: [{ pid: 1, port: 2, binary: 'b'.repeat(33 * MB), drainStartedAt: 1 }] }));
  const dr = readDrainingOpenCodeRecords(dp);
  console.log('draining big:', dr.length === 1 && dr[0].binary.length === 33 * MB ? 'PARSED-WHOLE' : 'NOT-PARSED');

  // 2. plans store: pad a plan name
  const { readPlanStore: rps } = await import('./packages/web/server/lib/routing/plans.js');
  const pdir = path.join(root, 'plans'); fs.mkdirSync(pdir);
  const store = { version: 1, plans: [{ id: 'p1', providerID: 'prov', label: 'n'.repeat(33 * MB), coverage: 'subscription', quotas: [], status: 'active', createdAt: 't', updatedAt: 't' }], models: {}, pools: {} };
  fs.writeFileSync(path.join(pdir, 'plans.json'), JSON.stringify(store));
  try { const v = rps(pdir); console.log('plans big:', v.plans[0].label.length === 33 * MB ? 'PARSED-WHOLE' : 'OTHER'); }
  catch (e) { console.log('plans big: THREW', e.code || e.message.slice(0, 80)); }
  const ldir = path.join(root, 'links'); fs.mkdirSync(ldir);
  fs.writeFileSync(path.join(ldir, 'pool-plan-links.json'), JSON.stringify({ version: 1, links: { ['t'.repeat(33 * MB)]: 'plan1' } }));
  try { const v = readPoolPlanLinks(ldir); console.log('pool-links big:', Object.keys(v.links)[0].length === 33 * MB ? 'PARSED-WHOLE' : 'OTHER'); }
  catch (e) { console.log('pool-links big: THREW', e.code || String(e.message).slice(0, 80)); }

  // 3. route feedback JSONL read whole
  const odir = path.join(root, 'ovr'); fs.mkdirSync(odir);
  const line = JSON.stringify({ time: 1, text: 'x'.repeat(1024) }) + '\n';
  fs.writeFileSync(path.join(odir, 'route-feedback.jsonl'), line.repeat(33 * 1024));
  const fb = cos2({ dataDir: odir }).readFeedback();
  console.log('feedback big:', fb.length === 33 * 1024 ? 'READ-WHOLE entries=' + fb.length : 'OTHER entries=' + fb.length);

  // 4. session-folders GET serves a 33 MiB snapshot whole
  const sdir = path.join(root, 'sf'); fs.mkdirSync(sdir);
  const snap = { version: 1, foldersMap: { s1: [{ id: 'f1', name: 'n'.repeat(33 * MB), sessionIds: [], createdAt: 1 }] }, collapsedFolderIds: [], deletedFolderIds: {}, updatedAt: 5 };
  fs.writeFileSync(path.join(sdir, 'sessions-directories.json'), JSON.stringify(snap));
  const handlers = {};
  const app = { get: (p, h) => { handlers['GET ' + p] = h; }, post: (p, h) => { handlers['POST ' + p] = h; }, put: (p, h) => { handlers['PUT ' + p] = h; }, patch: (p, h) => { handlers['PATCH ' + p] = h; }, delete: (p, h) => { handlers['DELETE ' + p] = h; } };
  registerSessionFoldersRoutes(app, { fsPromises: fs.promises, path, openchamberDataDir: sdir });
  let payload = null;
  const res = { json: (o) => { payload = o; }, status: (c) => ({ json: (o) => { payload = { status: c, ...o }; } }) };
  await handlers['GET /api/session-folders']({}, res);
  console.log('session-folders big:', payload?.foldersMap?.s1?.[0]?.name.length === 33 * MB ? 'SERVED-WHOLE' : 'OTHER ' + JSON.stringify(payload).slice(0, 80));
}

// ---------- FIFO probes (each expected to hang; driver applies timeout) ----------
if (mode === 'fifo-managed') {
  const fp = path.join(root, 'state.json'); execFileSync('mkfifo', [fp]);
  console.log('calling readManagedOpenCodeState on FIFO...');
  readManagedOpenCodeState(fp);
  console.log('RETURNED (not blocked)');
}
if (mode === 'fifo-plans') {
  const d = path.join(root, 'p'); fs.mkdirSync(d); execFileSync('mkfifo', [path.join(d, 'plans.json')]);
  console.log('calling readPlanStore on FIFO...');
  try { readPlanStore(d); } catch (e) { console.log('THREW', e.code || ''); }
  console.log('RETURNED (not blocked)');
}
if (mode === 'fifo-folders') {
  const d = path.join(root, 'sf'); fs.mkdirSync(d); execFileSync('mkfifo', [path.join(d, 'sessions-directories.json')]);
  const handlers = {};
  const app = { get: (p, h) => { handlers['GET ' + p] = h; }, post: () => {}, put: () => {}, patch: () => {}, delete: () => {} };
  registerSessionFoldersRoutes(app, { fsPromises: fs.promises, path, openchamberDataDir: d });
  let done = false;
  handlers['GET /api/session-folders']({}, { json: () => { done = true; }, status: () => ({ json: () => { done = true; } }) })
    .then(() => console.log('HANDLER SETTLED done=', done), (e) => console.log('HANDLER REJECTED', e.code || ''));
  setTimeout(() => console.log('after 2.5s: settled=', done), 2500);
}
console.log('probe-mode-done', mode);
