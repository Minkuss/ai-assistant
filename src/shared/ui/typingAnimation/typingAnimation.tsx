import { Box } from '@mui/material';
import s from './typingAnimation.module.scss';

export const TypingAnimation = () => {
    return (
        <Box className={s.typing}>
            <span className={s.dot} />
            <span className={s.dot} />
            <span className={s.dot} />
        </Box>
    );
};
