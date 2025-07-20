import { Button } from "@/shared/ui/button/button"
import { Input } from "@/shared/ui/input/input"
import s from './createTemplateForm.module.scss'
import {Controller, useForm} from "react-hook-form";
import {useChatStore} from "@/shared/store/chatsStore.ts";
import toast from "react-hot-toast";

interface CreateTemplateFormInputs {
    templateName: string;
    templatePrompt: string;
}

export const CreateTemplateForm = () => {
    const {
        handleSubmit,
        control,
        reset,
    } = useForm<CreateTemplateFormInputs>({
        defaultValues: {
            templateName: '',
            templatePrompt: '',
        }
    })

    const createTemplate = useChatStore((store) => store.createTemplate);

    const onSubmit = (data: CreateTemplateFormInputs) => {
        createTemplate(data.templateName, data.templatePrompt);
        reset();
        toast.success('Template created');
    }

    return (
        <form
            className={s['form-container']}
            onSubmit={handleSubmit(onSubmit)}
        >
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
            <Button
                type={'submit'}
            >
                Create template
            </Button>
        </form>
    )
}
