import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// _mock_
import { _analyticPost, _analyticOrderTimeline, _analyticTraffic } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  AnalyticsTasks,
  AnalyticsNewsUpdate,
  AnalyticsOrderTimeline,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
  AnalyticsTrafficBySite,
  AnalyticsWidgetSummary,
  AnalyticsCurrentSubject,
  AnalyticsConversionRates,
} from '../../sections/@dashboard/general/analytics';

// ----------------------------------------------------------------------

export default function GeneralAnalyticsPage() {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Análisis de Educación | EduATLAS</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Principales indicadores de educación
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Matrícula Total"
              total={1_000_000} // Reemplaza con la matrícula total
              icon="ic:baseline-people"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Inscripciones Nuevas"
              total={200_000} // Reemplaza con las inscripciones nuevas
              color="info"
              icon="ic:baseline-person-add"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Promoción de Estudiantes"
              total={800_000} // Reemplaza con la cantidad de estudiantes promovidos
              color="warning"
              icon="ic:baseline-school"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Reportes de Ausentismo"
              total={20_000} // Reemplaza con los reportes de ausentismo
              color="error"
              icon="ic:baseline-report-problem"
            />
          </Grid>

          <Grid item xs={12} md={10} lg={8}>
            <AnalyticsWebsiteVisits
              title="Evaluación de Competencias"
              subheader="Comparación año tras año"
              chart={{
                labels: [
                  '01/01/2023',
                  '02/01/2023',
                  '03/01/2023',
                  '04/01/2023',
                  '05/01/2023',
                  '06/01/2023',
                  '07/01/2023',
                  '08/01/2023',
                  '09/01/2023',
                  '10/01/2023',
                  '11/01/2023',
                ],
                series: [
                  {
                    name: 'STEM',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  {
                    name: 'Argumentación',
                    type: 'area',
                    fill: 'gradient',
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: 'Redacción',
                    type: 'line',
                    fill: 'solid',
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentSubject
              title="Asignaturas con Mayor Aceptación"
              chart={{
                categories: ['Matemáticas', 'Física', 'Química', 'Español', 'Historia', 'Ciencias Sociales'],
                series: [
                  { name: 'Promedio Calificaciones 2022', data: [85, 65, 75, 50, 80, 60] },
                  { name: 'Promedio Calificaciones 2023', data: [25, 35, 55, 45, 35, 70] },
                  { name: 'Promedio General', data: [70, 60, 65, 55, 75, 80] },
                ],
              }}
            />

          </Grid>

          <Grid item xs={12} md={12}>
            <AnalyticsCurrentVisits
              title="Calidad de la Educación por Regional en base al promedio general de estudiantes"
              chart={{
                series: [
                  { label: '01 - BARAHONA', value: 87 },
                  { label: '02 - SAN JUAN DE LA MAGUANA', value: 90 },
                  { label: '03 - AZUA', value: 92 },
                  { label: '04 - SAN CRISTOBAL', value: 83 },
                  { label: '05 - SAN PEDRO DE MACORIS', value: 85 },
                  { label: '06 - LA VEGA', value: 88 },
                  { label: '07 - SAN FRANCISCO DE MACORIS', value: 91 },
                  { label: '08 - SANTIAGO', value: 89 },
                  { label: '09 - MAO', value: 84 },
                  { label: '10 - SANTO DOMINGO', value: 93 },
                  { label: '11 - PUERTO PLATA', value: 85 },
                  { label: '12 - HIGUEY', value: 87 },
                  { label: '13 - MONTE CRISTI', value: 88 },
                  { label: '14 - NAGUA', value: 86 },
                  { label: '15 - SANTO DOMINGO', value: 94 },
                  { label: '16 - COTUI', value: 90 },
                  { label: '17 - MONTE PLATA', value: 91 },
                  { label: '18 - BAHORUCO', value: 88 },
                ],
                colors: [
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                ],
              }}
            />

          </Grid>

          <Grid item  xs={12} md={12}>
            <AnalyticsConversionRates
              title="Calidad de Gestión por Regional Educativa"
              subheader="Basado en reportes"
              chart={{
                series: [
                  { label: '01 - BARAHONA', value: 400 },
                  { label: '02 - SAN JUAN DE LA MAGUANA', value: 430 },
                  { label: '03 - AZUA', value: 448 },
                  { label: '04 - SAN CRISTOBAL', value: 470 },
                  { label: '05 - SAN PEDRO DE MACORIS', value: 540 },
                  { label: '06 - LA VEGA', value: 580 },
                  { label: '07 - SAN FRANCISCO DE MACORIS', value: 690 },
                  { label: '08 - SANTIAGO', value: 700 },
                  { label: '09 - MAO', value: 800 },
                  { label: '10 - SANTO DOMINGO', value: 850 },
                  { label: '11 - PUERTO PLATA', value: 900 },
                  { label: '12 - HIGUEY', value: 910 },
                  { label: '13 - MONTE CRISTI', value: 930 },
                  { label: '14 - NAGUA', value: 950 },
                  { label: '15 - SANTO DOMINGO', value: 980 },
                  { label: '16 - COTUI', value: 1000 },
                  { label: '17 - MONTE PLATA', value: 1050 },
                  { label: '18 - BAHORUCO', value: 1100 },
                ],
              }}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
