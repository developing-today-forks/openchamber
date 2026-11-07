/**
 * Provider OAuth flow helpers.
 *
 * OpenCode v2 signs a provider in through its *integration*:
 * `integration.oauth.connect` opens an attempt and answers with the mode that
 * decides what the client has to do next:
 *
 * - `auto` — the user finishes in the browser and the client polls
 *   `integration.oauth.status` until the attempt completes. The credential is
 *   only stored once the attempt reports `complete`.
 * - `code` — the user copies a code out of the browser and hands it to
 *   `integration.oauth.complete`.
 *
 * An attempt the user walks away from is dropped with
 * `integration.oauth.cancel`, and every attempt carries its own expiry.
 */
import type { FormField, FormValue } from '@opencode/client';
import type { I18nKey, I18nParams } from '@/lib/i18n';
export type OAuthCompletionMode = 'auto' | 'code';
export type ProviderOAuthTranslator = (key: I18nKey, params?: I18nParams) => string;
export interface OAuthAttempt {
    attemptID: string;
    mode: OAuthCompletionMode;
    url: string;
    instructions: string;
}
export declare const shouldOpenAuthorizationUrl: (providerId: string, url?: string) => boolean;
/** The device/user code to surface on its own, when the instructions carry one. */
export declare const extractUserCode: (instructions: string) => string | undefined;
/**
 * Fields the editor can render and answer. `external` fields only point the
 * user at a URL, so they never take part in the answer payload.
 */
type AnswerableField = Exclude<FormField, {
    type: 'external';
}>;
export declare const isAnswerableField: (field: FormField) => field is AnswerableField;
/** The label a field shows; falls back to its key so nothing renders blank. */
export declare const fieldLabel: (field: FormField) => string;
/**
 * True when every `when` condition on a field is satisfied by the answers of
 * the fields that are themselves active; pass the answers `visibleFields`
 * accumulated, not the raw value map.
 */
export declare const isFieldVisible: (field: FormField, activeValues: Record<string, FormValue>) => boolean;
/**
 * Fields in declaration order whose conditions hold against the answers of
 * the active fields before them, so a hidden field's value cannot reveal a
 * later one. Same walk as the server's form evaluation.
 */
export declare const visibleFields: (fields: readonly FormField[], values: Record<string, FormValue>) => FormField[];
/**
 * Seeds the answer map. A field's declared default wins; otherwise a field with
 * options preselects its first one so the form always starts answerable.
 */
export declare const defaultFieldValues: (fields: readonly FormField[]) => Record<string, FormValue>;
/** First visible required field still left blank, or `null` when the form is complete. */
export declare const firstUnansweredField: (fields: readonly FormField[], values: Record<string, FormValue>) => FormField | null;
/**
 * Builds the `answer` payload for `connect`. Hidden fields are dropped so a
 * stale answer from a since-changed branch is never sent upstream, and so are
 * blank optional fields, which upstream reads as "not provided".
 */
export declare const collectFieldAnswer: (fields: readonly FormField[], values: Record<string, FormValue>) => Record<string, FormValue>;
/**
 * Renders an integration OAuth failure as user-facing copy.
 *
 * Validation failures carry a message authored by the integration (a field
 * rule such as "URL or domain is required"); it is shown verbatim because only
 * the integration knows which input was rejected.
 */
export declare const describeOAuthError: (error: unknown, t: ProviderOAuthTranslator, fallbackKey: I18nKey) => string;
export {};
