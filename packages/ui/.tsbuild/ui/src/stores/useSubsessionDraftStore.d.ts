/**
 * The subsession models picked in a new-session draft, as exact refs
 * (`provider/model`).
 *
 * The draft has no session to PATCH yet, so the picker's selection lives
 * here until `materializeOpenDraftSession` creates the session with it as
 * its `subagentPolicy`. It follows the goal arm's shape
 * (`useSessionGoalArmStore`): one draft is open at a time, and the selection
 * is consumed when that draft's session is created.
 */
interface SubsessionDraftStore {
    models: string[];
    setModels: (models: string[]) => void;
    /** Read-and-clear in one step, when the draft's session has been created. */
    consume: () => string[];
}
export declare const useSubsessionDraftStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SubsessionDraftStore>>;
export {};
