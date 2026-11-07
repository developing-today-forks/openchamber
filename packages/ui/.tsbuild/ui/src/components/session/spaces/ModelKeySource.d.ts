/**
 * Where a model's access comes from, as the create dialog and the grant dialog both ask it, in one
 * row: a picker of the source and, beside it, what that source needs. The host's own browser login
 * is offered only when the host has one the space can be given (7c); an environment variable of the
 * host's is remembered by name and given again after every restart; a key pasted once is kept
 * nowhere. A provider that issues no key, GitHub Copilot, has the login alone (7d); a login whose
 * token has no end says so, since the space keeps it until it is deleted.
 */
import React from 'react';
import type { HostLoginOffer, KeySourceChoice, SpaceModelProviderOption } from './spaceModelKeys';
export declare const ModelKeySource: React.FC<{
    provider: SpaceModelProviderOption;
    login: HostLoginOffer | null;
    choice: KeySourceChoice;
    onChange: (change: Partial<KeySourceChoice>) => void;
    machine?: string | null;
}>;
