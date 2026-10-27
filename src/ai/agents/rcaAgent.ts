// RCA (root cause analysis) agent: turns a test failure into a verdict.
export interface RcaVerdict {
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    priority: 'P0' | 'P1' | 'P2' | 'P3';
    rootCause: string;
    fixes: string[];
}

export interface FailureInput {
    title: string;
    file: string;
    error: string;
    stack?: string;
}

// No LLM is wired up yet; the reporter only calls this when hasApiKey() is true.
export async function analyzeFailure(input: FailureInput): Promise<RcaVerdict> {
    throw new Error(`RCA agent not implemented (test: ${input.title})`);
}
