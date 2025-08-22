import { Button } from "@/shared/ui/button/button.tsx"
import { Input } from "@/shared/ui/input/input.tsx"
import s from './templateForm.module.scss'
import {Controller, useForm} from "react-hook-form";
import {useChatStore} from "@/shared/store/chatsStore.ts";
import toast from "react-hot-toast";
import {Select} from "@/shared/ui/select/select.tsx";
import {useEffect} from "react";
import {Box, Typography} from "@mui/material";

interface TemplateFormProps {
    isEdit?: boolean;
}

interface TemplateFormInputs {
    templateName: string;
    templatePrompt: string;
    chatTemplateId?: string;
}

export const TemplateForm = (props: TemplateFormProps) => {
    const { isEdit } = props;

    const {
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
    } = useForm<TemplateFormInputs>({
        defaultValues: {
            chatTemplateId: '',
            templateName: '',
            templatePrompt: '',
        }
    })

    const createTemplate = useChatStore((store) => store.createTemplate);
    const editTemplate = useChatStore((store) => store.editTemplate);
    const chatTemplates = useChatStore((store) => store.chatTemplates);
    const deleteTemplate = useChatStore((store) => store.deleteTemplate);

    const chatTemplateId = watch('chatTemplateId');

    const options = chatTemplates.map((template) => ({
        value: template.id,
        label: template.name,
    }))

    const onSubmit = (data: TemplateFormInputs) => {
        if (isEdit) {
            editTemplate(chatTemplateId ?? '', data.templateName, data.templatePrompt);
            reset();

            toast.success('Template edited!');
            return;
        }
        const { type, msg } = createTemplate(data.templateName, data.templatePrompt);
        reset();

        toast[type === 'error' ? 'error' : 'success'](msg);
    }

    useEffect(() => {
        if (isEdit && chatTemplateId) {
            const template = chatTemplates.find((template) => template.id === chatTemplateId);
            if (template) {
                setValue('templateName', template.name);
                setValue('templatePrompt', template.prompt);
            }
        }
    }, [isEdit, chatTemplateId])

    const handleDeleteTemplate = () => {
        if (!chatTemplateId) {
            toast.error('Please select a template to delete.');
            return;
        }
        deleteTemplate(chatTemplateId ?? '');
        reset();

        toast.success('Template deleted!');
    }

    return (
        <form
            className={s['form-container']}
            style={isEdit ? {
                padding: '20px',
            } : {}}
            onSubmit={handleSubmit(onSubmit)}
        >
            {
                isEdit &&
                <div>
                    <Typography
                        variant={'h5'}
                        className={s['form-title']}
                    >
                        Edit templates
                    </Typography>
                    <Controller
                        name="chatTemplateId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Choose template"
                                required={true}
                                options={options}
                                {...field}
                            />
                        )}
                    />
                </div>
            }
            <Controller
                control={control}
                name="templateName"
                render={({ field }) => (
                    <Input
                        label="Template name"
                        required={true}
                        {...field}
                    />
                )}
            />
            <Controller
                control={control}
                name="templatePrompt"
                render={({ field }) => (
                    <Input
                        label={'Template prompt'}
                        required={true}
                        {...field}
                    />
                )}
            />
            <Box
                sx={{
                    display: 'grid',
                    gap: '10px',
                    gridTemplateColumns: `1fr ${isEdit ? '1fr' : ''}`,
                }}
            >
                <Button
                    type={'submit'}
                    className={isEdit ? s['edit-template-button'] : ''}
                >
                    {`${isEdit ? 'Edit' : 'Create'} template`}
                </Button>
                {
                    isEdit &&
                    <Button
                        onClick={handleDeleteTemplate}
                        className={s['delete-template-button']}
                    >
                        Delete template
                    </Button>
                }
            </Box>
        </form>
    )
}
