import type { TerminalAPI } from './api/types';
import { reconcileTerminalSessionAuthority } from './projectActionTerminal';
type AuthorityResult = NonNullable<Awaited<ReturnType<typeof reconcileTerminalSessionAuthority>>>;
type RevisionCapture = (directory: string) => ReadonlyMap<string, number>;
type Listener = (result: AuthorityResult) => void;
/** One visible-demand loop per adapter. An empty directory observes all sessions. */
export declare const observeTerminalSessions: (terminal: TerminalAPI, directory: string, captureStartedActionMutationRevisions: RevisionCapture, listener: Listener) => (() => void);
export {};
