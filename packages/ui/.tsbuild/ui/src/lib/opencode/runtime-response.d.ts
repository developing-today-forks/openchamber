/** Routing failures shared by the generated client and narrow SDK-gap adapters. */
export declare class RuntimeRoutingResponseError extends Error {
    readonly status: number;
    constructor(status: number, message: string);
}
export declare const validateRuntimeResponse: (response: Response) => Response;
