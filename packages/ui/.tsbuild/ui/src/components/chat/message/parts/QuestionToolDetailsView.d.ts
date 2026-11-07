import React from 'react';
import { type QuestionAnswer, type QuestionPrompt } from '@/lib/opencode/question';
export interface QuestionToolDetailsViewProps {
    prompts: readonly QuestionPrompt[];
    /** What the call returned, by question; null when it returned nothing. */
    answers: readonly QuestionAnswer[] | null;
    /** Why the call ended without answers, as OpenCode reported it. */
    errorText: string | null;
    canAnswer: boolean;
    /** The answers the form opens with, read each time it opens: the last ones given here, else the call's. */
    startingAnswers: () => readonly QuestionAnswer[] | null;
    /** Called with the form's answers when it closes without sending. */
    onKeep: (answers: QuestionAnswer[]) => void;
    onSend: (answers: QuestionAnswer[]) => void;
    /** Enter sends from a text box only off mobile, where it starts a new line instead. */
    isMobile: boolean;
    /** Wraps the questions in the row's scroll box, which stops growing at a share of the window's height. */
    renderScrollBox: (questions: React.ReactNode) => React.ReactNode;
}
export declare function QuestionToolDetailsView({ prompts, answers, errorText, canAnswer, startingAnswers, onKeep, onSend, isMobile, renderScrollBox }: QuestionToolDetailsViewProps): import("react/jsx-runtime").JSX.Element;
/** The questions as a form, filled with `starting` when there are answers to start from. */
export declare function QuestionAnswerForm({ prompts, starting, isMobile, renderScrollBox, onCancel, onSend, }: {
    prompts: readonly QuestionPrompt[];
    starting: readonly QuestionAnswer[] | null;
    isMobile: boolean;
    renderScrollBox: QuestionToolDetailsViewProps['renderScrollBox'];
    onCancel: (kept: QuestionAnswer[]) => void;
    onSend: (sent: QuestionAnswer[]) => void;
}): import("react/jsx-runtime").JSX.Element;
