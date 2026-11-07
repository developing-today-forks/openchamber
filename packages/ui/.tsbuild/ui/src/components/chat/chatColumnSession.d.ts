import React from 'react';
/**
 * The session the chat column is showing — the deferred selection the
 * timeline renders, not the live store value. The composer and everything
 * stacked with the timeline read it so the column changes as one: a session
 * click publishes the live selection first, and a composer that followed it
 * would change height (changed-files row, todos, queued chips) while the
 * outgoing timeline is still on screen, shoving that timeline before the swap.
 */
export type ChatColumnSession = {
    sessionId: string | null;
    directory: string | null;
};
export declare const ChatColumnSessionContext: React.Context<ChatColumnSession | null>;
export declare const useChatColumnSession: () => ChatColumnSession | null;
/**
 * The session a chat component acts on: its column's when it renders inside
 * one, the app's selection elsewhere. Outside a column it reads the live
 * selection; inside one it never subscribes to it, so a pinned column (the
 * side panel) does not re-render when the main chat switches sessions.
 */
export declare const useChatSessionSelection: () => ChatColumnSession;
/**
 * What a column does on behalf of the chat inside it. The app's main chat
 * acts on the global selection and the global panels; a pinned column (a chat
 * opened in the side panel) keeps its own session, navigates inside itself,
 * and leaves the main chat's selection and panels alone.
 */
export type ChatColumnActions = {
    pinned: boolean;
    openSession: (sessionId: string, directory: string | null) => void;
    openTimelineDialog: () => void;
    /** Focuses this column's composer, never another chat's. */
    focusInput: () => void;
};
export declare const ChatColumnActionsContext: React.Context<ChatColumnActions>;
export declare const useChatColumnActions: () => ChatColumnActions;
/**
 * Whether the column's chat takes prompts, as its ChatContainer decides: a
 * read-only surface, a deleted space's archived chat and a subagent's session
 * (unless prompting those is allowed) get no composer. What acts through the
 * composer reads it: a question row's Answer and the goal writer card. False
 * outside a column, where no composer is known to take the text.
 */
export declare const ChatColumnTakesPromptsContext: React.Context<boolean>;
export declare const useChatColumnTakesPrompts: () => boolean;
/**
 * Whether the composer is expanded to fill the column (focus mode). The main
 * chat keeps it as an app-wide preference; a pinned column keeps its own, so
 * expanding one composer leaves the other chat as it was.
 */
export type ChatColumnExpandedInput = {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
};
export declare const ChatColumnExpandedInputContext: React.Context<ChatColumnExpandedInput | null>;
export declare const useChatColumnExpandedInput: () => ChatColumnExpandedInput;
