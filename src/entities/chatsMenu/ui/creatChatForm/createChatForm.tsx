import { Input } from '@/shared/ui/input/input';
import s from './createChatForm.module.scss';
import {useEffect, useState} from "react";
import clsx from "clsx";
import { Select } from '@/shared/ui/select/select';
import { Button } from '@/shared/ui/button/button';
import AddIcon from '@mui/icons-material/Add';
import {useChatStore} from "@/shared/store/chatsStore.ts";
import {Controller, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

interface ICreateChatFormProps {
    handleShowCreateTemplateForm: () => void;
    closeModal: () => void;
}

interface CreateChatFormInputs {
    chatName: string;
    chatTemplateId: string;
}

export const CreateChatForm = (props: ICreateChatFormProps) => {
    const { handleShowCreateTemplateForm, closeModal } = props;
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        reset,
    } = useForm<CreateChatFormInputs>({
        defaultValues: {
            chatName: '',
            chatTemplateId: '',
        }
    })

    const [ isSelectHover, setIsSelectHover ] = useState(false);
    const [ isPhone, setIsPhone ] = useState(false);
    const chatTemplates = useChatStore((store) => store.chatTemplates);
    const createChat = useChatStore((state) => state.createChat);

    const options = chatTemplates.map((template) => ({
        value: template.id,
        label: template.name,
    }))

    const onSubmit = (data: CreateChatFormInputs) => {
        const chatId = createChat(data.chatName, data.chatTemplateId);
        reset();
        toast.success('New chat created!');
        navigate(`/chat/${chatId}`);
        closeModal();
    }

    useEffect(() => {
        setIsPhone(window.innerWidth <= 768);
    }, []);

    return (
        <form
            className={s['form-container']}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
                control={control}
                name="chatName"
                render={({ field }) => (
                    <Input
                        label="Chat name"
                        required={true}
                        {...field}
                    />
                )}
            />
            <div
                className={clsx(
                    s['select-wrapper'],
                    (isSelectHover || isPhone) && s['select-wrapper--hovered']
                )}
                onMouseEnter={() => setIsSelectHover(true)}
                onMouseLeave={() => setIsSelectHover(false)}
                onFocus={() => setIsSelectHover(true)}
                onBlur={() => setIsSelectHover(false)}
            >
                <Controller
                    name="chatTemplateId"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Choose template"
                            options={options}
                            {...field}
                        />
                    )}
                />
                <Button
                    className={clsx(
                        s['create-template-btn'],
                        (isSelectHover || isPhone) && s['create-template-btn--hovered'],
                    )}
                    onClick={handleShowCreateTemplateForm}
                >
                    <AddIcon/>
                </Button>
            </div>
            <Button
                type={'submit'}
            >
                Create chat
            </Button>
        </form>
    )
}
