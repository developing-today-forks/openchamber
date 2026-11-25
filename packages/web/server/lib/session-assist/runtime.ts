import fs from 'fs';
import os from 'os';
import path from 'path';
import { OpenCode } from '@opencode/client';
import { z } from 'zod';
import { readMergedSettingsSync } from '../settings/settings-files.js';
import { isString } from '../shared/guards.js';
import { sessionParentId } from '../session-lineage.js';
import { loadAssistContext, newestContentId } from './context.js';
import { buildAssistPrompt, buildAssistSystemPrompt } from './prompt.js';
import type { AssistTargets } from './contracts.js';
import type { createSessionLineage } from '../session-lineage.js';
import type { TurnEndInput } from '../session-work/runtime.js';
import type { describeSmallModel, generateSmallModelText } from '../small-model/index.js';

export interface SessionAssistSummary {
  done: string;
  left: string;
  stoppedAt: string;
}

export interface SessionAssist {
  recap: string;
  suggestion: string;
  // `null` deletes a summary left by an earlier write: the metadata store
  // merges objects key by key, so an omitted key would keep the old one.
  summary: SessionAssistSummary | null;
  forMessageID: string;
  generatedAt: number;
}

export type SummarizeRefusal = 'disabled' | 'busy' | 'child' | 'archived' | 'reverted' | 'not-found' | 'no-model' | 'local-model' | 'unavailable';

/** What one on-demand summary request came to. */
export type SummarizeOutcome =
  | { status: 'written' }
  | { status: 'fresh' }
  | { status: 'empty' }
  | { status: 'refused'; reason: SummarizeRefusal }
  | { status: 'cooldown'; retryAfterMs: number }
  | { status: 'capacity' }
  | { status: 'cancelled' }
  | { status: 'failed'; reason: string };

export type SummarizeTrigger = 'manual' | 'hover';

export interface SessionAssistOptions {
  buildOpenCodeUrl: (route: string, query: string) => string;
  getOpenCodeAuthHeaders: () => Record<string, string>;
  getSmallModelService: () => Promise<{
    describeSmallModel: typeof describeSmallModel;
    generateSmallModelText: typeof generateSmallModelText;
  }>;
  getTargets?: () => AssistTargets;
  quietMs?: number;
  persistSessionAssist?: ((sessionId: string, directory: string | undefined, assist: SessionAssist | null) => void) | null;
  isSessionArchived?: (sessionId: string) => Promise<boolean>;
  evaluateTurn?: ((input: TurnEndInput) => Promise<AssistTargets | null>) | null;
  lineage?: Pick<ReturnType<typeof createSessionLineage>, 'remember' | 'isChild'> | null;
  onPendingChange?: (change: { sessionId: string; directory: string | undefined; pending: boolean }) => void;
  getHoverSummaryEnabled?: () => boolean;
  summaryCooldownMs?: number;
  maxConcurrentSummaries?: number;
}

export interface AssistEvent {
  type?: unknown;
  properties?: {
    status?: unknown;
    info?: unknown;
    sessionID?: unknown;
    directory?: unknown;
  } | null;
}

interface EventInfo {
  type?: unknown;
  directory?: unknown;
  role?: unknown;
  sessionID?: unknown;
  time?: unknown;
}

const isEventInfo = (value: unknown): value is EventInfo => Boolean(value && typeof value === 'object');
const isEventProperties = (value: unknown): value is NonNullable<AssistEvent['properties']> => Boolean(value && typeof value === 'object');
const isNumber = (value: unknown): value is number => typeof value === 'number';
const hasCreated = (value: unknown): value is { created?: unknown } => value != null;
interface FailureFields {
  statusCode?: unknown;
  code?: unknown;
  message?: unknown;
  _tag?: unknown;
}
const hasFailureFields = (value: unknown): value is FailureFields => value != null;
const isJsonObject = (value: unknown): value is Record<string, unknown> => Boolean(value && typeof value === 'object' && !Array.isArray(value));

