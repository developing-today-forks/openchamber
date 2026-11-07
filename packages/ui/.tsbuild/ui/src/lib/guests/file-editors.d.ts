import { type FileEditorContribution } from '@openchamber/sdk';
import type { InstalledGuest } from './types.ts';
/** The extension editor a file opens in. */
type GuestFileEditorMatch = {
    guestId: string;
    editor: FileEditorContribution;
};
/**
 * The first active guest's first editor whose patterns match the file's name,
 * in catalog order. `null` when none does. VS Code and mobile keep the catalog
 * empty, so files there always stay with the host's own views.
 */
export declare const findGuestFileEditor: (guests: readonly InstalledGuest[], filePath: string) => GuestFileEditorMatch | null;
export declare const useGuestFileEditor: (filePath: string | null | undefined) => GuestFileEditorMatch | null;
export {};
