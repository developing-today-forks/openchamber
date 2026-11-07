import { type RouteState } from './types';
/**
 * Parse the current URL search parameters into a RouteState.
 * Returns null values for any parameter that is missing or invalid.
 */
export declare function parseRoute(searchParams?: URLSearchParams): RouteState;
/**
 * Check if the current URL has any route parameters.
 */
export declare function hasRouteParams(): boolean;
