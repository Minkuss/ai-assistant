import {Box} from "@mui/material";
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
            gap={'20px'}
            p={'20px'}
        >
            <Toaster/>
            <SettingsHeader/>
            <ApiKeyInput/>
            <TemplateEdit/>
        </Box>
    );
