import { useRef } from 'react';
import { m } from 'framer-motion';
import Lottie from 'lottie-react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Container, Typography, Stack } from '@mui/material';
// paths
import { PATH_PAGE } from '../../routes/paths';
// utils
import { textGradient, bgGradient, bgBlur } from '../../utils/cssStyles';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';
import CuposAnimationMap from '../../components/IconsAnimated/cuposAnimation.json'

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 0),
  },
}));



// ----------------------------------------------------------------------

export default function HomeCleanInterfaces() {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Description />
        <Content />
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  return (
    <Stack
      spacing={3}
      sx={{
        mb: 5,
        zIndex: { md: 99 },
        position: { md: 'relative' },
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          Organización e inclusión
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          variant="h3"
          sx={{
            textShadow: (theme) =>
              theme.palette.mode === 'light'
                ? 'unset'
                : `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
          }}
        >
          Busca las <a rel="noreferrer" target="_blank" href={PATH_PAGE.about}>escuelas </a> 
           con cupos disponibles, incluso tomando en cuenta aquellas para estudiantes con capacidades especiales
        </Typography>
      </m.div>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Content() {
  const cuposAnimationMapRef = useRef();
  return (
    <Box sx={{ position: 'relative'}}>
      <Lottie animationData={CuposAnimationMap} lottieRef={cuposAnimationMapRef} onComplete={()=>cuposAnimationMapRef.current?.goToAndPlay(404, true)} loop={false}/>
    </Box>
  );
}

