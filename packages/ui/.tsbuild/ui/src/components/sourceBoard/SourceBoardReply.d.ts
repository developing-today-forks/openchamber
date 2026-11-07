import * as React from 'react';
import type { GitHubReference, SourceControlReadContext } from '@/lib/api/types';
/**
 * Below an issue's or pull request's activity: write a comment, or on an
 * open pull request approve it or request changes with the text as the
 * review's body. The text stays in the box until the host has it.
 */
export declare const SourceBoardReply: React.FC<{
    reference: GitHubReference;
    context: SourceControlReadContext;
    /**
     * The item's feed and the list read again: after a write so it shows, and
     * after a refused review, which is most often a push since the preview
     * was read.
     */
    onRefresh: () => void;
}>;
