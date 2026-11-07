import type { GitIdentityProfile } from '@/lib/api/types';
export type { GitIdentityProfile } from '@/lib/api/types';
interface GitIdentitiesStore {
    selectedProfileId: string | null;
    defaultGitIdentityId: string | null;
    profiles: GitIdentityProfile[];
    globalIdentity: GitIdentityProfile | null;
    isLoading: boolean;
    setSelectedProfile: (id: string | null) => void;
    loadProfiles: () => Promise<boolean>;
    loadGlobalIdentity: () => Promise<boolean>;
    loadDefaultGitIdentityId: () => Promise<boolean>;
    setDefaultGitIdentityId: (id: string | null) => Promise<boolean>;
    createProfile: (profile: Omit<GitIdentityProfile, 'id'> & {
        id?: string;
    }) => Promise<boolean>;
    updateProfile: (id: string, updates: Partial<GitIdentityProfile>) => Promise<boolean>;
    deleteProfile: (id: string) => Promise<boolean>;
    getProfileById: (id: string) => GitIdentityProfile | undefined;
    resetForRuntimeSwitch: (runtimeKey: string) => void;
}
export declare const useGitIdentitiesStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<GitIdentitiesStore>, "devtools" | "setState"> & {
    setState(partial: GitIdentitiesStore | Partial<GitIdentitiesStore> | ((state: GitIdentitiesStore) => GitIdentitiesStore | Partial<GitIdentitiesStore>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: GitIdentitiesStore | ((state: GitIdentitiesStore) => GitIdentitiesStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}>;
