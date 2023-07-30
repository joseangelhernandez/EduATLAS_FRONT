import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Typography, Link } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import DelegadoRegister from '../delegados/RegisterDelegado';

// ----------------------------------------------------------------------

export default function Delegado() {
  return (
    <LoginLayout title="Inscribe a tu niño, niña y/o adolescente en la escuela con EduATLAS">
      <Stack spacing={2} sx={{ mb: 5, position: 'relative', mt: 10 }}>
        <Typography variant="h4">Es totalmente gratis.</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> ¿Ya tienes tu cuenta? </Typography>

          <Link component={RouterLink} to={PATH_AUTH.login} variant="subtitle2">
            Ingresa aquí
          </Link>
        </Stack>
      </Stack>

      <DelegadoRegister />

      <Typography
        component="div"
        sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
      >
        {'Inscribiendo a este estudiante estás aceptando todos los términos y condiciones del MINERD '}
        <Link underline="always" color="text.primary" href='/' target='_Blank'>
           Términos y condiciones
        </Link>
        {' y '}
        <Link underline="always" color="text.primary">
          Política de privacidad
        </Link>
        .
      </Typography>

    </LoginLayout>
  );
}
