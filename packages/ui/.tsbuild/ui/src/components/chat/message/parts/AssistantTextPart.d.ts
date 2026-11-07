import React from 'react';
import type { Part } from '@/lib/opencode/model';
import type { StreamPhase, ToolPopupContent } from '../types';
interface AssistantTextPartProps {
    part: Part;
    sessionId?: string;
    messageId: string;
    streamPhase: StreamPhase;
    onShowPopup?: (content: ToolPopupContent) => void;
}
declare const _default: React.NamedExoticComponent<AssistantTextPartProps>;
export default _default;
