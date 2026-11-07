import React from 'react';
import type { IconName } from '@/components/icon/icons';
interface ComposerStatusStripProps {
    icon: IconName;
    /** A spinner says the wait is active work, not a pause. */
    spin?: boolean;
    text: string;
}
/**
 * A quiet status line among the composer's top rows, for a wait the first
 * prompt depends on: a worktree running its setup commands, a message waiting
 * for its space. It says why nothing happens yet, so the wait does not look
 * stuck; it offers no action.
 */
export declare const ComposerStatusStrip: React.FC<ComposerStatusStripProps>;
export {};
