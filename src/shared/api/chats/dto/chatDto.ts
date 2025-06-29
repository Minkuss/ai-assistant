import {Message} from "@/shared/api/chats/dto/messageDto.ts";

export interface Chat {
    id: string;
    title: string;
    messages: Message[];
}
