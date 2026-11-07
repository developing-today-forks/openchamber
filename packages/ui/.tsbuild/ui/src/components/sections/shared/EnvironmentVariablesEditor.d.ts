import React from 'react';
import { type EnvironmentVaultRead } from '@/lib/environmentApi';
type EnvironmentVariablesEditorProps = {
    /** Names of the stored variables. Values never reach the UI. */
    names: string[];
    /** Variables whose value is a vault reference, with the reference. */
    references?: Readonly<Record<string, string>>;
    /** Each reference's last read. */
    vault?: Readonly<Record<string, EnvironmentVaultRead>>;
    disabled?: boolean;
    /** Stores a value; resolves true when it was saved. */
    onSet: (name: string, value: string) => Promise<boolean>;
    onRemove: (name: string) => Promise<boolean>;
};
/**
 * A list of environment variable names with a way to add a variable, replace
 * a stored value or remove one. A stored value is never shown: replacing it
 * means typing a new one.
 */
export declare const EnvironmentVariablesEditor: React.FC<EnvironmentVariablesEditorProps>;
export {};
