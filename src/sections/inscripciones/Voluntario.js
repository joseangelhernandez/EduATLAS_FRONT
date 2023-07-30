import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Typography, Link } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import RegisterVoluntario from '../voluntarios/RegisterVoluntario'

// ----------------------------------------------------------------------

export default function Voluntario() {
  return (
    <LoginLayout title="Participa como voluntario del PLERD">
      <Stack spacing={2} sx={{ mb: 5, mt: 10, position: 'relative' }}>
        <Typography variant="h4">¿Ya has sido participante del PLERD? <br/> Llévalo a la práctica y cambia la vida de la juventud dominicana. </Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> ¿Ya tienes tu cuenta? </Typography>

          <Link component={RouterLink} to={PATH_AUTH.login} variant="subtitle2">
            Ingresa aquí
          </Link>
        </Stack>
      </Stack>

      <RegisterVoluntario />

      <Typography
        component="div"
        sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
      >
        {'Registrándote como voluntario estás aceptando todos los términos y condiciones del PLERD '}
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
