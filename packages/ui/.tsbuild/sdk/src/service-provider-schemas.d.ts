import { z } from 'zod';
/**
 * Host-side parse of what a browser provider answers. `data` stays whatever
 * the service produced: the host hands it to the agent as is, and only
 * `browser.capture` is read further (the image the host writes to disk).
 */
export declare const browserProviderResultSchema: z.ZodUnion<readonly [z.ZodObject<{
    ok: z.ZodLiteral<true>;
    data: z.ZodObject<{}, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    ok: z.ZodLiteral<false>;
    error: z.ZodString;
}, z.core.$strip>]>;
export declare const browserControlActionSchema: z.ZodEnum<{
    "browser.back": "browser.back";
    "browser.capture": "browser.capture";
    "browser.click": "browser.click";
    "browser.close": "browser.close";
    "browser.forward": "browser.forward";
    "browser.inspect": "browser.inspect";
    "browser.open": "browser.open";
    "browser.resize": "browser.resize";
    "browser.scroll": "browser.scroll";
    "browser.snapshot": "browser.snapshot";
    "browser.type": "browser.type";
}>;
