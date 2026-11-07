import React from 'react';
/**
 * Autosave for the OpenCode configuration pages (agents, commands, skills,
 * MCP, plugins, behavior).
 *
 * OpenCode v2 watches its own config files and applies changes within a second
 * or two, so these pages have no Save or Apply button. Toggles, selects and
 * pickers call `requestSave()` right after the state update; text fields are
 * committed by `onBlurCapture` on the page container (and by Cmd/Ctrl+Enter
 * where an editor supports it). Success is silent; a failed write is reported
 * with an error toast. There is no inline indicator: the write is not
 * something the user waits for.
 */
export type AutosaveResult = {
    ok: true;
    changed: boolean;
} | {
    ok: false;
    reason: string;
};
/** Nothing to write — the form matches the last successful save. */
export declare const AUTOSAVE_UNCHANGED: AutosaveResult;
/** Written. */
export declare const AUTOSAVE_SAVED: AutosaveResult;
/** Refused or failed; the reason is shown to the user verbatim. */
export declare const autosaveFailed: (reason: string) => AutosaveResult;
export interface Autosave {
    /**
     * Save after the current render commits, so the routine reads the state the
     * control just set. Repeated calls in one tick collapse into one save, and
     * requests made while a save is in flight collapse into one follow-up save
     * that runs after it and reads the latest form state.
     */
    requestSave: () => void;
    /**
     * Attach to the element wrapping the page's fields: leaving a text input,
     * textarea or editor commits it.
     */
    onBlurCapture: React.FocusEventHandler;
}
export declare const useAutosave: (save: () => Promise<AutosaveResult>) => Autosave;
