import React from 'react';
import { type CustomProviderFormState, type CustomProviderPersistPlan } from './custom-provider-form';
type CustomProviderFormProps = {
    existingProviderIDs: ReadonlySet<string>;
    disabledProviders?: readonly string[];
    busy?: boolean;
    mode?: 'create' | 'edit';
    initialValues?: CustomProviderFormState;
    allowExistingAuth?: boolean;
    authFailureHint?: string | null;
    onSubmit: (plan: CustomProviderPersistPlan) => void | Promise<void>;
    onCancel?: () => void;
    onDisconnect?: () => void | Promise<void>;
};
export declare const CustomProviderForm: React.FC<CustomProviderFormProps>;
export {};
