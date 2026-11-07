import type { ProjectIdentitySaveData } from './useProjectIdentityForm';
import type { useProjectIdentityForm } from './useProjectIdentityForm';
type ProjectIdentityFormState = ReturnType<typeof useProjectIdentityForm>;
export declare const useProjectIdentityAutoSave: (form: ProjectIdentityFormState, onSave: (data: ProjectIdentitySaveData) => void | Promise<void>) => void;
export {};
