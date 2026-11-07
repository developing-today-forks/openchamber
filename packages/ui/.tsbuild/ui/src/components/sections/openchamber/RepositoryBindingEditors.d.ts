import React from 'react';
type SourceControlBindingSettingsProps = {
    className?: string;
    directory: string;
};
/**
 * The remotes the repository's identity does not reach.
 *
 * Every remote follows the repository's identity: the System identity reaches
 * all of them, any other identity those on its own host and protocol. What is
 * left — a remote on another host, or one reached over the other protocol —
 * is listed here with a choice of the identities that can reach it.
 */
export declare const AdditionalRemoteGrants: React.FC<SourceControlBindingSettingsProps>;
export declare const AuxiliaryBindingSettings: React.FC<SourceControlBindingSettingsProps>;
export {};
