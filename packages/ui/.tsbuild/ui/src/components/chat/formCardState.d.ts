/**
 * Pure form logic behind `FormCard`.
 *
 * OpenCode v2 replaced the old multi-question prompt with a typed form: one
 * request carries a title and an ordered list of fields, and the reply is a
 * single `{ [key]: value }` answer. Everything that decides what the card
 * shows and whether it can be submitted lives here so it can be tested without
 * rendering, and so the component stays a view.
 */
import type { FormField, FormValue } from '@opencode/client';
/**
 * The value a field currently holds in the card.
 *
 * `custom` marks a select field whose user typed their own answer instead of
 * picking an option, so re-selecting an option can clear the typed text.
 * `acknowledged` is the only state an `external` field has: OpenCode accepts
 * a reply only when every external field answers `true`, so it records that
 * the user has seen the step with the link.
 */
type FieldValue = {
    text: string;
    number: number | null;
    boolean: boolean;
    selected: string[];
    custom: boolean;
    acknowledged: boolean;
};
export type FormValues = Record<string, FieldValue>;
/** Fields whose value the user edits; `external` only links out. */
export type AnswerableField = Exclude<FormField, {
    type: 'external';
}>;
export declare const isAnswerableField: (field: FormField) => field is AnswerableField;
/**
 * Numeric bounds and defaults arrive as either a number or one of the JSON
 * stand-ins for values JSON cannot hold. The stand-ins are not usable as a
 * starting value or a bound, so they read as absent.
 */
export declare const toFiniteNumber: (value: number | 'Infinity' | '-Infinity' | 'NaN' | undefined) => number | null;
export type InitialFormValuesOptions = {
    /**
     * Whether external fields start acknowledged. A surface that shows every
     * field at once (the inline card) has shown the link by the time the user
     * can submit; a stepped surface acknowledges each link as its step opens.
     */
    acknowledgeExternal?: boolean;
};
/** The card's starting state: every field seeded from its declared default. */
export declare function initialFormValues(fields: readonly FormField[], options?: InitialFormValuesOptions): FormValues;
export declare const valueOf: (values: FormValues, key: string) => FieldValue;
/** The answer a single field contributes, or `undefined` when it has none yet. */
export declare function fieldAnswer(field: AnswerableField, values: FormValues): FormValue | undefined;
/** What the form resolves to right now: the fields the user sees and the reply they add up to. */
export type FormEvaluation = {
    /** Fields shown to the user, in declaration order. */
    active: FormField[];
    /** The reply so far: an answer per answered active field, `true` per acknowledged external field. */
    answer: Record<string, FormValue>;
};
/**
 * Walks the fields in declaration order the way the server validates a reply:
 * a `when` clause reads only the answers of active fields declared before it
 * (OpenCode rejects a form whose clause points at a later field), so the
 * fields shown here are exactly the ones the server will accept a value for.
 * `external` fields are never gated.
 */
export declare function evaluateForm(fields: readonly FormField[], values: FormValues): FormEvaluation;
/** Fields the card renders right now, in declaration order. */
export declare function visibleFields(fields: readonly FormField[], values: FormValues): FormField[];
/**
 * Keys of visible fields the server would refuse the reply without: required
 * fields still unanswered, and external links the user has not opened yet.
 */
export declare function missingRequiredKeys(fields: readonly FormField[], values: FormValues): string[];
/**
 * The reply payload. Only active fields contribute: a field hidden by a
 * `when` clause was never asked, and the server rejects a value for it.
 * External fields answer `true` once acknowledged, as the server requires.
 */
export declare function buildFormAnswer(fields: readonly FormField[], values: FormValues): Record<string, FormValue>;
export {};
