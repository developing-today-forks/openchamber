import React from 'react';
/**
 * The raw provider response behind a failed turn, collapsed by default. The
 * short message above it is what most people need; the body is there for the
 * cases where that message says too little (an unrecognised error code, a
 * proxy's HTML page).
 */
export declare const ErrorResponseDetails: React.FC<{
    body: string;
    className?: string;
}>;
