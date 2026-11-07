import React from 'react';
import type { ToolPart as ToolPartType } from '@/lib/opencode/model';
import type { ToolPopupContent } from '../types';
interface ToolPartProps {
    part: ToolPartType;
    isExpanded: boolean;
    onToggle: (toolId: string) => void;
    isMobile: boolean;
    alwaysShowActions?: boolean;
    onShowPopup?: (content: ToolPopupContent) => void;
    animateTailText?: boolean;
}
declare const _default: React.NamedExoticComponent<ToolPartProps>;
export default _default;
