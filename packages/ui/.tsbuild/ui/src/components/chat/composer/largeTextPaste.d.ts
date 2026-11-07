/**
 * Large plain-text paste → virtual file attachment helpers.
 *
 * Detect when clipboard text is large enough that inserting it into the
 * composer would clutter the prompt, and build an in-memory text/plain File
 * the attachment pipeline can send like any other .txt attachment.
 */
export declare const LARGE_TEXT_PASTE_CHAR_THRESHOLD = 2000;
export declare const LARGE_TEXT_PASTE_LINE_THRESHOLD = 25;
/**
 * Whether pasted plain text should be offered (or auto-handled) as a file
 * attachment instead of being inserted into the composer.
 *
 * Empty / whitespace-only pastes are never large. Thresholds are OR'd:
 * character count or line count is enough.
 */
export declare const isLargePlainTextPaste: (text: string, options?: {
    charThreshold?: number;
    lineThreshold?: number;
}) => boolean;
export declare const createPastedContextFile: (text: string, filename: string) => File;
interface PasteSnapshot {
    value: string;
    selection: {
        start: number;
        end: number;
    };
    scope: string;
}
export interface LargeTextPasteCandidate {
    clipboardText: string;
    value: string;
    scope: string;
    from: number;
    to: number;
    pastedAt: number;
}
/** One composer-owned, short-lived gesture. The first insertion stays native. */
export declare class LargeTextPasteGesture {
    private state;
    private keyboardPaste;
    private expiry;
    invalidate(): void;
    keyDown(event: Pick<KeyboardEvent, 'key' | 'code' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey' | 'repeat'>): void;
    keyUp(event: Pick<KeyboardEvent, 'key' | 'code' | 'altKey'>): void;
    beginPaste(text: string, snapshot: PasteSnapshot, now?: number): LargeTextPasteCandidate | null;
    change(change: PasteSnapshot & {
        fromPaste: boolean;
        insertedText: string;
    }): void;
    convert(candidate: LargeTextPasteCandidate, attach: () => Promise<boolean>, read: () => PasteSnapshot | null, replace: (from: number, to: number, citation: string) => void, citation: string): Promise<boolean>;
    private matches;
}
export {};
