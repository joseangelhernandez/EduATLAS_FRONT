import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
import {
  _appFeatured,
  _appAuthors,
  _appInstalled,
  _appRelated,
  _appInvoices,
} from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets/illustrations';

// ----------------------------------------------------------------------

export default function GeneralAppPage() {
  const { user } = useAuthContext();

  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Inicio | EduATLAS</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome
              title={`Hola, \n ${user?.nombre} \n (TODOS LOS DATOS Y ESTADÍSTICAS MOSTRADAS SOLO SON PARA FINES DE PROTOTIPADO)`} 
              description="¡Bienvenido de nuevo a EduAtlas! Estamos encantados de verte de nuevo. Prepárate para descubrir nuevas oportunidades de aprendizaje y crecimiento."
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppFeatured list={_appFeatured} />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total de usuarios de estudiantes"
              percent={2.6}
              total={18765}
              chart={{
                colors: [theme.palette.primary.main],
                series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total de estudiantes de alto rendimiento"
              percent={0.2}
              total={4876}
              chart={{
                colors: [theme.palette.info.main],
                series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Predicción de la deserción anual"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.palette.warning.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload
              title="Participantes de programas académicos"
              chart={{
                colors: [
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                ],
                series: [
                  { label: 'Deportes y artes', value: 12244 },
                  { label: 'Debates', value: 53345 },
                  { label: 'Olimpíadas', value: 44313 },
                  { label: 'Modelo de Naciones Unidas', value: 78343 },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled
              title= "Estudiantes Promovidos (en miles)"
              subheader= "(+43%) que el año pasado"
              chart={{
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'],
                series: [
                  {
                    year: '2019',
                    data: [
                      { name: 'Educación Pre universitaria', data: [1.0, 4.1, 3.5, 5.1, 4.9, 6.2, 6.9, 9.1, 14.8] },
                      { name: 'Educación Básica e inicial', data: [1.0, 3.4, 1.3, 5.6, 7.7, 8.8, 9.9, 7.7, 4.5] },
                    ],
                  },
                  {
                    year: '2020',
                    data: [
                      { name: 'Educación Pre universitaria', data: [14.8, 9.1, 6.9, 6.2, 4.9, 5.1, 3.5, 4.1, 1.0] },
                      { name: 'Educación Básica e inicial', data: [4.5, 7.7, 9.9, 8.8, 7.7, 5.6, 1.3, 3.4, 1.0] },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors title="Top Estudiantes" list={_appAuthors} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget
                title="Total de docentes activos"
                total={38566}
                icon="eva:person-fill"
                chart={{
                  series: 48,
                }}
              />

              <AppWidget
                title="Total de reportes solucionados"
                total={55566}
                icon="eva:email-fill"
                color="info"
                chart={{
                  series: 75,
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
