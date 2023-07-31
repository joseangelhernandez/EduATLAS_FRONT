import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Link, Grid } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config-global';
// routes
import { PATH_DOCS, PATH_MINIMAL_ON_STORE, PATH_AUTH } from '../../routes/paths';
// components
import Logo from '../../components/fullLogo';
import Label from '../../components/label';
//
import navConfig from './nav/config-navigation';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import EducationHeader from './EducationHeader';

// ----------------------------------------------------------------------

export default function Header() {
  const { pathname } = useLocation();

  const isHome = pathname === '/';

  const [scrollOffset, setScrollOffset] = useState(0);
  const [scrollOffsetReducer, setScrollOffsetReducer] = useState(0);
  const carouselRef = useRef(null);

  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  useEffect(() => {
    let requestId;

    const handleScroll = () => {
      requestId = window.requestAnimationFrame(() => {
        const newScrollOffset = window.pageYOffset / 50;

        if (newScrollOffset < 20) {
          setScrollOffset(newScrollOffset);
        } else if (newScrollOffset >= 20 && scrollOffset < 20) {
          setScrollOffset(20);
        }

        // Limitar el valor máximo del scrollOffset
        const maxScrollOffset = 20; // Establece el valor máximo deseado
        if (newScrollOffset > maxScrollOffset) {
          setScrollOffset(maxScrollOffset);
        }

      });
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(requestId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollOffset, isOffset]);
  

  return (
    <AppBar item ref={carouselRef} color="transparent" 
      sx={{ boxShadow: 0, 
      ...(!isHome && {position: 'absolute'}),
      ...(isDesktop ? {} : { zIndex: 2 }),
      ...(isHome && (isOffset ? { mt: 20 - scrollOffset } : { mt: 20 })),
       }}
      >
      {!isHome && 
          <Toolbar
            disableGutters
            sx={{
              zIndex: 1,
              height: {
                ...bgBlur({ color: theme.palette.background.default }),
                md: 170,
              },
              transition: theme.transitions.create(['height', 'background-color'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
            }}
          >
            <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
              <EducationHeader/>
            </Container>

          </Toolbar>}
      <Toolbar
        sx={{
          height: {
            ...bgBlur({ color: theme.palette.background.default }),
            xs: HEADER.H_MOBILE,
            md: 70,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            height: {
              ...bgBlur({ color: theme.palette.background.default }),
            },
          }),
        }}
      >
        
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Logo />

          <Box pl={1}><Label color="success"> v1.0015 </Label></Box>
          
          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <NavDesktop isOffset={isOffset} data={navConfig} offset={!isHome ? 1.5 : scrollOffset}/>}

          {isDesktop && <Button variant="contained" target="_blank" rel="noopener" href={PATH_AUTH.login}>
            EduATLAS APP
           </Button>
          }

          {!isDesktop && <NavMobile isOffset={isOffset} data={navConfig} />}
        </Container>
      </Toolbar>
    </AppBar>
  );
}

// ----------------------------------------------------------------------

Shadow.propTypes = {
  sx: PropTypes.object,
};

function Shadow({ sx, ...other }) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
