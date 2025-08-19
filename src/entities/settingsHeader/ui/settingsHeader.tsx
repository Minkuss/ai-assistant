import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import s from './settingsHeader.module.scss';
import {useNavigate} from "react-router-dom";
import {routes} from "@/shared/routes";

export const SettingsHeader = () => {
    const navigate = useNavigate();

    const handleGoToDashboard = () => {
        navigate(routes.DASHBOARD);
    }

    return (
        <AppBar
            position="static"
            className={s['header']}
        >
            <Toolbar>
                <IconButton
                    size="large"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={handleGoToDashboard}
                >
                    <ArrowBackIcon/>
                </IconButton>
                <Typography
                    variant="h6"
                >
                    Settings
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
