import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState, forwardRef } from 'react';
import 'dayjs/locale/es-do';
import { useNavigate } from 'react-router-dom';
// form
import moment from 'moment';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { 
  Box, 
  Card, 
  Grid, 
  Stack, 
  Typography, 
  TextField,
  MenuItem,
  Divider,
  InputAdornment,
} from '@mui/material';
// formato dinero
import { NumericFormat } from 'react-number-format';
import {
  DatePicker
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFAutocomplete,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------

ActividadesNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentActividad: PropTypes.object,
};

/* eslint-disable */
const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      decimalScale={2}
    />
  );
});
/* eslint-disable */

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const getResponsables = async () => {
  const response = await axios.get('/api/ACTIVIDADES/responsables');
  return response.data;
}; 

const tiposAct = [
  {value: 'MODELOS REGIONALES', label: 'Modelos Regionales'},
  {value: 'MODELOS DE DISTRITOS', label: 'Modelos de Distritos'},
  {value: 'MODELOS DE CENTRO', label: 'Modelos de Centro'},
  {value: 'DEBATES', label: 'Debates'},
  {value: 'DEBATES DISTRITALES', label: 'Debates Distritales'},
  {value: 'DEBATES REGIONALES', label: 'Debates Regionales'},
  {value: 'MODELOS', label: 'Modelos'},
  {value: 'PARTICIPACIÓN INTERNACIONAL', label: 'Participación Internacional'},
  {value: 'FORMACIÓN NACIONAL', label: 'Formación Nacional'},
  {value: 'FORMACIÓN INTERNACIONAL', label: 'Formación Internacional'},
  {value: 'EVENTOS NACIONALES', label: 'Eventos Nacionales'},
  {value: 'REPRESENTACIÓN NACIONAL', label: 'Representación Nacional'},
  {value: 'EVENTOS INTERNACIONALES', label: 'Eventos Internacionales'},
  {value: 'OTROS', label: 'Otro'},
];

export default function ActividadesNewEditForm({ isEdit = false, currentActividad }) {

  const navigate = useNavigate();

  const [Responsables, setResponsables] = useState([{value: 0, label: 'Cargando...'}]);

  const { enqueueSnackbar } = useSnackbar();

  const NewActividadSchema = Yup.object().shape({
    tipo_actividad: Yup.string().required('Campo tipo de actividad es requerido.'),
    actividad: Yup.string().required('Campo actvidad es requerido.'),
    fecha_inicio: Yup.date().nullable().required('Campo fecha de inicio es requerido.'),
    fecha_final: Yup.date()
    .required('Campo fecha final es requerido.')
    .nullable()
    .min(Yup.ref('fecha_inicio'), 'Fecha final debe ser después de la fecha de inicio.'),
    presupuesto: Yup.string().required('Campo presupuesto es requerido.'),
    responsable: Yup.mixed().required('Campo responsable es requerido.').nullable(true),
  });

  
  const defaultValues = useMemo(
    () => ({
      tipo_actividad: currentActividad?.tipo_actividad || '',
      actividad: currentActividad?.actividad || '',
      presupuesto: currentActividad?.presupuesto || '',
      responsable: currentActividad?.responsable || null,
      fecha_inicio: currentActividad?.telefono || null,
      fecha_final: currentActividad?.sexo || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentActividad]
  );
  

  const methods = useForm({
    resolver: yupResolver(NewActividadSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentActividad) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }

    getResponsables().then((data) => setResponsables(data));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentActividad]);

  const onSubmit = async (data) => {
    try {
      try{
        if(!isEdit){
          await axios.post('/api/ACTIVIDADES/',
          {
            tipo_actividad: data.tipo_actividad,
            actividad: data.actividad.toUpperCase().trim().replace(/\s+/g, ' '),
            presupuesto: Number(data.presupuesto),
            responsable: data.responsable,
            fecha_inicio: moment(data.fecha_inicio).format('YYYY-MM-DD'),
            fecha_final: moment(data.fecha_inicio).format('YYYY-MM-DD'),
          });
          enqueueSnackbar('Actividad creada');

        }else{
          await axios.put(`/api/ACTIVIDADES/${currentActividad.id}`,
          {
            id: currentActividad.id,
            tipo_actividad: data.tipo_actividad,
            actividad: data.actividad.toUpperCase().trim().replace(/\s+/g, ' '),
            presupuesto: Number(data.presupuesto),
            responsable: data.responsable,
            fecha_inicio: moment(data.fecha_inicio).format('YYYY-MM-DD'),
            fecha_final: moment(data.fecha_inicio).format('YYYY-MM-DD'),
          });
          enqueueSnackbar('Actividad actualizada');
          navigate(PATH_DASHBOARD.actividades.cronograma);
        }

        reset();
        
      }catch(e){
        console.log(e)
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleResponsable = (value) => {
    if(value?.value){
      const responsableValor = Responsables.find((responsable) => responsable.value === value.value);
      return responsableValor.label;
    }
    const responsableValor = Responsables.find((responsable) => responsable.value === value);
    return responsableValor.label;
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>

            <RHFSelect name="tipo_actividad" label="Categoría de la actividad" style={{paddingBottom: 24}}>
              <MenuItem value="">Ninguno</MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {tiposAct.map((act) => (
                <MenuItem key={act.value} value={act.value}>
                  {act.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 3, ml: 0.5 }}>
              Detalles de la actividad
            </Typography>

            <Box
              rowGap={3}
              columnGap={2}
              mb={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
                <RHFTextField name="actividad" label="Actividad" />
                <RHFAutocomplete
                  name="responsable"
                  label="Responsable de Seguimiento"
                  options={Responsables}
                  // eslint-disable-next-line
                  getOptionLabel={(option) => watch('responsable')?.length > 5 ? handleResponsable(option) : option.label}
                  isOptionEqualToValue={(option, value) => option.value === value}
                />
            </Box>

            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 3, ml: 0.5 }}>
              Inversión y fecha de la actividad
            </Typography>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-do">
                <Controller
                  name="fecha_inicio"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Fecha de inicio"
                      inputFormat="DD/MM/YYYY"
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-do">
              <Controller
                  name="fecha_final"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Fecha final"
                      inputFormat="DD/MM/YYYY"
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>

            <RHFTextField
              name="presupuesto"
              label="Presupuesto"
              placeholder="0.00"
              id="formatted-numberformat-input"
              style={{marginTop: 24}}
              onChange={(event) => {
                setValue('presupuesto', event.target.value, { shouldValidate: true });
              }}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      RD$
                    </Box>
                  </InputAdornment>
                ),
                inputComponent: NumericFormatCustom,
              }}
            />
            
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Registrar actividad' : 'Editar actividad'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
