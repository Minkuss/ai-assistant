import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { KeyboardEvent } from 'react';

type InputProps = TextFieldProps & {
    onEnterPress?: () => void;
};

const StyledInput = styled(TextField)(() => ({
    '& .MuiInput-root': {
        fontSize: 15,
        fontWeight: 400,
        color: '#fff',
        borderBottom: '2px solid #ccc',
        transition: 'all 0.2s ease',
        paddingBottom: 4,

        '&:before, &:after': {
            borderBottom: 'none !important',
        },

        '&:hover:not(.Mui-disabled)': {
            borderBottom: '2px solid #000',
        },

        '&.Mui-focused': {
            borderBottom: '2px solid #555',
            boxShadow: '0 2px 0 rgba(0,0,0,0.08)',
        },
    },

    '& .MuiInput-underline:before': {
        borderBottom: 'none',
    },
    '& .MuiInput-underline:after': {
        borderBottom: 'none',
    },

    '& .MuiFormLabel-root': {
        fontSize: 14,
        color: '#777',
    },
    '& .MuiFormLabel-root.Mui-focused': {
        color: '#555',
    },
    '& .MuiInputBase-input': {
        padding: '6px 0',
    },
}));

export const Input = ({onEnterPress, ...props}: InputProps) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onEnterPress?.();
        }
    };

    return <StyledInput onKeyDown={handleKeyDown} variant="standard" fullWidth {...props} />;
};
