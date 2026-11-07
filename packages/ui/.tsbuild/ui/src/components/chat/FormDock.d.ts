import React from 'react';
/**
 * The agent's question, docked above the composer.
 *
 * A v2 form is one request with several typed fields, and the reply is one
 * answer for all of them. Showing every field at once made a tall card, so
 * the dock walks the fields one at a time — the same shape OpenCode's own
 * clients use — with a segment per step, Back / Next, and Submit in place
 * of Next on the last one. Fields gated by a `when` clause join or leave the
 * steps as their controlling answer changes, so the count is honest at every
 * moment. An `external` field is an information step: a link to open,
 * nothing to type; opening the step acknowledges it, which the reply must
 * carry as `true` for the server to accept it. Enter in a text box moves to the next step (Submit on
 * the last); Cmd/Ctrl+Enter submits from anywhere in the dock.
 *
 * Mounted once per composer, inside the shared floating frame, so it shares
 * the frame's clearance and hides behind an expanded BTW. The BTW
 * sheet keeps the inline `FormCard` for its child session's forms.
 */
interface FormDockProps {
    sessionId: string | null;
    directory?: string;
    hidden: boolean;
}
/** Memoized: the composer re-renders on every keystroke, and nothing here depends on the draft text. */
export declare const FormDock: React.NamedExoticComponent<FormDockProps>;
export {};
