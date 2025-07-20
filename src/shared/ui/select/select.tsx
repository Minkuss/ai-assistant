import { Select as MuiSelect, MenuItem, SelectProps, InputLabel, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';

type CustomSelectProps = SelectProps & {
    label?: string;
    options: { value: string | number; label: string }[];
};

const StyledSelect = styled(MuiSelect)(() => ({
    '& .MuiSelect-select': {
        fontSize: 15,
        fontWeight: 400,
        color: '#fff',
        padding: '6px 0',
        borderBottom: '2px solid #ccc',
        transition: 'all 0.2s ease',
        backgroundColor: 'transparent',
    },
    '& .MuiSelect-select:focus': {
        backgroundColor: 'transparent',
    },
    '&:hover .MuiSelect-select': {
        borderBottom: '2px solid #888',
    },
    '&.Mui-focused .MuiSelect-select': {
        borderBottom: '2px solid #555',
        boxShadow: '0 2px 0 rgba(0,0,0,0.08)',
    },
    '& .MuiSelect-icon': {
        color: '#fff',
    },
    '& .MuiInput-underline:before, & .MuiInput-underline:after': {
        borderBottom: 'none',
    },
}));

const StyledInputLabel = styled(InputLabel)(() => ({
    fontSize: 14,
    color: '#777',
    '&.Mui-focused': {
        color: '#555',
    },
}));

export const Select = ({
     label,
     options,
     ...props
}: CustomSelectProps) => (
    <FormControl
        variant="standard"
        fullWidth
    >
        {
            label &&
            <StyledInputLabel>
                {label}
            </StyledInputLabel>
        }
        <StyledSelect
            {...props}
        >
            {options.map((opt) => (
                <MenuItem
                    key={opt.value}
                    value={opt.value}
                >
                    {opt.label}
                </MenuItem>
            ))}
        </StyledSelect>
    </FormControl>
);
