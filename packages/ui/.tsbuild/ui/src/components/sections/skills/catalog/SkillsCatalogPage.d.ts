import React from 'react';
type SkillsMode = 'manual' | 'external';
interface SkillsCatalogPageProps {
    mode: SkillsMode;
    onModeChange: (mode: SkillsMode) => void;
    showModeTabs?: boolean;
}
export declare const SkillsCatalogPage: React.FC<SkillsCatalogPageProps>;
export {};
