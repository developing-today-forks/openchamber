import React from 'react';
import type { SourceControlAuthAccount } from '@/lib/api/types';
type SourceControlAccountListProps = {
    accounts: SourceControlAuthAccount[];
    avatarAlt: (username: string) => string;
    sourceLabel: (account: SourceControlAuthAccount) => string;
    /** What is wrong with a credential, or null when it works. */
    statusLabel: (account: SourceControlAuthAccount) => string | null;
    /** Marks the credential this account acts as when nothing names another. */
    currentLabel: string;
    renderActions: (account: SourceControlAuthAccount) => React.ReactNode;
};
export declare const SourceControlAccountList: React.FC<SourceControlAccountListProps>;
export {};
