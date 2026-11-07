import React from 'react';
import type { JsonValue } from '@openchamber/sdk';
interface GuestToolTableProps {
    rows: readonly JsonValue[];
    columns: readonly string[];
}
/**
 * The expanded body of a tool call an extension declared as a table: one
 * column per declared path, one row per output item, cells read with the
 * same dotted-path reader the header templates use.
 */
export declare const GuestToolTable: React.FC<GuestToolTableProps>;
export {};
