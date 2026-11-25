/**
 * Composer voice capture against the opencode STT façade (opencode#1678
 * §8.4, design §6). Two entry points (§6.1): record on OpenChamber's
 * media-permissions path, or attach an existing audio file (§5.1).
 * Captured/file audio is never auto-submitted and never auto-sent
 * (§6.2): the review step offers playback, submit, re-record and
 * discard, surfaces the §5.3 `audio_leaves_machine` notice before
 * submit, and on success the transcript lands in the composer as
 * editable draft text (§6.3) with its provenance shown here.
 *
 * Visible copy uses the locale catalog so controls and notices follow the
 * active language without remounting the composer.
 */

import React from 'react';

import { Icon } from '@/components/icon/Icon';
import { useWaitingBlink } from '@/hooks/useDurationTicker';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import {
    DEFAULT_TRANSCRIPTION_MODEL,
    audioLeavesMachine,
    formatClock,
    recordingSecondsRemaining,
    type FacadeTranscriptionErrorCode,
} from '@/lib/dictation/facade-transcription';
import { useFacadeVoiceCapture } from '@/lib/dictation/use-facade-voice-capture';

interface FacadeVoiceCaptureProps {
    footerIconButtonClass: string;
    iconSizeClass: string;
    disabled?: boolean;
    /** §6.3 draft insertion, the same callback the dictation surface uses. */
    onInsert: (text: string) => void;
    /** Marks the dictation origin draft when a capture starts (see the hook). */
    onStart?: () => void;
    model?: string;
}

const ACCEPT_ATTRIBUTE = 'audio/*,.wav,.mp3,.m4a,.webm,.ogg,.flac,.aac,.aiff';

