export declare const SESSION_TREE_BASE_PADDING_PX = 6;
export declare const sessionTreeRowPaddingLeft: (depth: number) => string;
/** Where the text of a tree row starts: past the level's chevron slot (14px) and gap (6px). */
export declare const sessionTreeTextInset: (depth: number) => string;
/**
 * One guide line a tree row draws: the line of `level`, which runs under the
 * slot of the row's ancestor one level up and frames that ancestor's
 * children. `end` marks its last child, where the line turns toward it.
 */
export type SessionTreeGuide = {
    level: number;
    end: boolean;
};
/**
 * The guides of each row in a run of tree rows, given their levels in display
 * order. A row's own level gets a guide that runs on, or ends at the row when
 * no later sibling follows; every shallower level whose line still has a
 * sibling to reach below runs through it. `null` breaks the run: a row that
 * is not part of a tree, such as a header or a Show more line.
 */
export declare const computeSessionTreeGuides: (levels: readonly (number | null)[]) => (readonly SessionTreeGuide[] | null)[];
