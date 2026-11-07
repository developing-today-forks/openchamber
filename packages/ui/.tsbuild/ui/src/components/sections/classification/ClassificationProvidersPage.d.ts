import React from 'react';
interface ClassificationProvidersPageProps {
    titleLeading: React.ReactNode;
    /** Opens the OpenCode provider whose API key a source reads. */
    onOpenProvider: (providerId: string) => void;
}
/**
 * Settings → Providers → Classification providers: where Jev requests go, for
 * every feature that asks Jev. Not an OpenCode provider,
 * so it has its own page instead of the provider detail view. The server owns
 * the pick and the TypeSafe key (`packages/web/server/lib/routing`).
 */
export declare const ClassificationProvidersPage: React.FC<ClassificationProvidersPageProps>;
export {};
