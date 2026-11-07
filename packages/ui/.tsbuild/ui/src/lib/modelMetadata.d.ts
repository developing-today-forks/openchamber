import type { ModelMetadata } from '@/types';
type LiveProviderModel = Record<string, unknown> & {
    id?: string;
    name?: string;
};
export declare const mergeModelMetadataWithLiveModel: (providerId: string, model: LiveProviderModel, metadata?: ModelMetadata) => ModelMetadata | undefined;
export {};
