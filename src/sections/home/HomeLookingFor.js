import { useRef } from 'react';
import { m } from 'framer-motion';
import Lottie from 'lottie-react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography, Grid, Stack } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_INSCRIPCIONES } from '../../routes/paths';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import { MotionViewport, varFade } from '../../components/animate';
// Animations
import EduAtlasAnimation from '../../components/IconsAnimated/eduAtlasFinal.json'

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

// ----------------------------------------------------------------------

export default function HomeLookingFor() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 5, md: 0 }}
        >
          <Grid item xs={12} md={4}>
            <Description/>
          </Grid>

          <Grid item xs={12} md={7}>
            <Content />
          </Grid>

          {!isDesktop && (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              {VisitButton}
            </Grid>
          )}
        </Grid>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <Stack
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
      }}
    >
      <m.div variants={varFade().inDown}>
        <Typography variant="overline" component="div" sx={{ color: 'text.disabled' }}>
          Una herramienta para todos(as)
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography
          variant="h2"
          sx={{
            mt: 3,
            mb: { md: 5 },
          }}
        >
          Inscribe a tu niña o niño ahora
        </Typography>
      </m.div>

      {isDesktop && <m.div variants={varFade().inDown}> {VisitButton} </m.div>}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Content() {
  const eduAtlasRef = useRef();
  return (
    <Box component={m.div} variants={varFade().inUp}>
      <Lottie animationData={EduAtlasAnimation} lottieRef={eduAtlasRef}
        onEnterFrame={(e)=>{ 
          eduAtlasRef.current?.setSpeed(0.5)
        }}
      />
    </Box>
  );
}

const VisitButton = (
  <Button
    color="inherit"
    size="large"
    variant="outlined"
    target="_blank"
    rel="noopener"
    href={PATH_INSCRIPCIONES.delegado}
    endIcon={<Iconify icon="ic:round-arrow-right-alt" />}
  >
    Inscribir estdudiante a la escuela
  </Button>
);
