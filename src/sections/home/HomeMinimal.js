import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Stack } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: ' /assets/icons/home/ic_trayactoriaAcad.svg',
    title: 'Trayectoria Académica Integrada',
    description: 'EduATLAS proporciona una plataforma para gestionar y analizar el recorrido académico de cada estudiante, potenciando su futuro y conectándolo con oportunidades de desarrollo.',
  },
  {
    icon: ' /assets/icons/home/ic_calidadEdu.svg',
    title: 'Educación de Calidad e Inclusiva',
    description: 'Nuestra misión es garantizar una educación de calidad, igualitaria e inclusiva, al brindar acceso a datos en tiempo real y facilitar la toma de decisiones basadas en evidencia.',
  },
  {
    icon: ' /assets/icons/home/ic_transformacionEdu.svg',
    title: 'Transformación Educativa',
    description: 'Con EduATLAS, transformamos la educación al conectar a la comunidad educativa y proporcionar data de calidad en tiempo real, impulsando la innovación educativa.',
  },
];

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  textAlign: 'center',
  padding: theme.spacing(10, 5),
  [theme.breakpoints.up('md')]: {
    boxShadow: 'none',
  },
}));

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 10 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
              MINISTERIO DE EDUCACIÓN DE LA REPÚBLICA DOMINICANA
            </Typography>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Typography variant="h2">
              EduATLAS <br /> en pocas palabras
            </Typography>
          </m.div>
        </Stack>

        <Box
          gap={{ xs: 3, lg: 10 }}
          display="grid"
          alignItems="center"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {CARDS.map((card, index) => (
            <m.div variants={varFade().inUp} key={card.title}>
              <StyledCard
                sx={{
                  ...(index === 1 && {
                    boxShadow: (theme) => ({
                      md: `-40px 40px 80px ${
                        theme.palette.mode === 'light'
                          ? alpha(theme.palette.grey[500], 0.16)
                          : alpha(theme.palette.common.black, 0.4)
                      }`,
                    }),
                  }),
                }}
              >
                <Image
                  src={card.icon}
                  alt={card.title}
                  sx={{ mx: 'auto', width: 100, height: 'auto' }}
                />

                <Typography variant="h5" sx={{ mt: 8, mb: 2 }}>
                  {card.title}
                </Typography>

                <Typography sx={{ color: 'text.secondary' }}>{card.description}</Typography>
              </StyledCard>
            </m.div>
          ))}
        </Box>
      </Container>
    </StyledRoot>
  );
}
