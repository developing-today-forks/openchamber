import React from 'react';
interface ModelChangeDividerProps {
    /** The previous turn's real model, already compact (`provider/model#variant`). */
    from: string;
    /** This turn's real model, already compact. */
    to: string;
    /** This turn's first assistant message, to look up why it changed (round-robin, sticky, failover). */
    assistantMessageId?: string;
}
declare const _default: React.NamedExoticComponent<ModelChangeDividerProps>;
export default _default;
