import React from 'react';
import { SettingsCheckboxRow } from '@/components/sections/shared/SettingsSection';
import { isVSCodeRuntime } from '@/lib/desktop';
import { useI18n } from '@/lib/i18n';
import { useUIStore } from '@/stores/useUIStore';

export const SessionRecapFields: React.FC = () => {
  const { t } = useI18n();
  const sessionRecapEnabled = useUIStore((state) => state.sessionRecapEnabled);
  const setSessionRecapEnabled = useUIStore((state) => state.setSessionRecapEnabled);
  const sessionHoverSummaryEnabled = useUIStore((state) => state.sessionHoverSummaryEnabled);
  const setSessionHoverSummaryEnabled = useUIStore((state) => state.setSessionHoverSummaryEnabled);
  return (
    <>
      <SettingsCheckboxRow
        checked={sessionRecapEnabled}
        onChange={setSessionRecapEnabled}
        label={t('settings.openchamber.visual.field.sessionRecap')}
        ariaLabel={t('settings.openchamber.visual.field.sessionRecapAria')}
        settingsItem="chat.session-recap"
      />
      {isVSCodeRuntime() ? null : (
        <SettingsCheckboxRow
          checked={sessionRecapEnabled && sessionHoverSummaryEnabled}
          onChange={setSessionHoverSummaryEnabled}
          disabled={!sessionRecapEnabled}
          label={t('settings.openchamber.visual.field.sessionHoverSummary')}
          ariaLabel={t('settings.openchamber.visual.field.sessionHoverSummaryAria')}
          info={t('settings.openchamber.visual.field.sessionHoverSummaryInfo')}
          settingsItem="chat.session-hover-summary"
        />
      )}
    </>
  );
};
