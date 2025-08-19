import {TemplateForm} from "@/shared/ui/templateForm/templateForm.tsx";
import {Box} from "@mui/material";

export const TemplateEdit = () => {
    return (
        <Box>
            <TemplateForm
                isEdit={true}
            />
        </Box>
    )
}
