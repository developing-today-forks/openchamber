import React from 'react';
interface SubsessionModelsControlProps {
    sessionId: string | null;
    directory?: string;
    /** A new-session draft is open: the selection is held for its create call. */
    draftOpen?: boolean;
    footerIconButtonClass: string;
    iconSizeClass: string;
    withTooltip?: boolean;
}
/**
 * "Subsession models" picker, beside the composer's model picker.
 *
 * On a session it shows the session's `subagentPolicy.models`: one checkbox
 * per model in the same catalog the model picker reads, grouped by provider
 * the same way. Route pools (`opencode-route/<pool-id>`) are ordinary
 * catalog entries, so they are selectable like any other exact ref; pool
 * management lives on its own surface, not here. Toggling a checkbox PATCHes the session with the whole
 * updated policy, preserving `excludedModels` and `agentOverrides` as
 * loaded, and the checked state then comes from the re-read session record.
 * Policy entries that are not exact refs (`provider/*`,
 * `provider/model#variant`) were set through config or the API: they show
 * as read-only rows and are preserved verbatim on save.
 *
 * In a new-session draft there is no session to PATCH, so the selection is
 * held in `useSubsessionDraftStore` and sent as `subagentPolicy` on create.
 */
export declare const SubsessionModelsControl: React.FC<SubsessionModelsControlProps>;
export {};
