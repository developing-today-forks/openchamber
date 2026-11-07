import React from 'react';
import type { FilePart, Part } from '@/lib/opencode/model';
import type { AgentMentionInfo, ToolPopupContent } from '../types';
type UserTextPartProps = {
    part: Part;
    messageId: string;
    isMobile: boolean;
    agentMention?: AgentMentionInfo;
    /**
     * Message-level collapse: all parts of the user message share one expanded
     * state owned by the message body, expanding any part expands the whole
     * message, and the message body renders the single show more / show less
     * control from the truncation each part reports.
     */
    messageExpanded: boolean;
    onExpandMessage: () => void;
    partIndex: number;
    onTruncationChange: (partIndex: number, truncated: boolean) => void;
    /** Names of the files attached to this message; `[name]` in the text renders as a file chip. */
    attachmentFilenames: readonly string[];
    /** The message's file parts; a citation of one the app can show opens it on click. */
    attachmentFiles?: readonly FilePart[];
    /** The message's popup opener, for images and inline text. */
    onShowPopup?: (content: ToolPopupContent) => void;
};
declare const _default: React.NamedExoticComponent<UserTextPartProps>;
export default _default;
