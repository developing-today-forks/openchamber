import type { RecoveryVariant } from './desktopRecoveryConfig';
export type RecoveryPrimaryAction = 'use-local' | 'use-remote';
export type RecoveryNextStep = {
    kind: 'local-setup';
} | {
    kind: 'switch-default-to-local';
} | {
    kind: 'remote-form';
};
export declare function resolveRecoveryNextStep(variant: RecoveryVariant, action: RecoveryPrimaryAction): RecoveryNextStep;
