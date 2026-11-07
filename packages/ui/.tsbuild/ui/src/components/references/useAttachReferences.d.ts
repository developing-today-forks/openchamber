import type { ComposerReference } from '@/components/chat/composer/composerReferences';
import type { ReferencePickerConfirmFailure } from './ReferencePickerDialog';
import type { ReferencePickerSelection } from './referencePickerItems';
/**
 * The composer's confirm handler for the reference picker: resolve what was
 * chosen, hand every success to `onAttach`, and keep the picker open on the
 * ones that failed, with GitHub's or Linear's reason.
 */
export declare function useAttachReferences(directory: string | null, onAttach: (references: ComposerReference[]) => void): (selections: ReferencePickerSelection[]) => Promise<ReferencePickerConfirmFailure | null>;
