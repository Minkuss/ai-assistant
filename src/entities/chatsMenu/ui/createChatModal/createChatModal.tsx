import {Box, IconButton, Modal, Typography} from "@mui/material";
import s from './createChatModal.module.scss'
import {CreateChatForm} from "@/entities/chatsMenu/ui/creatChatForm/createChatForm.tsx";
import {TemplateForm} from "@/shared/ui/templateForm/templateForm.tsx";
import {useState} from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ICreateChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateChatModal = (props: ICreateChatModalProps) => {
    const { isOpen, onClose } = props;
    const [ isShowCreateTemplateForm, setShowCreateTemplateForm ] = useState(false);

    const handleShowCreateTemplateForm = () => {
        setShowCreateTemplateForm(true);
    }

    const handleCloseCreateTemplateForm = () => {
        setShowCreateTemplateForm(false);
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
                    className={s['create-form']}
                >
                    <div
                        className={s['header-wrapper']}
                    >
                        <Typography
                            variant={'h5'}
                            color={'white'}
                        >
                            {isShowCreateTemplateForm ? 'Create a new template' : 'Create a new chat'}
                        </Typography>
                        {
                            isShowCreateTemplateForm &&
                            <IconButton
                                sx={{
                                    color: '#fff'
                                }}
                                onClick={handleCloseCreateTemplateForm}
                            >
                                <ArrowBackIcon/>
                            </IconButton>
                        }
                    </div>
                    {
                        isShowCreateTemplateForm
                            ? <TemplateForm/>
                            : <CreateChatForm
                                handleShowCreateTemplateForm={handleShowCreateTemplateForm}
                                closeModal={onClose}
                            />
                    }
                </Box>
            </Box>
        </Modal>
    )
}
