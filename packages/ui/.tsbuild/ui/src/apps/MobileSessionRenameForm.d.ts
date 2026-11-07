import React from 'react';
import type { useSessionAiRenameAction } from '@/components/session/useSessionAiRenameAction';
/** Inline title editor shown in place of a mobile session row's content while
    renaming. Mirrors the desktop sidebar rename: a bare transparent input at
    the row's own typography (no bordered field — the row keeps its exact
    height) with explicit icon buttons: generate with AI, save, cancel. */
export declare const MobileSessionRenameForm: React.FC<{
    initialTitle: string;
    /** Left padding, so the input starts where the row's title did. */
    indent: number;
    /** Extra classes for the form; multi-line rows pin their own height. */
    className?: string;
    /** The row's AI rename; passed in so the row shows its pending spinner
        without running the hook twice. */
    aiRename: ReturnType<typeof useSessionAiRenameAction>;
    onSubmit: (title: string) => void;
    onCancel: () => void;
}>;
