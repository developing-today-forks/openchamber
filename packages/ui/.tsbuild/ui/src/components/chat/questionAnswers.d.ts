import type { FormField } from '@opencode/client';
import { type QuestionAnswer, type QuestionPrompt } from '@/lib/opencode/question';
import { type FormValues } from './formCardState';
/** What the user picks in the question dock or the inline form card while the call waits. */
export declare const rememberPendingQuestionAnswers: (callKey: string, answers: QuestionAnswer[]) => void;
/** What the user keeps (Cancel) or sends from the call's row after the call ended. */
export declare const rememberQuestionAnswers: (callKey: string, answers: QuestionAnswer[]) => void;
/**
 * The answers a form opened from the call's row starts from: what the user
 * kept or sent from the row, else the answers the call returned, else the
 * picks made while it waited. Those picks never win over returned answers:
 * the dock records its starting values before anyone picks, and the call may
 * have been answered in another window.
 */
export declare const startingQuestionAnswers: (callKey: string, returned: QuestionAnswer[] | null) => QuestionAnswer[] | null;
/** Each question's answer as OpenCode's tool would report it, from the form's current values. */
export declare function answersFromFormValues(fields: readonly FormField[], values: FormValues): QuestionAnswer[];
/**
 * Form values that show these answers: a chosen option is selected again,
 * and text that names no option goes back into the field's own-answer box.
 */
export declare function formValuesFromAnswers(fields: readonly FormField[], answers: readonly QuestionAnswer[]): FormValues;
export type QuestionAnswerMessageLabels = {
    /** The line that opens the message, in the user's language. */
    intro: string;
    /** Stands in for a question left without an answer. */
    unanswered: string;
};
/**
 * The message that carries answers given after the call ended, in the
 * `"question"="answer"` shape OpenCode's tool result uses, so the agent reads
 * them the way it reads an answer to its call.
 */
export declare function formatQuestionAnswers(prompts: readonly QuestionPrompt[], answers: readonly QuestionAnswer[], labels: QuestionAnswerMessageLabels): string;
