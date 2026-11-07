import React from 'react';
import { type ShortcutActionId, type ShortcutCombo, type CustomizableShortcutAction } from '@/lib/shortcuts';
interface RecordingKeyboardEvent {
    altKey: boolean;
    code: string;
    ctrlKey: boolean;
    isComposing: boolean;
    key: string;
    metaKey: boolean;
    repeat: boolean;
    shiftKey: boolean;
}
interface ShortcutRecordingState {
    chords: ShortcutCombo[];
    livePreview: ShortcutCombo | null;
    settled: boolean;
}
interface ShortcutRecordingDialogProps {
    action: CustomizableShortcutAction | null;
    overrides: Record<string, string>;
    onSave: (actionId: ShortcutActionId, combo: ShortcutCombo, replaceActionId?: ShortcutActionId) => void;
    onOpenChange: (open: boolean) => void;
    /** Maximum number of chords in the sequence. OS-level global shortcuts only support one. @default 2 */
    maxChords?: number;
    /**
     * Most keys held at once, modifiers included. In-app shortcuts stay at three;
     * a global shortcut needs room for all four modifiers plus a key (a "hyper"
     * key sends Ctrl+Shift+Cmd+Option). @default 3
     */
    maxKeys?: number;
}
interface RecordingOptions {
    maxKeys: number;
    /** On macOS Control and Command are separate keys and record separately. */
    macModifiers: boolean;
}
export declare function settleShortcutRecordingState(state: ShortcutRecordingState): ShortcutRecordingState;
export declare function updateShortcutRecordingState(state: ShortcutRecordingState, event: RecordingKeyboardEvent, phase: 'keydown' | 'keyup', maxChords?: number, options?: Partial<RecordingOptions>): ShortcutRecordingState;
export declare const ShortcutRecordingDialog: React.FC<ShortcutRecordingDialogProps>;
export {};
