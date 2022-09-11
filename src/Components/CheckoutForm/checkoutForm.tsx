import { useFormik } from 'formik';
import {
    Typography,
    Divider,
    Box,
    Grid,
    TextField,
    Select,
    MenuItem,
    Button,
    ThemeProvider
} from '@mui/material';

import Theme from '../../Assets/theme';
import './styles.css';

export default function CheckoutForm() {
    const Formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            cpf: '',
            cnpj: '',

            postalCode: '',
            address: '',
            number: '',
            complement: '',
            city: '',
            district: '',
            uf: '',

            paymentType: 'boleto',
            cardNumber: '',
            validMonth: '',
            validYear: '',
            name: '',
            cvc: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className='CheckoutForm'>
            <ThemeProvider theme={Theme}>
                <Box sx={{ background: Theme.palette.secondary.main, padding: 1, height: 650 }}>
                    <form onSubmit={Formik.handleSubmit}>
                        <Typography variant='h5'>
                            Informações Pessoais
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField className='text_field' fullWidth id='firstName' name='firstName' label='Nome' variant='standard' onChange={Formik.handleChange} value={Formik.values.firstName} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField className='text_field' fullWidth id='lastName' name='lastName' label='Sobrenome' variant='standard' onChange={Formik.handleChange} value={Formik.values.lastName} />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField className='text_field' fullWidth id='cpf' name='cpf' label='CPF' variant='standard' onChange={Formik.handleChange} value={Formik.values.cpf} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField className='text_field' fullWidth id='phone' name='phone' label='Telefone' variant='standard' onChange={Formik.handleChange} value={Formik.values.phone} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField className='text_field' fullWidth id='email' name='email' label='E-mail' variant='standard' onChange={Formik.handleChange} value={Formik.values.email} />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ marginTop: 3, marginBottom: 2 }}>
                            <Divider />
                        </Box>

                        <Typography variant='h5'>
                            Endereço
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={5}>
                                    <TextField className='text_field' fullWidth id='postalCode' name='postalCode' label='CEP' variant='standard' onChange={Formik.handleChange} value={Formik.values.postalCode} />
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <TextField className='text_field' fullWidth id='address' name='address' label='Endereço' variant='standard' onChange={Formik.handleChange} value={Formik.values.address} />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField className='text_field' fullWidth id='number' name='number' label='Número' variant='standard' onChange={Formik.handleChange} value={Formik.values.number} />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField className='text_field' fullWidth id='complement' name='complement' label='Complemento' variant='standard' onChange={Formik.handleChange} value={Formik.values.complement} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField className='text_field' fullWidth id='city' name='city' label='Cidade' variant='standard' onChange={Formik.handleChange} value={Formik.values.city} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField className='text_field' fullWidth id='district' name='district' label='Bairro' variant='standard' onChange={Formik.handleChange} value={Formik.values.district} />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ marginTop: 3, marginBottom: 2 }}>
                            <Divider />
                        </Box>

                        <Typography variant='h5'>
                            Forma de Pagamento
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={20}>
                                    <Select className='select_field' fullWidth id='paymentType' name='paymentType' label='Tipo do Pagamento' variant='standard' onChange={Formik.handleChange} value={Formik.values.paymentType}>
                                        <MenuItem value={'boleto'}>Boleto</MenuItem>
                                        <MenuItem value={'creditCard'}>Cartão de Crédito</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ marginTop: 3, marginBottom: 2 }}>
                            <Divider />
                        </Box>

                        <Typography variant='h5'>
                            Dados do Cartão de Crédito
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField className='text_field' fullWidth id='cardNumber' name='cardNumber' label='Número do Cartão' variant='standard' onChange={Formik.handleChange} value={Formik.values.cardNumber} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField className='text_field' fullWidth id='name' name='name' label='Nome Impresso' variant='standard' onChange={Formik.handleChange} value={Formik.values.name} />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField className='text_field' fullWidth id='validMonth' name='validMonth' label='Mês' variant='standard' onChange={Formik.handleChange} value={Formik.values.validMonth} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField className='text_field' fullWidth id='validYear' name='validYear' label='Ano' variant='standard' onChange={Formik.handleChange} value={Formik.values.validYear} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField className='text_field' fullWidth id='cvc' name='cvc' label='CVV' variant='standard' onChange={Formik.handleChange} value={Formik.values.cvc} />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ marginTop: 3, marginBottom: 3 }}>
                            <Button fullWidth variant='contained' type={'submit'}>Confirmar Compra</Button>
                        </Box>
                    </form>
                </Box>
            </ThemeProvider>
        </div>
    );
};