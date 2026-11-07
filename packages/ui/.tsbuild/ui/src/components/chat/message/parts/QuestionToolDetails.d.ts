import type { ToolPart, ToolState } from '@/lib/opencode/model';
import { type QuestionToolDetailsViewProps } from './QuestionToolDetailsView';
/**
 * The expanded row of an agent's `question` call: every question with all of
 * its options and their descriptions, whatever way the call ended, and the
 * answers when the call returned some. Once the call has ended, the questions
 * can be answered again from here; the answers go to the agent as a new
 * message, since the call itself is over.
 */
export declare function QuestionToolDetails({ part, state, renderScrollBox }: {
    part: ToolPart;
    state: ToolState;
    renderScrollBox: QuestionToolDetailsViewProps['renderScrollBox'];
}): import("react/jsx-runtime").JSX.Element;
