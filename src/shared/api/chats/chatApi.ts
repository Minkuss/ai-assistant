import OpenAI from 'openai';
import toast from 'react-hot-toast';

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: sessionStorage.getItem('apiKey') ?? '',
    dangerouslyAllowBrowser: true,
});

export const sendMessageToOpenAI = async (
    messages: { role: 'user' | 'system' | 'assistant'; content: string }[]
): Promise<string> => {
    const apiKey = sessionStorage.getItem('apiKey');

    if (!apiKey) {
        toast.error('You must provide an API key in settings.');
        return '';
    }

    openai.apiKey = apiKey;

    const { choices } = await openai.chat.completions.create({
        model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
        messages,
    });

    return choices[0]?.message?.content ?? '';
};
