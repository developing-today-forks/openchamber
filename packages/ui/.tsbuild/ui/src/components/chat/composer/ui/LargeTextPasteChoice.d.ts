import React from 'react';
export type LargeTextPasteChoiceAction = 'attach' | 'inline';
type LargeTextPasteChoiceProps = {
    /** Desktop: the choice takes focus so the keyboard answers it. Mobile keeps the editor focused, or the keyboard closes. */
    takeFocus: boolean;
    /** `explicitlyChosen` is false when focus left for somewhere else and the paste went inline by default. */
    onChoose: (action: LargeTextPasteChoiceAction, explicitlyChosen: boolean) => void;
    /** A printable key pressed while the choice has focus: paste inline, then type it. */
    onTypeThrough: (text: string) => void;
};
/**
 * Asks how a large paste lands, right above the composer. Styled like the
 * chat's text-selection menu. Enter picks the focused option, arrows or Tab
 * switch, Escape and typing on paste inline.
 */
export declare const LargeTextPasteChoice: React.FC<LargeTextPasteChoiceProps>;
export {};
