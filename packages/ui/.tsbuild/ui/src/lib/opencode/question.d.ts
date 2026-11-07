import type { FormField, FormValue } from "@opencode/client";
import type { FormRequest, ToolInput, ToolState } from "./model";
/**
 * OpenCode's `question` tool (`packages/core/src/tool/plugin/question.ts`):
 * the agent sends `{ questions: Question.Prompt[] }`, OpenCode turns them into
 * one form request whose field `q<n>` is question `n`, and an answered call
 * returns `metadata.answers`, one string list per question in the same order.
 * The transcript keeps the input after the call ends however it ended, so a
 * question can be shown and answered again from the tool row.
 */
export type QuestionOption = {
    label: string;
    description: string;
};
export type QuestionPrompt = {
    header: string;
    question: string;
    options: QuestionOption[];
    multiple: boolean;
};
/** One question's answer: the chosen option labels and any text typed instead. */
export type QuestionAnswer = string[];
/** The questions a `question` call asked, in order; empty when its input holds none. */
export declare function questionPrompts(input: ToolInput | undefined): QuestionPrompt[];
/** The answers an answered call returned, by question; null when the call has none. */
export declare function questionAnswers(state: ToolState): QuestionAnswer[] | null;
/**
 * The form fields OpenCode builds for these questions, field for field
 * (`toField` in OpenCode's question tool), so a question answered again
 * looks and validates the way it did when the agent asked it.
 */
export declare function questionFormFields(prompts: readonly QuestionPrompt[]): FormField[];
/** The answer a field holds in OpenCode's form reply, as the tool reports it. */
export declare function questionAnswerOf(value: FormValue | undefined): QuestionAnswer;
/** Identifies one `question` call across its form request and its transcript row. */
export type QuestionCallRef = {
    messageID: string;
    callID: string;
};
/** The `question` call a form request belongs to; null for any other form. */
export declare function questionFormCall(form: Pick<FormRequest, "metadata">): QuestionCallRef | null;
export declare const questionCallKey: (call: QuestionCallRef) => string;
export type QuestionOutputPair = {
    question: string;
    answer: string;
};
/**
 * The `"question"="answer"` pairs of an answered call's text result ("User
 * has answered your questions: ... You can now ..."), for calls recorded
 * before OpenCode returned `metadata.answers`.
 */
export declare function parseQuestionOutput(output: string): QuestionOutputPair[] | null;
/** What the expanded row of a `question` call shows. */
export type QuestionRowContent = 
/** The questions with their options, and the answers once returned, however the call ended. */
{
    kind: "questions";
}
/** An answered call recorded before `metadata.answers`: the pairs from its text result. */
 | {
    kind: "legacy";
    pairs: QuestionOutputPair[];
}
/** A failed call whose input holds no questions. */
 | {
    kind: "error";
    message: string;
} | {
    kind: "awaiting";
};
export declare function questionRowContent(state: ToolState, output: string): QuestionRowContent;
