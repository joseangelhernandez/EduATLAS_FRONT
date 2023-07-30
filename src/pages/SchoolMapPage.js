import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { 
  Container, 
  Typography, 
  Stack, 
  Link, 
  Box, 
  Divider, 
  Card, 
  CardContent,
  IconButton, 
  InputAdornment,
  Autocomplete,
  TextField,
  Checkbox,
  FormControlLabel
} from '@mui/material';
// components
import Iconify from '../components/iconify';
// config
import { MAP_API } from '../config-global';
// mock up
import { countries as COUNTRIES } from '../_mock/map/countries';
// sections
import { ComponentHero, ComponentCard } from '../sections/_examples';
import { foundation, mui, extra } from '../sections/_examples/config-navigation';
import MapEscuelas from '../sections/_examples/extra/map/Escuelas';
import ControlPanel from '../sections/_examples/extra/map/Escuelas/ControlPanel'



// ----------------------------------------------------------------------

const THEMES = {
  Calles: 'mapbox://styles/mapbox/streets-v11',
  Establecimientos: 'mapbox://styles/mapbox/outdoors-v11',
  Claro: 'mapbox://styles/mapbox/light-v10',
  Oscuro: 'mapbox://styles/mapbox/dark-v10',
  Satelital: 'mapbox://styles/mapbox/satellite-v9',
  SatelitalCalles: 'mapbox://styles/mapbox/satellite-streets-v11',
};

const baseSettings = {
  mapboxAccessToken: 'pk.eyJ1Ijoiam9zZTAzMDgiLCJhIjoiY2xrb3liempoMTNjMzNrcGNtZmNnd2o4dyJ9.zIgdIXFTGMD5uUG5DseVvQ',
  minZoom: 1,
};

const StyledMapContainer = styled('div')(({ theme }) => ({
  zIndex: 0,
  height: 780,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));


export default function ComponentsOverviewPage() {
  const [selectTheme, setSelectTheme] = useState('Establecimientos');

  const handleChangeTheme = useCallback((value) => setSelectTheme(value), []);


  const [Regionales, setRegionales] = useState([{value: 0, label: 'Cargando...'}]);
  const [Distritos, setDistritos] = useState([{value: 0, label: 'Cargando...'}]);
  const [Centros, setCentros] = useState([{value: 0, label: 'Cargando...'}]);

  const [HabDistrito, setHabDistrito] = useState(false);
  const [HabCentro, setHabCentro] = useState(false);

  const [inputValueRegional, setInputValueRegional] = useState('');
  const [inputValueDistrito, setInputValueDistrito] = useState('');
  const [inputValueCentro, setInputValueCentro] = useState('');

  const [regionalEdu, setReginalEdu] = useState(null);
  const [DistritoEdu, setDistritoEdu] = useState(null);
  const [CentroEdu, setCentroEdu] = useState(null);

  async function handleDataRegionales() {
   setRegionales('');
  };

  async function handleDataDistritos(regional) {
    if(regional !== null){
      setDistritos('');
    };
  };

  async function handleDataCentros(distrito) {
    setCentros('');
  };

  const handleRegional = (newValue) => {
    setReginalEdu(newValue);
    if(newValue !== regionalEdu) {
      setDistritoEdu(null);
      setCentroEdu(null);
      setHabCentro(false);
    };
    if(newValue !== null){
      // setValue('regional', newValue.value, { shouldValidate: true });
      handleDataDistritos(newValue.value);
      setHabDistrito(true);
    }else {
      setHabDistrito(false);
      setHabCentro(false);
      setDistritoEdu(null);
      setCentroEdu(null);
    };
  }

  const handleDistrito = (newValue) => {
    setDistritoEdu(newValue);
    if(newValue !== DistritoEdu) setCentroEdu(null);
    if(newValue !== null){
      // setValue('distrito', newValue.value, { shouldValidate: true });
      handleDataCentros(newValue.value);
      setHabCentro(true);
    }else {
      setHabCentro(false);
      setCentroEdu(null);
    };
  }

  const handleCentros = (newValue) => {
    setCentroEdu(newValue);
    // if(newValue !== null) setValue('centroEducativo', newValue.value, { shouldValidate: true });
  }

  const handleInputValueRegional = (newInputValue) =>{
    setInputValueRegional(newInputValue);
  }

  const handleInputValueDistrito = (newInputValue) => {
    setInputValueDistrito(newInputValue);
  }

  const handleInputValueCentro = (newInputValue) => {
    setInputValueCentro(newInputValue);
  }

  useEffect(()=>console.log(baseSettings.mapboxAccessToken),[])
  return (
    <>
      <Helmet>
        <title> Escuelas | EduATLAS</title>
      </Helmet>

      <ComponentHero />

      
      <Container sx={{ pt: 10 }}>
        <Stack spacing={1} pb={2.5}>
          <Typography variant="h5">Campos de búsqueda</Typography>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
          <Autocomplete
            fullWidth
            value={regionalEdu}
            options={Regionales}
            onChange={(event, newValue) => {
              handleRegional(newValue);
            }}
            inputValue={inputValueRegional}
            onInputChange={(event, newInputValue) => {
              handleInputValueRegional(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} name="regional" label="Regional educativa" />}
          />
          <Autocomplete
            fullWidth
            disabled={HabDistrito === false}
            value={DistritoEdu}
            options={Distritos}
            onChange={(event, newValue) => {
              handleDistrito(newValue);
            }}
            inputValue={inputValueDistrito}
            onInputChange={(event, newInputValue) => {
              handleInputValueDistrito(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} name="distrito" label="Distrito educativo" />}
          />
          <Autocomplete
            fullWidth
            disabled={HabCentro === false}
            value={CentroEdu}
            options={Centros}
            onChange={(event, newValue) => {
              handleCentros(newValue);
            }}
            inputValue={inputValueCentro}
            onInputChange={(event, newInputValue) => {
              handleInputValueCentro(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} name="centroEducativo" label="Centro educativo" />}
          />
        </Stack>
        <Divider sx={{ borderStyle: 'dashed', my: 5 }} />
        <Stack spacing={1} pb={2.5}>
          <Typography variant="h5">Filtros especiales</Typography>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} >
          <FormControlLabel
            control={
              <Checkbox
                color="info"
                size="medium"
                icon={<Iconify icon="ph:wheelchair-bold"/>}
                checkedIcon={<Iconify icon="ph:wheelchair-bold" />}
                onChange={(e)=>console.log(e.target.checked)}
              />
            }
            label="Capacidades especiales"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                size="medium"
                icon={<Iconify icon="fa:american-sign-language-interpreting" />}
                checkedIcon={<Iconify icon="fa:american-sign-language-interpreting" />}
                onChange={(e)=>console.log(e.target.checked)}
              />
            }
            label="Sordos/Mudos"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="error"
                size="medium"
                icon={<Iconify icon="ic:round-blind" />}
                checkedIcon={<Iconify icon="ic:round-blind" />}
                onChange={(e)=>console.log(e.target.checked)}
              />
            }
            label="Ciegos"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="warning"
                size="medium"
                onChange={(e)=>console.log(e.target.checked)}
              />
            }
            label="Cupos Disponibles"
          />
          
        </Stack>
        <ControlPanel themes={THEMES} selectTheme={selectTheme} onChangeTheme={handleChangeTheme} />
        <Stack spacing={3} pb={10} pt={5}>
          <Card>
            <CardContent>
              <StyledMapContainer>
                <MapEscuelas {...baseSettings} themes={THEMES} selectTheme={selectTheme} data={COUNTRIES}/>
              </StyledMapContainer>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