interface PendingRun {
  directory: string;
  armedAt: number;
  allowed: AssistTargets;
}

const OPENCHAMBER_SETTINGS_FILE = path.join(
  process.env.OPENCHAMBER_DATA_DIR
    ? path.resolve(process.env.OPENCHAMBER_DATA_DIR)
    : path.join(os.homedir(), '.config', 'openchamber'),
  'settings.json',
);

const getSessionAssistTargets = () => {
  const settings = readMergedSettingsSync({ fs, path, settingsFilePath: OPENCHAMBER_SETTINGS_FILE });
  return {
    recap: settings.sessionRecapEnabled !== false,
    suggestion: settings.sessionSuggestionEnabled !== false,
  };
};

const getHoverSummarySetting = () =>
  readMergedSettingsSync({ fs, path, settingsFilePath: OPENCHAMBER_SETTINGS_FILE }).sessionHoverSummaryEnabled !== false;

const IDLE_QUIET_MS = 60_000;
const RECAP_CHAR_LIMIT = 320;
const SUGGESTION_CHAR_LIMIT = 500;
const SUMMARY_FIELD_CHAR_LIMIT = 200;
// A failed or empty on-demand run is not retried for this long, so a card
// left open (or hovered again and again) cannot turn into a stream of model
// calls for a session the model cannot summarize. A written summary needs no
// cooldown: the next request answers `fresh` from the stored one.
const SUMMARY_COOLDOWN_MS = 30_000;
// On-demand runs across all sessions at once; hovering down a list must not
// fan out one model call per row.
const MAX_CONCURRENT_SUMMARIES = 2;

// A plain slice at the cap can land between the halves of a surrogate pair,
// leaving a lone high surrogate that is persisted to the session metadata
// store and encodes as U+FFFD on every later display; move a cut that lands
// inside a pair back to the pair boundary (same guard as session-assist/context.js).
const clipPairSafe = (text: string, limit: number) => {
  const clipped = text.slice(0, limit);
  const last = clipped.charCodeAt(clipped.length - 1);
  return last >= 0xd800 && last <= 0xdbff ? clipped.slice(0, -1) : clipped;
};
const FETCH_TIMEOUT_MS = 5_000;
const GENERATION_TIMEOUT_MS = 120_000;
const TAIL_RECHECK_LIMIT = 8;
const QUIET_FAILURE_CODES = new Set(['context-too-small', 'output-exhausted']);

const describeGenerationFailure = (failure: FailureFields | undefined) => {
  const parts = [];
  const status = Number(failure?.statusCode);
  if (Number.isFinite(status)) parts.push(`status ${status}`);
  const code = isString(failure?.code) ? failure.code.trim() : '';
  if (code) parts.push(`code ${code}`);
  const message = isString(failure?.message) ? failure.message.trim() : '';
  if (message) parts.push(message.replace(/\s+/g, ' ').slice(0, 300));
  const tag = isString(failure?._tag) ? failure._tag.trim() : '';
  if (tag) parts.push(`tag ${tag}`);
  return parts.join(' | ');
};

const extractJsonObject = (value: string | undefined) => {
  const text = String(value ?? '').trim();
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = (fenced?.[1] ?? text).trim();
  const start = candidate.indexOf('{');
  if (start < 0) return null;
  for (let end = candidate.length; end > start; end -= 1) {
    if (candidate[end - 1] !== '}') continue;
    try {
      const parsed: unknown = JSON.parse(candidate.slice(start, end));
      if (isJsonObject(parsed)) {
        return parsed;
      }
    } catch {
      continue;
    }
  }
  return null;
};

