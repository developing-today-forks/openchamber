export const isAbortError = (error: unknown): boolean => (
  error instanceof DOMException && error.name === "AbortError"
  || typeof error === "object" && error !== null && "name" in error && error.name === "AbortError"
)

export const extractStatus = (error: unknown): number | undefined => {
  if (!error || typeof error !== "object") return undefined
  // SAFETY: error is narrowed to a non-null object above; the status field is typeof-checked as a number before the branch returns it.
  const direct = (error as { status?: unknown }).status
  if (typeof direct === "number") return direct
  // SAFETY: error is narrowed to a non-null object above; the response field is walk-safe and its status is typeof-checked as a number before use.
  const fromResponse = (error as { response?: { status?: unknown } }).response?.status
  if (typeof fromResponse === "number") return fromResponse
  // SAFETY: error is narrowed to a non-null object above; the cause field is walk-safe and its status is typeof-checked as a number before use.
  const fromCause = (error as { cause?: { status?: unknown } }).cause?.status
  return typeof fromCause === "number" ? fromCause : undefined
}

export const describeStreamFailure = (error: object | null, transport: "ws" | "sse"): string => {
  if (error === null) return `${transport}_error:unknown`
  // SAFETY: the guard above narrows error to a non-null object; both values are typeof-checked before use.
  const details = error as { reason?: unknown; message?: unknown }
  if (typeof details.reason === "string" && details.reason.length > 0) return details.reason
  return typeof details.message === "string" && details.message.length > 0
    ? `${transport}_error:${details.message.slice(0, 80)}`
    : `${transport}_error:unknown`
}
