/**
 * Where an autocomplete popup goes in focus mode.
 *
 * In the normal composer each picker anchors to the composer's own edge, which
 * is close enough to the text. In focus mode the composer fills the surface,
 * so an edge-anchored picker would sit far from what the user is typing —
 * there it follows the caret instead.
 *
 * The editor reports the caret's viewport position directly, so this only has
 * to decide whether the popup fits below the caret or has to flip above it,
 * and keep it inside the composer horizontally.
 */
import React from 'react';
import type { ComposerEditorHandle } from '../editor/ComposerEditor';
import type { AutocompleteKind } from '../language/triggers';
import type { AutocompleteOverlayPosition } from '../ui/ComposerAutocompletePopups';
export interface AutocompletePositionOptions {
    /** Only focus mode places popups at the caret. */
    enabled: boolean;
    openAutocomplete: AutocompleteKind | null;
    /** Recompute whenever the text changes, since the caret moves with it. */
    message: string;
    editorRef: React.RefObject<ComposerEditorHandle | null>;
    /** The composer box the popup is positioned within. */
    containerRef: React.RefObject<HTMLElement | null>;
}
export declare function useAutocompletePosition(options: AutocompletePositionOptions): {
    position: AutocompleteOverlayPosition | null;
    update: () => void;
};
