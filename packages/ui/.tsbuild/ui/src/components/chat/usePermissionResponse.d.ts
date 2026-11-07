import type { PermissionReply, PermissionRequest } from '@/types/permission';
/**
 * The reply a key press gives: Alt+Enter allows once, Alt+Shift+Enter always
 * (only when the request has something to save), Alt+Backspace denies.
 */
export declare const permissionShortcutReply: (event: Pick<KeyboardEvent, 'key' | 'altKey' | 'shiftKey' | 'metaKey' | 'ctrlKey'>, canSave: boolean) => PermissionReply | null;
/** The message a deny-with-feedback reply carries; blank text is no message. */
export declare const permissionFeedbackMessage: (text: string) => string | undefined;
/**
 * What a key press in the deny-feedback box means. Enter submits on desktop
 * and Shift+Enter inserts a newline; on mobile Enter inserts a newline and
 * only Cmd/Ctrl+Enter submits (the FormDock rule). Escape cancels back to the
 * buttons. IME composition never submits or cancels (mirrors
 * `isIMECompositionEvent` in lib/ime).
 */
export declare const permissionFeedbackKeyAction: (event: Pick<KeyboardEvent, 'key' | 'shiftKey' | 'metaKey' | 'ctrlKey' | 'isComposing' | 'keyCode'>, isMobile: boolean) => 'submit' | 'cancel' | null;
/** The request was raised by a subagent below the session the user is looking at, at any depth. */
export declare const usePermissionFromSubagent: (permission: PermissionRequest) => boolean;
/**
 * Replies to one request and owns its keyboard shortcuts while it is the
 * newest pending one (see `permissionShortcutReply`). Shared by the inline
 * card and the dock.
 */
export declare const usePermissionResponse: (permission: PermissionRequest, onResponse?: (response: PermissionReply) => void) => {
    isResponding: boolean;
    hasResponded: boolean;
    respond: (response: PermissionReply, message?: string) => Promise<void>;
};
