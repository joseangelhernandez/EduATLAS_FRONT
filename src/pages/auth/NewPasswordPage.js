import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
import AuthNewPasswordForm from '../../sections/auth/AuthNewPasswordForm';
// assets
import { SentIcon } from '../../assets/icons';

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Cambiar contraseña | EduATLAS</title>
      </Helmet>

      <SentIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        ¡Código enviado satisfactoriamente!
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Te hemos enviado un código de 6-dígitos a tu correo electrónico.
        <br />
        Por favor introdúcelos para verificarlo con tu correo electrónico.
      </Typography>

      <AuthNewPasswordForm />

      <Typography variant="body2" sx={{ my: 3 }}>
        ¿Aún no recibes el código? &nbsp;
        <Link variant="subtitle2">Reenviar código</Link>
      </Typography>

      <Link
        component={RouterLink}
        to={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Regresar al login
      </Link>
    </>
  );
}
