import React from 'react';
import { type ResolvedStarter } from './useDraftStarters';
type DraftPresetChipsProps = {
    /** Called with the resolved starter invocation when a chip is clicked. */
    onSubmit: (starter: ResolvedStarter) => void;
    /** Extra classes for the wrapper (e.g. width/spacing per surface). */
    className?: string;
};
/** Memoized: the composer re-renders on every keystroke, and nothing here depends on the draft text. */
export declare const DraftPresetChips: React.NamedExoticComponent<DraftPresetChipsProps>;
export {};
