/** `1.22.0` or `>=1.22.0`. Ranges beyond a floor are not accepted. */
export declare const OPENCHAMBER_ENGINE_PATTERN: RegExp;
type OpenChamberVersionParts = {
    major: number;
    minor: number;
    patch: number;
};
export declare const parseOpenChamberVersion: (value: string) => OpenChamberVersionParts | null;
export declare const compareOpenChamberVersions: (left: string, right: string) => number;
/** Normalize `>=1.22.0` / `1.22.0` to the floor version string. */
export declare const openChamberEngineMinimum: (engine: string) => string | null;
/**
 * True when this OpenChamber build is new enough for the guest's `engines.openchamber`.
 * Unknown host versions fail closed when an engine is declared.
 */
export declare const hostMeetsOpenChamberEngine: (hostVersion: string, engine: string) => boolean;
export {};
