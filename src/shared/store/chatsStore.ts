import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message } from '../api/chats/dto/messageDto';
import {Chat} from "@/shared/api/chats/dto/chatDto.ts";

interface ChatStore {
    chats: Chat[];
    currentChatId: string | null;

    // actions:
    createChat: (title: string) => void;
    deleteChat: (id: string) => void;
    addMessage: (chatId: string, message: Message) => void;
    setCurrentChat: (id: string) => void;
    clearAll: () => void;
    getCurrentChatMessages: () => Message[];
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            chats: [],
            currentChatId: null,

            createChat: (title) => {
                const newChat: Chat = {
                    id: crypto.randomUUID(),
                    title,
                    messages: [],
                };
                set({ chats: [...get().chats, newChat], currentChatId: newChat.id });
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
            }
        }),
        {
            name: 'chat-storage', // localStorage key
        }
    )
);
