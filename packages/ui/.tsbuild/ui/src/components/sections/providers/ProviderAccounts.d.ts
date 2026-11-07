import React from 'react';
import type { ConnectionInfo } from '@opencode/client';
import { type CredentialConnection } from './providerAuth';
interface ProviderAccountsProps {
    /** Stored credentials first, then environment variables the server can see. */
    connections: readonly ConnectionInfo[];
    /** The one credential requests go through, when a stored credential is in use. */
    activeId: string | null;
    /**
     * Credentials stored under an integration the provider does not use right now
     * (OpenCode Go keys while the Console sign-in serves Go). Removable, never switchable.
     */
    unusedIds: ReadonlySet<string>;
    /** Credential id with a write in flight; every account action waits for it. */
    busyId: string | null;
    onActivate: (account: CredentialConnection) => void;
    onRename: (account: CredentialConnection, label: string) => void;
    onRemove: (account: CredentialConnection) => void;
}
/** Stored accounts and environment connections for one provider. */
export declare const ProviderAccounts: React.FC<ProviderAccountsProps>;
export {};
