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
 * UI strings resolve through the `chat.facadeVoiceCapture` locale keys
 * (`@/lib/i18n`); errors carry their key on `FacadeTranscriptionError`
 * and resolve at render time so a locale switch re-renders them.
 */

import React from 'react';

import { Icon } from '@/components/icon/Icon';
import { useWaitingBlink } from '@/hooks/useDurationTicker';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import {
    DEFAULT_TRANSCRIPTION_MODEL,
    formatClock,
    preSubmitPrivacyNotice,
    recordingSecondsRemaining,
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
    // A keyed error resolves through the current locale; an unkeyed one
    // (server-supplied text) renders literally.
    const errorText = error ? (error.messageKey ? t(error.messageKey, error.messageParams) : error.message) : '';
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
                        {t('chat.facadeVoiceCapture.recording.status', {
                            elapsed: formatClock(capture.elapsedSeconds),
                            remaining: formatClock(recordingSecondsRemaining(capture.elapsedSeconds)),
                        })}
                    </span>
                    <button type="button" className={footerIconButtonClass} onClick={capture.stopRecording} title={t('chat.facadeVoiceCapture.stop.title')} aria-label={t('chat.facadeVoiceCapture.stop.aria')}>
                        <Icon name="stop" className={iconSizeClass} />
                    </button>
                    <button type="button" className={footerIconButtonClass} onClick={capture.cancel} title={t('chat.facadeVoiceCapture.cancel.title')} aria-label={t('chat.facadeVoiceCapture.cancel.aria')}>
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
                                <button type="button" className={footerIconButtonClass} onClick={() => void capture.submit()} title={t('chat.facadeVoiceCapture.submit.title')} aria-label={t('chat.facadeVoiceCapture.submit.aria')}>
                                    <Icon name="check" className={iconSizeClass} />
                                </button>
                                <button type="button" className={footerIconButtonClass} onClick={capture.cancel} title={t('chat.facadeVoiceCapture.discard.title')} aria-label={t('chat.facadeVoiceCapture.discard.aria')}>
                                    <Icon name="delete-bin" className={iconSizeClass} />
                                </button>
                            </>
                        ) : null}
                        {state === 'submitting' ? <Icon name="loader-4" className={cn(iconSizeClass, 'animate-spin')} /> : null}
                        {state === 'error' ? (
                            <>
                                <button type="button" className={footerIconButtonClass} onClick={capture.retry} title={t('chat.facadeVoiceCapture.backToReview.title')} aria-label={t('chat.facadeVoiceCapture.backToReview.aria')}>
                                    <Icon name="play" className={iconSizeClass} />
                                </button>
                                <button type="button" className={footerIconButtonClass} onClick={capture.discard} title={t('chat.facadeVoiceCapture.discard.title')} aria-label={t('chat.facadeVoiceCapture.discard.aria')}>
                                    <Icon name="delete-bin" className={iconSizeClass} />
                                </button>
                            </>
                        ) : null}
                    </div>
                    <audio controls src={pendingAudio.url} className="h-8 w-full" />
                    {state === 'reviewing' ? (
                        <p className="typography-micro text-muted-foreground">{preSubmitPrivacyNotice(model, t)}</p>
                    ) : null}
                    {state === 'submitting' ? (
                        <p className="typography-micro text-muted-foreground">{t('chat.facadeVoiceCapture.transcribing')}</p>
                    ) : null}
                    {state === 'error' && error ? (
                        <p className="typography-micro text-destructive" role="alert">
                            {errorText}
                            {error.retryable ? ` ${t('chat.facadeVoiceCapture.error.retryable')}` : ''}
                        </p>
                    ) : null}
                </div>
            ) : null}

            {showIdleError ? (
                <p className="typography-micro max-w-xs text-destructive" role="alert">
                    {errorText}{' '}
                    {error.code === 'permission_denied' ? (
                        <button type="button" className="underline" onClick={openFilePicker}>
                            {t('chat.facadeVoiceCapture.attachFile.button')}
                        </button>
                    ) : null}
                </p>
            ) : null}

            {state === 'inserted' && result ? (
                <span className="typography-micro text-muted-foreground" role="status">
                    {provenanceLine
                        ? t('chat.facadeVoiceCapture.inserted.messageWithProvenance', { provenance: provenanceLine })
                        : t('chat.facadeVoiceCapture.inserted.message')}{' '}
                    <button type="button" className="underline" onClick={capture.discard}>
                        {t('chat.facadeVoiceCapture.inserted.done')}
                    </button>
                </span>
            ) : null}
        </div>
    );
};
