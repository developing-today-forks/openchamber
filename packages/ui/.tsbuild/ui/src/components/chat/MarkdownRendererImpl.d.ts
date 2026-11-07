import React from 'react';
import type { Part } from '@/lib/opencode/model';
import type { ToolPopupContent } from './message/types';
import { type MermaidControlOptions } from './markdown/decorate';
export type MarkdownVariant = 'assistant' | 'tool' | 'reasoning';
export interface MarkdownRendererProps {
    content: string;
    part?: Part;
    messageId: string;
    isAnimated?: boolean;
    skipFadeIn?: boolean;
    className?: string;
    isStreaming?: boolean;
    variant?: MarkdownVariant;
    onShowPopup?: (content: ToolPopupContent) => void;
    enableFileReferences?: boolean;
}
export declare const MarkdownRenderer: React.NamedExoticComponent<MarkdownRendererProps>;
/** @public Consumed as a named export by the lazy Markdown renderer loader. */
export declare const SimpleMarkdownRenderer: React.NamedExoticComponent<{
    content: string;
    className?: string;
    variant?: MarkdownVariant;
    disableLinkSafety?: boolean;
    /** A leading frontmatter block: `hide` drops it, `properties` shows it above the body. Without it the block renders as Markdown. */
    frontmatter?: 'hide' | 'properties';
    onShowPopup?: (content: ToolPopupContent) => void;
    mermaidControls?: MermaidControlOptions;
    allowMermaidWheelEvents?: boolean;
    enableFileReferences?: boolean;
    /** Render the document's raw HTML through the allowlist; only for documents a user opens to read. */
    allowRawHtml?: boolean;
}>;
