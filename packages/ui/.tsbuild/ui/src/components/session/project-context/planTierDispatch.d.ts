import type { ProjectPlanLink } from '@/lib/projectContextApi';
import type { PlanTier } from '@/lib/routing/plansApi';
/** The settings page's key: one send-mode preference for every plan action. */
export declare const PLAN_ACTION_SEND_MODE_STORAGE_KEY = "openchamber.routing.plans.actionSendMode";
export type PlanActionSendMode = 'prefill' | 'autosend';
/** The stored send mode, defaulting to prefill when unset or unreadable. */
export declare const readPlanActionSendMode: () => PlanActionSendMode;
/**
 * The dispatch prompt for one tier. The `/route <tier>` prefix is the routing
 * command the session runs first, so the tier picks the model pool before the
 * plan work starts; the plan is named by title and file so the agent reads the
 * stored plan rather than a copy pasted into the prompt.
 */
export declare const buildPlanTierPrompt: (plan: Pick<ProjectPlanLink, 'title' | 'file'>, tier: PlanTier) => string;
type PlanTierDispatchOutcome = {
    ok: true;
    sessionId: string;
    mode: PlanActionSendMode;
} | {
    ok: false;
    reason: 'create-failed' | 'send-failed';
};
/**
 * Starts the tier's implementation session in the project, following the
 * settings page's command pattern: `prefill` leaves the prompt in the
 * composer for inspection, `autosend` sends it immediately. The caller links
 * the plan to the returned session (the project-context store owns that).
 */
export declare const startPlanTierDispatch: (input: {
    plan: ProjectPlanLink;
    tier: PlanTier;
    projectPath: string;
    mode: PlanActionSendMode;
}) => Promise<PlanTierDispatchOutcome>;
export {};
