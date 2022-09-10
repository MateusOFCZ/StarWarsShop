import React, { useState } from 'react';
import {
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

interface IPage {
  Pages: Array<Array<Object>>
}

export default function Home() {
  const [vehiclesPage, setVehiclesPage] = useState(Array<Array<Object>>);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [didMounted, setDidMounted] = useState(false);
  componentDidMount();

  function componentDidMount() {
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
      setDidMounted(true);
    });
  }

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  }

  return (
    <div className='Home'>
      <ThemeProvider theme={Theme}>
        <Menu />
        <Toolbar />
        <Box className='content'>
          {
            vehiclesPage.length > 0 ?
              <Box className='vehicles_list'>
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
                Nenhum veículo disponível
              </Box>
          }
        </Box>
        <Pagination className='pagination' count={page} page={currentPage} onChange={handleChangePage} />
      </ThemeProvider>
    </div>
  );
}
