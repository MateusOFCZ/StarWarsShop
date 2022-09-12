import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const FormValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>'),
    lastName: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>'),
    email: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>'),
    phone: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>').min(20, 'O telefone deve conter 13 dígitos'),
    costumerType: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>'),
    cpf: Yup.string().when('costumerType', {
        is: 'pf',
        then: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>').min(14, 'O CPF deve conter 11 dígitos')
    }),
    cnpj: Yup.string().when('costumerType', {
        is: 'pj',
        then: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>').min(18, 'O CNPJ deve conter 14 dígitos')
    }),

    postalCode: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>').min(9, 'O CEP deve conter 8 dígitos'),
    address: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>'),
    number: Yup.number().optional(),
    complement: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>'),
    city: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>'),
    district: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>'),
    uf: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>'),

    paymentType: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>'),
    cardNumber: Yup.string().when('paymentType', {
        is: 'creditCard',
        then: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>').min(19, 'O número do cartão deve conter 16 dígitos')
    }),
    validMonth: Yup.number().when('paymentType', {
        is: 'creditCard',
        then: Yup.number().required('<span style="color: #FF0000">Campo Obrigatório</span>').lessThan(13, 'O mês deve ser entre 1 e 12').moreThan(0, 'O mês deve ser entre 1 e 12'),
    }),
    validYear: Yup.number().when('paymentType', {
        is: 'creditCard',
        then: Yup.number().required('<span style="color: #FF0000">Campo Obrigatório</span>').moreThan(parseInt(new Date().getFullYear().toString().slice(-2)), 'O ano de vencimento deve ser maior que o ano atual')
    }),
    name: Yup.string().when('paymentType', {
        is: 'creditCard',
        then: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>')
    }),
    cvc: Yup.string().when('paymentType', {
        is: 'creditCard',
        then: Yup.string().required('<span style="color: #FF0000">Campo Obrigatório</span>').min(3, 'O CVC deve conter 3 dígitos')
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
    const Navigate = useNavigate();
    
    const FormFormik = () => {
        const [cepInformed, setCEPInformed] = useState(false);
        const [hasAddress, setHasAddress] = useState(false);
        const [hasDistrict, setHasDistrict] = useState(false);
        const [hasCity, setHasCity] = useState(false);
        const [hasUF, setHasUF] = useState(false);

        const formik = useFormik({
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
                Navigate('/success')
            },
        });

        const getAddress = () => {
            if (formik.values.postalCode.length >= 8) {
                axios.get(`http://viacep.com.br/ws/${formik.values.postalCode}/json/`)
                    .then((response) => {
                        formik.setFieldValue('address', response.data.logradouro);
                        formik.setFieldValue('district', response.data.bairro);
                        formik.setFieldValue('city', response.data.localidade);
                        formik.setFieldValue('uf', response.data.uf);

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
                        setHasAddress(false);
                        setHasDistrict(false);
                        setHasCity(false);
                        setHasUF(false);

                        setCEPInformed(true);

                        console.error(error);
                    });
            } else {
                formik.setFieldValue('address', '');
                formik.setFieldValue('district', '');
                formik.setFieldValue('city', '');
                formik.setFieldValue('uf', '');
            }
        }

        return (
            <Box sx={{ background: Theme.palette.secondary.main, padding: 1, height: `${formik.values.paymentType === 'creditCard' ? 650 : 300}` }}>
                <form onSubmit={formik.handleSubmit}>
                    <Typography variant='h5'>
                        Informações Pessoais
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <InputLabel className='input_label' htmlFor='firstName'>Nome</InputLabel>
                                <Input className='text_field' id='firstName' name='firstName' fullWidth value={formik.values.firstName} onChange={formik.handleChange} />
                                <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.firstName !== undefined && formik.touched.firstName ? formik.errors.firstName : ''}` }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel className='input_label' htmlFor='lastName'>Sobrenome</InputLabel>
                                <Input className='text_field' id='lastName' name='lastName' fullWidth value={formik.values.lastName} onChange={formik.handleChange} />
                                <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.lastName !== undefined && formik.touched.lastName ? formik.errors.lastName : ''}` }} />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <InputLabel className='input_label' htmlFor='costumerType'>Tipo de Pessoa</InputLabel>
                                <Select className='select_field' fullWidth id='costumerType' name='costumerType' onChange={formik.handleChange} value={formik.values.costumerType}>
                                    <MenuItem value={'pf'}>Pessoa Física</MenuItem>
                                    <MenuItem value={'pj'}>Pessoa Jurídica</MenuItem>
                                </Select>
                                <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.costumerType !== undefined && formik.touched.costumerType ? formik.errors.costumerType : ''}` }} />
                            </Grid>
                            {
                                formik.values.costumerType === 'pf' &&
                                <Grid item xs={12} sm={6}>
                                    <InputLabel className='input_label' htmlFor='cpf'>CPF</InputLabel>
                                    <Input className='text_field' id='cpf' name='cpf' inputComponent={TextField_CPFMask as any} value={formik.values.cpf} onChange={formik.handleChange} />
                                    <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.cpf !== undefined && formik.touched.cpf ? formik.errors.cpf : ''}` }} />
                                </Grid>
                            }
                            {
                                formik.values.costumerType === 'pj' &&
                                <Grid item xs={12} sm={6}>
                                    <InputLabel className='input_label' htmlFor='cnpj'>CNPJ</InputLabel>
                                    <Input className='text_field' id='cnpj' name='cnpj' inputComponent={TextField_CNPJMask as any} value={formik.values.cnpj} onChange={formik.handleChange} />
                                    <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.cnpj !== undefined && formik.touched.cnpj ? formik.errors.cnpj : ''}` }} />
                                </Grid>
                            }
                        </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <InputLabel className='input_label' htmlFor='phone'>Telefone</InputLabel>
                                <Input className='text_field' id='phone' name='phone' inputComponent={TextField_PhoneMask as any} value={formik.values.phone} onChange={formik.handleChange} />
                                <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.phone !== undefined && formik.touched.phone ? formik.errors.phone : ''}` }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel className='input_label' htmlFor='email'>E-mail</InputLabel>
                                <Input type='email' className='text_field' id='email' name='email' fullWidth value={formik.values.email} onChange={formik.handleChange} />
                                <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.email !== undefined && formik.touched.email ? formik.errors.email : ''}` }} />
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
                                <Input className='text_field' id='postalCode' name='postalCode' inputComponent={TextField_PostalCodeMask as any} value={formik.values.postalCode} onChange={formik.handleChange} onKeyUp={getAddress} />
                                <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.postalCode !== undefined && formik.touched.postalCode ? formik.errors.postalCode : ''}` }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel className='input_label' htmlFor='complement'>Complemento</InputLabel>
                                <Input className='text_field' id='complement' name='complement' fullWidth value={formik.values.complement} onChange={formik.handleChange} />
                                <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.complement !== undefined && formik.touched.complement ? formik.errors.complement : ''}` }} />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <InputLabel className='input_label' htmlFor='number'>Número</InputLabel>
                                <Input className='text_field' id='number' name='number' inputComponent={TextField_NumberMask as any} value={formik.values.number} onChange={formik.handleChange} />
                                <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.number !== undefined && formik.touched.number ? formik.errors.number : ''}` }} />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <InputLabel className='input_label' htmlFor='address'>Logradouro</InputLabel>
                                <Input disabled={!(cepInformed && hasAddress)} className='text_field' id='address' name='address' fullWidth value={formik.values.address} onChange={formik.handleChange} />
                                <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.address !== undefined && formik.touched.address ? formik.errors.address : ''}` }} />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <InputLabel className='input_label' htmlFor='city'>Cidade</InputLabel>
                                <Input disabled={!(cepInformed && hasCity)} className='text_field' id='city' name='city' fullWidth value={formik.values.city} onChange={formik.handleChange} />
                                <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.city !== undefined && formik.touched.city ? formik.errors.city : ''}` }} />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <InputLabel className='input_label' htmlFor='district'>Bairro</InputLabel>
                                <Input disabled={!(cepInformed && hasDistrict)} className='text_field' id='district' name='district' fullWidth value={formik.values.district} onChange={formik.handleChange} />
                                <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.district !== undefined && formik.touched.district ? formik.errors.district : ''}` }} />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <InputLabel className='input_label' htmlFor='uf'>UF</InputLabel>
                                <Input disabled={!(cepInformed && hasUF)} className='text_field' id='uf' name='uf' fullWidth value={formik.values.uf} onChange={formik.handleChange} />
                                <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.uf !== undefined && formik.touched.uf ? formik.errors.uf : ''}` }} />
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
                                <Select className='select_field' fullWidth id='paymentType' name='paymentType' onChange={formik.handleChange} value={formik.values.paymentType}>
                                    <MenuItem value={'boleto'}>Boleto</MenuItem>
                                    <MenuItem value={'creditCard'}>Cartão de Crédito</MenuItem>
                                </Select>
                                <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.paymentType !== undefined && formik.touched.paymentType ? formik.errors.paymentType : ''}` }} />
                            </Grid>
                        </Grid>
                    </Box>

                    {
                        formik.values.paymentType === 'creditCard' &&
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
                                        <Input className='text_field' id='cardNumber' name='cardNumber' inputComponent={TextField_CardNumberMask as any} value={formik.values.cardNumber} onChange={formik.handleChange} />
                                        <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.cardNumber !== undefined && formik.touched.cardNumber ? formik.errors.cardNumber : ''}` }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InputLabel className='input_label' htmlFor='name'>Nome Impresso</InputLabel>
                                        <Input className='text_field' id='name' name='name' fullWidth value={formik.values.name} onChange={formik.handleChange} />
                                        <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.name !== undefined && formik.touched.name ? formik.errors.name : ''}` }} />
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'center', width: 700 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel className='input_label' htmlFor='validMonth'>Mês de Validade</InputLabel>
                                        <Input className='text_field' id='validMonth' name='validMonth' inputComponent={TextField_ValidMonthYearMask as any} value={formik.values.validMonth} onChange={formik.handleChange} />
                                        <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.validMonth !== undefined && formik.touched.validMonth ? formik.errors.validMonth : ''}` }} />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <InputLabel className='input_label' htmlFor='validYear'>Ano de Validade</InputLabel>
                                        <Input className='text_field' id='validYear' name='validYear' inputComponent={TextField_ValidMonthYearMask as any} value={formik.values.validYear} onChange={formik.handleChange} />
                                        <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.validYear !== undefined && formik.touched.validYear ? formik.errors.validYear : ''}` }} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InputLabel className='input_label' htmlFor='cvc'>CVC</InputLabel>
                                        <Input className='text_field' id='cvc' name='cvc' inputComponent={TextField_CVCMask as any} value={formik.values.cvc} onChange={formik.handleChange} />
                                        <Box dangerouslySetInnerHTML={{ __html: `${formik.errors.cvc !== undefined && formik.touched.cvc ? formik.errors.cvc : ''}` }} />
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
        );
    }

    return (
        <div className='CheckoutForm'>
            <ThemeProvider theme={Theme}>
                <FormFormik />
            </ThemeProvider>
        </div >
    );
};