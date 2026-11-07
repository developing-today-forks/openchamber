import type { Extension } from '@codemirror/state';
import { Language, LanguageDescription } from '@codemirror/language';
export declare function codeBlockLanguageResolver(info: string): Language | LanguageDescription | null;
export declare function languageByExtension(filePath: string): Extension | null;
export declare function loadLanguageByExtension(filePath: string): Promise<Extension | null>;
