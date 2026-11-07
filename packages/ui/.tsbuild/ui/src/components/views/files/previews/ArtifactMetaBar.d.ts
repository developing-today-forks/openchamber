import React from 'react';
/**
 * The line above an artifact: what the file is, in numbers the user would
 * otherwise have to ask for (size, dimensions, duration, rows). Empty items
 * are dropped so a value that is not known yet leaves no dangling separator.
 */
export declare const ArtifactMetaBar: React.FC<{
    items: ReadonlyArray<string>;
    actions?: React.ReactNode;
    className?: string;
}>;
