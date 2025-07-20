import {Box, Modal, Typography} from "@mui/material";
import s from './createChatModal.module.scss'
import {CreateChatForm} from "@/entities/chatsMenu/ui/creatChatForm/createChatForm.tsx";
import {CreateTemplateForm} from "@/entities/chatsMenu/ui/createTemplateForm/createTemplateForm.tsx";
import {useState} from "react";
import clsx from "clsx";

interface ICreateChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateChatModal = (props: ICreateChatModalProps) => {
    const { isOpen, onClose } = props;
    const [ isShowCreateTemplateForm, setShowCreateTemplateForm ] = useState(false);

    const handleMoveCreateTemplateForm = () => {
        setShowCreateTemplateForm(prev => !prev ?? false);
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
        >
            <Box
                className={s['modal-content']}
            >
                <Box
                    className={s['create-chat-form']}
                >
                    <Typography
                        variant={'h5'}
                        color={'white'}
                    >
                        Create a new chat
                    </Typography>
                    <CreateChatForm
                        handleMoveCreateTemplateForm={handleMoveCreateTemplateForm}
                        closeModal={onClose}
                    />
                </Box>
                <Box
                    className={clsx(
                        s['create-template-form'],
                        isShowCreateTemplateForm && s['create-template-form--show'],
                    )}
                >
                    <Typography
                        variant={'h5'}
                        color={'white'}
                    >
                        Create a new template
                    </Typography>
                    <CreateTemplateForm/>
                </Box>
            </Box>
        </Modal>
    )
}
