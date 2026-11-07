import React from 'react';
interface DiffPreviewProps {
    diff: string;
    filePath?: string;
}
export declare const DiffPreview: React.FC<DiffPreviewProps>;
interface WritePreviewProps {
    content: string;
    filePath?: string;
}
export declare const WritePreview: React.FC<WritePreviewProps>;
export {};
