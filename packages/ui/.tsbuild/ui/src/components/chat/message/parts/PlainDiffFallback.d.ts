import React from 'react';
/**
 * Plain-text patch rendering used when the rich `@pierre/diffs` preview is
 * unavailable: non-diff render modes, preview errors, and while the lazily
 * loaded diff preview chunk is still downloading. Lives in its own module so
 * `ToolPart` can render it without importing the @pierre/diffs stack.
 */
export declare const PlainDiffFallback: React.FC<{
    diff: string;
}>;
