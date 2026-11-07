import type { SessionSidebarNavigationEntry } from '../sessionSidebarRowModel';
/**
 * The next session that needs attention, for the keyboard shortcut: the first
 * attention-section entry in the order the sidebar draws them, after the one
 * open now, wrapping around at the end. A session drawn twice (its zone and
 * its project) counts once, at its attention entry's place, whichever section
 * the sidebar draws first. When the open session is not
 * itself in an attention section — or none is open — the first attention
 * entry wins. Null when nothing needs attention.
 */
export declare const resolveNextAttentionEntry: (entries: readonly SessionSidebarNavigationEntry[], currentSessionId: string | null, isAttentionContainer: (containerKey: string) => boolean) => SessionSidebarNavigationEntry | null;
