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
import { Vehicles } from 'swapi-ts';
import Cards from '../../Components/Cards/cards';

type VehiclesList = {
  VehicleData: Array<Object>;
}

export default class Home extends React.Component<{}, VehiclesList> {

  componentDidMount() {
    Vehicles.find().then(vehicles => {
      this.setState({
        VehicleData: vehicles.resources
      });
    });
  }

  render() {
    return (
    <div className='Home'>
      <Menu />
      <Toolbar />
      {
        !!this.state && !!this.state.VehicleData &&
        <Box>
          {
            this.state.VehicleData.map((vehicle: any) => {
              return <Cards VehicleInfos={vehicle.value}/>
            })
          }
        </Box>
      }
    </div>
  );
  }

}
