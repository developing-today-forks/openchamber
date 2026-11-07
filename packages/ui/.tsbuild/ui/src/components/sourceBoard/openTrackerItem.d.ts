import type { GitHubReferenceKind } from '@/lib/api/types';
type TrackerTarget = {
    source: 'repository';
    kind: GitHubReferenceKind;
} | {
    source: 'linear';
    identifier: string;
};
/** What a link names, as the board and the Tracker show it; null for anything else. */
export declare const trackerTargetOfUrl: (url: string) => TrackerTarget | null;
/** The repository a link to an issue or PR points into, as `https://host/owner/name` in lowercase; null for anything else. */
export declare const repositoryUrlOfItemLink: (url: string) => string | null;
/** Whether two links name the same issue or PR, whatever page of it each opens. */
export declare const isSameRepositoryItemLink: (left: string, right: string) => boolean;
/** What a Tracker tab is called: `#12`, `!7` for a GitLab merge request, `ENG-7`. */
export declare const trackerItemLabel: (url: string) => string | null;
export declare const wasTrackerItemRequested: (panelDirectory: string, tabId: string) => boolean;
/** The tab has shown its item once: a later failure no longer sends anyone to the browser. */
export declare const settleTrackerItemRequest: (panelDirectory: string, tabId: string) => void;
/**
 * Shows the issue, PR or Linear issue a link names. On desktop and web it
 * opens as a tab of the Tracker beside the chat on screen, read through the
 * project of `directory` without the app moving there; the phone, which has
 * no side panel, shows it on the issues and PRs board. False, with nothing
 * opened, for anything neither can show here: another kind of link, VS Code,
 * a project that is not open, Linear while it is not connected.
 */
export declare function useShowTrackerItem(): (url: string, directory: string | null | undefined) => boolean;
/**
 * Opens the issues and PRs board on a project's repository; null in VS Code,
 * where there is no board.
 */
export declare function useOpenProjectOnBoard(): ((projectId: string) => void) | null;
/**
 * Opens an issue, PR or Linear issue a session is linked to
 * (`useShowTrackerItem`). Cmd or Ctrl opens the link itself, as links do; so
 * does anything the app cannot show here.
 */
export declare function useOpenTrackerItem(): (url: string, directory: string | null | undefined, event?: {
    metaKey: boolean;
    ctrlKey: boolean;
}) => void;
export {};
