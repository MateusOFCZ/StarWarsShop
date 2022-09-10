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
import Menu from '../../Components/Menu/menu';
import './styles.css';

export default function Checkout() {
  return (
    <div className='Checkout'>
      <Menu/>
      <Toolbar/>
      Checkout
    </div>
  );
}