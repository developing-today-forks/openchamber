/**
 * Makes a Markdown file's relative images and links work inside the preview.
 *
 * The renderer emits `<img src="./shot.png">` and `<a href="notes.md">` as
 * written; the page would resolve both against the app's own URL and get
 * nothing. Images are fetched through the runtime and swapped for object URLs,
 * `<picture>`/`srcset` candidates the same way, links open the target file in
 * the viewer, and `#fragment` links scroll to the heading in this file. Resolution is against the file's
 * directory, not the workspace root, and a target outside the workspace is
 * read the way the File Editor already reads such files.
 */
export declare const useMarkdownLocalAssets: ({ container, filePath, workspaceRoot, onOpenFile, enabled, colorScheme, }: {
    /** The rendered preview; state rather than a ref so mounting re-runs the wiring. */
    container: HTMLElement | null;
    filePath: string | null;
    workspaceRoot: string | null;
    onOpenFile: (absolutePath: string) => void;
    enabled: boolean;
    /** The app theme's variant, which `prefers-color-scheme` sources follow. */
    colorScheme: 'light' | 'dark';
}) => void;
