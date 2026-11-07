/**
 * Whether OpenChamber's background model ("small model") can run right now.
 *
 * `GET /api/small-model` answers `available: false` when OpenCode has no model
 * a stateless generation may use — a fresh install on OpenCode's free tier,
 * for instance, has models for chat but none for this. Session renaming, the
 * session goal and the changes walkthrough all depend on it, so the surfaces
 * that start them read this store to show a disabled state with a reason
 * instead of failing after the click.
 *
 * Cached per runtime + directory and refreshed at most once a minute unless
 * something that changes the answer happens: a provider login or a settings
 * save emits a config change, a runtime switch drops everything.
 */
export type SmallModelAvailability = 'unknown' | 'available' | 'unavailable';
interface SmallModelStore {
    byKey: Record<string, {
        availability: SmallModelAvailability;
        fetchedAt: number;
    }>;
    /** Fetch when unknown or stale; concurrent callers share one request. */
    ensureFresh: (directory?: string | null) => Promise<void>;
    /** Forget every answer; the next reader fetches again. */
    invalidate: () => void;
}
export declare const useSmallModelStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SmallModelStore>>;
export declare const selectSmallModelAvailability: (state: SmallModelStore, directory: string | null | undefined) => SmallModelAvailability;
export {};
