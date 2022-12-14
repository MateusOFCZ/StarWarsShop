import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Snackbar,
  Alert,
  Box,
  Toolbar,
  Pagination,
  ThemeProvider
} from '@mui/material';
import { Vehicles } from 'swapi-ts';

import Config from '../../Assets/config.json';
import Theme from '../../Assets/theme';
import './styles.css';

import Menu from '../../Components/Menu/menu';
import Cards from '../../Components/Cards/cards';

import { VehicleStoreFunction } from '../../Store/VehicleStore';

interface IPage {
  Pages: Array<Array<Object>>
}

export default function Home() {
  const Location = useLocation();
  const Navigate = useNavigate();

  const VehicleStore = VehicleStoreFunction();
  const [columnTemplate, setColumnTemplate] = useState('1fr');
  const [openSuccess, setOpenSuccess] = useState(false);

  const [vehiclesPage, setVehiclesPage] = useState(Array<Array<Object>>);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [didMounted, setDidMounted] = useState(false);

  useEffect(() => {
    if (Location.pathname.slice(1) === 'success') {
      Navigate('/');
      setOpenSuccess(true);
    }
  }, []);

  const componentDidMount = () => {
    if (didMounted) return;

    Vehicles.find().then((vehicles: any) => {
      const localPage: IPage['Pages'] = [[]];
      let pageIndex = 0;
      let i = 0;

      vehicles.resources.forEach(function (vehicle: any) {
        if (i < Config.perPage) {
          localPage[pageIndex].push(vehicle.value);
          i++;
        } else {
          pageIndex++;
          localPage[pageIndex] = [];
          i = 0;

          localPage[pageIndex].push(vehicle.value);
          i++;
        }
      });

      setVehiclesPage(localPage);
      setPage(localPage.length - 1);
      VehicleStore?.ClearInfos();

      let iColumn = 1;
      let newColumnTemplate = '';
      while (iColumn <= Config.gridColumns) {
        newColumnTemplate = newColumnTemplate + ' 1fr';

        iColumn++;
      }

      setColumnTemplate(newColumnTemplate);

      console.log(columnTemplate);

      setDidMounted(true);
    });
  }

  componentDidMount();

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  }

  return (
    <div className='Home'>
      <ThemeProvider theme={Theme}>
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
          <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: '100%' }}>
            Pedido efetuado com sucesso!
          </Alert>
        </Snackbar>
        <Menu />
        <Toolbar />
        <Box className='content'>
          {
            vehiclesPage.length > 0 ?
              <Box className='vehicles_list' sx={{ gridTemplateColumns: columnTemplate }}>
                {
                  vehiclesPage[currentPage].map((vehicle: any) => {
                    return (
                      <Cards VehicleInfos={vehicle} />
                    )
                  })
                }
              </Box>
              :
              <Box>
                Nenhum ve??culo dispon??vel
              </Box>
          }
        </Box>
        <Pagination className='pagination' count={page} page={currentPage} onChange={handleChangePage} />
      </ThemeProvider>
    </div>
  );
}
