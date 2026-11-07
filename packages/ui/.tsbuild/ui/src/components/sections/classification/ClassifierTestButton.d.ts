import React from 'react';
import { type CustomEndpointInput } from '@/lib/routing/routingApi';
/**
 * Sends one Jev request and says what happened, so a wrong URL, model or key
 * shows up here instead of as a feature that quietly falls back. `draft`
 * tests endpoint fields before they are saved; without it the provider
 * answering now is tested. Nothing is saved.
 */
export declare const ClassifierTestButton: React.FC<{
    disabled?: boolean;
    draft?: () => CustomEndpointInput | null;
}>;
