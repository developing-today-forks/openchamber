import React from 'react';
import type { FormField, FormValue } from '@opencode/client';
interface ProviderFormFieldsProps {
    /** Fields an integration method declares, in declaration order. */
    fields: readonly FormField[];
    values: Record<string, FormValue>;
    onChange: (key: string, value: FormValue) => void;
}
/**
 * The inputs for an integration method's `form`, shared by OAuth sign-in and
 * API key methods. Labels, descriptions and placeholders come from what the
 * integration declares; only the fields whose conditions hold are shown.
 */
export declare const ProviderFormFields: React.FC<ProviderFormFieldsProps>;
export {};
