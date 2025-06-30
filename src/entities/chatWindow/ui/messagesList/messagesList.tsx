import {Box, Typography} from "@mui/material";
import s from './messagesList.module.scss';
import classNames from "classnames";
import {Message} from "@/shared/api/chats/dto/messageDto.ts";
import ReactMarkdown from 'react-markdown';
import {useChatStore} from "@/shared/store/chatsStore.ts";
import {TypingAnimation} from "@/shared/ui/typingAnimation/typingAnimation.tsx";

interface IMessagesListProps {
    messages: Message[];
}

export const MessagesList = (props: IMessagesListProps) => {
    const { messages } = props;
    const isWaitingAssistantMsg = useChatStore((state) => state.isWaitingAssistantMsg);

    return (
        <Box
            className={s['messages-list']}
        >
            {
                messages.map((message, index) => (
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
                ))
            }
            {
                isWaitingAssistantMsg &&
                <TypingAnimation/>
            }
        </Box>
    )
}
