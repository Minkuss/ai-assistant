import {Box} from "@mui/material";
import s from './chatMenu.module.scss';
import {ChatsList} from "@/entities/chatsMenu/ui/chatsList/chatsList.tsx";
import {Button} from "@/shared/ui/button/button.tsx";
import {useChatStore} from "@/shared/store/chatsStore.ts";
import {CreateChatModal} from "@/entities/chatsMenu/ui/createChatModal/createChatModal.tsx";
import {useCallback, useState} from "react";

export const ChatMenu = () => {
    const chats = useChatStore((state) => state.chats);
    const [ isOpenCreateChatModal, setOpenCreateChatModal ] = useState(false);

    const handleCloseCreateChatModal = useCallback(() => {
        setOpenCreateChatModal(false);
    }, [isOpenCreateChatModal])

    const handleOpenCreateChatModal = useCallback(() => {
        setOpenCreateChatModal(true);
    }, [isOpenCreateChatModal])

    return (
        <Box
            className={s['chat-menu']}
        >
            <Button
                onClick={handleOpenCreateChatModal}
            >
                New chat
            </Button>
            <ChatsList
                chats={chats}
            />
            <CreateChatModal
                isOpen={isOpenCreateChatModal}
                onClose={handleCloseCreateChatModal}
            />
        </Box>
    )
}
