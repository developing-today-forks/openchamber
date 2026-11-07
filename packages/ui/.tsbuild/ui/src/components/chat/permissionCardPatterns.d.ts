/**
 * Resource patterns a permission card still needs to list. A v2 shell request
 * carries no metadata, so the card renders its requested commands as the
 * command block; any pattern already visible there would only repeat itself.
 */
export declare const getVisiblePermissionPatterns: (patterns: string[], renderedCommand: string) => string[];
