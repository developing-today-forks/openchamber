/**
 * Provider ids the Small Model and Changes Walkthrough pickers may offer, from
 * `GET /api/small-model`. `undefined` until the server has answered.
 *
 * Asked again whenever the provider catalog changes. A panel that mounts while
 * OpenCode is still starting gets an empty answer, and asking once per mount
 * left a walkthrough panel restored at launch with an empty picker for the
 * whole run. The catalog arriving, a provider login and a runtime switch all
 * replace the catalog, and each can change this answer. A failed request keeps
 * the previous answer. The model list is directory-scoped, so the request
 * names the current directory; without one the picker would answer for
 * OpenCode's own working location, which need not hold the project's models.
 */
export declare function useCallableModelProviders(enabled?: boolean): string[] | undefined;
