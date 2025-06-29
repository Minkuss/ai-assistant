import {Box} from "@mui/material";
import s from './chatMenu.module.scss';
import {ChatsList} from "@/entities/chatsMenu/ui/chatsList/chatsList.tsx";
import {Button} from "@/shared/ui/button/button.tsx";
import {useChatStore} from "@/shared/store/chatsStore.ts";

export const ChatMenu = () => {
    const chats = useChatStore((state) => state.chats);
    const createChat = useChatStore((state) => state.createChat);

    return (
        <Box
            className={s['chat-menu']}
        >
            <Button
                onClick={() => createChat('New chat')}
            >
                Новый чат
            </Button>
            <ChatsList
                chats={chats}
            />
        </Box>
    )
}
