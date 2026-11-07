import { type ProjectRef } from './projectContextApi';
/**
 * Refresh one visible owner through the existing control stream, never a
 * poller. `read` is what a refresh does; by default it reloads the store.
 */
export declare const observeProjectContext: (project: ProjectRef, read?: () => Promise<void>) => (() => void);
