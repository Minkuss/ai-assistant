import {Box} from "@mui/material";
import {ChatMenu} from "@/entities/chatsMenu";
import {Outlet} from "react-router-dom";

export const DashboardPage = () => {
    return (
        <Box
            display={'flex'}
            height={'100%'}
        >
            <ChatMenu/>
            <Outlet/>
        </Box>
    )
}
