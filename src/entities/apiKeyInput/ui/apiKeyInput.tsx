import { Input } from "@/shared/ui/input/input"
import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {Button} from "@/shared/ui/button/button.tsx";
import s from './apiKeyInput.module.scss'

export const ApiKeyInput = () => {
    const [ apiKey, setApiKey ] = useState('');

    useEffect(() => {
        const apiKey = sessionStorage.getItem('apiKey');
        if (apiKey) {
            setApiKey(apiKey);
        }
    }, [])

    const handleSaveApiKey = () => {
        if (!apiKey) return;
        sessionStorage.setItem('apiKey', apiKey);
        toast.success('API key saved to session storage');
    }

    return (
        <Box
            className={s['wrapper']}
        >
            <Input
                label={'API Key'}
                placeholder={'sk-...'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSaveApiKey();
                    }
                }}
                onBlur={handleSaveApiKey}
            />
            <Button
                className={s['button']}
                onClick={handleSaveApiKey}
            >
                Save
            </Button>
        </Box>
    )
}
