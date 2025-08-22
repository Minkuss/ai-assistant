import {Box, Divider} from "@mui/material";
import {ApiKeyInput} from "@/entities/apiKeyInput";
import {SettingsHeader} from "@/entities/settingsHeader";
import {Toaster} from "react-hot-toast";
import {TemplateEdit} from "@/entities/templateEdit";

export const SettingsPage = () =>
    (
        <Box
            display={'flex'}
            flexDirection={'column'}
            height={'100%'}
            gap={'30px'}
        >
            <Toaster/>
            <SettingsHeader/>
            <ApiKeyInput/>
            <div
                style={{
                    padding: '20px'
                }}
            >
                <Divider
                    sx={{
                        backgroundColor: '#fff',
                    }}
                />
            </div>
            <TemplateEdit/>
        </Box>
    );
