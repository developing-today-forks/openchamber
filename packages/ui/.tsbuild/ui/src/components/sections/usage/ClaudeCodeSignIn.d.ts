import React from 'react';
interface ClaudeCodeSignInProps {
    /** Runs once Claude Code holds a login again, so the caller can re-read usage. */
    onSignedIn: () => void | Promise<void>;
}
/**
 * Claude usage reads the login Claude Code itself keeps, so the fix for a
 * missing one is signing Claude Code in again. With the opencode-claude plugin
 * installed this is the plugin's own sign-in, the same one Providers shows;
 * without it, or when the list cannot be read, the user gets the terminal
 * command, which works either way.
 */
export declare const ClaudeCodeSignIn: React.FC<ClaudeCodeSignInProps>;
export {};
