export declare const createBranchValidationRequests: () => {
    setScope(scope: string): void;
    begin(scope: string, branch: string): symbol | null;
    isCurrent(scope: string, branch: string, token: symbol): boolean;
    finish(scope: string, branch: string, token: symbol): void;
};
