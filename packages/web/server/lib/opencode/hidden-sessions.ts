
import { z } from 'zod';
import { readBoundedResponseJson } from '../shared/response-body.js';
import type { JsonValue } from '../shared/json-values.js';

const hiddenRecordSchema = z.object({ metadata: z.object({ hidden: z.literal(true) }) });

const wireSessionSchema = z.object({
  type: z.string().catch(''),
  data: z.object({
    sessionID: z.string().optional().catch(undefined),
    id: z.string().optional().catch(undefined),
    metadata: z.unknown().optional(),
    info: z.object({ id: z.string().optional().catch(undefined), metadata: z.unknown().optional() }).optional().catch(undefined),
  }),
});

const sessionPageSchema = z.object({ data: z.array(z.unknown()) }).passthrough();
const activeMapSchema = z.record(z.string(), z.unknown());
const activeAnswerSchema = z.object({ data: activeMapSchema }).passthrough();
const listPageSchema = z.object({
  data: z.array(z.object({ id: z.string() }).passthrough()),
  cursor: z.object({ next: z.string().nullish() }).partial().nullish(),
});

const SEED_PAGES = 10;
const hasSessionFields = (value: unknown): value is { id?: unknown } => value != null;
const optionalSession = <Session>(value: Session) => hasSessionFields(value) ? value : undefined;

export const createHiddenSessionRegistry = () => {
  const ids = new Set<unknown>();

  const isHiddenRecord = <Record>(record: Record) => hiddenRecordSchema.safeParse(record).success;
  const has = <SessionID, Record>(sessionID: SessionID, record?: Record) => ids.has(sessionID) || isHiddenRecord(record);
  const learn = <Session>(sessions: Session[]) => {
    for (const session of sessions) {
      const fields = optionalSession(session);
      if (isHiddenRecord(session) && fields?.id) ids.add(fields.id);
    }
  };
  const visible = <Session>(sessions: Session[]) => {
    learn(sessions);
    return sessions.filter((session) => !has(optionalSession(session)?.id, session));
  };
  const visibleActive = <Value>(map: Record<string, Value>) => Object.fromEntries(Object.entries(map).filter(([id]) => !ids.has(id)));

  return {
    add<SessionID>(sessionID: SessionID) {
      if (sessionID) ids.add(sessionID);
    },
    has,
    isHiddenPayload<Payload>(payload: Payload) {
      const parsed = wireSessionSchema.safeParse(payload);
      if (!parsed.success) return false;
      const { type, data } = parsed.data;
      const recordId = data.info?.id ?? data.sessionID ?? data.id;
      if (type.startsWith('session.') && recordId
        && (isHiddenRecord({ metadata: data.metadata }) || isHiddenRecord({ metadata: data.info?.metadata }))) {
        ids.add(recordId);
      }
      if (ids.size === 0) return false;
      return ids.has(data.sessionID) || ids.has(data.info?.id) || (type.startsWith('session.') && ids.has(data.id));
    },
    filterSessionList<Body>(body: Body) {
      if (Array.isArray(body)) return visible(body);
      const page = sessionPageSchema.safeParse(body);
      return page.success ? { ...page.data, data: visible(page.data.data) } : body;
    },
    filterActive<Body>(body: Body) {
      if (ids.size === 0) return body;
      const wrapped = activeAnswerSchema.safeParse(body);
      if (wrapped.success) return { ...wrapped.data, data: visibleActive(wrapped.data.data) };
      const bare = activeMapSchema.safeParse(body);
      return bare.success ? visibleActive(bare.data) : body;
    },
    async seed<Page>(readPage: (cursor: string | null) => Promise<Page>) {
      let cursor: string | null = null;
      for (let page = 0; page < SEED_PAGES; page += 1) {
        const parsed = listPageSchema.safeParse(await readPage(cursor));
        if (!parsed.success) return;
        learn(parsed.data.data);
        cursor = parsed.data.cursor?.next ?? null;
        if (!cursor) return;
      }
    },
  };
};

export const HIDDEN_SESSION_SEED_RESPONSE_MAX_BYTES = 16 * 1024 * 1024;
export const HIDDEN_SESSION_SEED_TIMEOUT_MS = 15_000;

export interface HiddenSessionSeedPageReaderOptions {
  buildOpenCodeUrl: (path: string, prefix: string) => string;
  getOpenCodeAuthHeaders: () => Record<string, string>;
  timeoutMs?: number;
  maxBytes?: number;
  fetchImpl?: typeof fetch;
}

/**
 * Reads one hidden-session seed page from the managed loopback OpenCode.
 * The read is bounded in both time and size: a wedged connection is cut by
 * the timeout, and an over-cap page returns null instead of buffering whole,
 * so `seed` stops cleanly on that page (its safeParse rejects null).
 */
export const createHiddenSessionSeedPageReader = ({
  buildOpenCodeUrl,
  getOpenCodeAuthHeaders,
  timeoutMs = HIDDEN_SESSION_SEED_TIMEOUT_MS,
  maxBytes = HIDDEN_SESSION_SEED_RESPONSE_MAX_BYTES,
  fetchImpl = fetch,
}: HiddenSessionSeedPageReaderOptions) => async (cursor: string | null): Promise<JsonValue> => {
  const query = cursor ? `?limit=200&cursor=${encodeURIComponent(cursor)}` : '?limit=200';
  const response = await fetchImpl(buildOpenCodeUrl(`/api/session${query}`, ''), {
    headers: getOpenCodeAuthHeaders(),
    signal: AbortSignal.timeout(timeoutMs),
  }).catch(() => null);
  if (!response?.ok) {
    await response?.body?.cancel().catch(() => {});
    return null;
  }
  return readBoundedResponseJson(response, maxBytes);
};
