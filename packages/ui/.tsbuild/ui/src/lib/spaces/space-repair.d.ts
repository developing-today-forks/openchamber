import { type SpaceEntry, type SpaceFailure } from './spaces-api';
import { type SpaceAction, type SpaceActionState, type SpaceMark } from './spaces-store';
/**
 * What is wrong with a space that exists, in the order the status line tells it: an action under
 * way or failed first, then what the host lists. Null for a space that runs and answers, and for
 * one that is being made or whose making failed, which the creation's own line covers.
 */
export type SpaceCondition = {
    kind: 'busy';
    action: SpaceAction;
} | {
    kind: 'action_failed';
    action: SpaceAction;
    failure: SpaceFailure;
} | {
    kind: 'container_gone';
} | {
    kind: 'gatekeeper_gone';
} | {
    kind: 'stopped';
} | {
    kind: 'stopped_idle';
} | {
    kind: 'damaged';
} | {
    kind: 'not_answering';
}
/** The space's machine cannot be asked; `gone` when the machine left Settings, so only a delete, which forgets the record, is left. */
 | {
    kind: 'unreachable';
    machine: string | null;
    gone: boolean;
};
export declare const spaceConditionOf: (entry: SpaceEntry | undefined, mark: SpaceMark | undefined, action: SpaceActionState | undefined) => SpaceCondition | null;
/**
 * Whether the line under a space's group says what is wrong with it: being made, failed,
 * stopped, out of reach, not answering, or an action under way. The group's stale mark shows
 * only when it does not, so a stopped space gets no second warning that reads like a fault.
 * It follows the state lines of `SpaceGroupStatus` only: the access and setup lines below them
 * say nothing about the session list, so the mark may sit beside them.
 */
export declare const spaceLineSaysState: (entry: SpaceEntry | undefined, mark: SpaceMark | undefined, action: SpaceActionState | undefined) => boolean;
/**
 * The actions the group's menu offers for a space, in order. A restart needs a running space
 * with a gatekeeper that a start can bring back; one whose gatekeeper is gone can only be stopped
 * or deleted. Nothing for a space that is being made or whose making failed, and nothing for one
 * whose machine is off, since every action would fail there; one whose machine left Settings
 * offers the delete that forgets its record.
 */
export declare const spaceMenuActionsOf: (entry: SpaceEntry | undefined) => SpaceAction[];
/**
 * Whether the space's work can be applied from its menu: a running space, or a stopped one that a
 * start brings back, which the apply dialog offers. A stopped space whose gatekeeper is gone never
 * starts again, so its work cannot be reached. Nor can a space whose project folder is gone from
 * the host: its work has nowhere to go.
 */
export declare const isSpaceApplicable: (entry: SpaceEntry | undefined) => boolean;
/** An action of the menu that cannot run now: the setup commands again while they still run. */
export declare const isSpaceActionUnavailable: (entry: SpaceEntry | undefined, action: SpaceAction) => boolean;
type SpaceActionOptions = {
    deleteUnsavedChats?: boolean;
};
/** A removal went through: its chats are on the Archive page, and the notice says so. */
export declare const noteRemoval: (spaceId: string, chats: {
    saved: number;
} | null) => void;
/**
 * Runs one action on a space, one at a time per space in this window, and reads the host's list
 * again afterwards whatever the outcome, because a failed restart may have left the space
 * stopped. A start or a restart that went through answered once the server inside was ready, so
 * the space is reachable again. The failure stays on the status line until the next action.
 */
export declare const runSpaceAction: (spaceId: string, action: SpaceAction, options?: SpaceActionOptions) => Promise<void>;
/**
 * What this window drops once the host removed a space, by a delete or after an apply: its
 * dialogs, then the host's lists read again. The group says "deleting" meanwhile: until the
 * session list's mark goes, the host's own view of the space, a container that is gone, read as
 * "not answering" with a restart to offer.
 */
export declare const forgetRemovedSpace: (spaceId: string) => Promise<void>;
export {};
