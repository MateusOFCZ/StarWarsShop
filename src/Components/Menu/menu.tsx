import {
    useNavigate
} from "react-router-dom";
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    Button,
    ThemeProvider
} from '@mui/material';
import Config from '../../Assets/config.json';
import Theme from '../../Assets/theme';

import './styles.css';

export default function Menu() {
    const navigate = useNavigate();

    return (
        <div className='Menu'>
            <ThemeProvider theme={Theme}>
                <Box sx={{ display: 'flex' }}>
                    <AppBar component='nav'>
                        <Toolbar>
                            <Typography
                                variant='h6'
                                component='div'
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                <img width='auto' height={50} src={`${Config.baseUrl}/assets/Logo.png`} onClick={(e) => navigate('/')} />
                            </Typography>
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Button sx={{ color: '#FFFFFF' }} onClick={(e) => navigate('/')}>
                                    Início
                                </Button>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider>
        </div>
    );
}