/**
 * Where the add-project picker starts: the folder holding the most recently
 * added project, since a new project usually sits beside the previous ones.
 * Home when there is none, shown as `~/...` when it lies under home.
 */
export declare const initialBrowseQuery: (projects: ReadonlyArray<{
    path: string;
    addedAt?: number;
}>, homeDirectory: string) => string;
