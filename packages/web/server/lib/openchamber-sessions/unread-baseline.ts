
import fsDefault from 'node:fs';
import { randomUUID } from 'node:crypto';
import pathDefault from 'node:path';
import { z } from 'zod';
import { hasCode, hasMessage, isTimestamp } from './contracts.js';
import type { FileStoreOptions } from './contracts.js';

const FILE_NAME = 'sessions-unread.json';

const turnTimesSchema = z.object({
  idle: z.number(),
  viewed: z.number().optional(),
});

export interface UnreadBaselineOverlay {
  time: { viewed: number };
}

export function withUnreadBaseline<Session>(session: Session, since: number): Session | UnreadBaselineOverlay;
export function withUnreadBaseline<T extends { time?: object | null } | null | undefined>(session: T, since: number) {
  const times = turnTimesSchema.safeParse(session?.time);
  if (!times.success) return session;
  const { idle, viewed } = times.data;
  if (idle > since || (viewed !== undefined && viewed >= idle)) return session;
  return { ...session, time: { ...session?.time, viewed: idle } };
}

const hasSince = (value: unknown): value is { since: unknown } =>
  value !== null && value !== undefined && 'since' in Object(value);

const storedTimestamp = (raw: string) => {
  try {
    const stored: unknown = JSON.parse(raw);
    const since = hasSince(stored) ? stored.since : undefined;
    return isTimestamp(since) ? since : null;
  } catch {
    return null;
  }
};

export const createUnreadBaseline = ({
  dataDir,
  fsPromises = fsDefault.promises,
  path = pathDefault,
  now = Date.now,
}: FileStoreOptions) => {
  const filePath = path.join(dataDir, FILE_NAME);
  let loadPromise: Promise<number | null> | null = null;

  const create = async () => {
    const since = now();
    // Set once the exclusive temp file exists, so cleanup only removes a file
    // this write created and never a pre-existing entry at the temp path.
    let createdTmp: string | null = null;
    try {
      await fsPromises.mkdir(dataDir, { recursive: true });
      // Unpredictable per-write name, created exclusively: a planted symlink
      // or file at the temp path fails closed instead of being followed.
      const tmpPath = `${filePath}.${randomUUID()}.tmp`;
      await fsPromises.writeFile(tmpPath, JSON.stringify({ since }), { encoding: 'utf8', mode: 0o600, flag: 'wx' });
      createdTmp = tmpPath;
      await fsPromises.chmod(tmpPath, 0o600);
      await fsPromises.rename(tmpPath, filePath);
      createdTmp = null;
    } catch (error) {
      if (createdTmp) await fsPromises.rm(createdTmp, { force: true }).catch(() => {});
      console.warn('[openchamber-sessions] could not save the unread baseline:', (hasMessage(error) ? error.message : undefined) ?? error);
    }
    return since;
  };

  const read = async () => {
    let raw;
    try {
      raw = await fsPromises.readFile(filePath, 'utf8');
    } catch (error) {
      if (hasCode(error) && error.code === 'ENOENT') return { since: await create(), retry: false };
      console.warn('[openchamber-sessions] could not read the unread baseline:', (hasMessage(error) ? error.message : undefined) ?? error);
      return { since: null, retry: true };
    }
    const since = storedTimestamp(raw);
    if (since !== null) return { since, retry: false };
    console.warn(`[openchamber-sessions] the unread baseline in ${filePath} is unreadable; it is left as is`);
    return { since: null, retry: false };
  };

  const get = () => {
    if (!loadPromise) {
      loadPromise = read().then(({ since, retry }) => {
        if (retry) loadPromise = null;
        return since;
      });
    }
    return loadPromise;
  };

  return { get };
};
