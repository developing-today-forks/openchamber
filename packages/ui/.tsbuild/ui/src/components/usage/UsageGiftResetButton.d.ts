import React from "react";
import type { QuotaProviderId, UsageWindow } from "@/types";
/**
 * Gift limit reset action for z.ai windows. Renders nothing unless the window
 * carries a gift reset and its span maps to a known reset type.
 */
export declare const UsageGiftResetButton: React.FC<{
    window: UsageWindow;
    providerId: QuotaProviderId;
}>;
