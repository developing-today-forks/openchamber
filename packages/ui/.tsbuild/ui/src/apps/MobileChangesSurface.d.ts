import React from 'react';
import { useNestedGitDirectory } from '@/hooks/useNestedGitDirectory';
type MobileChangesSurfaceProps = {
    /** When provided, the list header gets a close X that calls this. */
    onClose?: () => void;
    /**
     * A new request object opens its working-tree diff, including repeated requests
     * for the same path. Reopening the drawer keeps the same object and navigation.
     */
    initialDiff?: {
        path: string;
        staged: boolean;
    } | null;
    /** The workspace drawer keeps visited panes mounted while hidden. */
    visible?: boolean;
    /** The drawer closes here so a conflict handed to chat lands on the chat. */
    onNavigatedToChat?: () => void;
};
export declare const MobileChangesSurface: React.FC<MobileChangesSurfaceProps>;
interface MobileChangesPaneProps extends MobileChangesSurfaceProps {
    rootDirectory: string;
    repository: ReturnType<typeof useNestedGitDirectory>;
}
/** Repository-scoped navigation and actions, separate from session directory resolution. */
export declare const MobileChangesPane: React.FC<MobileChangesPaneProps>;
export {};
