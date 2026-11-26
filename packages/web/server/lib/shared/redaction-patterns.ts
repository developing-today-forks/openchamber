// The sensitive-key set and the shared regex shapes for the two web redaction
// surfaces (lib/source-control/url-redaction.ts and lib/git/redaction.ts).
// Both surfaces must strip the same key/value and header shapes (#1920/#2074);
// they consume these so the set cannot drift between them.
export const SENSITIVE_TEXT_KEY_PATTERN = 'x-api-key|access[-_]token|api[-_]key|client[-_]secret|oauth[-_]token|private[-_]token|authorization|password|secret|token';

export const sensitiveQuotedValueRegExp = () =>
  new RegExp(`\\b(${SENSITIVE_TEXT_KEY_PATTERN})(["']?\\s*[:=]\\s*["'])((?:bearer|basic)\\s+)?[^\\s"',;]+`, 'gi');

export const sensitiveSchemeValueRegExp = () =>
  new RegExp(`\\b(${SENSITIVE_TEXT_KEY_PATTERN})(\\s*[:=]\\s*(?:bearer|basic))\\s+[^\\s,;]+`, 'gi');

// Value terminators beyond whitespace, quotes, comma and semicolon are
// surface-specific: the git redactor also ends values at '&'.
export const sensitiveAssignmentRegExp = (extraTerminators = '') =>
  new RegExp(`\\b(${SENSITIVE_TEXT_KEY_PATTERN})\\s*[:=]\\s*(?!(?:bearer|basic)\\s)([^\\s"',;${extraTerminators}]+)`, 'gi');
