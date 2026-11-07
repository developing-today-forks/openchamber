/**
 * Path containment for checkouts. Kept free of store and runtime imports so
 * sync, multi-run and worktree modules that the manager itself reaches can
 * use it without an import cycle.
 */
import type { WorktreeMetadata } from '@/types/worktree';
/** True when `directory` lies inside `checkoutPath`. Both paths are normalized. */
export declare const checkoutHoldsSubfolder: (checkoutPath: string, directory: string) => boolean;
/** True when `directory` is `checkoutPath` itself or lies inside it. Both paths are normalized. */
export declare const checkoutHoldsDirectory: (checkoutPath: string, directory: string) => boolean;
/**
 * The worktree whose checkout holds `directory`, itself or a sub-folder of it.
 * The longest checkout path wins so a worktree nested in another one is found.
 * Compares normalized paths and returns undefined when none holds it.
 */
export declare const findWorktreeHoldingDirectory: (worktrees: Iterable<WorktreeMetadata>, directory: string) => WorktreeMetadata | undefined;
/**
 * The registered project a directory belongs to, given where it sits inside
 * its checkout (`folder`, `ai/src` for `<checkout>/ai/src`) and the primary
 * checkout of its repository. The longest project containing the directory
 * inside the same checkout wins; a project that only contains the checkout,
 * such as `/repo` around a worktree at `/repo/.worktrees/a`, does not count.
 * Otherwise the longest project in the primary checkout whose folder holds
 * `folder`, so a session in `<worktree>/ai/src` follows `/repo/ai` rather
 * than `/repo`. The server applies the same rule to `session.moveToWorktree`.
 */
export declare const projectPathForCheckoutFolder: (input: {
    directory: string;
    folder: string;
    primaryRoot: string;
    projectPaths: readonly string[];
}) => string | null;
