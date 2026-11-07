import { z } from 'zod';
import type { GoalWriterChoice } from '@/lib/goalWriter';
type ModelChoiceSurface = 'goal-writer' | 'composer';
type ModelChoiceInputSize = 'empty' | 'short' | 'medium' | 'long' | 'unknown';
type ModelSelection = {
    model: string;
    variant: string | null;
};
interface ModelChoice {
    surface: ModelChoiceSurface;
    /** `model` when the model changed, `effort` when only the effort did. */
    kind: 'model' | 'effort';
    chosen: ModelSelection;
    /** What was in effect before the choice: the goal window's default, or the composer's previous selection. */
    replaced: ModelSelection | null;
    sessionModel: string | null;
    inputSize: ModelChoiceInputSize;
}
/** The size bucket of an input of `length` characters; null when the input is not known. */
export declare const inputSizeBucket: (length: number | null) => ModelChoiceInputSize;
/**
 * The choice of `chosen` over `replaced`, or null when nothing changed: a
 * pick of what was already in effect is no choice.
 */
export declare const describeModelChoice: (input: Omit<ModelChoice, 'kind'>) => ModelChoice | null;
/**
 * Sends one choice. Fire and forget: a lost choice costs one data point and
 * must never get in the way of the pick itself. Nothing is sent while
 * recording is off (the server refuses then too) or in VS Code, which has
 * no OpenChamber server.
 */
export declare const recordModelChoice: (choice: ModelChoice | null) => void;
/**
 * A goal written by a model picked in the goal window. `writerDefault` is
 * the Settings writer model, else the session's model writes.
 */
export declare const recordGoalWriterChoice: ({ writer, writerDefault, sessionModel, inputLength }: {
    writer: GoalWriterChoice;
    writerDefault: GoalWriterChoice | null;
    sessionModel: {
        providerID: string;
        modelID: string;
    } | null;
    inputLength: number | null;
}) => void;
declare const suggestionSchema: z.ZodObject<{
    id: z.ZodString;
    surface: z.ZodLiteral<"goal-writer">;
    model: z.ZodString;
    variant: z.ZodNullable<z.ZodString>;
    count: z.ZodNumber;
    total: z.ZodNumber;
}, z.core.$strip>;
declare const summarySchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    total: z.ZodNumber;
    suggestions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        surface: z.ZodLiteral<"goal-writer">;
        model: z.ZodString;
        variant: z.ZodNullable<z.ZodString>;
        count: z.ZodNumber;
        total: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
type ModelChoiceSummary = z.infer<typeof summarySchema>;
export type ModelChoiceSuggestion = z.infer<typeof suggestionSchema>;
/** Whether recording is on, how many choices are kept, and the suggestions on offer. Throws on failure. */
export declare const readModelChoices: (signal?: AbortSignal) => Promise<ModelChoiceSummary>;
/** Removes every recorded choice and answer. */
export declare const clearModelChoices: () => Promise<void>;
/**
 * Approves or declines a suggestion. Approve writes the settings on the
 * server and returns what it wrote; decline returns null.
 */
export declare const answerModelChoiceSuggestion: (id: string, decision: 'approved' | 'declined') => Promise<{
    sessionGoalWriterModel: string;
    sessionGoalWriterVariant: string;
} | null>;
export {};
