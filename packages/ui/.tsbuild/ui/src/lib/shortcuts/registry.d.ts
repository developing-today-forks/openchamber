import type { ShortcutActionId } from './schema';
export type ShortcutHandler = (event: KeyboardEvent) => boolean | void;
/** Active application command handlers, keyed by shortcut action ID. */
export declare class ShortcutRegistry {
    private readonly handlers;
    private suspensionCount;
    private suspensionVersion;
    register(actionId: ShortcutActionId, handler: ShortcutHandler): () => void;
    get(actionId: ShortcutActionId): ShortcutHandler | undefined;
    /** Every handler for the action in registration order; dispatch asks the next one when a handler declines. */
    getAll(actionId: ShortcutActionId): ShortcutHandler[];
    /** Runs an action outside keyboard dispatch (command palette). Bypasses
        suspension: the invoking surface, not the keyboard, owns the gesture. */
    invoke(actionId: ShortcutActionId): boolean;
    /** Temporarily disables every registered application shortcut. */
    suspend(): () => void;
    getSuspensionVersion(): number;
    isSuspended(): boolean;
    actionIds(): IterableIterator<ShortcutActionId>;
}
/** Shared registry for application commands registered by React surfaces. */
export declare const shortcutRegistry: ShortcutRegistry;
