import React from 'react';
import type { WalkthroughTarget } from '@/lib/walkthrough/types';
/**
 * The walkthrough of what the phone's Changes shows, pushed over its list the
 * way a file's diff is. It opens on the contents (what the change is about and
 * its steps); a step opens the stream there, with the step list and arrows in
 * the header. The model, the language and Regenerate wait in the options
 * sheet, except before the first walkthrough, when the empty state offers them.
 */
export declare const MobileWalkthroughScreen: React.FC<{
    directory: string;
    target: WalkthroughTarget;
    /** What is being walked through, such as "Commit · e1d7e102". */
    subtitle: string;
    /** Moves when the subject's content moves, so the walkthrough reads again. */
    revision: string;
    visible: boolean;
    onBack: () => void;
}>;
