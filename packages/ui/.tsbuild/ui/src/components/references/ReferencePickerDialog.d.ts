/**
 * The picker for GitHub issues and pull requests, and Linear issues.
 *
 * Desktop shows the list and a preview of the highlighted item side by side,
 * so the user sees what they are about to attach. Mobile shows the list, and
 * a tap on a row opens its preview in place.
 *
 * `selection: 'multiple'` (the composer) checks any number of items, across
 * tabs, and attaches them together. `selection: 'single'` (New Worktree)
 * chooses one. Lists come from the shared reference cache, so switching tabs
 * or reopening the picker shows the last answer at once.
 */
import type { GitHubReferenceKind } from '@/lib/api/types';
import { type ReferencePreviewPurpose } from './ReferencePreview';
import { type ReferencePickerSelection, type ReferencePickerSource } from './referencePickerItems';
/** A failed confirm: the keys that did not go through stay checked. */
export type ReferencePickerConfirmFailure = {
    failedKeys: string[];
    message: string;
};
type ReferencePickerDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    source: ReferencePickerSource;
    purpose: ReferencePreviewPurpose;
    selection: 'multiple' | 'single';
    /** The project GitHub items come from. */
    directory: string | null;
    /** Tab to open GitHub on; the last used one otherwise. */
    initialGitHubKind?: GitHubReferenceKind;
    /** Null closes the picker; a failure keeps it open with the message. */
    onConfirm: (selections: ReferencePickerSelection[]) => Promise<ReferencePickerConfirmFailure | null>;
};
export declare function ReferencePickerDialog(props: ReferencePickerDialogProps): import("react/jsx-runtime").JSX.Element | null;
export {};
