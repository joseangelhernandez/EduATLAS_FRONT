import { Link as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Link, Stack, Divider, Container, Typography, IconButton } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgGradient } from '../../utils/cssStyles';
// routes
import { PATH_PAGE } from '../../routes/paths';
// _mock
import { _socials } from '../../_mock/arrays';
// components
import Logo from '../../components/logo-gobierno/logoEducacionOficial';
import LogoHome from '../../components/logoEducacion'
import LogoResponsive from '../../components/logoEducacionResponsive'
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'EduATLAS',
    children: [
      { name: 'Sobre EduATLAS', href: PATH_PAGE.comingSoon },
      { name: 'Contáctanos', href: PATH_PAGE.comingSoon },
      { name: 'Preguntas Frecuentes', href: PATH_PAGE.comingSoon },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Términos y condiciones', href: '#' },
      { name: 'Política de Privacidad', href: '#' },
    ],
  },
  {
    headline: 'Contacto',
    children: [
      { name: 'eduatlas@minerd.gob.do', href: '#' },
      { name: 'Av. Máximo Gómez No.2, Distrito Nacional, República Dominicana', href: '#' },
    ],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const theme = useTheme();

  const { pathname } = useLocation();

  const isHome = pathname === '/';

  const isDesktop = useResponsive('up', 'md');

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: theme.palette.primary.main,
          endColor: theme.palette.primary.dark,
        }),
        pb: { xs: 5, md: 0 },
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container sx={{pb: 5}}>
        {isHome && <LogoHome sx={{ mb: 1, mx: 'auto' }}/> }

        {!isHome && !isDesktop && <LogoResponsive sx={{ mb: 1, mx: 'auto' }}/>}
    
        <Typography variant="caption" color="white" component="div">
          © Todos los derechos reservados
          <br /> Creado por&nbsp;
          <strong>EduATLAS - Ministerio de Educación de la República Dominicana</strong>
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Divider />

      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
          sx={{
            textAlign: {
              xs: 'center',
              md: 'left',
            },
          }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
            {isDesktop ? <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} /> : <LogoResponsive sx={{ mb: 1, mx: 'auto' }}/>}
          </Grid>

          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              EduAtlas, potenciando el futuro de la educación. Versión de prototipo v1.0015.
              EduAtlas es una innovadora plataforma digital dedicada a transformar la educación dominicana. 
            </Typography>

            <Stack
              spacing={1}
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{
                mt: 5,
                mb: { xs: 5, md: 0 },
              }}
            >
              {_socials.map((social) => (
                <IconButton key={social.name}>
                  <Iconify icon={social.icon} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              justifyContent="space-between"
              direction={{ xs: 'column', md: 'row' }}
            >
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={RouterLink}
                      to={link.href}
                      color="inherit"
                      variant="body2"
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          variant="caption"
          component="div"
          sx={{
            mt: 10,
            pb: 5,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          © 2023. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );

  return isHome ? simpleFooter : mainFooter;
}
