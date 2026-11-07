export type FrontmatterValue = {
    kind: 'text';
    text: string;
} | {
    kind: 'list';
    items: string[];
}
/** Nested mappings and lists of mappings, shown as the YAML they are. */
 | {
    kind: 'code';
    text: string;
};
export type FrontmatterProperty = {
    key: string;
    value: FrontmatterValue;
};
export type Frontmatter = {
    kind: 'properties';
    properties: FrontmatterProperty[];
}
/** TOML, invalid YAML, or YAML that is not a mapping: shown as written. */
 | {
    kind: 'raw';
    text: string;
};
type SplitDocument = {
    frontmatter: Frontmatter | null;
    body: string;
};
/** Splits a document's leading YAML (`---`) or TOML (`+++`) block from its body. */
export declare const splitFrontmatter: (markdown: string) => SplitDocument;
export {};
