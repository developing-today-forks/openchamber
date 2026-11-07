import type { QueuedMessage } from '@/stores/messageQueueStore';
/** Display-only summary; never substitute it for the editable or delivered text. */
export declare function getQueuedMessagePreview(message: Pick<QueuedMessage, 'content' | 'context' | 'contextPreview' | 'attachments'>): string;
