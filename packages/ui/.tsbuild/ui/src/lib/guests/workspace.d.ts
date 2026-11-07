import { type GuestWorkspaceQuery, type GuestWorkspaceSnapshot } from '@openchamber/sdk';
import type { WorktreeMetadata } from '@/types/worktree';
export declare const guestProject: (projectId: string) => import("../api/types").ProjectEntry;
export declare const guestProjectWorktrees: (directory: string) => WorktreeMetadata[];
/** Store projection only. Layout-owned sync and topology discovery supply hydration. */
export declare const readGuestWorkspace: (query: GuestWorkspaceQuery, guestId: string) => GuestWorkspaceSnapshot;
/** One projection/subscription set per extension and query, shared by its frames. */
export declare const observeGuestWorkspace: (query: GuestWorkspaceQuery, guestId: string, listener: (snapshot: GuestWorkspaceSnapshot) => void) => (() => void);
export declare const openGuestSession: (sessionId: string) => void;
