import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    ThemeProvider
} from '@mui/material';
import {
    ShoppingBag
} from '@mui/icons-material';

import Theme from '../../Assets/theme';
import './styles.css';

import { VehicleStoreFunction } from '../../Store/VehicleStore';

interface CardsData {
    VehicleInfos: {
        name: String,
        model: String,
        vehicle_class: String,
        manufacturer: String,
        length: String,
        cost_in_credits: String,
        crew: String,
        passengers: String,
        max_atmosphering_speed: String,
        cargo_capacity: String,
        consumables: String
    },
}

export default function Cards(prop: CardsData) {
    const Navigate = useNavigate();
    const VehicleStore = VehicleStoreFunction();

    const BuyVehicle = async (VehicleData: any) => {
        await VehicleStore?.SaveInfos(VehicleData);
        Navigate('/checkout');
    }

    return (
        <div className='Card'>
            <ThemeProvider theme={Theme}>
                <Card sx={{ height: 300, width: 380 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ height: 80 }}>
                            {prop.VehicleInfos.name} - {prop.VehicleInfos.model}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ height: 125 }}>
                            <p>O veículo {prop.VehicleInfos.name} de modelo {prop.VehicleInfos.model}{prop.VehicleInfos.manufacturer != 'unknown' && ` foi fabricado por ${prop.VehicleInfos.manufacturer}`}{prop.VehicleInfos.length != 'unknown' && ` possuí um comprimento de ${prop.VehicleInfos.length} metros`}.</p>
                            {
                                parseInt(prop.VehicleInfos.crew.toString()) > 0 || parseInt(prop.VehicleInfos.passengers.toString()) > 0 &&
                                <p>
                                    {
                                        parseInt(prop.VehicleInfos.crew.toString()) == 0 ?
                                            `Não é necessário nenhuma pessoa`
                                            :
                                            parseInt(prop.VehicleInfos.crew.toString()) > 1 ?
                                                `É necessário ${prop.VehicleInfos.crew} pessoas`
                                                :
                                                `É necessário ${prop.VehicleInfos.crew} pessoa`
                                    } para operar ou pilotar, e possuí capacidade para {prop.VehicleInfos.passengers} passageiros.</p>
                            }
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="contained" endIcon={<ShoppingBag />} onClick={(e) => BuyVehicle(prop.VehicleInfos)}>Comprar</Button>
                    </CardActions>
                </Card>
            </ThemeProvider>
        </div >
    );
}