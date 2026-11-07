/**
 * Home and disk roots never get a repository: Git surfaces ignore one there
 * (it would cover every file), and the server refuses the request anyway.
 */
export declare const canOfferGitInitialization: (directory: string, homeDirectory: string | null | undefined) => boolean;
