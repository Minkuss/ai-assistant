import {Box, Drawer, IconButton} from "@mui/material";
import {ChatMenu} from "@/entities/chatsMenu";
import {Outlet} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import MenuIcon from '@mui/icons-material/Menu';
import s from './dashboardPage.module.scss'
import {useState} from "react";

export const DashboardPage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleOpen = () => setMobileMenuOpen(true);
    const handleClose = () => setMobileMenuOpen(false);

    return (
        <Box
            className={s['page']}
        >
            <Toaster/>
            <Box
                className={s['chat-menu-desktop']}
            >
                <ChatMenu/>
            </Box>
            <IconButton
                className={s['mobile-menu-button']}
                onClick={handleOpen}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                anchor="left"
                open={mobileMenuOpen}
                onClose={handleClose}
                sx={{display: {xs: "block", md: "none"}}}
            >
                <ChatMenu/>
            </Drawer>
            <Outlet/>
        </Box>
    );
}
