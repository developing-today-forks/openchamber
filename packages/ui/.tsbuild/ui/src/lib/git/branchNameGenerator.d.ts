/**
 * Branch name generator utility for auto-generating friendly branch names.
 * Uses Ubuntu-style adjective-noun word pairs for memorable, collision-resistant naming.
 */
/**
 * Generate a random branch slug (e.g., "cosmic-dolphin", "noble-raccoon").
 */
export declare function generateBranchSlug(): string;
/**
 * Generate a branch name with optional prefix.
 * @param prefix - Optional prefix like "feature", "bugfix" (no trailing slash)
 * @returns Full branch name like "feature/cosmic-dolphin" or just "cosmic-dolphin"
 */
export declare function generateBranchName(prefix?: string): string;
