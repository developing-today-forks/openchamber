import { type Model, type Provider } from '@/lib/opencode/model';
type ProviderModel = Model;
type ProviderWithModelList = Provider & {
    models: ProviderModel[];
};
interface ModelListItem {
    provider: ProviderWithModelList;
    model: ProviderModel;
    providerID: string;
    modelID: string;
}
export declare const useModelLists: (directory?: string) => {
    favoriteModelsList: ModelListItem[];
    recentModelsList: ModelListItem[];
};
export {};
