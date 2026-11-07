import type { ClientAuthAPI } from '@/lib/api/types';
/**
 * Shown while another copy of this server's data, usually on a second
 * computer, keeps taking the relay slot, so devices added for "Anywhere" land
 * on either computer. Offers to give this computer its own relay identity.
 */
export declare function RelayConflictNotice({ clientAuth }: {
    clientAuth: ClientAuthAPI;
}): import("react/jsx-runtime").JSX.Element;
