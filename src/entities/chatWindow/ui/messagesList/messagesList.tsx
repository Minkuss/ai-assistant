import {Box, Typography} from "@mui/material";
import s from './messagesList.module.scss';
import classNames from "classnames";
import {Message} from "@/shared/api/chats/dto/messageDto.ts";
import ReactMarkdown from 'react-markdown';

interface IMessagesListProps {
    messages: Message[];
}

export const MessagesList = (props: IMessagesListProps) => {
    const { messages } = props;

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
        </Box>
    )
}
