import React from 'react';
type MobileFilesSurfaceProps = {
    /** When provided, the header gets a close X that calls this. */
    onClose?: () => void;
    /** The surface is on screen; file changes wait for it. */
    visible?: boolean;
};
export declare const MobileFilesSurface: React.FC<MobileFilesSurfaceProps>;
export {};
