// Flaky analyzer: compares per-test statuses between two builds.
export interface BuildSummary {
    runId: string;
    tests: Record<string, string>;
}

export interface FlakyResult {
    flaky: string[];
    counts: { flaky: number; failing: number; total: number };
    summary?: string;
}

// A test is flaky when its status changed between the previous and current build.
export async function analyzeFlaky(
    prev: BuildSummary,
    curr: BuildSummary,
    _useLlm: boolean,
): Promise<FlakyResult> {
    const flaky = Object.keys(curr.tests).filter(
        (title) => title in prev.tests && prev.tests[title] !== curr.tests[title],
    );
    const failing = Object.values(curr.tests).filter(
        (s) => s === 'failed' || s === 'timedOut',
    ).length;
    return {
        flaky,
        counts: { flaky: flaky.length, failing, total: Object.keys(curr.tests).length },
    };
}
