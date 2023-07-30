import * as Yup from 'yup';
import { useState, useEffect } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card, InputAdornment, Tooltip, IconButton} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../../../auth/useAuthContext';
// utils
import axios from '../../../../utils/axios';
// components
import Iconify from '../../../../components/iconify';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRep, setShowPasswordRep] = useState(false);

  const [validarPass, setValidarPass] = useState(null);

  const [habilitarCampo, setHabilitarCampo] = useState(false);


  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Antigua contraseña es requerida'),
    newPassword: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('Nueva contraseña es requerida'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const contraseña = String(data.confirmNewPassword);

      await axios.post(`/api/USUARIOS/cambioContra/${user.usuario}`, JSON.stringify(contraseña), {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      reset();
      enqueueSnackbar('Actualización exitosa');

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const subscription = watch('oldPassword');
    if(subscription?.length > 0){
      if(subscription === user?.contraseña){
        setValidarPass(true);
        setHabilitarCampo(true);
      }else{
        setValidarPass(false);
        setHabilitarCampo(false);
      }
    }else{
      setValidarPass(null);
      setHabilitarCampo(false);
      setValue('newPassword', '', { shouldValidate: false });
      setValue('confirmNewPassword', '', { shouldValidate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('oldPassword')?.length]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Stack spacing={3} alignItems="flex-end" sx={{ p: 3 }}>
          <RHFTextField 
            name="oldPassword" 
            type={showPasswordOld ? 'text' : 'password'}
            label="Antigua contraseña" 
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {validarPass 
                    ? <>
                        <Tooltip title='Contraseña correcta'>
                          <Iconify icon='material-symbols:check-circle-rounded' style={{ marginRight: 1, width: 25, height: 'auto', color: 'green'}}/>
                        </Tooltip>
                      </>
                    : validarPass === false && 
                      <>
                        <Tooltip title='Contraseña Incorrecta'>
                          <Iconify icon='material-symbols:cancel-rounded' style={{ marginRight: 1, width: 25, height: 'auto', color: 'red'}}/>
                        </Tooltip>
                      </>
                  }
                  <IconButton onClick={() => setShowPasswordOld(!showPasswordOld)} edge="end">
                    <Iconify icon={showPasswordOld ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}

            helperText={
              <Stack component="span" direction="row" alignItems="center" color="warning">
                <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} color="warning"/> Debe primero llenar este campo para validar su antigua contraseña.
              </Stack>
            }
          />

          <RHFTextField
            name="newPassword"
            type={showPassword ? 'text' : 'password'}
            label="Nueva contraseña"
            disabled={habilitarCampo === false}
            helperText={
              <Stack component="span" direction="row" alignItems="center">
                <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Contraseña debe tener +8 caracteres.
              </Stack>
            }
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

          <RHFTextField 
            name="confirmNewPassword" 
            type={showPasswordRep ? 'text' : 'password'}
            label="Confirmar nueva contraseña" 
            disabled={habilitarCampo === false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPasswordRep(!showPasswordRep)} edge="end">
                    <Iconify icon={showPasswordRep ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Guardar cambios
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
