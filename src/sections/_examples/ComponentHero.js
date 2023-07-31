import { m } from 'framer-motion';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Container, Typography, Stack } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgGradient } from '../../utils/cssStyles';
// components
import Image from '../../components/image';
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(10, 0),
}));

const StyledBg = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  position: 'absolute',
  transform: 'scaleX(-1)',
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
}));

// ----------------------------------------------------------------------

export default function ComponentHero() {
  const isDesktop = useResponsive('up', 'sm');

  return (
    <StyledRoot>
      <Container
        component={MotionContainer}
        sx={{
          display: { md: 'flex' },
          justifyContent: { md: 'space-between' },
        }}
      >
        <Stack spacing={3}>
          <m.div variants={varFade().inUp}>
            <Typography variant="h3" component="h1">
            Mapa Interactivo de Escuelas
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Typography sx={{ color: 'text.secondary' }}>
            Busca los cupos disponibles, características de las escuelas y más
              <br /> de forma sencilla y amigable.
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
              <br /> <strong>Nota: </strong>los campos de búsqueda y los checkbox especiales solo están para fines de maquetación en esta versión de EduATLAS.
            </Typography>
          </m.div>
        </Stack>

      </Container>

      <StyledBg />
    </StyledRoot>
  );
}
