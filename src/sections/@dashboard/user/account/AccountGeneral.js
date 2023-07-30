import * as Yup from 'yup';
import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../../../auth/useAuthContext';
// utils
import { fData } from '../../../../utils/formatNumber';
import axios from '../../../../utils/axios'
// assets
import { countries } from '../../../../assets/data';
// components
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const UpdateUserSchema = Yup.object().shape({
    email: Yup.string().required('Correo electrónico es obligatorio.').email('Debe ser un correo válido.'),
  });

  const defaultValues = {
    nombre: user?.nombre || '',
    email: user?.email || '',
    imageSrc: user?.imageSrc || null,
    apellido: user?.apellido || '',
    cargo: user?.tipo_Mesa || '',
    comision: user?.comision || '',
    role: user?.roleId || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const correo = String(data.email.toUpperCase());

      await axios.post(`/api/USUARIOS/cambioEmail/${user.usuario}`, JSON.stringify(correo), {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      enqueueSnackbar('Actualización exitosa');

    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('imageSrc', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 5, px: 3, textAlign: 'center' }}>
            <Typography variant="h4" style={{textAlign: 'center', marginBottom: 15}}>Foto</Typography>
            <RHFUploadAvatar
              name="imageSrc"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="nombre" label="Nombre" disabled/>

              <RHFTextField name="apellido" label="Apellido" disabled/>

              <RHFTextField name="email" label="Correo electrónico" />

              <RHFTextField name="cargo" label="Cargo" disabled/>

              <RHFTextField name="comision" label="Comisión" disabled/>

              <RHFTextField name="role" label="Rol asignado" disabled/>
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Guardar cambios
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
