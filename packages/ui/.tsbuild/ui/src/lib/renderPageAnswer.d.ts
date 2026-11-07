import type { JsonValue } from '@/lib/opencode/model';
/**
 * Sends the user's answer to a page an agent is waiting on (render.page with
 * awaitAnswer). The agent's call is found by its session and call id; a page
 * that no longer waits, because it was answered elsewhere or its turn ended,
 * is refused with the server's message.
 */
export declare function answerRenderedPage(input: {
    sessionId: string;
    callId: string;
    summary: string;
    data: JsonValue;
}): Promise<void>;
