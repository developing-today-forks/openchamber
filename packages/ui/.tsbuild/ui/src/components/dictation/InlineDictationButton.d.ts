/**
 * Dictation for a plain text field outside the composer (project notes and
 * todos): a mic button that turns into discard/insert while recording and a
 * spinner while the server transcribes. The transcript goes to `onTranscript`;
 * the host decides where it lands in its field.
 *
 * Unlike ComposerDictation there is no overlay and no global shortcut: the
 * toggle_dictation shortcut belongs to the chat composer, and a second listener
 * would start two recordings from one key press.
 */
import React from 'react';
interface InlineDictationButtonProps {
    onTranscript: (text: string) => void;
    disabled?: boolean;
    /** Classes for each icon button, so the controls match the host's own. */
    buttonClassName: string;
    iconClassName?: string;
}
export declare const InlineDictationButton: React.FC<InlineDictationButtonProps>;
export {};
