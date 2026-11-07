import { type GenerateRequest, type GenerateResult, type HostRequestErrorCode } from '@openchamber/sdk';
export type GuestGenerateProxyResult = {
    ok: true;
    result: GenerateResult;
} | {
    ok: false;
    code: HostRequestErrorCode;
    message: string;
};
/**
 * One-off text generation for a guest through the server's Small Model,
 * which resolves and authenticates the model itself. The open project only
 * informs which OpenCode config decides the model; it never enters the prompt.
 * `composer` is the composer's provider, which the model stays on, and its
 * model, used when that provider has no small one; the host sets both, never
 * the guest.
 */
export declare const guestGenerate: (guestId: string, request: GenerateRequest, directory: string | null, composer: {
    providerID: string | null;
    modelID: string | null;
}) => Promise<GuestGenerateProxyResult>;
