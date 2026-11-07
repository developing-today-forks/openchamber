export declare const useDesktopQuakeMode: (isLocalDesktop: boolean, setError: (message: string | null) => void) => {
    supported: boolean;
    enabled: boolean;
    combo: string | null;
    storedCombo: string | null;
    active: boolean;
    heightFraction: number;
    isSaving: boolean;
    setEnabled: (enabled: boolean) => void;
    saveShortcut: (combo: string | null) => Promise<boolean>;
    setHeight: (heightFraction: number) => void;
    release: () => void;
};
export type DesktopQuakeMode = ReturnType<typeof useDesktopQuakeMode>;
