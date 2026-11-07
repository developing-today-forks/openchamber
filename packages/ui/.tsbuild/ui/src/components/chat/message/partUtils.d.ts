import type { Part } from '@/lib/opencode/model';
export declare const normalizeParts: (parts: Part[]) => Part[];
export declare const extractTextContent: (part: Part) => string;
export declare const isEmptyTextPart: (part: Part) => boolean;
interface VisibleFilterOptions {
    includeReasoning?: boolean;
}
/**
 * The parts a message actually shows.
 *
 * OpenCode v2 no longer marks parts synthetic and no longer sends patch
 * parts, so the only choice left here is whether reasoning is on screen.
 */
export declare const filterVisibleParts: (parts: Part[], options?: VisibleFilterOptions) => Part[];
export {};
