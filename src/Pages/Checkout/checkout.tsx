import React from 'react';
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

import Menu from '../../Components/Menu/menu';

import { VehicleStoreFunction } from '../../Store/VehicleStore';

export default function Checkout() {
  const VehicleStore = VehicleStoreFunction();

  return (
    <div className='Checkout'>
      <ThemeProvider theme={Theme}>
        <Menu />
        <Toolbar />
        Checkout
        <Button onClick={(e) => console.log(VehicleStore?.GetInfos)}>Ler</Button>
      </ThemeProvider>
    </div>
  );
}