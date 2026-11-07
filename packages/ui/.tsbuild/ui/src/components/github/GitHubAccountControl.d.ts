import React from 'react';
import type { SourceControlIdentity } from '@/lib/api/types';
/**
 * The connected account of the project's host: an avatar, and a switcher when
 * more than one account is signed in (OAuth, token and `gh`/`glab` CLI
 * logins). GitHub unless a GitLab project names its instance. Renders nothing
 * while that host is disconnected — connecting happens in Settings →
 * Integrations.
 */
export declare const GitHubAccountControl: React.FC<{
    className?: string;
    identity?: SourceControlIdentity;
}>;