export const FacadeVoiceCapture: React.FC<FacadeVoiceCaptureProps> = ({
    footerIconButtonClass,
    iconSizeClass,
    disabled,
    onInsert,
    onStart,
    model = DEFAULT_TRANSCRIPTION_MODEL,
}) => {
    const { t } = useI18n();
    const capture = useFacadeVoiceCapture({ onInsert, onStart, model });
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const openFilePicker = React.useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const onFileChosen = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            event.target.value = '';
            if (file) {
                capture.attachFile(file);
            }
        },
        [capture],
    );

    const { state, error, pendingAudio, result } = capture;
    const recordingBlink = useWaitingBlink(state === 'recording');
    const showReview = (state === 'reviewing' || state === 'submitting' || state === 'error') && pendingAudio;
    const showIdleError = (state === 'idle' || state === 'inserted') && error;
    const localizedErrorMessages = {
        capture_unsupported: t('chat.facadeVoiceCapture.error.captureUnsupported'),
        permission_denied: t('chat.facadeVoiceCapture.error.permissionDenied'),
        invalid_audio: t('chat.facadeVoiceCapture.error.invalidAudio'),
        unsupported_media_type: t('chat.facadeVoiceCapture.error.unsupportedType'),
        audio_too_large: t('chat.facadeVoiceCapture.error.audioTooLarge'),
        duration_too_long: t('chat.facadeVoiceCapture.error.durationTooLong'),
        stream_not_supported: t('chat.facadeVoiceCapture.error.streamNotSupported'),
        timestamps_not_supported: t('chat.facadeVoiceCapture.error.timestampsNotSupported'),
        unauthenticated: t('chat.facadeVoiceCapture.error.unauthenticated'),
        model_not_found: t('chat.facadeVoiceCapture.error.modelNotFound'),
        quota_exceeded: t('chat.facadeVoiceCapture.error.quotaExceeded'),
        rate_limit: t('chat.facadeVoiceCapture.error.rateLimit'),
        upstream_failure: t('chat.facadeVoiceCapture.error.upstreamFailure'),
        no_route_candidate: t('chat.facadeVoiceCapture.error.noRouteCandidate'),
        network_error: t('chat.facadeVoiceCapture.error.network'),
        timeout: t('chat.facadeVoiceCapture.error.timeout'),
        invalid_response: t('chat.facadeVoiceCapture.error.invalidResponse'),
        unknown_error: t('chat.facadeVoiceCapture.error.unknown'),
    } satisfies Record<FacadeTranscriptionErrorCode, string>;
    const errorMessage = error ? localizedErrorMessages[error.code] : null;
    const provenance = result?.provenance;
    const provenanceLine = provenance
        ? [
              provenance.provider ? t('chat.facadeVoiceCapture.provenance.provider', { value: provenance.provider }) : null,
              provenance.model ? t('chat.facadeVoiceCapture.provenance.model', { value: provenance.model }) : null,
              provenance.durationSeconds !== undefined
                  ? t('chat.facadeVoiceCapture.provenance.duration', { value: formatClock(provenance.durationSeconds) })
                  : null,
              provenance.language ? t('chat.facadeVoiceCapture.provenance.language', { value: provenance.language }) : null,
          ]
              .filter(Boolean)
              .join(' · ')
        : '';

    return (
        <div className="flex items-center gap-1">
            <input ref={fileInputRef} type="file" accept={ACCEPT_ATTRIBUTE} className="hidden" onChange={onFileChosen} />
            {state === 'idle' || state === 'inserted' ? (
                <>
                    <button
                        type="button"
                        className={footerIconButtonClass}
                        disabled={disabled}
                        onClick={() => void capture.startRecording()}
                        title={t('chat.facadeVoiceCapture.record.title')}
                        aria-label={t('chat.facadeVoiceCapture.record.aria')}
                    >
                        <Icon name="mic" className={iconSizeClass} />
                    </button>
                    <button
                        type="button"
                        className={footerIconButtonClass}
                        disabled={disabled}
                        onClick={openFilePicker}
                        title={t('chat.facadeVoiceCapture.attach.title')}
                        aria-label={t('chat.facadeVoiceCapture.attach.aria')}
                    >
                        <Icon name="file-music" className={iconSizeClass} />
                    </button>
                </>
            ) : null}

            {state === 'recording' ? (
                <div className="flex items-center gap-2" role="status">
                    <span className={cn('inline-block h-2 w-2 rounded-full bg-red-500', recordingBlink)} aria-hidden />
                    <span className="typography-micro text-muted-foreground">
                        {t('chat.facadeVoiceCapture.recording', {
                            elapsed: formatClock(capture.elapsedSeconds),
                            remaining: formatClock(recordingSecondsRemaining(capture.elapsedSeconds)),
                        })}
                    </span>
                    <button
                        type="button"
                        className={footerIconButtonClass}
                        onClick={capture.stopRecording}
                        title={t('chat.facadeVoiceCapture.stop.title')}
                        aria-label={t('chat.facadeVoiceCapture.stop.aria')}
                    >
                        <Icon name="stop" className={iconSizeClass} />
                    </button>
                    <button
                        type="button"
                        className={footerIconButtonClass}
                        onClick={capture.cancel}
                        title={t('chat.facadeVoiceCapture.cancel.title')}
                        aria-label={t('chat.facadeVoiceCapture.cancel.aria')}
                    >
                        <Icon name="close" className={iconSizeClass} />
                    </button>
                </div>
            ) : null}

            {showReview ? (
                <div className="flex max-w-md flex-col gap-1" role="status">
                    <div className="flex items-center gap-2">
                        <span className="typography-micro truncate text-muted-foreground">
                            {pendingAudio.filename}
                            {pendingAudio.durationSeconds !== undefined ? ` · ${formatClock(pendingAudio.durationSeconds)}` : ''}
                        </span>
                        {state === 'reviewing' ? (
                            <>
                                <button
                                    type="button"
                                    className={footerIconButtonClass}
                                    onClick={() => void capture.submit()}
                                    title={t('chat.facadeVoiceCapture.submit.title')}
                                    aria-label={t('chat.facadeVoiceCapture.submit.aria')}
                                >
                                    <Icon name="check" className={iconSizeClass} />
                                </button>
                                <button
                                    type="button"
                                    className={footerIconButtonClass}
                                    onClick={capture.cancel}
                                    title={t('chat.facadeVoiceCapture.discard')}
                                    aria-label={t('chat.facadeVoiceCapture.discard')}
                                >
                                    <Icon name="delete-bin" className={iconSizeClass} />
                                </button>
                            </>
                        ) : null}
                        {state === 'submitting' ? <Icon name="loader-4" className={cn(iconSizeClass, 'animate-spin')} /> : null}
                        {state === 'error' ? (
                            <>
                                <button
                                    type="button"
                                    className={footerIconButtonClass}
                                    onClick={capture.retry}
                                    title={t('chat.facadeVoiceCapture.retry.title')}
                                    aria-label={t('chat.facadeVoiceCapture.retry.aria')}
                                >
                                    <Icon name="play" className={iconSizeClass} />
                                </button>
                                <button
                                    type="button"
                                    className={footerIconButtonClass}
                                    onClick={capture.discard}
                                    title={t('chat.facadeVoiceCapture.discard')}
                                    aria-label={t('chat.facadeVoiceCapture.discard')}
                                >
                                    <Icon name="delete-bin" className={iconSizeClass} />
                                </button>
                            </>
                        ) : null}
                    </div>
                    <audio controls src={pendingAudio.url} className="h-8 w-full" />
                    {state === 'reviewing' ? (
                        <p className="typography-micro text-muted-foreground">
                            {audioLeavesMachine(model)
                                ? t('chat.facadeVoiceCapture.privacy.hosted', { model })
                                : t('chat.facadeVoiceCapture.privacy.local', { model })}
                        </p>
                    ) : null}
                    {state === 'submitting' ? (
                        <p className="typography-micro text-muted-foreground">{t('chat.facadeVoiceCapture.transcribing')}</p>
                    ) : null}
                    {state === 'error' && error ? (
                        <p className="typography-micro text-destructive" role="alert">
                            {errorMessage}
                            {error.retryable ? ` ${t('chat.facadeVoiceCapture.retryHint')}` : ''}
                        </p>
                    ) : null}
                </div>
            ) : null}

            {showIdleError ? (
                <p className="typography-micro max-w-xs text-destructive" role="alert">
                    {errorMessage}{' '}
                    {error.code === 'permission_denied' ? (
                        <button type="button" className="underline" onClick={openFilePicker}>
                            {t('chat.facadeVoiceCapture.attach.aria')}
                        </button>
                    ) : null}
                </p>
            ) : null}

            {state === 'inserted' && result ? (
                <span className="typography-micro text-muted-foreground" role="status">
                    {t('chat.facadeVoiceCapture.inserted')}{provenanceLine ? ` (${provenanceLine})` : ''}.{' '}
                    <button type="button" className="underline" onClick={capture.discard}>
                        {t('chat.facadeVoiceCapture.done')}
                    </button>
                </span>
            ) : null}
        </div>
    );
};
