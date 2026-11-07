import type { SkillScope, SkillSource } from '@/stores/useSkillsStore';
export type SkillLocationValue = 'user-opencode' | 'project-opencode' | 'user-claude' | 'project-claude' | 'user-agents' | 'project-agents';
export declare const SKILL_LOCATION_OPTIONS: Array<{
    value: SkillLocationValue;
    scope: SkillScope;
    source: SkillSource;
    label: string;
    description: string;
}>;
export declare function locationValueFrom(scope: SkillScope, source: SkillSource): SkillLocationValue;
export declare function locationPartsFrom(value: SkillLocationValue): {
    scope: SkillScope;
    source: SkillSource;
};
