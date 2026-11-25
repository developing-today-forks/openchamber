import { create } from 'zustand';
import { z } from 'zod';
import { runtimeFetch } from '@/lib/runtime-fetch';

export type SessionSummaryRequestState = 'running' | 'written' | 'empty' | 'failed' | 'no-model' | 'refused';

interface SessionSummaryRequest {
  state: SessionSummaryRequestState;
  idleAt: number;
  settledAt: number;
}

const useSessionSummaryRequestStore = create<{ byId: Record<string, SessionSummaryRequest> }>(() => ({ byId: {} }));

const setEntry = (sessionId: string, entry: SessionSummaryRequest | null) => {
  useSessionSummaryRequestStore.setState((current) => {
    const byId = { ...current.byId };
    if (entry) byId[sessionId] = entry;
    else delete byId[sessionId];
    return { byId };
  });
};

const outcomeSchema = z.object({
  status: z.enum(['written', 'fresh', 'empty', 'refused', 'cooldown', 'capacity', 'cancelled', 'failed']),
  reason: z.string().optional(),
});

const stateOf = (outcome: z.infer<typeof outcomeSchema>): SessionSummaryRequestState | null => {
  switch (outcome.status) {
    case 'written':
    case 'fresh':
      return 'written';
    case 'empty':
      return 'empty';
    case 'refused':
      return outcome.reason === 'no-model' || outcome.reason === 'local-model' ? 'no-model' : 'refused';
    case 'cancelled':
    case 'cooldown':
    case 'capacity':
      return null;
    default:
      return 'failed';
  }
};

export async function requestSessionSummary({ sessionId, directory, idleAt, trigger }: {
  sessionId: string;
  directory: string;
  idleAt: number;
  trigger: 'manual' | 'hover';
}): Promise<void> {
  const previous = useSessionSummaryRequestStore.getState().byId[sessionId];
  const sameTurn = previous?.idleAt === idleAt;
  if (sameTurn && (previous.state === 'running' || trigger === 'hover')) return;
  setEntry(sessionId, { state: 'running', idleAt, settledAt: 0 });
  let state: SessionSummaryRequestState | null = 'failed';
  try {
    const response = await runtimeFetch(`/api/session-assist/sessions/${encodeURIComponent(sessionId)}/summary`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ directory, trigger }),
    });
    const parsed = outcomeSchema.safeParse(await response.json().catch(() => null));
    if (parsed.success) state = stateOf(parsed.data);
  } catch {
    state = 'failed';
  }
  if (useSessionSummaryRequestStore.getState().byId[sessionId]?.idleAt !== idleAt) return;
  setEntry(sessionId, state ? { state, idleAt, settledAt: Date.now() } : null);
}

export const useSessionSummaryRequest = (sessionId: string, idleAt: number): SessionSummaryRequest | null =>
  useSessionSummaryRequestStore((current) => {
    const entry = current.byId[sessionId];
    return entry && entry.idleAt === idleAt ? entry : null;
  });
