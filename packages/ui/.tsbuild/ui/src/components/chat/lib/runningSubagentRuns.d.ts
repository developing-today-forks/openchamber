/**
 * Background subagent runs that are working right now.
 *
 * A `subagent: true` command leaves nothing in the parent's transcript until
 * the job reports back (see `@/lib/opencode/subagent-run`), so the timeline
 * would show nothing while the subagent works. The live channel that does know
 * is the child session's status: a busy child of this session is a running
 * job. Children a `subagent` tool call already shows as its own row are left to
 * that row, and a child whose report has arrived is shown by the report.
 */
import { type SyntheticMessage } from '@/lib/opencode/model';
import type { State } from '@/sync/types';
import type { ChatMessageEntry } from './turns/types';
export declare const selectRunningSubagentRuns: (state: Pick<State, 'session' | 'session_status' | 'message' | 'part'>, parentSessionID: string) => SyntheticMessage[];
/** The timeline with each running run placed where its child session started. */
export declare const withRunningSubagentRuns: (messages: ChatMessageEntry[], runs: readonly SyntheticMessage[]) => ChatMessageEntry[];
/** The running subagent runs of a session, stable across unrelated store updates. */
export declare const useRunningSubagentRuns: (sessionID: string, directory?: string) => SyntheticMessage[];
