import { useRef, useState } from 'react';
import { m } from 'framer-motion';
import Lottie from 'lottie-react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Fab,
  Tab,
  Box,
  Grid,
  Tabs,
  Chip,
  Alert,
  Stack,
  Radio,
  Paper,
  Button,
  Rating,
  Slider,
  Switch,
  MenuItem,
  Checkbox,
  Container,
  TextField,
  Typography,
  AlertTitle,
  Pagination,
  CardHeader,
  IconButton,
  ToggleButton,
  CircularProgress,
  FormControlLabel,
  ToggleButtonGroup,
} from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgGradient } from '../../utils/cssStyles';
// routes
import { PATH_PAGE } from '../../routes/paths';
// _mock
import _mock from '../../_mock';
// components
import EducationGuy from '../../components/IconsAnimated/educationGuy.json'
import Label from '../../components/label';
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import MenuPopover from '../../components/menu-popover';
import BadgeStatus from '../../components/badge-status';
import { MotionViewport, varFade } from '../../components/animate';
import { CustomAvatar, CustomAvatarGroup } from '../../components/custom-avatar';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(20),
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.98),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  padding: theme.spacing(1.5, 0),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 0),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2.5),
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    paddingLeft: theme.spacing(5),
  },
}));

const StyledRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': {
    margin: theme.spacing(1.5),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(2.5),
    },
  },
}));

// ----------------------------------------------------------------------

export default function HomeHugePackElements() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Grid direction={{ xs: 'column', md: 'row-reverse' }} container spacing={5}>
          <Grid item xs={12} md={5}>
            <Description />
          </Grid>

          <Grid item xs={12} md={7}>
            <Content />
          </Grid>

        </Grid>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <StyledDescription>
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          REVOLUCIÓN EDUCATIVA DIGITAL
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ my: 3 }}>
          Una Solución Integral
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mb: 5,
            color: 'text.secondary',
          }}
        >
          Incorporamos lo esencial para la educación: aprendizaje personalizado, seguimiento académico, desarrollo y liderazgo. Todo en una plataforma.
          <br/><br/>
          EduATLAS, transversal e inclusiva, es para todos en la comunidad educativa: estudiantes, padres, educadores, directivos y funcionarios. Accesibilidad y diseño inclusivo la hacen perfecta para todo nivel de experiencia tecnológica.
          <br/><br/>
          Va más allá de ser una herramienta educativa: es un centro para el crecimiento y éxito de cada miembro de la comunidad educativa. ¡Descubre todo lo que EduATLAS tiene para ofrecer!
        </Typography>
      </m.div>

      {isDesktop }
    </StyledDescription>
  );
}

// ----------------------------------------------------------------------

function Content() {
  const educationGuyRef = useRef();

  const isMd = useResponsive('up', 'md');

  const isLg = useResponsive('up', 'lg');

  const [slider, setSlider] = useState(24);

  const [select, setSelect] = useState('Option 1');

  const [alignment, setAlignment] = useState('left');

  const [rating, setRating] = useState(2);

  const [currentTab, setCurrentTab] = useState('Angular');

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <StyledContent>
      <m.div
        variants={varFade().inUp}
      >
        <Lottie 
          animationData={EducationGuy} 
          lottieRef={educationGuyRef.current?.setSpeed(0.25)}
        />
      </m.div>
    </StyledContent>
  );
}
