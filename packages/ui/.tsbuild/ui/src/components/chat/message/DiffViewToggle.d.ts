import React from 'react';
export type DiffViewMode = 'side-by-side' | 'unified';
interface DiffViewToggleProps {
    mode: DiffViewMode;
    onModeChange: (mode: DiffViewMode) => void;
    className?: string;
}
export declare const DiffViewToggle: React.FC<DiffViewToggleProps>;
export {};
