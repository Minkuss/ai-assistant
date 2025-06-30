import {Box, Typography} from "@mui/material";
import s from './chatEmpty.module.scss';

export const ChatEmpty = () => {
    return (
        <Box
            className={s['chat-empty']}
        >
            <Typography
                className={s['chat-empty-title']}
                variant={'h3'}
            >
                Please, create new chat
            </Typography>
        </Box>
    )
}
