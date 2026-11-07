import type { OpenChamberProjectAction } from './openchamberConfig';
type DevServerInfo = {
    command: string;
    label: string;
    actionId?: string;
    previewUrlHint?: string;
};
/**
 * Detect the dev server command from project actions or package.json scripts
 */
export declare function detectDevServerCommand(directory: string, projectActions: OpenChamberProjectAction[], packageJsonScripts: Record<string, string> | null): Promise<DevServerInfo | null>;
/**
 * Read package.json scripts from a directory
 */
export declare function readPackageJsonScripts(directory: string): Promise<Record<string, string> | null>;
export {};
