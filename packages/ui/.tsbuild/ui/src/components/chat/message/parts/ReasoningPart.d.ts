import React from 'react';
import type { Part } from '@/lib/opencode/model';
import type { IconName } from '@/components/icon/icons';
import type { MarkdownVariant } from '../../MarkdownRendererImpl';
import type { StreamPhase } from '../types';
type ReasoningTimelineBlockProps = {
    text: string;
    blockId: string;
    time?: {
        start?: number;
        end?: number;
    };
    isStreaming?: boolean;
    actions?: React.ReactNode;
    /** Override the initial expanded state. Defaults to `isStreaming`. */
    defaultExpanded?: boolean;
    /**
     * Opens while it streams and folds when it ends. Off keeps a streaming
     * block folded to its header, so a block closing does not move the chat.
     */
    expandWhileStreaming?: boolean;
    /** Opens the block whenever it changes to a new non-zero value (a search hit in it). */
    revealRequest?: number;
    /** The message this reasoning belongs to; search finds and highlights the block by it. */
    reasoningMessageId?: string;
    /**
     * Presentation for rows that borrow this block for something other than
     * reasoning (a compaction summary): its own icon, title, toggle labels,
     * body typography and box height.
     */
    presentation?: {
        icon: IconName;
        iconClassName?: string;
        title: string;
        expandLabel: string;
        collapseLabel: string;
        markdownVariant: MarkdownVariant;
        maxHeightClassName: string;
    };
};
export declare const ReasoningTimelineBlock: React.FC<ReasoningTimelineBlockProps>;
type ReasoningPartProps = {
    part: Part;
    messageId: string;
    streamPhase?: StreamPhase;
};
declare const ReasoningPart: React.MemoExoticComponent<({ part, messageId, streamPhase, }: ReasoningPartProps) => import("react/jsx-runtime").JSX.Element | null>;
export default ReasoningPart;
