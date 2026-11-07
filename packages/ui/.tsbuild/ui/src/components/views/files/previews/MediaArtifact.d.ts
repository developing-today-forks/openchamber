import React from 'react';
/**
 * Native playback with the browser's own controls. The runtime's media engine
 * decides what it can decode; a codec it lacks surfaces as the element's error,
 * and the viewer says so instead of showing a dead player.
 */
export declare const MediaArtifact: React.FC<{
    kind: 'audio' | 'video';
    src: string;
    name: string;
    sizeBytes: number | null;
    download?: React.ReactNode;
}>;
