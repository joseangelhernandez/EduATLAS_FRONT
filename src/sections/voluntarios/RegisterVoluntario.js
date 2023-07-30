import { useState, useCallback, useEffect, useRef } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// read image
import Tesseract  from 'tesseract.js';
// @mui
import { alpha } from '@mui/material/styles';
import { Stack, 
    IconButton, 
    InputAdornment, 
    Alert, 
    Box, 
    Step, 
    Paper, 
    Button, 
    Stepper, 
    StepLabel, 
    Typography,
    Tooltip,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// masks
import Inputmask from 'inputmask';
// utils
import axios from 'axios';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useSnackbar } from '../../components/snackbar';
// config
import { HOST_API_KEY } from '../../config-global';
// 

// ----------------------------------------------------------------------

export default function AuthRegisterForm() {
  const numID_Input = useRef(null);
  const [inputRef, setInputRef] = useState();
  const [EstudianteRegistrado, setEstudianteRegistrado] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const RegisterSchema = Yup.object().shape({
    NumeroIdentidad: Yup.string().required('Número de identidad es obligatorio.'),
    nombre: Yup.string().required('Nombre es obligatorio.'),
    apellido: Yup.string().required('Apellido es obligatorio.'),
    email: Yup.string().required('Correo electrónico es obligatorio.'),
  });

  const defaultValues = {
    NumeroIdentidad: '',
    nombre: '',
    apellido: '',
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setError,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const NumId = watch('NumeroIdentidad');

  const CargarDatos = async () => {
    if(NumId?.length === 11){
      try{
        await axios.get(`${HOST_API_KEY}/api/SIGEL_ESTUDIANTES/getParticipanteVolFree/${NumId}`)
        .then((response)=>{
          if(response.data[0] !== undefined){
            setEstudianteRegistrado(true);
            console.log(response.data[0])

            setValue('nombre', response.data[0].nombres, {shouldValidate: true});
            setValue('apellido', response.data[0].apellidos, {shouldValidate: true});
            setValue('email', response.data[0].correo, {shouldValidate: true});

          }else{
            setEstudianteRegistrado(false);

            setValue('nombre', '', {shouldValidate: false});
            setValue('apellido', '', {shouldValidate: false});
            setValue('email', '', {shouldValidate: false});
          }
        })
        
      }catch(error){
        console.log(error)

        setValue('nombre', '', {shouldValidate: false});
        setValue('apellido', '', {shouldValidate: false});
        setValue('email', '', {shouldValidate: false});
          
      }
      
      console.log(NumId);

    }else{
      setEstudianteRegistrado(null);

      setValue('nombre', '', {shouldValidate: false});
      setValue('apellido', '', {shouldValidate: false});
      setValue('email', '', {shouldValidate: false});
    }
    
  }

  const onSubmit = async (data) => {
    try {
      console.log(data);
      enqueueSnackbar('Solicitud enviada satisfactoriamente, espera el contacto de tu encargado docente o técnico.');
      reset();
      
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error, intentelo nuevamente. Si persiste contacte a mesa de ayuda.',
      {
        variant: 'error',
        persist: true,
      });
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  useEffect(() => {
    const mask = new Inputmask({
      placeholder: "",
      mask: "999-9999999-9",
      autoUnmask: true,
      jitMasking: true,
      showMaskOnFocus: false,
      showMaskOnHover: false
    });
    mask.mask(numID_Input.current);
  }, []);


  useEffect(()=>{
    CargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[NumId?.length === 11])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="NumeroIdentidad" label="Número de identidad" inputRef={numID_Input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {EstudianteRegistrado 
                    ? <>
                        <Tooltip title='Participante confirmado'>
                          <Iconify icon='material-symbols:check-circle-rounded' style={{ width: 25, height: 'auto', color: 'green'}}/>
                        </Tooltip>
                      </>
                    : EstudianteRegistrado === false && 
                      <>
                        <Tooltip title='Participante no registrado'>
                          <Iconify icon='material-symbols:cancel-rounded' style={{ width: 25, height: 'auto', color: 'red'}}/>
                        </Tooltip>
                      </>
                  }
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField name="nombre" label="Nombre" disabled/>
        </Stack>

        <RHFTextField name="apellido" label="Apellido" disabled/>
        <RHFTextField name="email" label="Email address" disabled/>


        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Registrar voluntario(a)
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
