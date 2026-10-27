// Shape of the `self-heal` JSON attachment rendered in the report's Self-Heal tab.
export interface HealCandidate {
    selector: string;
    strategy: string;
    matchCount: number;
    visible: boolean;
    reasoning: string;
}

export interface HealReport {
    failedSelector: string;
    intent: string;
    verified: HealCandidate[];
    rejected: { selector: string; reason: string }[];
    unavailableReason?: string;
}
