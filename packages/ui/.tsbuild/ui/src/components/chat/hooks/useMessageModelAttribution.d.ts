import { type MessageModelAttribution } from '@/lib/routing/modelRoutesApi';
export type MessageModelAttributionMap = Readonly<Record<string, MessageModelAttribution>>;
/**
 * `refetchKey` is anything that changes when a new turn finishes (e.g. the
 * count of completed assistant messages) — the moment OpenCode has written
 * that turn's attempt rows. Passing the same key across renders keeps the
 * previous result and fetches nothing.
 */
export declare const useMessageModelAttribution: (sessionID: string | undefined, refetchKey: number | string) => MessageModelAttributionMap;
