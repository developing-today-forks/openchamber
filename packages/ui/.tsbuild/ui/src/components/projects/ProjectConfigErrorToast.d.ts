import * as React from 'react';
/**
 * Keeps OpenCode's "this project's config is invalid" error on screen while
 * that project is active. The error lives in the config store per project, so
 * switching to a healthy project clears the toast and switching back shows it
 * again; a successful reload after the user fixes the file clears it too.
 */
export declare const ProjectConfigErrorToast: React.FC;
