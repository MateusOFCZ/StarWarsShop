import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    ThemeProvider
} from '@mui/material';
import Theme from '../../Assets/theme';

import './styles.css';

export default function Menu() {
    const Navigate = useNavigate();

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
                                <img width='auto' height={50} src={`https://raw.githubusercontent.com/MateusOFCZ/StarWarsShop/master/public/assets/Logo.png`} onClick={(e) => Navigate('/')} />
                            </Typography>
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Button sx={{ color: '#FFFFFF' }} onClick={(e) => Navigate('/')}>
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