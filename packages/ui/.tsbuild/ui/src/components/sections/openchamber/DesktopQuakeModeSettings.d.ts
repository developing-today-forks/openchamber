import * as React from 'react';
import type { DesktopQuakeMode } from './useDesktopQuakeMode';
type DesktopQuakeModeSettingsProps = {
    quake: DesktopQuakeMode;
    miniChatCombo: string | null;
    onReleaseMiniChatShortcut: () => void;
};
export declare const DesktopQuakeModeSettings: React.FC<DesktopQuakeModeSettingsProps>;
export {};
