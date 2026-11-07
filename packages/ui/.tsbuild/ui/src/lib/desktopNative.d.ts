type InvokeArgs = Record<string, unknown>;
type RelayDevTunnelData = ArrayBuffer | Uint8Array;
type RelayDevTunnelMessage = {
    type: 'connect' | 'ready' | 'data' | 'close';
    data?: RelayDevTunnelData;
};
type RelayDevTunnelEvent = {
    connectionId: string;
    remotePort: number;
    spaceId: string | null;
    message: RelayDevTunnelMessage;
};
type RelayDevTunnelBridge = {
    relayDevTunnelListen?: (handler: (event: RelayDevTunnelEvent) => void) => void;
    relayDevTunnelPost?: (connectionId: string, message: RelayDevTunnelMessage) => void;
};
declare global {
    interface Window {
        __OPENCHAMBER_DESKTOP__?: RelayDevTunnelBridge;
    }
}
export declare const listenForDesktopRelayDevTunnels: (handler: (event: RelayDevTunnelEvent) => void) => boolean;
export declare const postDesktopRelayDevTunnelMessage: (connectionId: string, message: RelayDevTunnelMessage) => void;
export declare const invokeDesktopCommand: <TValue = unknown>(command: string, args?: InvokeArgs) => Promise<TValue>;
export declare const setDesktopWindowTitle: (title: string) => Promise<void>;
type DesktopSplashColors = {
    bgLight: string;
    fgLight: string;
    bgDark: string;
    fgDark: string;
};
/**
 * Tell the shell which theme the window resolved. The splash colours ride
 * along so main can paint the next startup splash from its own store; they
 * are device state and never go through the shared settings document.
 */
export declare const setDesktopWindowTheme: (themeMode?: string, themeVariant?: string, splash?: DesktopSplashColors) => Promise<void>;
export declare const getDesktopAppVersion: () => Promise<string | null>;
export {};
