import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import isWeekend from 'date-fns/isWeekend';
import dayjs from 'dayjs';
import 'dayjs/locale/es-do';
// mui
import { Stack, 
  IconButton, 
  InputAdornment,
  Divider,
  MenuItem,
} from '@mui/material';
// masks
import Inputmask from 'inputmask';
import {
  DatePicker
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// form
import FormProvider, { RHFTextField, RHFSelect } from '../../../components/hook-form';
// utils
import { fData } from '../../../utils/formatNumber';

const sexos = [{value: 'M', label: 'Masculino'}, {value: 'F', label: 'Femenino'}];

DatosPersonales.propTypes = {
  handleDate: PropTypes.func,
  date: PropTypes.object,
}

export default function DatosPersonales({handleDate, date}){

  const telefonoRef = useRef(null);
  const [inputRef, setInputRef] = useState();

  useEffect(() => {
    const mask2 = new Inputmask({
      placeholder: "",
      mask: "(999)-999-9999",
      autoUnmask: true,
      jitMasking: true,
      showMaskOnFocus: false,
      showMaskOnHover: false
    });
    mask2.mask(telefonoRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={5} mb={2}>
        <RHFTextField name="nombre" label="Nombre" />
        <RHFTextField name="apellido" label="Apellido" />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-do">
          <DatePicker
            openTo="year"
            views={['year', 'month', 'day']}
            label="Fecha de nacimiento"
            value={date}
            onChange={(newValue) => {
              handleDate(newValue);
            }}
            renderInput={(params) => (
              <RHFTextField {...params} name="fecha_nacimiento" label="Fecha Nacimiento"/>
            )}
            />
        </LocalizationProvider>
        <RHFSelect name="sexo" label="Sexo">
          <MenuItem value="">Ninguno</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {sexos.map((sexo) => (
            <MenuItem key={sexo.value} value={sexo.value}>
              {sexo.label}
            </MenuItem>
          ))}
        </RHFSelect>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
        <RHFTextField name="condicion" label="Condición Especial" />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
        <RHFTextField name="correo" label="Correo electrónico"/>
        <RHFTextField name="telefono" label="Teléfono" inputRef={telefonoRef}/>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2} mb={5}>
        <RHFTextField name="confirmacionCorreo" label="Confirmar Correo electrónico"/>
      </Stack>
    </>
  )
}