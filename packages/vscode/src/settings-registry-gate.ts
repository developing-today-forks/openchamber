import registrySnapshot from './settings-registry.json';
import type { JsonValue } from './project-setup';

type SettingsRegistryGateField = {
  scope: string;
  perSurface?: boolean;
  computed?: boolean;
  secret?: boolean;
  local?: boolean;
  owner?: string;
};

export type SettingsRegistryGateFields = Record<string, SettingsRegistryGateField>;

export const SETTINGS_REGISTRY_FIELDS: SettingsRegistryGateFields = registrySnapshot.fields;

export type SettingsGateValue = JsonValue | undefined;

export type SettingsGateDocument = Record<string, SettingsGateValue>;

const isPersistableField = (field: SettingsRegistryGateField | undefined): boolean => {
  if (!field) return false;
  if (field.computed === true) return false;
  if (field.local === true) return false;
  if (field.owner === 'desktop-shell') return false;
  return true;
};

export const filterPersistableSettingsChanges = (
  changes: SettingsGateDocument,
  fields: SettingsRegistryGateFields = SETTINGS_REGISTRY_FIELDS,
) => {
  const next: SettingsGateDocument = {};
  for (const [key, value] of Object.entries(changes)) {
    if (!Object.prototype.hasOwnProperty.call(fields, key)) continue;
    if (!isPersistableField(fields[key])) continue;
    next[key] = value;
  }
  return next;
};

export const withoutSecretSettings = (
  settings: SettingsGateDocument,
  fields: SettingsRegistryGateFields = SETTINGS_REGISTRY_FIELDS,
) => {
  const next: SettingsGateDocument = {};
  for (const [key, value] of Object.entries(settings)) {
    if (fields[key]?.secret === true) continue;
    next[key] = value;
  }
  return next;
};
