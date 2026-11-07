import type { GuestRequest, GuestRequestResult, IntegrationAuth } from '@openchamber/sdk';
export declare const isHostLinearIssueGet: (auth: IntegrationAuth | undefined, request: Pick<GuestRequest, 'method' | 'path'>) => boolean;
/** First-party Linear get. Guest proxy stays off this path. */
export declare const fetchHostLinearIssueGet: (auth: IntegrationAuth | undefined, request: GuestRequest) => Promise<GuestRequestResult | null | undefined>;
