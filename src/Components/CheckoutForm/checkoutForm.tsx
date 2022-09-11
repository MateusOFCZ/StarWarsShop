import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import {
    Typography,
    Divider,
    Box,
    Grid,
    Input,
    InputLabel,
    Select,
    MenuItem,
    Button,
    ThemeProvider
} from '@mui/material';
import { IMaskInput } from 'react-imask';
import * as Yup from 'yup';

import Theme from '../../Assets/theme';
import './styles.css';

const FormValidationSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().required(),
    phone: Yup.string().required(),
    costumerType: Yup.string().required(),
    cpf: Yup.string().when("costumerType", {
        is: 'pf',
        then: Yup.string().required()
    }),
    cnpj: Yup.string().when("costumerType", {
        is: 'pj',
        then: Yup.string().required()
    }),

    postalCode: Yup.string().required(),
    address: Yup.string().required(),
    number: Yup.string().required(),
    complement: Yup.string().required(),
    city: Yup.string().required(),
    district: Yup.string().required(),
    uf: Yup.string().required(),

    paymentType: Yup.string().required(),
    cardNumber: Yup.string().when("paymentType", {
        is: 'creditCard',
        then: Yup.string().required()
    }),
    validMonth: Yup.string().when("paymentType", {
        is: 'creditCard',
        then: Yup.string().required()
    }),
    validYear: Yup.string().when("paymentType", {
        is: 'creditCard',
        then: Yup.string().required()
    }),
    name: Yup.string().when("paymentType", {
        is: 'creditCard',
        then: Yup.string().required()
    }),
    cvc: Yup.string().when("paymentType", {
        is: 'creditCard',
        then: Yup.string().required()
    }),
});

