/**
 * Overrides that OpenCode reads at routing time, and the feedback log the
 * interpreter learns from. Both live beside each other in OpenCode's data
 * directory, the same place OpenCode resolves `route-overrides.json`, so the
 * file format here must stay in step with `ModelRouteOverrides.parse`.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  isJsonObject,
  preserveMalformedJsonFileSync,
  readDurableJsonFileSync,
  writeDurableJsonFileSync,
} from '../shared/durable-json-store.js';

const ACTIONS = ['avoid', 'prefer', 'allow-over-budget'];

export const resolveOpenCodeDataDir = (env = process.env) => {
  const base = env.XDG_DATA_HOME?.trim() || path.join(os.homedir(), '.local', 'share');
  return path.join(base, 'opencode');
};

const strings = (value) =>
  Array.isArray(value) && value.every((item) => typeof item === 'string') ? value : [];

const parseOverride = (item) => {
  if (!item || typeof item !== 'object') return null;
  if (typeof item.id !== 'string' || !ACTIONS.includes(item.action)) return null;
  if (typeof item.until !== 'number' || !Number.isFinite(item.until)) return null;
  const providers = strings(item.providers);
  const models = strings(item.models);
  if (providers.length === 0 && models.length === 0) return null;
  const factor = typeof item.factor === 'number' && Number.isFinite(item.factor) && item.factor > 0 ? item.factor : undefined;
  return {
    id: item.id,
    action: item.action,
    providers,
    models,
    routes: strings(item.routes),
    fixed: item.fixed !== false,
    ...(factor !== undefined ? { factor } : {}),
    until: item.until,
    text: typeof item.text === 'string' ? item.text : '',
    summary: typeof item.summary === 'string' ? item.summary : '',
    source: item.source === 'interpreter' ? 'interpreter' : 'user',
    createdAt: typeof item.createdAt === 'number' ? item.createdAt : 0,
    ...(item.origin && typeof item.origin.key === 'string' && typeof item.origin.option === 'string'
      ? { origin: { key: item.origin.key, option: item.origin.option } }
      : {}),
  };
};

export const createOverrideStore = ({ dataDir = resolveOpenCodeDataDir(), now = () => Date.now() } = {}) => {
  const overridesFile = path.join(dataDir, 'route-overrides.json');
  const feedbackFile = path.join(dataDir, 'route-feedback.jsonl');

  // This store rides the shared durable-store primitive (design #976):
  // the sync spellings match this store's synchronous read and save. The
  // value judgement stays this store's own: the file is an object whose
  // `overrides`, when present, is an array; anything else is as malformed
  // as unparseable bytes. The parse error itself is never logged: Node's
  // JSON.parse messages quote the file content, and override text is the
  // user's own sentence.
  const validateValue = (value) =>
    isJsonObject(value) && (value.overrides === undefined || Array.isArray(value.overrides));

  const readAll = () => {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      let result;
      try {
        result = readDurableJsonFileSync(overridesFile, { validateValue });
      } catch (error) {
        // A read failure other than absence (EACCES, EISDIR, ...) warns
        // and reads as empty, the behaviour this store always had; the
        // primitive answers absence itself as 'missing'.
        console.warn('Failed to read route overrides file:', error);
        return [];
      }
      if (result.state === 'valid') {
        const list = result.value.overrides;
        return Array.isArray(list) ? list.map(parseOverride).filter(Boolean) : [];
      }
      // The primitive collapses an absent file and an existing empty file
      // into 'missing'. An empty file holds no overrides, so there is
      // nothing to preserve in either case.
      if (result.state === 'missing') return [];
      // A torn or otherwise unparseable overrides file is user data, not
      // an empty store: move its bytes aside before any later save can
      // overwrite them, and name the preserved copy so the loss is
      // recoverable.
      const preservation = preserveMalformedJsonFileSync(overridesFile, { validateValue });
      if (preservation.preserved) {
        console.warn(`Failed to read route overrides file: preserved the unreadable file at ${preservation.preservedPath}`);
        return [];
      }
      // A valid replacement landed while the malformed bytes were being
      // judged: read that file instead of answering from the stale one.
      if (preservation.outcome === 'replaced') continue;
      console.warn('Failed to read route overrides file: the file could not be parsed');
      console.warn('Failed to preserve the unreadable route overrides file');
      return [];
    }
    return [];
  };

  const save = (overrides) => {
    const live = overrides.filter((item) => item.until > now());
    fs.mkdirSync(dataDir, { recursive: true });
    // A save must not overwrite an unpreserved corrupt file: the preserve
    // helper re-reads and re-judges the on-disk bytes, and any failure to
    // read, judge, or preserve them refuses the save. A valid file, an
    // absent file, and an empty file need no preservation and the save
    // proceeds.
    const preservation = preserveMalformedJsonFileSync(overridesFile, { validateValue });
    if (preservation.outcome === 'failed') {
      throw new Error(`Refusing to overwrite the unreadable route overrides file at ${overridesFile}: it could not be preserved`);
    }
    if (preservation.preserved) {
      console.warn(`Failed to read route overrides file: preserved the unreadable file at ${preservation.preservedPath}`);
    }
    // The file mode is stated explicitly through the primitive: this
    // store never restricted its file (a plain write under the process
    // umask), so 0o666 keeps the effective mode it always had.
    writeDurableJsonFileSync(overridesFile, JSON.stringify({ version: 1, overrides: live }, null, 2), { mode: 0o666 });
    return live;
  };

  const list = () => readAll().filter((item) => item.until > now());

  const add = (items) => {
    const incoming = new Set(items.map((item) => item.id));
    return save([...readAll().filter((existing) => !incoming.has(existing.id)), ...items]);
  };

  const remove = (id) => {
    const existing = readAll();
    if (!existing.some((item) => item.id === id)) return false;
    save(existing.filter((item) => item.id !== id));
    return true;
  };

  const recordFeedback = (entry) => {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.appendFileSync(feedbackFile, `${JSON.stringify({ time: now(), ...entry })}\n`);
  };

  const readFeedback = () => {
    let text;
    try {
      text = fs.readFileSync(feedbackFile, 'utf8');
    } catch {
      return [];
    }
    return text
      .split('\n')
      .filter(Boolean)
      .flatMap((line) => {
        try {
          return [JSON.parse(line)];
        } catch {
          return [];
        }
      });
  };

  return { list, add, remove, recordFeedback, readFeedback, overridesFile, feedbackFile };
};
