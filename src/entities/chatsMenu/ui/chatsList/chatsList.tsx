import {Box} from "@mui/material";
import s from './chatsList.module.scss';
import {Button} from "@/shared/ui/button/button.tsx";
import {useNavigate} from "react-router-dom";
import {Chat} from "@/shared/api/chats/dto/chatDto.ts";
import {useChatStore} from "@/shared/store/chatsStore.ts";

interface IChatsListProps {
    chats: Chat[];
}

export const ChatsList = (props: IChatsListProps) => {
    const { chats } = props;

    const navigate = useNavigate();
    const setCurrentChat = useChatStore((state) => state.setCurrentChat);
    const selectedChatId = useChatStore((state) => state.currentChatId);

    const goToChat = (chat: Chat) => {
        setCurrentChat(chat.id)
        navigate(`/chat/${chat.id}`)
    }

    return (
        <Box
            className={s['chats-list']}
        >
            {
                chats.map((chat, index) => (
                    <Button
                        key={index}
                        onClick={() => goToChat(chat)}
                        isActive={selectedChatId === chat.id}
                    >
                        {chat.title}
                    </Button>
                ))
            }
        </Box>
    )
}
