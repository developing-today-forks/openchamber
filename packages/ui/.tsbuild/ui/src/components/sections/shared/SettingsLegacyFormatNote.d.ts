import React from 'react';
interface SettingsLegacyFormatNoteProps {
    /** The entity's file still uses OpenCode 1 spellings. */
    legacy: boolean;
    /** The file OpenChamber rewrites on the next save. */
    path?: string | null;
    className?: string;
}
/**
 * One quiet line telling the user their config file predates OpenCode 2.
 * OpenChamber never moves the file: the next save rewrites it in place, so the
 * note is informational and has no action.
 */
export declare const SettingsLegacyFormatNote: React.FC<SettingsLegacyFormatNoteProps>;
export {};
