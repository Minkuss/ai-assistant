import OpenAI from 'openai';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export const sendMessageToOpenAI = async (
    messages: { role: 'user' | 'system' | 'assistant'; content: string }[]
): Promise<string> => {
    const response = await openai.chat.completions.create({
        model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
        messages,
    });

    return response.choices[0].message.content ?? '';
};
