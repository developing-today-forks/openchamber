import type { SessionKnowledgeSummary, SessionProjectContextPins } from '@/lib/sessionKnowledgeApi';
type NoteSource = {
    id: string;
    body: string;
};
type PlanSource = {
    id: string;
    title: string;
};
export declare const resolveDraftPinnedKnowledge: (notes: NoteSource[], plans: PlanSource[], pins: SessionProjectContextPins) => Pick<SessionKnowledgeSummary, 'notes' | 'plans'>;
export {};
