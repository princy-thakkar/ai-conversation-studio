// AI Service
// Handles integration with AI providers.
// Currently wired up to Groq, which exposes an OpenAI-compatible
// /chat/completions endpoint, so no extra SDK is needed - plain fetch works.

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_DEFAULT_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

class AIService {
  constructor() {
    this.providers = {
      groq: Boolean(GROQ_API_KEY),
    };
  }

  async initialize() {
    if (!GROQ_API_KEY || GROQ_API_KEY === 'gsk_your_actual_groq_key_here') {
      console.warn(
        '[AIService] GROQ_API_KEY is not set. Add it to backend/.env to enable real AI responses.'
      );
    } else {
      console.log('AI Service initialized (Groq)');
    }
  }

  /**
   * Generate a chat completion using Groq's OpenAI-compatible API.
   * @param {string} model - label from the UI (kept for display/metadata only;
   *        the actual model used for the request is GROQ_MODEL from .env,
   *        since only a Groq key is configured).
   * @param {Array<{role: 'user'|'assistant', content: string}>} messages
   * @param {object} options - { temperature, maxTokens, systemPrompt }
   */
  async generateResponse(model, messages, options = {}) {
    if (!GROQ_API_KEY) {
      throw new Error(
        'GROQ_API_KEY is missing. Add it to backend/.env to enable AI responses.'
      );
    }

    const { temperature = 0.7, maxTokens = 1024, systemPrompt } = options;

    const chatMessages = [];
    if (systemPrompt) {
      chatMessages.push({ role: 'system', content: systemPrompt });
    }
    chatMessages.push(...messages);

    let response;
    try {
      response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_DEFAULT_MODEL,
          messages: chatMessages,
          temperature,
          max_tokens: maxTokens,
        }),
      });
    } catch (networkErr) {
      throw new Error(`Could not reach Groq API: ${networkErr.message}`);
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`Groq API error (${response.status}): ${errorText || response.statusText}`);
    }

    const data = await response.json();
    const choice = data.choices?.[0];

    return {
      content: choice?.message?.content ?? '',
      usage: {
        promptTokens: data.usage?.prompt_tokens ?? 0,
        completionTokens: data.usage?.completion_tokens ?? 0,
        totalTokens: data.usage?.total_tokens ?? 0,
      },
      finishReason: choice?.finish_reason ?? 'stop',
      model: data.model ?? GROQ_DEFAULT_MODEL,
    };
  }

  async generateEmbedding(text) {
    // Groq does not currently expose a public embeddings endpoint.
    // Left as a stub so features like Knowledge Base search don't crash;
    // swap in an embeddings provider here if/when you add one.
    return Array(1536).fill(0);
  }

  async streamResponse(model, messages, onChunk, options = {}) {
    // Simple non-streaming fallback: fetch the full response, then emit it
    // character-by-character so any UI streaming code keeps working.
    const { content } = await this.generateResponse(model, messages, options);
    for (const char of content) {
      onChunk(char);
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
  }
}

module.exports = new AIService();