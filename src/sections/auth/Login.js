import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box, SvgIcon, Divider, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// routes
import { PATH_AUTH, PATH_INSCRIPCIONES } from '../../routes/paths';
// icons
import SvgColor from '../../components/svg-color';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';

// ----------------------------------------------------------------------


export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mt: 5, mb: 5, position: 'relative' }}>
        <Typography variant="h4">Ingresar EduATLAS APP</Typography>

        <Grid container>
          <Grid item xs={8}>
            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2">Sistema de Gestión y Seguimiento de la Educación Dominicana</Typography>
            </Stack>
          </Grid>
          
          <Grid item xs={4}>
            <Tooltip title='EduATLAS' placement="left">
              <SvgIcon id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                sx={{ width: 70, 
                      height: 70, 
                      position: 'absolute', 
                      right: 0, 
                      bottom: 5,
                      color: (theme) => (theme.palette.mode === 'light' ? '#083c74' : 'common.white')
                }}>
                <defs>
                  <style>{`.bbb{fill:#f9ac06;}.ccc{fill:#5dd9d7;}.ddd{fill:#f3533d;}.eee{fill:#3145ff;}`}
                  </style>
                </defs>
                <rect className="bbb" x="72.33391" y="173.17239" width="94.48735" height="294.89814"/>
                <rect className="ddd" x="208.75633" y="-94.11136" width="94.48735" height="370.56899" transform="translate(347.17314 -164.82686) rotate(90)"/>
                <rect className="ccc" x="209.56553" y="173.17239" width="94.48735" height="294.89814"/>
                <rect className="eee" x="346.79715" y="173.17239" width="94.48735" height="294.89814"/>
               
              </SvgIcon>
            </Tooltip>
            
          </Grid>
        </Grid>
      </Stack>

      <AuthLoginForm />
      <>
        <Divider
          sx={{
            my: 2.5,
            typography: 'overline',
            color: 'text.disabled',
            '&::before, ::after': {
              borderTopStyle: 'dashed',
            },
          }}
        >
          TAMBIÉN PUEDES
        </Divider>

        <Stack direction="row" spacing={2}>
          <Button 
            variant="contained" 
            size="large" 
            color="primary" 
            href={PATH_INSCRIPCIONES.delegado}
            startIcon={<SvgColor src="/assets/icons/navbar/ic_addStudent.svg" sx={{ width: 30, height: 30 }} />} 
            fullWidth
          >
            Inscribir estudiante
          </Button>
        </Stack>
      </>

    </LoginLayout>
  );
}