const extractSessionStatus = (payload: AssistEvent | null | undefined) => {
  if (!payload || payload.type !== 'session.status') return null;
  const properties = isEventProperties(payload.properties) ? payload.properties : {};
  const status = isEventInfo(properties.status) ? properties.status : {};
  const info = isEventInfo(properties.info) ? properties.info : {};
  const sessionId = isString(properties.sessionID) ? properties.sessionID.trim() : '';
  const type = isString(status.type)
    ? status.type.trim()
    : (isString(info.type) ? info.type.trim() : '');
  if (!sessionId || !type) return null;
  const directory = isString(properties.directory) && properties.directory
    ? properties.directory
    : (isString(info.directory) ? info.directory : '');
  return { sessionId, type, directory };
};

const extractUserMessage = (payload: AssistEvent | null | undefined) => {
  if (!payload || payload.type !== 'message.updated') return null;
  const info = payload.properties?.info;
  if (!isEventInfo(info) || info.role !== 'user') return null;
  if (!isString(info.sessionID) || !info.sessionID) return null;
  return {
    sessionId: info.sessionID,
    createdAt: hasCreated(info.time) && isNumber(info.time.created) ? info.time.created : 0,
  };
};

const summaryField = z.string().transform((text) => clipPairSafe(text.trim(), SUMMARY_FIELD_CHAR_LIMIT)).catch('');
const generatedSummarySchema = z.object({ done: summaryField, left: summaryField, stoppedAt: summaryField });

// What an earlier write left in the session's metadata: enough to tell a
// current summary and to keep a suggestion written for the same answer.
const storedAssistSchema = z.object({
  openchamber: z.object({
    assist: z.object({
      recap: z.string().catch(''),
      suggestion: z.string().catch(''),
      forMessageID: z.string().catch(''),
      generatedAt: z.number().catch(0),
      summary: z.object({ done: z.string().trim().min(1), left: z.string().catch(''), stoppedAt: z.string().catch('') }).nullable().catch(null),
    }),
  }),
});

const sessionNotFoundSchema = z.union([
  z.object({ _tag: z.literal('SessionNotFoundError') }),
  z.object({ statusCode: z.literal(404) }),
]);

const COOLDOWN_STATUSES = new Set<SummarizeOutcome['status']>(['empty', 'failed']);

