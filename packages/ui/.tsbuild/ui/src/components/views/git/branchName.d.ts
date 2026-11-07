/**
 * Turns typed text into a name `git check-ref-format --branch` accepts.
 * Whitespace and the characters git forbids become `-`; the sequences git
 * refuses (`..`, `@{`, a component starting with `.` or ending in `.lock`,
 * a trailing `.`, a lone `@`) are dropped. Every other character stays, so
 * names in any script, such as `feature/测试`, reach git unchanged.
 */
export declare const sanitizeBranchNameInput: (value: string) => string;
