import type { MessageModelAttribution } from '@/lib/routing/modelRoutesApi';
/** The attribution for one assistant message, or `undefined` when none is known (not routed, or not fetched yet). */
export declare const useModelAttributionFor: (messageId: string | undefined) => MessageModelAttribution | undefined;