export const createSessionAssistRuntime = ({
  buildOpenCodeUrl,
  getOpenCodeAuthHeaders,
  getSmallModelService,
  getTargets = getSessionAssistTargets,
  quietMs = IDLE_QUIET_MS,
  persistSessionAssist = null,
  isSessionArchived = async () => false,
  evaluateTurn = null,
  lineage = null,
  onPendingChange = () => {},
  getHoverSummaryEnabled = getHoverSummarySetting,
  summaryCooldownMs = SUMMARY_COOLDOWN_MS,
  maxConcurrentSummaries = MAX_CONCURRENT_SUMMARIES,
}: SessionAssistOptions) => {
  const timers = new Map<string, { timer: ReturnType<typeof setTimeout>; armedAt: number }>();
  const gates = new Map<string, { armedAt: number }>();
  const inflight = new Map<string, { controller: AbortController; armedAt: number; done: Promise<unknown> }>();
  const ready = new Map<string, PendingRun>();
  const persisted = new Map<string, string>();
  const announced = new Map<string, string>();
  const summaries = new Map<string, { controller: AbortController; waiters: number; outcome: Promise<SummarizeOutcome> }>();
  const cooldowns = new Map<string, number>();
  let stopped = false;

  const announce = (sessionId: string, directory = '') => {
    const pending = !stopped && (gates.has(sessionId) || timers.has(sessionId)
      || inflight.has(sessionId) || ready.has(sessionId));
    if (pending === announced.has(sessionId)) return;
    const announcedDirectory = pending ? directory : announced.get(sessionId);
    if (pending) announced.set(sessionId, directory);
    else announced.delete(sessionId);
    onPendingChange({ sessionId, directory: announcedDirectory, pending });
  };

  const clearTimer = (sessionId: string) => {
    const existing = timers.get(sessionId);
    if (existing) {
      clearTimeout(existing.timer);
      timers.delete(sessionId);
    }
  };

  const invalidate = (sessionId: string) => {
    clearTimer(sessionId);
    gates.delete(sessionId);
    ready.delete(sessionId);
    inflight.get(sessionId)?.controller.abort();
    announce(sessionId);
  };

  const retireStored = (sessionId: string, directory: string) => {
    if (!persisted.has(sessionId)) return;
    const storedDirectory = persisted.get(sessionId);
    persisted.delete(sessionId);
    Promise.resolve(persistSessionAssist?.(sessionId, directory || storedDirectory, null))
      .catch(() => console.warn('[session-assist] failed to retire a stale assist'));
  };

  const localSkipNotices = new Set<string>();
  const reportLocalSkip = (providerID: string | undefined, modelID: string | undefined) => {
    const key = `${providerID}/${modelID}`;
    if (localSkipNotices.has(key)) return;
    localSkipNotices.add(key);
    console.log(`[session-assist] skipped: ${key} is served from a local endpoint and is the session's own model, so a side request would evict its prompt cache. Set a different Small Model to get a recap or a suggestion`);
  };

  /**
   * One generation for one session. The turn-end path ignores the outcome;
   * an on-demand run (`onDemand`) reports it, also asks OpenCode whether the
   * session is running, answers `fresh` when the stored summary is current,
   * and needs a summary to count as written.
   */
  const generateAssist = async (sessionId: string, directory: string, signal: AbortSignal, allowed: AssistTargets, onDemand = false): Promise<SummarizeOutcome> => {
    const enabledTargets = getTargets();
    const targets = {
      recap: enabledTargets.recap && allowed.recap,
      suggestion: enabledTargets.suggestion && allowed.suggestion,
    };
    if (!targets.recap && !targets.suggestion) return { status: 'refused', reason: 'disabled' };
    const baseUrl = buildOpenCodeUrl('/', '').replace(/\/$/, '');
    const headers = { ...getOpenCodeAuthHeaders() };
    if (directory) headers['x-opencode-directory'] = encodeURIComponent(directory);
    const client = OpenCode.make({
      baseUrl,
      headers,
    });
    const requestOptions = () => ({ signal: AbortSignal.any([signal, AbortSignal.timeout(FETCH_TIMEOUT_MS)]) });
    const checkCurrent = () => {
      signal.throwIfAborted();
      if (buildOpenCodeUrl('/', '').replace(/\/$/, '') !== baseUrl) throw new Error('Session assist runtime changed');
    };
    const session = await client.session.get({ sessionID: sessionId }, requestOptions());
    checkCurrent();
    if (session?.id === sessionId) lineage?.remember(sessionId, sessionParentId(session));
    if (session?.id !== sessionId) return { status: 'refused', reason: 'not-found' };
    if (sessionParentId(session)) return { status: 'refused', reason: 'child' };
    if (session.revert?.messageID) return { status: 'refused', reason: 'reverted' };
    if (await isSessionArchived(sessionId)) return { status: 'refused', reason: 'archived' };
    if (onDemand) {
      const active = await client.session.active(requestOptions());
      checkCurrent();
      if (isJsonObject(active) && active[sessionId]) return { status: 'refused', reason: 'busy' };
      // The freshness rule of `getCurrentSessionAssist` in the UI.
      const stored = storedAssistSchema.safeParse(session.metadata).data?.openchamber.assist;
      if (stored?.summary && stored.generatedAt >= (session.time?.idle ?? 0)) return { status: 'fresh' };
    }
    const context = await loadAssistContext({
      signal,
      readPage: ({ limit, cursor }: { limit: number; cursor: string | undefined }) => client.message.list(
        { sessionID: sessionId, limit, ...(cursor ? { cursor } : { order: 'desc' }) },
        requestOptions(),
      ),
    });
    checkCurrent();
    if (!context) return { status: 'empty' };
    const { last, turns } = context;
    const { describeSmallModel, generateSmallModelText } = await getSmallModelService();
    const preferredProviderID = last.providerID;
    const preferredModelID = last.modelID;
    const described = await describeSmallModel({ directory, preferredProviderID, preferredModelID });
    checkCurrent();
    if (!described) return { status: 'refused', reason: 'no-model' };
    if (described.localEndpoint
      && described.providerID === preferredProviderID
      && described.modelID === preferredModelID) {
      reportLocalSkip(preferredProviderID, preferredModelID);
      return { status: 'refused', reason: 'local-model' };
    }
    const system = buildAssistSystemPrompt(targets);
    const prompt = buildAssistPrompt(turns, targets, described.inputCharBudget - system.length - 512);
    if (!prompt) return { status: 'failed', reason: 'context-too-large' };
    let generated;
    try {
      generated = await generateSmallModelText({
        prompt: prompt.text, system, directory,
        preferredProviderID, preferredModelID,
        onOverflow: 'error', timeoutMs: GENERATION_TIMEOUT_MS, signal,
      });
    } catch (error) {
      const failure = hasFailureFields(error) ? error : undefined;
      if (signal.aborted) return { status: 'cancelled' };
      if (Number(failure?.statusCode) !== 404 && !(isString(failure?.code) && QUIET_FAILURE_CODES.has(failure.code))) {
        console.warn('[session-assist] generation failed', describeGenerationFailure(failure));
      }
      return { status: 'failed', reason: isString(failure?.code) && failure.code.trim() ? failure.code.trim() : 'generation-failed' };
    }
    checkCurrent();
    const structured = extractJsonObject(generated?.text);
    let recap = targets.recap && isString(structured?.recap) ? clipPairSafe(structured.recap.trim(), RECAP_CHAR_LIMIT) : '';
    let suggestion = targets.suggestion && isString(structured?.suggestion) ? clipPairSafe(structured.suggestion.trim(), SUGGESTION_CHAR_LIMIT) : '';
    const parsedSummary = targets.recap ? generatedSummarySchema.safeParse(structured).data : undefined;
    let summary = parsedSummary?.done ? parsedSummary : null;
    const hasCyrillic = (text: string) => /[\u0400-\u04FF]/.test(text);
    const hasCjk = (text: string) => /[\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/.test(text);
    const scriptMismatch = (text: string) => prompt.language && ((hasCyrillic(text) && !hasCyrillic(prompt.language))
      || (hasCjk(text) && !hasCjk(prompt.language)));
    if (recap && scriptMismatch(recap)) recap = '';
    if (suggestion && scriptMismatch(suggestion)) suggestion = '';
    if (summary && scriptMismatch(`${summary.done} ${summary.left} ${summary.stoppedAt}`)) summary = null;
    if (onDemand ? !summary : (!recap && !suggestion && !summary)) return { status: 'failed', reason: 'unusable-output' };
    const latestPage = await client.message.list({ sessionID: sessionId, limit: TAIL_RECHECK_LIMIT, order: 'desc' }, requestOptions());
    checkCurrent();
    if (newestContentId(latestPage?.data) !== last.id) return { status: 'cancelled' };
    const freshSession = await client.session.get({ sessionID: sessionId }, requestOptions());
    checkCurrent();
    if (freshSession?.id !== sessionId || freshSession.revert?.messageID || freshSession.location?.directory !== session.location?.directory) return { status: 'cancelled' };
    if (await isSessionArchived(sessionId)) return { status: 'cancelled' };
    checkCurrent();
    const enabled = getTargets();
    if (!enabled.recap || !allowed.recap) {
      recap = '';
      summary = null;
    }
    if (!enabled.suggestion || !allowed.suggestion) suggestion = '';
    // What an earlier write for this same answer holds stays: an on-demand
    // run asks for no suggestion, and a turn-end run gated to the suggestion
    // alone (or whose model left the summary out) must not erase a summary
    // the hover card already asked for.
    const stored = storedAssistSchema.safeParse(freshSession.metadata).data?.openchamber.assist;
    if (stored && stored.forMessageID === last.id) {
      if (onDemand && enabled.suggestion) suggestion = stored.suggestion;
      if (!onDemand && enabled.recap && !summary && stored.summary) {
        summary = stored.summary;
        recap ||= stored.recap;
      }
    }
    if (!recap && !suggestion && !summary) return { status: 'refused', reason: 'disabled' };
    await persistSessionAssist?.(sessionId, directory, {
      recap,
      suggestion,
      summary,
      forMessageID: last.id,
      generatedAt: Date.now(),
    });
    persisted.set(sessionId, directory);
    return onDemand && !summary ? { status: 'refused', reason: 'disabled' } : { status: 'written' };
  };

  const finishRun = (sessionId: string) => {
    inflight.delete(sessionId);
    const next = ready.get(sessionId);
    if (next) {
      ready.delete(sessionId);
      startGeneration(sessionId, next.directory, next.armedAt, next.allowed);
    }
    announce(sessionId);
  };

  const startGeneration = (sessionId: string, directory: string, armedAt: number, allowed: AssistTargets) => {
    if (stopped) return;
    if (inflight.has(sessionId)) {
      ready.set(sessionId, { directory, armedAt, allowed });
      return;
    }
    const controller = new AbortController();
    const done = generateAssist(sessionId, directory, controller.signal, allowed)
      .catch(() => {
        if (!controller.signal.aborted) console.warn('[session-assist] failed to read or save assistance');
      })
      .finally(() => finishRun(sessionId));
    inflight.set(sessionId, { controller, armedAt, done });
  };

  const ON_DEMAND_FIELDS = { recap: true, suggestion: false };

  const runSummary = async (sessionId: string, directory: string, controller: AbortController): Promise<SummarizeOutcome> => {
    // One generation per session: wait for a turn-end run already reading
    // this session, then check freshness against what it wrote.
    for (let running = inflight.get(sessionId); running; running = inflight.get(sessionId)) {
      await running.done;
      if (controller.signal.aborted || stopped) return { status: 'cancelled' };
    }
    const done = generateAssist(sessionId, directory, controller.signal, ON_DEMAND_FIELDS, true)
      .catch((error): SummarizeOutcome => {
        if (controller.signal.aborted) return { status: 'cancelled' };
        if (sessionNotFoundSchema.safeParse(error).success) return { status: 'refused', reason: 'not-found' };
        console.warn('[session-assist] on-demand summary failed to read or save');
        return { status: 'failed', reason: 'read-failed' };
      })
      .finally(() => finishRun(sessionId));
    inflight.set(sessionId, { controller, armedAt: Date.now(), done });
    announce(sessionId, directory);
    return done;
  };

  const awaitSummary = (run: { controller: AbortController; waiters: number; outcome: Promise<SummarizeOutcome> }, signal: AbortSignal | undefined): Promise<SummarizeOutcome> => {
    run.waiters += 1;
    if (!signal) return run.outcome;
    return new Promise<SummarizeOutcome>((resolve) => {
      const leave = () => {
        run.waiters -= 1;
        // The last caller gone (a closed request) stops the run.
        if (run.waiters === 0) run.controller.abort();
        resolve({ status: 'cancelled' });
      };
      if (signal.aborted) {
        leave();
        return;
      }
      signal.addEventListener('abort', leave, { once: true });
      void run.outcome.then((outcome) => {
        signal.removeEventListener('abort', leave);
        resolve(outcome);
      });
    });
  };

  /**
   * Summarize one session now, for the sidebar's hover card. Requests for a
   * session already being summarized join that run.
   */
  const summarizeNow = (sessionId: string, directory: string, { trigger, signal }: { trigger: SummarizeTrigger; signal?: AbortSignal }): Promise<SummarizeOutcome> => {
    if (stopped || !persistSessionAssist) return Promise.resolve({ status: 'refused', reason: 'unavailable' });
    if (!getTargets().recap || (trigger === 'hover' && !getHoverSummaryEnabled())) {
      return Promise.resolve({ status: 'refused', reason: 'disabled' });
    }
    if (lineage?.isChild(sessionId) === true) return Promise.resolve({ status: 'refused', reason: 'child' });
    const joined = summaries.get(sessionId);
    if (joined) return awaitSummary(joined, signal);
    const until = cooldowns.get(sessionId) ?? 0;
    const now = Date.now();
    if (until > now) return Promise.resolve({ status: 'cooldown', retryAfterMs: until - now });
    cooldowns.delete(sessionId);
    if (summaries.size >= maxConcurrentSummaries) return Promise.resolve({ status: 'capacity' });
    const controller = new AbortController();
    const outcome = runSummary(sessionId, directory, controller).then((result) => {
      summaries.delete(sessionId);
      if (COOLDOWN_STATUSES.has(result.status)) cooldowns.set(sessionId, Date.now() + summaryCooldownMs);
      return result;
    });
    const run = { controller, waiters: 0, outcome };
    summaries.set(sessionId, run);
    return awaitSummary(run, signal);
  };

  const armTimer = (sessionId: string, directory: string, armedAt: number, allowed: AssistTargets) => {
    clearTimer(sessionId);
    const timer = setTimeout(() => {
      timers.delete(sessionId);
      startGeneration(sessionId, directory, armedAt, allowed);
      announce(sessionId);
    }, quietMs);
    timer.unref?.();
    timers.set(sessionId, { timer, armedAt });
    announce(sessionId, directory);
  };

  const ALL_FIELDS = { recap: true, suggestion: true };

  const onTurnEnd = (sessionId: string, directory: string) => {
    clearTimer(sessionId);
    const armedAt = Date.now();
    const enabled = getTargets();
    if (!enabled.recap && !enabled.suggestion) {
      gates.delete(sessionId);
      announce(sessionId);
      return;
    }
    if (!evaluateTurn) {
      armTimer(sessionId, directory, armedAt, ALL_FIELDS);
      return;
    }
    const gate = { armedAt };
    gates.set(sessionId, gate);
    announce(sessionId, directory);
    Promise.resolve()
      .then(() => evaluateTurn({ sessionId, directory, assist: enabled }))
      .catch(() => null)
      .then((allowed) => {
        if (stopped || gates.get(sessionId) !== gate) return;
        gates.delete(sessionId);
        const fields = allowed ?? ALL_FIELDS;
        if (fields.recap || fields.suggestion) armTimer(sessionId, directory, armedAt, fields);
        announce(sessionId);
      });
  };

  let parkedNoticeLogged = false;
  const processPayload = (payload: AssistEvent | null | undefined, directoryHint = '') => {
    if (stopped) return;
    if (!persistSessionAssist) {
      if (!parkedNoticeLogged) {
        parkedNoticeLogged = true;
        console.log('[session-assist] parked: no session metadata store is wired, so a recap could not be saved');
      }
      return;
    }
    const status = extractSessionStatus(payload);
    if (status) {
      if (status.type === 'idle') {
        if (lineage?.isChild(status.sessionId) !== true) onTurnEnd(status.sessionId, status.directory || directoryHint);
      }
      else {
        invalidate(status.sessionId);
        retireStored(status.sessionId, status.directory || directoryHint);
      }
      return;
    }
    const userMessage = extractUserMessage(payload);
    if (userMessage) {
      const since = timers.get(userMessage.sessionId)?.armedAt
        ?? gates.get(userMessage.sessionId)?.armedAt
        ?? inflight.get(userMessage.sessionId)?.armedAt;
      if (since !== undefined && userMessage.createdAt >= since) invalidate(userMessage.sessionId);
    }
  };

  const stop = () => {
    stopped = true;
    for (const sessionId of timers.keys()) clearTimer(sessionId);
    gates.clear();
    ready.clear();
    for (const { controller } of inflight.values()) controller.abort();
    for (const { controller } of summaries.values()) controller.abort();
  };
  return { processPayload, summarizeNow, stop };
};
