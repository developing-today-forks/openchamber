/**
 * Waits for OpenCode to answer its health probe after a config-driven restart.
 *
 * The agents, commands and skills stores refresh configuration by asking
 * OpenCode to reload; the server is briefly unreachable while it comes back.
 * This polls `opencodeClient.checkHealth`, reporting progress through the
 * config-update banner, and gives up after a bounded maximum so a refresh
 * cannot hang forever.
 */
export declare function waitForOpenCodeConnection(delayMs?: number): Promise<void>;
