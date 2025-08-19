import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message } from '../api/chats/dto/messageDto';
import { Chat } from "@/shared/api/chats/dto/chatDto.ts";
import { ChatTemplate } from "@/shared/api/chats/dto/chatTemplate.ts";

interface ChatStore {
    chats: Chat[];
    chatTemplates: ChatTemplate[];
    currentChatId: string | null;
    isWaitingAssistantMsg: boolean;

    // actions:
    createChat: (title: string, templateId: string) => string;
    deleteChat: (id: string) => void;
    addMessage: (chatId: string, message: Message) => void;
    setCurrentChat: (id: string) => void;
    clearAll: () => void;
    getCurrentChatMessages: () => Message[];
    renameChat: (id: string, newName: string) => void;
    setWaitingAssistantMsg: (bool: boolean) => void;
    createTemplate: (name: string, prompt: string) => { type: string, msg: string };
    editTemplate: (id: string, name: string, prompt: string) => void;
    deleteTemplate: (id: string) => void;
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            chats: [],
            chatTemplates: [{
                id: crypto.randomUUID(),
                name: 'Test',
                prompt: 'Test template'
            }],
            currentChatId: null,
            isWaitingAssistantMsg: false,

            createChat: (title, templateId) => {
                const systemMsg = {
                    id: crypto.randomUUID(),
                    role: 'system' as const,
                    content: get().chatTemplates.find((t) => t.id === templateId)?.prompt ?? '',
                };

                const newChat: Chat = {
                    id: crypto.randomUUID(),
                    templateId,
                    title,
                    messages: [ systemMsg ],
                };
                set({ chats: [...get().chats, newChat], currentChatId: newChat.id });

                return newChat.id;
            },

            deleteChat: (id) => {
                const filtered = get().chats.filter((chat) => chat.id !== id);
                const currentChatId = get().currentChatId === id ? null : get().currentChatId;
                set({ chats: filtered, currentChatId });
            },

            addMessage: (chatId, message) => {
                set({
                    chats: get().chats.map((chat) =>
                        chat.id === chatId
                            ? { ...chat, messages: [...chat.messages, message] }
                            : chat
                    ),
                });
            },

            setCurrentChat: (id) => set({ currentChatId: id }),

            clearAll: () => set({ chats: [], currentChatId: null }),

            getCurrentChatMessages: () => {
                const currentChat = get().chats.find((chat) => chat.id === get().currentChatId);
                return currentChat?.messages ?? [];
            },

            renameChat: (id, newName) => {
                set({
                    chats: get().chats.map((chat) =>
                        chat.id === id
                            ? { ...chat, title: newName }
                            : chat
                    ),
                })
            },

            setWaitingAssistantMsg: (bool) => {
                set({isWaitingAssistantMsg: bool});
            },

            createTemplate: (name, prompt) => {
                const newTemplate: ChatTemplate = {
                    id: crypto.randomUUID(),
                    name,
                    prompt,
                };
                const maxTemplates = 10;
                const templatesCount = get().chatTemplates.length;
                if (templatesCount < maxTemplates) {
                    set({ chatTemplates: [...get().chatTemplates, newTemplate] });
                    return {
                        type: 'success',
                        msg: 'Template created',
                    };
                } else {
                    return {
                        type: 'error',
                        msg: `You can create only ${maxTemplates} templates`,
                    }
                }
            },
            editTemplate: (id, name, prompt) => {
                set({
                    chatTemplates: get().chatTemplates.map((template) =>
                        template.id === id
                            ? { ...template, name, prompt }
                            : template
                    ),
                })
            },
            deleteTemplate: (id) => {
                set({
                    chatTemplates: get().chatTemplates.filter((template) => template.id !== id),
                })
            }
        }),
        {
            name: 'chat-storage', // localStorage key
        }
    )
);
