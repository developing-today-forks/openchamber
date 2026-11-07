import React from 'react';
/**
 * A file the viewer will not decode. It still tells the user what they have —
 * name, type, size — and hands them the download, rather than trying to read
 * the bytes as text and showing garbage.
 */
export declare const BinaryArtifact: React.FC<{
    name: string;
    path: string;
    sizeBytes: number | null;
    download?: React.ReactNode;
}>;
