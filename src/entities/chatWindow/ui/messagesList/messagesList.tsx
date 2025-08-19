import {Box, IconButton, Typography} from "@mui/material";
import s from './messagesList.module.scss';
import classNames from "classnames";
import {Message} from "@/shared/api/chats/dto/messageDto.ts";
import ReactMarkdown from 'react-markdown';
import {useChatStore} from "@/shared/store/chatsStore.ts";
import {TypingAnimation} from "@/shared/ui/typingAnimation/typingAnimation.tsx";
import {useEffect, useRef, useState} from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface IMessagesListProps {
    messages: Message[];
}

export const MessagesList = (props: IMessagesListProps) => {
    const { messages } = props;
    const isWaitingAssistantMsg = useChatStore((state) => state.isWaitingAssistantMsg);

    const containerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!showScrollButton) {
            scrollToBottom();
        }
    }, [messages, isWaitingAssistantMsg]);

    const handleScroll = () => {
        if (!containerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        // Если пользователь прокрутил вверх более чем на 100px от низа — показываем кнопку
        setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    };

    return (
        <Box
            className={s['messages-list']}
            ref={containerRef}
            onScroll={handleScroll}
        >
            {
                messages.map((message, index) => (
                    <>
                        {
                            message.role !== 'system' &&
                            <Box
                                key={index}
                                className={classNames(s['message'], s[`${message.role}-message`])}
                            >
                                {
                                    message.role === 'user'
                                        ? <Typography>
                                            {message.content}
                                        </Typography>
                                        : <ReactMarkdown>
                                            {message.content}
                                        </ReactMarkdown>
                                }
                            </Box>
                        }
                    </>
                ))
            }
            {
                isWaitingAssistantMsg &&
                <TypingAnimation/>
            }
            <div ref={messagesEndRef} />

            {showScrollButton && (
                <IconButton
                    size="small"
                    onClick={() => {
                        scrollToBottom();
                        setShowScrollButton(false);
                    }}
                    className={s['scroll-button']}
                >
                    <ArrowDownwardIcon />
                </IconButton>
            )}
        </Box>
    )
}
