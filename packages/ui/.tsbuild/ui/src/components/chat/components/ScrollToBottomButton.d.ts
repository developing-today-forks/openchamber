import React from 'react';
interface ScrollToBottomButtonProps {
    visible: boolean;
    /** The session is still streaming: the pill carries the status label
        while the floating status row is hidden away from the live edge. */
    working?: boolean;
    onClick: () => void;
}
declare const _default: React.NamedExoticComponent<ScrollToBottomButtonProps>;
export default _default;
