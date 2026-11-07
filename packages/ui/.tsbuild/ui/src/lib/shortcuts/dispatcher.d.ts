import { type ShortcutCombo } from './bindings';
import { ShortcutRegistry } from './registry';
import type { ShortcutActionId } from './schema';
export interface ShortcutDispatcherOptions {
    registry: ShortcutRegistry;
    getBinding: (actionId: ShortcutActionId) => ShortcutCombo;
    now?: () => number;
    timeoutMs?: number;
}
/** Stateless with respect to the DOM; callers decide whether a consumed event is prevented. */
export declare class ShortcutDispatcher {
    private readonly options;
    private readonly now;
    private readonly timeoutMs;
    private prefix;
    private prefixTarget;
    private expiresAt;
    private prefixSuspensionVersion;
    private readonly capturedPrefixEvents;
    constructor(options: ShortcutDispatcherOptions);
    dispatch(event: KeyboardEvent): boolean;
    clear(): void;
    getActivePrefixTarget(): EventTarget | null;
    handleBlur(): void;
    handleEscape(): boolean;
    hasActivePrefix(): boolean;
    dispatchActivePrefix(event: KeyboardEvent): boolean;
    consumeCapturedPrefixEvent(event: KeyboardEvent): boolean;
    private invoke;
    private getPrefixMatches;
    private getMatches;
}
