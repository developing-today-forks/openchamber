import React from 'react';
import type { DiffViewMode } from '../DiffViewToggle';
export interface ToolPartDiffPreviewProps {
    diff: string;
    diffViewMode: DiffViewMode;
}
declare const ToolPartDiffPreview: React.FC<ToolPartDiffPreviewProps>;
export default ToolPartDiffPreview;
