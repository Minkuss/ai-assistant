import {Box} from "@mui/material";
import {ChatMenu} from "@/entities/chatsMenu";
import {Outlet} from "react-router-dom";
import {Toaster} from "react-hot-toast";

export const DashboardPage = () =>
    (
        <Box
            display={'flex'}
            height={'100%'}
        >
            <Toaster/>
            <ChatMenu/>
            <Outlet/>
        </Box>
    )
