/**
 * Persistent Vim mappings for the file editor, written as vimrc map lines
 * (`inoremap jk <Esc>`). Only key-to-key maps are understood; ex-command
 * mappings, `<expr>` and anything else is reported back as an invalid line
 * rather than half-applied.
 */
type VimMappingContext = 'normal' | 'insert' | 'visual' | 'operatorPending';
export interface VimMapping {
    context: VimMappingContext;
    lhs: string;
    rhs: string;
    recursive: boolean;
}
export interface ParsedVimMappings {
    mappings: VimMapping[];
    /** 1-based numbers of non-empty, non-comment lines that are not a supported map. */
    invalidLines: number[];
}
export declare function parseVimMappings(source: string): ParsedVimMappings;
export {};
