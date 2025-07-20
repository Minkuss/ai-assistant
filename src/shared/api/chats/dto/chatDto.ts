import {Message} from "@/shared/api/chats/dto/messageDto.ts";

export interface Chat {
    id: string;
    templateId: string;
    title: string;
    messages: Message[];
}
