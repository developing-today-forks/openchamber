type UpdateInstallFailureReason = 'signature' | 'updater-disabled' | 'unknown';
/**
 * Classify a desktop updater install failure. The platform installers report
 * these as opaque English strings, and the two known ones need very different
 * advice from "something went wrong".
 */
export declare const classifyUpdateInstallError: (error: Error) => UpdateInstallFailureReason;
/**
 * Message for a failed "Restart to Update". Falls back to the raw updater text
 * so an unrecognized failure is still visible rather than silently swallowed.
 */
export declare const getUpdateInstallErrorMessage: (error: Error) => string;
export {};
