import type { Extension } from '@codemirror/state';
export declare function createVimModeExtensions(enabled: boolean | undefined): Extension[];
/** Apply the user's vimrc map lines (see vimMappings.ts), replacing the previous set. */
export declare function syncVimMappings(source: string): void;
