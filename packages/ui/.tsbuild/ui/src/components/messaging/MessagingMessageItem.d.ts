import React from 'react';
import type { MessagingMessage } from '@/lib/opencode/messaging';
/**
 * One message, as the inbox, a topic thread and search results show it: who
 * wrote it and when on one line, then the body as Markdown. Long bodies fold.
 * The menu holds what a reader can do with it; hiding never deletes, and the
 * history lists every hide and restore applied to it.
 */
export declare const MessagingMessageItem: React.FC<{
    message: MessagingMessage;
    /**
     * `thread`: the topic is on screen, so the line names the sequence number.
     * `search`: hits from many topics name theirs. `inbox`: every message is to
     * the person, so the line carries only the time.
     */
    variant: 'thread' | 'search' | 'inbox';
    focused?: boolean;
    /** Opens the topic at this message. */
    onOpenTopic?: () => void;
    onOpenSession?: () => void;
    /** Extra controls under the body, such as a reply field. */
    footer?: React.ReactNode;
    /** A thread can hide and restore its messages and show their history. */
    manageable?: boolean;
}>;
