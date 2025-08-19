import {Box, IconButton} from "@mui/material";
import s from './chatMenu.module.scss';
import {ChatsList} from "@/entities/chatsMenu/ui/chatsList/chatsList.tsx";
import {Button} from "@/shared/ui/button/button.tsx";
import {useChatStore} from "@/shared/store/chatsStore.ts";
import {CreateChatModal} from "@/entities/chatsMenu/ui/createChatModal/createChatModal.tsx";
import {useState} from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import {useNavigate} from "react-router-dom";
import {routes} from "@/shared/routes";
import toast from "react-hot-toast";

export const ChatMenu = () => {
    const navigate = useNavigate();
    const chats = useChatStore((state) => state.chats);
    const [ isOpenCreateChatModal, setOpenCreateChatModal ] = useState(false);

    const handleCloseCreateChatModal = () => {
        setOpenCreateChatModal(false);
    }

    const handleOpenCreateChatModal = () => {
        const apiKey = sessionStorage.getItem('apiKey');
        if (!apiKey) {
            toast.error('Please set your API key in settings.');
            navigate(routes.SETTINGS);
            return;
        }
        setOpenCreateChatModal(true);
    }

    const handleGoToSettings = () => {
        navigate(routes.SETTINGS);
    }

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
            <IconButton
                sx={{
                    marginTop: 'auto',
                    color: '#fff',
                }}
                onClick={handleGoToSettings}
            >
                <SettingsIcon/>
            </IconButton>
            <CreateChatModal
                isOpen={isOpenCreateChatModal}
                onClose={handleCloseCreateChatModal}
            />
        </Box>
    )
}
