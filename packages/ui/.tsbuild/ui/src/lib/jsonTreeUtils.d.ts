/**
 * JSON Tree utilities for interactive JSON viewing.
 * Provides parsing, tree building, flattening, and path utilities.
 */
type JsonTreeNodeType = 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
export interface JsonTreeNode {
    id: string;
    key: string;
    value: unknown;
    type: JsonTreeNodeType;
    depth: number;
    children?: JsonTreeNode[];
    path: string[];
    isExpandable: boolean;
    childCount?: number;
}
/**
 * One row of the flattened tree: a node, or the closing bracket of an expanded
 * container with children, drawn at the container's depth after its last child.
 * A closing row's `key` cannot collide with a node id, because node ids always
 * start with "root"; rows are unique as long as node ids are.
 */
export type FlatJsonNode = {
    kind: 'node';
    key: string;
    node: JsonTreeNode;
    isExpanded: boolean;
} | {
    kind: 'close';
    key: string;
    node: JsonTreeNode;
};
export interface JsonTreeOptions {
    maxDepth?: number;
    maxNodes?: number;
    initiallyExpandedDepth?: number;
}
export declare function parseJsonToTree(text: string, options?: JsonTreeOptions): JsonTreeNode | null;
export declare function flattenTree(root: JsonTreeNode | null, collapsedPaths: Set<string>): FlatJsonNode[];
export declare function getAllExpandableIds(root: JsonTreeNode | null): string[];
export declare function getExpandableIdsAboveDepth(root: JsonTreeNode | null, maxDepth: number): string[];
export {};
