import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

type ButtonProps = MUIButtonProps & {
    isActive?: boolean;
};

const StyledButton = styled(MUIButton)(() => ({
    textTransform: 'none',
    borderRadius: 8,
    fontWeight: 500,
    padding: '8px 20px',
    fontSize: 15,
    boxShadow: 'none',
    transition: 'all 0.2s ease',
    color: '#FFF',

    '&:hover': {
        boxShadow: '0 0 0 2px rgba(0,0,0,0.05)',
        transform: 'translateY(-1px)',
        backgroundColor: '#414141',
    },

    '&:active': {
        transform: 'translateY(0)',
        boxShadow: 'none',
    },
}));

export const Button = ({isActive, ...props}: ButtonProps) => {
    return <StyledButton
        disableElevation
        style={isActive ? { backgroundColor: '#414141' } : undefined}
        {...props}
    />;
};
