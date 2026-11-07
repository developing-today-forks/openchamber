type SpaceModelProvider = {
    id: string;
    upstream: string;
    envName: string;
};
export declare const SPACE_MODEL_PROVIDERS: readonly SpaceModelProvider[];
/**
 * What the host's browser login for a provider is called on screen, for the providers whose login
 * a space can be given (the server's `LOGIN_PROVIDERS`): OpenAI's is a ChatGPT login, GitHub
 * Copilot's is its own. The `spaces.failure.login*` texts take the name as `{name}`.
 */
export declare const SPACE_LOGIN_NAMES: ReadonlyMap<string, string>;
/**
 * The providers a space can be given only through the host's login, because they issue no key:
 * GitHub Copilot. Their row in the dialogs offers the login alone, and only while the host has one.
 */
export declare const SPACE_LOGIN_ONLY_PROVIDERS: readonly string[];
/** Whether a space can be given this provider at all, by key or by the host's login. */
export declare const isSpaceGrantableProvider: (providerId: string) => boolean;
export {};