interface TextField_Props {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const TextField_CPFMask = React.forwardRef<HTMLElement, TextField_Props>(
    function TextField_CPFMask(props) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask='000.000.000-00'
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const TextField_CNPJMask = React.forwardRef<HTMLElement, TextField_Props>(
    function TextField_CNPJMask(props) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask='00.000.000/0000-00'
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const TextField_PhoneMask = React.forwardRef<HTMLElement, TextField_Props>(
    function TextField_PhoneMask(props) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask='+00 (00) 0 0000-0000'
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const TextField_PostalCodeMask = React.forwardRef<HTMLElement, TextField_Props>(
    function TextField_PostalCodeMask(props) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask='00000-000'
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const TextField_NumberMask = React.forwardRef<HTMLElement, TextField_Props>(
    function TextField_NumberMask(props) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask='000000'
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const TextField_CardNumberMask = React.forwardRef<HTMLElement, TextField_Props>(
    function TextField_CardNumberMask(props) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask='0000 0000 0000 0000'
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const TextField_ValidMonthYearMask = React.forwardRef<HTMLElement, TextField_Props>(
    function TextField_ValidMonthYearMask(props) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask='00'
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const TextField_CVCMask = React.forwardRef<HTMLElement, TextField_Props>(
    function TextField_CVCMask(props) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask='000'
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

export default function CheckoutForm() {
    const [cepInformed, setCEPInformed] = useState(false);
    const [hasAddress, setHasAddress] = useState(false);
    const [hasDistrict, setHasDistrict] = useState(false);
    const [hasCity, setHasCity] = useState(false);
    const [hasUF, setHasUF] = useState(false);

    const Formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            costumerType: 'pf',
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
        validationSchema: FormValidationSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const getAddress = () => {
        if (Formik.values.postalCode.length >= 8) {
            axios.get(`http://viacep.com.br/ws/${Formik.values.postalCode}/json/`)
                .then((response) => {
                    Formik.setFieldValue('address', response.data.logradouro);
                    Formik.setFieldValue('district', response.data.bairro);
                    Formik.setFieldValue('city', response.data.localidade);
                    Formik.setFieldValue('uf', response.data.uf);

                    if (response.data.logradouro !== '') {
                        setHasAddress(false);
                    } else {
                        setHasAddress(true);
                    }

                    if (response.data.bairro !== '') {
                        setHasDistrict(false);
                    } else {
                        setHasDistrict(true);
                    }

                    if (response.data.localidade !== '') {
                        setHasCity(false);
                    } else {
                        setHasCity(true);
                    }

                    if (response.data.uf !== '') {
                        setHasUF(false);
                    } else {
                        setHasUF(true);
                    }

                    setCEPInformed(true);
                }).catch((error) => {
                    setCEPInformed(false);
                });
        } else {
            Formik.setFieldValue('address', '');
            Formik.setFieldValue('district', '');
            Formik.setFieldValue('city', '');
            Formik.setFieldValue('uf', '');
        }
    }

    return (
        <div className='CheckoutForm'>
            <ThemeProvider theme={Theme}>
                <Box sx={{ background: Theme.palette.secondary.main, padding: 1, height: `${Formik.values.paymentType === 'creditCard' ? 650 : 300}` }}>
                    <form onSubmit={Formik.handleSubmit}>
                        <Typography variant='h5'>
                            Informações Pessoais
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel className='input_label' htmlFor='name'>Nome</InputLabel>
                                    <Input className='text_field' id='name' name='name' fullWidth value={Formik.values.name} onChange={Formik.handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel className='input_label' htmlFor='lastName'>Sobrenome</InputLabel>
                                    <Input className='text_field' id='lastName' name='lastName' fullWidth value={Formik.values.lastName} onChange={Formik.handleChange} />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel className='input_label' htmlFor='costumerType'>Tipo de Pessoa</InputLabel>
                                    <Select className='select_field' fullWidth id='costumerType' name='costumerType' onChange={Formik.handleChange} value={Formik.values.costumerType}>
                                        <MenuItem value={'pf'}>Pessoa Física</MenuItem>
                                        <MenuItem value={'pj'}>Pessoa Jurídica</MenuItem>
                                    </Select>
                                </Grid>
                                {
                                    Formik.values.costumerType === 'pf' &&
                                    <Grid item xs={12} sm={6}>
                                        <InputLabel className='input_label' htmlFor='cpf'>CPF</InputLabel>
                                        <Input className='text_field' id='cpf' name='cpf' inputComponent={TextField_CPFMask as any} value={Formik.values.cpf} onChange={Formik.handleChange} />
                                    </Grid>
                                }
                                {
                                    Formik.values.costumerType === 'pj' &&
                                    <Grid item xs={12} sm={6}>
                                        <InputLabel className='input_label' htmlFor='cnpj'>CNPJ</InputLabel>
                                        <Input className='text_field' id='cnpj' name='cnpj' inputComponent={TextField_CNPJMask as any} value={Formik.values.cnpj} onChange={Formik.handleChange} />
                                    </Grid>
                                }
                            </Grid>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel className='input_label' htmlFor='phone'>Telefone</InputLabel>
                                    <Input className='text_field' id='phone' name='phone' inputComponent={TextField_PhoneMask as any} value={Formik.values.phone} onChange={Formik.handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel className='input_label' htmlFor='email'>E-mail</InputLabel>
                                    <Input type='email' className='text_field' id='email' name='email' fullWidth value={Formik.values.email} onChange={Formik.handleChange} />
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
                                <Grid item xs={12} sm={4}>
                                    <InputLabel className='input_label' htmlFor='postalCode'>CEP</InputLabel>
                                    <Input className='text_field' id='postalCode' name='postalCode' inputComponent={TextField_PostalCodeMask as any} value={Formik.values.postalCode} onChange={Formik.handleChange} onKeyUp={getAddress} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel className='input_label' htmlFor='complement'>Complemento</InputLabel>
                                    <Input className='text_field' id='complement' name='complement' fullWidth value={Formik.values.complement} onChange={Formik.handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <InputLabel className='input_label' htmlFor='number'>Número</InputLabel>
                                    <Input className='text_field' id='number' name='number' inputComponent={TextField_NumberMask as any} value={Formik.values.number} onChange={Formik.handleChange} />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel className='input_label' htmlFor='address'>Logradouro</InputLabel>
                                    <Input disabled={!(cepInformed && hasAddress)} className='text_field' id='address' name='address' fullWidth value={Formik.values.address} onChange={Formik.handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <InputLabel className='input_label' htmlFor='city'>Cidade</InputLabel>
                                    <Input disabled={!(cepInformed && hasCity)} className='text_field' id='city' name='city' fullWidth value={Formik.values.city} onChange={Formik.handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <InputLabel className='input_label' htmlFor='district'>Bairro</InputLabel>
                                    <Input disabled={!(cepInformed && hasDistrict)} className='text_field' id='district' name='district' fullWidth value={Formik.values.district} onChange={Formik.handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <InputLabel className='input_label' htmlFor='uf'>UF</InputLabel>
                                    <Input disabled={!(cepInformed && hasUF)} className='text_field' id='uf' name='uf' fullWidth value={Formik.values.uf} onChange={Formik.handleChange} />
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
                                    <Select className='select_field' fullWidth id='paymentType' name='paymentType' onChange={Formik.handleChange} value={Formik.values.paymentType}>
                                        <MenuItem value={'boleto'}>Boleto</MenuItem>
                                        <MenuItem value={'creditCard'}>Cartão de Crédito</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                        </Box>

                        {
                            Formik.values.paymentType === 'creditCard' &&
                            <Box>
                                <Box sx={{ marginTop: 3, marginBottom: 2 }}>
                                    <Divider />
                                </Box>

                                <Typography variant='h5'>
                                    Dados do Cartão de Crédito
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <InputLabel className='input_label' htmlFor='cardNumber'>Número do Cartão</InputLabel>
                                            <Input className='text_field' id='cardNumber' name='cardNumber' inputComponent={TextField_CardNumberMask as any} value={Formik.values.cardNumber} onChange={Formik.handleChange} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <InputLabel className='input_label' htmlFor='name'>Nome Impresso</InputLabel>
                                            <Input className='text_field' id='name' name='name' fullWidth value={Formik.values.name} onChange={Formik.handleChange} />
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={4}>
                                            <InputLabel className='input_label' htmlFor='validMonth'>Mês de Validade</InputLabel>
                                            <Input className='text_field' id='validMonth' name='validMonth' inputComponent={TextField_ValidMonthYearMask as any} value={Formik.values.validMonth} onChange={Formik.handleChange} />
                                        </Grid>

                                        <Grid item xs={12} sm={4}>
                                            <InputLabel className='input_label' htmlFor='validYear'>Ano de Validade</InputLabel>
                                            <Input className='text_field' id='validYear' name='validYear' inputComponent={TextField_ValidMonthYearMask as any} value={Formik.values.validYear} onChange={Formik.handleChange} />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <InputLabel className='input_label' htmlFor='cvc'>CVC</InputLabel>
                                            <Input className='text_field' id='cvc' name='cvc' inputComponent={TextField_CVCMask as any} value={Formik.values.cvc} onChange={Formik.handleChange} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        }

                        <Box sx={{ marginTop: 3, marginBottom: 3 }}>
                            <Button fullWidth variant='contained' type={'submit'}>Confirmar Compra</Button>
                        </Box>
                    </form>
                </Box>
            </ThemeProvider>
        </div>
    );
};