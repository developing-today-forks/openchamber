import React from 'react';
/**
 * The workspace part of General: files and the editor, the terminal, and how
 * panels and links behave. VS Code keeps only the editor settings it applies.
 */
export declare const GeneralWorkspaceSettings: React.FC<{
    /** The page opens on these sections (no desktop app section above them). */
    firstSection: boolean;
}>;
/** The last sections of General: how messages stream in, and usage reports. */
export declare const GeneralConnectionAndPrivacySettings: React.FC;
