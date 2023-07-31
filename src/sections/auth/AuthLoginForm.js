import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// masks
import Inputmask from 'inputmask';
// routes
import { PATH_AUTH } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';

// ----------------------------------------------------------------------

export default function AuthLoginForm() {
  const { login } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const usuarioRef = React.useRef(null);

  const LoginSchema = Yup.object().shape({
    usuario: Yup.string().required('Usuario es obligatorio'),
    contraseña: Yup.string().required('Contraseña es obligatorio'),
  });

  const defaultValues = {
    usuario: '',
    contraseña: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const [inputRef, setInputRef] = useState();

  useEffect(() => {
    const mask = new Inputmask({
      placeholder: "",
      mask: "999-9999999-9",
      autoUnmask: true,
      jitMasking: true,
      showMaskOnFocus: false,
      showMaskOnHover: false
    });
    mask.mask(usuarioRef.current);
  }, []);

  const onSubmit = async (data) => {
    try {
      if(data.usuario === '40208725478' && data.contraseña === '123456789'){
        await login(data.usuario, data.contraseña);
      }
      else
      {
        reset();
        setError('afterSubmit', {
          message: 'Usuario y/o contraseña inválida.',
        });
      }
      
      if(localStorage.getItem('error') === '404'){
        reset();
        setError('afterSubmit', {
          message: 'Usuario y/o contraseña inválida.',
        });
      }else if(localStorage.getItem('error') !== '404'){
        reset();
        setError('afterSubmit', {
          message: 'Usuario y/o contraseña inválida.',
        });
      }
    } catch (error) {
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} style={{marginTop: -5}}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Alert severity="info">Usuario de prueba: <strong>40208725478</strong>, Contraseña de prueba: <strong>123456789</strong></Alert>
        <RHFTextField
          name="usuario"
          label="Usuario"
          inputRef={usuarioRef}
        />

        <RHFTextField
          name="contraseña"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to={PATH_AUTH.resetPassword}
          variant="body2"
          color="inherit"
          underline="always"
          style={{marginTop: 5}}
        >
          ¿Olvidaste la contraseña?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        style={{marginTop: 15}}
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        Ingresar
      </LoadingButton>
    </FormProvider>
    
  );
}


