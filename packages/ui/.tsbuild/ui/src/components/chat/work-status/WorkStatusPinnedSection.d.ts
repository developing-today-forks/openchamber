import React from 'react';
type Props = {
    sessionId: string | null;
    directory: string | null;
};
/**
 * Messages pinned into the context.
 *
 * The row carries two destinations, so the pin is its own button: pressing the
 * pin unpins, pressing the text takes you to the message.
 */
export declare const WorkStatusPinnedSection: React.FC<Props>;
export {};
