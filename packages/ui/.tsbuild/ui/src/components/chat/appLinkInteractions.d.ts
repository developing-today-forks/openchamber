import { type SessionLinkTarget } from '@/lib/sessionLinks';
type AppLinkInteractionOptions = {
    allowExternalHttp: boolean;
    openAppLink: (url: string) => void;
    openExternalHttp: (url: string) => void;
    /** Opens a link to a session or message of this app in place. */
    openSessionLink?: (target: SessionLinkTarget) => void;
    /** Addresses serving this instance; web session links count only when they point at one. */
    ownOrigins?: readonly string[];
};
type LinkInteractionContainer = {
    addEventListener: (type: string, listener: (event: MouseEvent) => void) => void;
    removeEventListener: (type: string, listener: (event: MouseEvent) => void) => void;
};
export declare const attachAppLinkInteractions: (container: LinkInteractionContainer, options: AppLinkInteractionOptions) => (() => void);
export {};
