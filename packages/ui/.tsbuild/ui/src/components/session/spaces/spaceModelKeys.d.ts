import { type GrantRequest, type SpaceHostLogin } from '@/lib/spaces/spaces-api';
export type KeySourceChoice = {
    source: 'login' | 'env' | 'typed';
    envName: string;
    value: string;
};
/**
 * A provider a dialog offers: with `key`, the API the window forwards a key to and the variable a
 * key usually sits in on the host; without one, a provider that issues no key and is given only
 * through the host's login, GitHub Copilot (7d); with `custom`, one of the user's own from
 * Settings, whose key the host reads from its own configuration, so the row asks for nothing.
 * `blocked` names what keeps such a provider from a grant, or null.
 */
export type SpaceModelProviderOption = {
    id: string;
    name: string;
    key: {
        upstream: string;
        envName: string;
    } | null;
    custom: {
        hasKey: boolean;
        loopback: boolean;
        blocked: 'unsupported' | null;
    } | null;
};
/**
 * The providers a space can be given: those of the host's catalog a key can be given for, the
 * composer's first, and then the login-only providers in `loginOnly`, which each dialog names
 * when it has a reason to show the row, the host's login or a grant the space holds. The catalog
 * is read for the host project the space was made for: inside a space the composer's own list
 * holds only the providers the space already has models of, and the grant dialog is where more
 * are given. A project whose catalog was not read yet is read now; until then the active one
 * stands in. The user's own providers come last, from the host's configuration of
 * `customDirectory`, the project's; the create dialog names it apart, since it reads the catalog
 * of the active directory.
 */
export declare const useSpaceModelProviders: (projectDirectory: string | null | undefined, loginOnly: readonly string[], customDirectory?: string | null | undefined) => SpaceModelProviderOption[];
export declare const isAccessChoiceComplete: (provider: SpaceModelProviderOption, choice: KeySourceChoice) => boolean;
export declare const modelGrantOf: (provider: SpaceModelProviderOption, choice: KeySourceChoice) => Extract<GrantRequest, {
    kind: 'model' | 'login' | 'custom';
}>;
/**
 * The host's browser login for a provider as the dialogs show it: what it is called, its state,
 * and when its token ends, null for one that has no end and so needs the stronger warning.
 */
export type HostLoginOffer = {
    name: string;
    state: SpaceHostLogin['state'];
    expires: string | null;
};
/**
 * The host's browser logins by provider, read once when a dialog opens and again on `refresh`,
 * after a grant the host refused. Null until read, and null when the host could not be asked:
 * the dialogs then offer no login, and never say "signed out" on a failed read.
 */
export declare const useSpaceHostLogins: (open: boolean) => {
    logins: ReadonlyMap<string, HostLoginOffer> | null;
    refresh: () => void;
};
/** The host's login a dialog offers for a provider: one the host can say now, or none. */
export declare const usableHostLoginOf: (logins: ReadonlyMap<string, HostLoginOffer> | null, providerId: string) => HostLoginOffer | null;
