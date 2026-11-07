import type { EditorAPI } from '@/lib/api/types';
export declare const openApplyPatchFileInEditor: ({ currentDirectory, diffLabel, editor, file, isVSCode, }: {
    currentDirectory: string;
    diffLabel: string;
    editor: EditorAPI;
    file: Record<string, unknown>;
    isVSCode: boolean;
}) => boolean;
