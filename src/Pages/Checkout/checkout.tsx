import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Divider,
  Toolbar,
  Typography,
  Grid,
  Button,
  ThemeProvider
} from '@mui/material';

import Config from '../../Assets/config.json';
import Theme from '../../Assets/theme';
import './styles.css';

import Menu from '../../Components/Menu/menu';
import CheckoutForm from '../../Components/CheckoutForm/checkoutForm';

import { VehicleStoreFunction } from '../../Store/VehicleStore';

interface FormData {
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  cpf: String,
  cnpj: String,

  postalCode: String,
  address: String,
  number: String,
  complement: String,
  city: String,
  district: String,
  uf: String,

  paymentType: String,
  cardNumber: String,
  validMonth: String,
  validYear: String,
  name: String,
  cvc: String
}

export default function Checkout() {
  const Navigate = useNavigate();
  const VehicleStore = VehicleStoreFunction();

  useEffect(() => {
    if (!VehicleStore?.GetInfos || typeof VehicleStore?.GetInfos.name == 'function') {
      Navigate('/');
    }
  }, []);

  return (
    <div className='Checkout'>
      {
        !!VehicleStore?.GetInfos && typeof VehicleStore?.GetInfos.name != 'function' &&
        <ThemeProvider theme={Theme}>
          <Menu />
          <Toolbar />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={2} sx={{ margin: 2, width: 1250 }}>
              <Grid item xs={7}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CheckoutForm />
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Box sx={{ background: Theme.palette.secondary.main, padding: 1 }}>
                  <Typography variant='h3' sx={{ textAlign: 'center', fontVariant: 'all-small-caps', fontWeight: 'bold' }}>
                    Veículos
                  </Typography>
                  <Divider />
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography variant='h5'>
                        {`${VehicleStore?.GetInfos.name}`}
                      </Typography>
                      <Typography variant='subtitle1'>
                        {`${VehicleStore?.GetInfos.model}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant='h5' sx={{ textAlign: 'right', height: '80%', paddingTop: '20%' }}>
                        1x
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ textAlign: 'center', fontVariant: 'all-small-caps', fontSize: 15 }}>
                    Total
                  </Divider>
                  <Typography sx={{ textAlign: 'center' }}>
                    R$1.000,00
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
      }
    </div >
  );
}