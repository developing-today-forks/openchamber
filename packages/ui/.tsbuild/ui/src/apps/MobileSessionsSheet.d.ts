import React from 'react';
type MobileSessionsSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** 'drawer' (default) renders a full-width left drawer over the app;
        'sidebar' renders the same content inline for the iPad persistent sidebar. */
    variant?: 'drawer' | 'sidebar';
    /** App-level footer bar (desktop-sidebar-style): current instance on the
        left, settings (and, on hosted web, a pending update) on the right. */
    footer?: {
        /** Connected instance label — Capacitor only; null hides the left slot. */
        instanceLabel: string | null;
        onOpenInstances?: () => void;
        onOpenSettings: () => void;
        onOpenScheduled: () => void;
        onOpenArchive: () => void;
        onOpenUsage: () => void;
        /** The issues and PRs board. */
        onOpenSourceBoard: () => void;
        /** The integrations catalog; absent in enterprise mode, as on the desktop sidebar. */
        onOpenIntegrations?: () => void;
        /** Present only while a server update is available (hosted web). */
        onOpenUpdate?: () => void;
    };
};
export declare const MobileSessionsSheet: React.FC<MobileSessionsSheetProps>;
export {};
