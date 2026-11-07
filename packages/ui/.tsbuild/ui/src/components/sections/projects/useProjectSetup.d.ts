import { type ProjectRef, type ProjectSetup } from '@/lib/openchamberConfig';
import type { ProjectSetupWriters } from './projectSetupModel';
type ProjectSetupLoad = {
    state: 'loading';
} | {
    state: 'failed';
} | {
    state: 'ready';
    setup: ProjectSetup;
};
export type ProjectSetupState = {
    load: ProjectSetupLoad;
    /** Read the setup again; every edit ends with one, so the page shows what is on disk. */
    reload: () => Promise<void>;
    write: ProjectSetupWriters;
};
/**
 * The project's setup for the project page, read once and shared by its tabs.
 * A failed read is its own state: the page must not offer edits that would
 * write a list back over a file it could not read.
 */
export declare const useProjectSetup: (projectRef: ProjectRef) => ProjectSetupState;
export {};
