import { z } from 'zod';
import type { I18nKey } from '@/lib/i18n';
/**
 * What a permission request asks for, in the user's terms. OpenCode names the
 * capability (`action`) and the things it applies to (`resources`); for
 * directory access the resources are globs such as `/abs/dir/*`, so the card
 * shows the directory itself instead of the glob.
 */
export type PermissionTarget = {
    /** Path, pattern, query, or id the request applies to. */
    value: string;
    /** Whether `value` is a filesystem path that can be shortened to `~`. */
    isPath: boolean;
    /** A file inside `value` that triggered a directory request. */
    file?: string;
};
type PermissionSummary = {
    titleKey: I18nKey;
    /** Only set for `chat.permissionCard.summary.tool`. */
    tool?: string;
    targets: PermissionTarget[];
    /** Search scope for glob/grep requests. */
    scope?: string;
    /** Metadata fully explained by the summary; the raw fallback stays hidden. */
    metadataExplained: boolean;
};
/**
 * Metadata fields the summary explains. `filepath`/`parentDir` come with an
 * external-directory request raised by a patch; `path` is a glob/grep scope.
 */
export declare const permissionSummaryMetadataSchema: z.ZodCatch<z.ZodObject<{
    filepath: z.ZodCatch<z.ZodOptional<z.ZodString>>;
    parentDir: z.ZodCatch<z.ZodOptional<z.ZodString>>;
    path: z.ZodCatch<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>>;
type PermissionSummaryMetadata = z.infer<typeof permissionSummaryMetadataSchema>;
export declare const summarizePermission: (action: string, resources: readonly string[], metadata: PermissionSummaryMetadata, 
/** The request carries metadata beyond what this summary can explain. */
hasMetadata: boolean) => PermissionSummary;
/**
 * Whether an "always" reply would save anything. OpenCode saves a rule only
 * from `save`; without one, "always" acts like "once" and the next request
 * asks again.
 */
export declare const canSavePermission: (save: readonly string[] | undefined) => boolean;
/**
 * Patterns an "always" reply saves, as the user reads them. A lone `*` means
 * the whole capability, which the plain "Always allow" label already says.
 */
export declare const describeSavePatterns: (action: string, save: readonly string[]) => string[];
export {};
