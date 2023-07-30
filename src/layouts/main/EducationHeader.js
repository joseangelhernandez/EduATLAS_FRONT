import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
// @mui
import { useTheme, styled, alpha } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Link, Grid, IconButton, InputBase, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config-global';
// routes
import { PATH_DOCS, PATH_MINIMAL_ON_STORE } from '../../routes/paths';
// components
import Label from '../../components/label';
//
import navConfig from './nav/config-navigation';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import EscudoDominicano from '../../components/escudo-dominicano/EscudoDominicano';
import EducacionLogo from '../../components/logo-gobierno/logoEducacionOficial'
// ----------------------------------------------------------------------

export default function EducationHeader() {

  const isDesktop = useResponsive('up', 'md');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.mode === 'light' ? alpha(theme.palette.common.black, 0.10) : alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light' ? alpha(theme.palette.common.black, 0.15) : alpha(theme.palette.common.black, 0.10),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '22ch',
        '&:focus': {
          width: '22ch',
        },
      },
    },
  }));
  


  return (
    <Grid container sx={{ height: 1 }} sx={{ alignContent: 'center' }} mb={isDesktop ? 2.8 : 2}>
      <Grid item xs={isDesktop ? 12 : 6} md={isDesktop ? 6 : 3} sx={{pr: isDesktop ? 10 : 1, pt: isDesktop ? 1.5 : 2.5}}>
        <EducacionLogo style={{maxWidth: '300px'}}/>
      </Grid >
      <Grid item xs={isDesktop ? 4 : 2} md={isDesktop ? 3 : 0} mt={5.5} sx={{ pr: 1.5, textAlign: 'right' }}>
        <EscudoDominicano style={{ maxWidth: '50px' }}/>
      </Grid>
      <Grid item xs={isDesktop ? 8 : 4} md={isDesktop ? 3 : 0} mt={6}>
        <Search>
          <SearchIconWrapper>
            <Icon icon="fe:search" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Typography variant="body2" sx={{pt: 1.8, pl: 1}}>
          Siguenos | Facebook | Instagram | Youtube
        </Typography>
      </Grid>
    </Grid>
  );
}
