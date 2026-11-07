/** A fresh idempotency key per user action: a retry of the same click reuses it, a new click never does. */
export declare const newMutationKey: () => string;
