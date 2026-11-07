import { type Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
type GitLineChange = 'added' | 'modified' | 'deleted' | 'deletedAbove';
/**
 * Changes of `current` against `baseline`, keyed by 1-based line in
 * `current`. `deleted` marks the line below which lines were removed;
 * `deletedAbove` marks line 1 when the removal was at the very top.
 */
export declare const computeGitLineChanges: (baseline: string, current: string) => Map<number, GitLineChange>;
type GitChangeColors = {
    added: string;
    modified: string;
    removed: string;
};
/** The gutter plus its theme; feed it a baseline with `setGitChangeBaseline`. */
export declare const gitChangeGutter: (colors: GitChangeColors) => Extension;
/** Replaces the baseline the markers compare against; `null` clears them. */
export declare const setGitChangeBaseline: (view: EditorView, baseline: string | null) => void;
export {};
