import {useChatStore} from "@/shared/store/chatsStore.ts";
import {sendMessageToOpenAI} from "@/shared/api/chats/chatApi.ts";

export const sendChatMessage = async (chatId: string, userMessage: string) => {
    const { addMessage, chats } = useChatStore.getState();

    const userMsg = {
        id: crypto.randomUUID(),
        role: 'user' as const,
        content: userMessage,
    };
    addMessage(chatId, userMsg);

    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return;

    const formattedMessages = chat.messages.concat(userMsg).map((m) => ({
        role: m.role,
        content: m.content,
    }));

    const assistantResponse = await sendMessageToOpenAI(formattedMessages);

    const assistantMsg = {
        id: crypto.randomUUID(),
        role: 'assistant' as const,
        content: assistantResponse,
    };

    console.log(assistantMsg);
    addMessage(chatId, assistantMsg);
};
