// LLM provider config. The AI agents only run when an API key is present.
export function hasApiKey(): boolean {
    return Boolean(process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY);
}
