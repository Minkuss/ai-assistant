import React, {useState} from "react";
import {Box, IconButton, Popover, MenuItem, Input} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import s from './chatsList.module.scss';
import {Button} from "@/shared/ui/button/button.tsx";
import {useNavigate} from "react-router-dom";
import {Chat} from "@/shared/api/chats/dto/chatDto.ts";
import {useChatStore} from "@/shared/store/chatsStore.ts";

interface IChatsListProps {
    chats: Chat[];
}

export const ChatsList = ({ chats }: IChatsListProps) => {
    const navigate = useNavigate();
    const setCurrentChat = useChatStore((state) => state.setCurrentChat);
    const selectedChatId = useChatStore((state) => state.currentChatId);
    const deleteChat = useChatStore((state) => state.deleteChat)
    const renameChat = useChatStore((state) => state.renameChat)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuChatId, setMenuChatId] = useState<string | null>(null);
    const [isRenameChatPopoverOpen, setIsRenameChatPopoverOpen] = useState(false);
    const [newChatName, setNewChatName] = useState<string | null>(null);

    const handleMoreClick = (event: React.MouseEvent<HTMLElement>, chatId: string) => {
        setAnchorEl(event.currentTarget);
        setMenuChatId(chatId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setMenuChatId(null);
        setIsRenameChatPopoverOpen(false);
    };

    const goToChat = (chat: Chat) => {
        setCurrentChat(chat.id);
        navigate(`/chat/${chat.id}`);
    };

    const handleDeleteChat = () => {
        if (menuChatId) {
            deleteChat(menuChatId);
            navigate('/');
        } else {
            alert('Chat did not selected!')
        }
    }

    const handleRenameChatName = () => {
        menuChatId && newChatName && renameChat(menuChatId, newChatName);
        handleClose();
    }

    return (
        <Box className={s['chats-list']}>
            {chats.map((chat) => (
                <Box
                    key={chat.id}
                    sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                    className={s['chat-item']}
                >
                    <Button
                        onClick={() => goToChat(chat)}
                        isActive={selectedChatId === chat.id}
                        sx={{ flex: 1, justifyContent: 'flex-start' }}
                    >
                        {chat.title}
                    </Button>

                    <IconButton
                        size="small"
                        sx={{
                            position: 'absolute',
                            right: 8,
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            color: '#fff',
                        }}
                        className={s['more-button']}
                        onClick={(e) => handleMoreClick(e, chat.id)}
                    >
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </Box>
            ))}

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {
                    isRenameChatPopoverOpen
                        ? <>
                            <Input
                                onChange={(e) => setNewChatName(e.target.value)}
                                onKeyDown={(e) => {
                                    e.key === 'Enter' && handleRenameChatName();
                                }}
                            />
                        </>
                        : <>
                            <MenuItem onClick={() => {
                                setIsRenameChatPopoverOpen(true);
                            }}>
                                Переименовать
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleClose();
                                handleDeleteChat();
                            }}>
                                Удалить
                            </MenuItem>
                        </>
                }
            </Popover>
        </Box>
    );
};
