import type { Message, Part } from "@/lib/opencode/model"
import { collectSessionTitleTurns } from '@/lib/sessionTitle';
import type { SessionMessageLoader, SessionMessageTarget } from './session-message-loader';

const MAX_PAGES = 8;

/** Share the normal loader's requests, stopping as soon as three pairs are covered. */
export async function loadSessionTitleTurns(input: {
  loader: Pick<SessionMessageLoader, 'getSnapshot' | 'ensure' | 'loadOlder'>;
  target: SessionMessageTarget;
  getRecords: () => { info: Message; parts: Part[] }[];
  revertMessageID?: string;
  signal: AbortSignal;
}) {
  const { loader, target, signal } = input;
  signal.throwIfAborted();
  const initial = loader.getSnapshot(target);
  await loader.ensure(target, { force: !initial.resolved || initial.status === 'error' });
  signal.throwIfAborted();
  const generation = loader.getSnapshot(target).generation;
  const visited = new Set<string>();
  let pageCount = 0;
  while (true) {
    signal.throwIfAborted();
    const state = loader.getSnapshot(target);
    if (state.status !== 'ready' || state.generation !== generation) {
      throw state.error ?? new Error('Session history is unavailable');
    }
    const turns = collectSessionTitleTurns(input.getRecords(), input.revertMessageID);
    if (turns.length === 3 || state.complete) return turns;
    if (!state.cursor || visited.has(state.cursor)) throw new Error('Session history pagination made no progress');
    if (pageCount >= MAX_PAGES) {
      // Reject on pathology to avoid partial-result side effects when an endpoint fails to terminate correctly.
      throw new Error('Session history pagination exceeded page cap');
    }
    visited.add(state.cursor);
    pageCount++;
    await loader.loadOlder(target);
  }
}
