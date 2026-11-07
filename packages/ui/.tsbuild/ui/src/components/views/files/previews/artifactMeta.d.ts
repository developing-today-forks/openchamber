/** Small formatters for the metadata line above an artifact preview. */
export declare const formatArtifactSize: (bytes: number | null) => string;
/** `m:ss`, or `h:mm:ss` once an hour is reached. */
export declare const formatArtifactDuration: (seconds: number | null) => string;
export declare const formatArtifactDimensions: (size: {
    width: number;
    height: number;
} | null) => string;
