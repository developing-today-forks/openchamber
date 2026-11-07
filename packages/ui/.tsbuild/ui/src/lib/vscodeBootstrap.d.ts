/**
 * Extension-host bootstrap config injected into the VS Code webview HTML
 * before any bundled module evaluates. Prefer this over RuntimeAPIs for
 * early VS Code detection during store module initialization.
 */
export interface VSCodeBootstrapConfig {
    workspaceFolder?: string;
    workspaceFolders?: unknown;
    /** "parallel" on the tab the "Run on several models" command opens. */
    initialComposer?: unknown;
}
export declare const getVSCodeBootstrapConfig: () => VSCodeBootstrapConfig | null;
export declare const getVSCodeBootstrapWorkspaceFolder: () => string | null;
export declare const isVSCodeBootstrapPresent: (bootstrapConfig?: VSCodeBootstrapConfig | null) => boolean;
