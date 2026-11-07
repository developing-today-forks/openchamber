/**
 * Scrolling microphone level history for the dictation overlay.
 *
 * Newest sample is at the right edge and the history scrolls left, so the row
 * reads as a live recording trace rather than a single level bar. Silence
 * renders as a dot, speech as a rounded bar.
 *
 * Drawn on a canvas fed by a level subscription: the level updates ~12 times a
 * second, and routing that through React state would re-render the whole
 * dictation overlay at the same rate.
 */
import React from 'react';
import type { DictationLevelListener } from '@/lib/dictation/use-dictation-audio-source';
interface DictationWaveformProps {
    subscribeLevel: (listener: DictationLevelListener) => () => void;
    className?: string;
}
export declare const DictationWaveform: React.FC<DictationWaveformProps>;
export {};
