import React from 'react';
import type { MarkdownRendererProps } from './MarkdownRendererImpl';
declare const SimpleMarkdownRendererLazy: React.LazyExoticComponent<React.NamedExoticComponent<{
    content: string;
    className?: string;
    variant?: import("./MarkdownRendererImpl").MarkdownVariant;
    disableLinkSafety?: boolean;
    frontmatter?: 'hide' | 'properties';
    onShowPopup?: (content: import("./message/types").ToolPopupContent) => void;
    mermaidControls?: import("./markdown/decorate").MermaidControlOptions;
    allowMermaidWheelEvents?: boolean;
    enableFileReferences?: boolean;
    allowRawHtml?: boolean;
}>>;
export declare const MarkdownRenderer: React.FC<MarkdownRendererProps>;
type SimpleMarkdownRendererProps = React.ComponentPropsWithoutRef<typeof SimpleMarkdownRendererLazy> & {
    fallbackContent?: React.ReactNode;
};
export declare const SimpleMarkdownRenderer: React.FC<SimpleMarkdownRendererProps>;
export {};
