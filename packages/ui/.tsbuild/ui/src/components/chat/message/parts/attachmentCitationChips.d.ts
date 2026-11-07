import React from 'react';
/** A run of text, or an inline element drawn inside it. */
export type InlineTextNode = string | React.ReactElement;
/**
 * Splits plain text into runs and file chips for each `[name]` citation of
 * one of `filenames`. The React counterpart of the Markdown path, for text
 * that is not rendered as Markdown: plain-mode user messages and comments.
 * A chip is a button only where `isOpenable` says its file opens on click;
 * surfaces that open nothing (the composer, the queue, context blocks) leave
 * it out and get labels.
 */
export declare function withAttachmentChips(text: string, filenames: readonly string[], keyPrefix: string, isOpenable?: (filename: string) => boolean): InlineTextNode[];
