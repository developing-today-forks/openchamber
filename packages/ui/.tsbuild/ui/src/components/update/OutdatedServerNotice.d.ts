/**
 * The connected server runs an OpenChamber this app cannot use. Offers the
 * server's own update through its update route, over the transport the app
 * already uses for it, so a relay or tunnel host can be updated from here too.
 * A server that cannot update itself gets the command to run on it.
 */
export declare function OutdatedServerNotice({ version }: {
    version: string;
}): import("react/jsx-runtime").JSX.Element;
