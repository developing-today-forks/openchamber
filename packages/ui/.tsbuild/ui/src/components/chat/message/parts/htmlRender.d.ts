import { z } from 'zod';
import type { FrameScrollDirection } from '@/components/chat/lib/scroll/timelineScrollIntent';
import type { ChatQuoteAnchor } from '@/lib/chatQuoteAnchor';
import type { JsonValue } from '@/lib/opencode/model';
import type { Theme } from '@/types/theme';
/**
 * Pages an agent shows with the `openchamber_render` tool. The page is the
 * call's own `html` input; the chat draws it in a sandboxed frame without
 * `allow-same-origin`, so its scripts run in an opaque origin with no access to
 * OpenChamber's storage, credentials or DOM.
 *
 * A small bootstrap goes into the page's head ahead of its own styles. It sets
 * the app theme as CSS variables (and swaps them when the host posts a new
 * theme), reports the page's content height so the frame fits it, and hands
 * http(s) link clicks to the host, which opens them in the browser; a page
 * never navigates the frame away from itself.
 *
 * A page that waits for the user's answer (`awaitAnswer`) sends it with
 * `openchamber.submit(data, summary)`, an MCP Apps `ui/message` request the
 * host answers with a JSON-RPC result or error.
 */
export declare const HTML_RENDER_MIN_HEIGHT = 48;
export interface HtmlRenderTheme {
    appearance: 'light' | 'dark';
    variables: Record<string, string>;
}
interface HtmlRenderMetrics {
    /** The app's rem in px: the interface size setting scales it, and the controls with it. */
    rem: number;
    /** The chat's body text size in px: the page's root font size, so the page's rem follows the interface size. */
    text: number;
    sans: string;
    mono: string;
}
/**
 * The variables a page styles against. The names follow the shadcn
 * convention models already write. The agent-facing description in
 * packages/web/server/lib/agent-tool/runtime.js lists them; change both together.
 */
export declare function htmlRenderTheme(theme: Theme, metrics: HtmlRenderMetrics): HtmlRenderTheme;
/**
 * What the page knows about its answer: whether it may still send one, and
 * what it sent. The page reads the second as `openchamber.answer`, so a page
 * loaded again after the answer can show the choice.
 */
export interface HtmlRenderAnswerState {
    waiting: boolean;
    answer: JsonValue | null;
}
/**
 * The document the frame loads: the agent's page with the bootstrap first in
 * its head. `contained` is for a frame with nothing around it to scroll (the
 * full-screen view): the page's own scrolling stops at its edges without the
 * elastic bounce. `answerState` is where the page stands on its answer when
 * it loads; later changes reach it as messages.
 */
export declare function buildHtmlRenderDocument(html: string, theme: HtmlRenderTheme, { contained, answerState }?: {
    contained?: boolean;
    answerState?: HtmlRenderAnswerState;
}): string;
export declare const htmlRenderThemeMessage: (theme: HtmlRenderTheme) => {
    appearance: 'light' | 'dark';
    variables: Record<string, string>;
    type: string;
};
export declare const htmlRenderPointerMessage: (over: boolean) => {
    type: string;
    over: boolean;
};
export declare const htmlRenderAnswerStateMessage: (state: HtmlRenderAnswerState) => {
    waiting: boolean;
    answer: JsonValue | null;
    type: string;
};
type JsonRpcId = number | string;
/** The host's reply to a page's `ui/message`: an empty result, or an error the page's promise rejects with. */
export declare const htmlRenderSubmitReply: (id: JsonRpcId, error?: string) => {
    jsonrpc: string;
    id: JsonRpcId;
    result: {};
} | {
    jsonrpc: string;
    id: JsonRpcId;
    error: {
        code: number;
        message: string;
    };
};
export declare const htmlRenderClearSelectionMessage: () => {
    type: string;
};
export declare const htmlRenderMarksMessage: (marks: readonly HtmlRenderMark[]) => {
    type: string;
    marks: {
        id: string;
        anchor: {
            text: string;
            prefix: string;
            suffix: string;
            start: number;
        };
        focused: boolean;
    }[];
};
export declare const htmlRenderRevealMessage: (anchor: ChatQuoteAnchor) => {
    type: string;
    anchor: {
        text: string;
        prefix: string;
        suffix: string;
        start: number;
    };
};
declare const keyChordSchema: z.ZodObject<{
    key: z.ZodString;
    code: z.ZodString;
    metaKey: z.ZodBoolean;
    ctrlKey: z.ZodBoolean;
    shiftKey: z.ZodBoolean;
    altKey: z.ZodBoolean;
    repeat: z.ZodBoolean;
}, z.core.$strip>;
/** A key a page passed on; the host replays it as a keydown of its own. */
export type HtmlRenderKeyChord = z.infer<typeof keyChordSchema>;
/** What a page sent with `openchamber.submit`. */
export interface HtmlRenderSubmission {
    summary: string;
    data: JsonValue;
}
declare const selectionRectSchema: z.ZodObject<{
    top: z.ZodNumber;
    left: z.ZodNumber;
    width: z.ZodNumber;
    height: z.ZodNumber;
}, z.core.$strip>;
type HtmlRenderFrameMessage = {
    kind: 'size';
    height: number;
} | {
    kind: 'open-link';
    url: string;
} | {
    kind: 'key';
    chord: HtmlRenderKeyChord;
} | {
    kind: 'submit';
    id: JsonRpcId;
    submission: HtmlRenderSubmission;
} | {
    kind: 'selection';
    text: string;
    rect: z.infer<typeof selectionRectSchema>;
    anchor?: Omit<ChatQuoteAnchor, 'page'>;
} | {
    kind: 'selection-escape';
} | {
    kind: 'mark-click';
    id: string;
    rect: z.infer<typeof selectionRectSchema>;
} | {
    kind: 'scroll';
    direction: FrameScrollDirection;
};
/** A quote mark the host asks a page to paint. */
export interface HtmlRenderMark {
    id: string;
    anchor: ChatQuoteAnchor;
    /** Drawn stronger: hovered in the composer chips, or its popover is open. */
    focused: boolean;
}
/** The message a page's bootstrap posted, or null for anything else. */
export declare function readHtmlRenderFrameMessage(event: Pick<MessageEvent, 'data'>): HtmlRenderFrameMessage | null;
export declare const clampHtmlRenderHeight: (height: number) => number;
/** A download name from the page title, without characters file systems reject. */
export declare function htmlRenderFileName(title: string): string;
export {};
