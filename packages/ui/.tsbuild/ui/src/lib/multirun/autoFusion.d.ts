import { type FusionJudge } from './fusion';
/** Resolves the judge's display name and context window from the provider catalog. */
export declare const resolveFusionJudge: (selection: {
    providerID: string;
    modelID: string;
    variant?: string;
    agent?: string;
}) => FusionJudge;
export type AutoFusionFailure = 'no-outputs' | 'failed';
/** Mounted once per shell that can launch runs. */
export declare function RunAutoFusion(): null;
