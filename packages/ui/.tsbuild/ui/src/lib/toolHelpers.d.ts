export interface ToolMetadata {
    displayName: string;
    icon?: string;
    outputLanguage?: string;
    inputFields?: {
        key: string;
        label: string;
        type: 'command' | 'file' | 'pattern' | 'text' | 'code';
        language?: string;
    }[];
    category: 'file' | 'search' | 'code' | 'system' | 'ai' | 'web';
}
export declare function getToolMetadata(toolName: string): ToolMetadata;
export declare function detectToolOutputLanguage(toolName: string, output: string, input?: Record<string, unknown>): string;
export declare function getLanguageFromExtension(filePath: string): string | null;
export declare function isDrawioFile(filePath: string): boolean;
export declare function isExcalidrawFile(filePath: string): boolean;
export declare function isImageFile(filePath: string): boolean;
export declare function isPdfFile(filePath: string): boolean;
export declare function isSvgFile(filePath: string): boolean;
export declare function isAudioFile(filePath: string): boolean;
export declare function isVideoFile(filePath: string): boolean;
export declare function isFontFile(filePath: string): boolean;
/** Comma- or tab-separated text the viewer can lay out as a table. */
export declare function isDelimitedTableFile(filePath: string): boolean;
export declare function isMermaidFile(filePath: string): boolean;
export declare function getFileExtension(filePath: string): string;
/** True for known binary extensions (including images/PDF). SVG is not binary. */
export declare function isBinaryFile(filePath: string): boolean;
/**
 * Heuristic for UTF-8 text that is actually binary (or was lossily decoded).
 * Used as defense-in-depth when extension checks miss a binary file.
 */
export declare function looksLikeBinaryText(content: string): boolean;
export declare function getImageMimeType(filePath: string): string;
export declare function formatToolInput(input: Record<string, unknown>, toolName: string): string;
