import type { Project, SourceControlAPI, SourceControlReadContext } from '@/lib/api/types';
type DetectedUpstreamResult = {
    upstream: Project | null;
    branches: string[];
};
export declare const getDetectedUpstreamContextKey: (context: SourceControlReadContext) => string;
export declare const loadDetectedUpstreamRepo: (sourceControl: Pick<SourceControlAPI, 'projectUpstream' | 'projectBranches'>, context: SourceControlReadContext) => Promise<DetectedUpstreamResult>;
export {};
