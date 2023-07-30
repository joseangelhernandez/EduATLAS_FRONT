import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import isWeekend from 'date-fns/isWeekend';
import dayjs from 'dayjs';
import 'dayjs/locale/es-do';
import { useNavigate } from 'react-router-dom';
// form
import moment from 'moment';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { 
  Box, 
  Card, 
  Grid, 
  Stack, 
  Switch, 
  Typography, 
  FormControlLabel, 
  Autocomplete, 
  TextField,
  MenuItem,
  Divider,
  InputAdornment,
  Tooltip,
} from '@mui/material';
// masks
import Inputmask from 'inputmask';
import {
  DatePicker
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// generar nombres para archivo
import { v4 as uuidv4 } from 'uuid';
// utils
import axios from '../../../utils/axios';
import { fData } from '../../../utils/formatNumber';
// icons
import Iconify from '../../../components/iconify';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { countries } from '../../../assets/data';
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------

EstudianteNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentStudent: PropTypes.object,
};

async function fetchDataRegionales() {
  const response = await axios.get('/api/REGIONALES_EDUCATIVAS');
  const Regionales_List = response.data;
  return Regionales_List
};

async function fetchDataDistritos(regional) {
  const response = await axios.get(`/api/DISTRITOS_EDUCATIVOS/${regional}`);
  const Distritos_List = response.data;
  return Distritos_List
};

async function fetchDataCentros(distrito) {
  const response = await axios.get(`/api/CENTROS_EDUCATIVOS/${distrito}`);
  const Centros_List = response.data;
  return Centros_List
};

const sexos = [{value: 'M', label: 'Masculino'}, {value: 'F', label: 'Femenino'}];

const gradosAcad = [
  {value: 'PRIMERO DE SECUNDARIA', label: 'Primero de Secundaria'},
  {value: 'SEGUNDO DE SECUNDARIA', label: 'Segundo de Secundaria'},
  {value: 'TERCERO DE SECUNDARIA', label: 'Tercero de Secundaria'},
  {value: 'CUARTO DE SECUNDARIA', label: 'Cuarto de Secundaria'},
  {value: 'QUINTO DE SECUNDARIA', label: 'Quinto de Secundaria'},
  {value: 'SEXTO DE SECUNDARIA', label: 'Sexto de Secundaria'},
  {value: 'UNIVERSITARIO', label: 'Universitario'}
];

export default function EstudianteNewEditForm({ isEdit = false, currentStudent }) {
  const [modifExitosa, setModifExitosa] = useState(false);
  const telefonoRef = useRef(null);
  const [inputRef, setInputRef] = useState();

  const [ValidezEstudiante, setValidezEstudiante] = useState(null);

  const [Regionales, setRegionales] = useState([{value: 0, label: 'Cargando...'}]);
  const [Distritos, setDistritos] = useState([{value: 0, label: 'Cargando...'}]);
  const [Centros, setCentros] = useState([{value: 0, label: 'Cargando...'}]);

  const [fecha, setFecha] = useState(null);

  const [foto, setFileFoto] = useState(null);
  const [nombreImage, setNombreImagen] = useState(null);

  // eslint-disable-next-line
  const [habilitarCampo, setHabilitarCampo] = useState(!currentStudent?.id ? false : true);

  const [HabDistrito, setHabDistrito] = useState(false);
  const [HabCentro, setHabCentro] = useState(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  async function handleDataRegionales() {
    const response = await fetchDataRegionales();
    if(currentStudent?.regional !== undefined){
      setReginalEdu(response.find((regional) => regional.value === currentStudent.regional));
      handleDataDistritos(currentStudent?.regional);
      handleDataCentros(currentStudent?.distrito);
      setHabDistrito(true);
      setHabCentro(true);
    };
    setRegionales(response);
  };

  async function handleDataDistritos(regional) {
    const response = await fetchDataDistritos(regional);
    if(currentStudent?.distrito !== undefined){
      setDistritoEdu(response.find((distrito) => distrito.value === currentStudent.distrito));
    };
    if(regional !== null){
      setDistritos(response);
    };
  };

  async function handleDataCentros(distrito) {
    const response = await fetchDataCentros(distrito);
    if(currentStudent?.centro_educativo !== undefined){
      setCentroEdu(response.find((centro) => centro.value === currentStudent.centro_educativo));
    };
    setCentros(response);
  };

  const [inputValueRegional, setInputValueRegional] = useState('');
  const [inputValueDistrito, setInputValueDistrito] = useState('');
  const [inputValueCentro, setInputValueCentro] = useState('');

  const [regionalEdu, setReginalEdu] = useState(null);
  const [DistritoEdu, setDistritoEdu] = useState(null);
  const [CentroEdu, setCentroEdu] = useState(null);


  const NewEstudianteSchema = Yup.object().shape({
    nombres: Yup.string().required('Campo nombres es requerido.'),
    apellidos: Yup.string().required('Campo apellidos es requerido.'),
    fecha_nacimiento: Yup.string().required('Campo fecha de nacimiento es requerido.').nullable(''),
    correo: Yup.string().required('Campo correo es requerido.').email('Debe colocar un correo válido.'),
    telefono: Yup.string().required('Campo teléfono es requerido.'),
    sexo: Yup.string().required('Campo sexo es requerido.'),
    grado: Yup.string().required('Campo grado académico es requerido.'),
    regional: Yup.string().required('Campo regional educativa es requerido.'),
    distrito: Yup.string().required('Campo distrito educativo es requerido.'),
    centro_educativo: Yup.string().required('Campo centro educativo es requerido.'),
  });

  
  const defaultValues = useMemo(
    () => ({
      nombres: currentStudent?.nombres || '',
      apellidos: currentStudent?.apellidos || '',
      fecha_nacimiento: moment(currentStudent?.fecha_nacimiento).format('DD/MM/YYYY') || '',
      correo: currentStudent?.correo || '',
      telefono: currentStudent?.telefono || '',
      sexo: currentStudent?.sexo || '',
      grado: currentStudent?.grado || '',
      regional: currentStudent?.regional || '',
      distrito: currentStudent?.distrito || '',
      centro_educativo: currentStudent?.centro_educativo || '',
      etapa: currentStudent?.etapa || '',
      condicion: currentStudent?.condicion || '',
      img_url: currentStudent?.img_url || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStudent]
  );
  

  const methods = useForm({
    resolver: yupResolver(NewEstudianteSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentStudent) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }

    handleDataRegionales();
    if(isEdit){
      setFecha(moment(currentStudent?.fecha_nacimiento).format('DD/MM/YYYY')) ; 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentStudent]);

  useEffect(() => {
    const mask2 = new Inputmask({
      placeholder: "",
      mask: "(999)-999-9999",
      autoUnmask: true,
      jitMasking: true,
      showMaskOnFocus: false,
      showMaskOnHover: false
    });
    mask2.mask(telefonoRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const onSubmit = async (data) => {
    try {
      try{
        if(!isEdit){
          await axios.post('/api/SIGEL_ESTUDIANTES', 
          {
            nombres: data.nombres.toUpperCase(),
            apellidos: data.apellidos.toUpperCase(),
            fecha_nacimiento: moment(data.fecha_nacimiento).format('YYYY-MM-DD'),
            correo: data.correo.toUpperCase(),
            telefono: data.telefono,
            sexo: data.sexo,
            grado: data.grado,
            regional: Number(data.regional),
            distrito: Number(data.distrito),
            centro_educativo: Number(data.centro_educativo),
            etapa: 'DISTRITAL',
            condicion: data.condicion.toUpperCase(),
            img_name: nombreImage,
          });

          await axios.post('/api/SIGEL_ESTUDIANTES/imagen', 
          {
            Archivo: foto,
            Nombre: nombreImage,
          });

          enqueueSnackbar('Registrado exitosamente');
          
        }else if(foto !== null){

          axios.put(`/api/SIGEL_ESTUDIANTES/${currentStudent?.id}`, 
          {
            id: currentStudent?.id,
            nombres: data.nombres.toUpperCase().trim().replace(/\s+/g, ' '),
            apellidos: data.apellidos.toUpperCase().trim().replace(/\s+/g, ' '),
            fecha_nacimiento: moment(data.fecha_nacimiento).format('YYYY-MM-DD'),
            correo: data.correo.toUpperCase().trim().replace(/\s+/g, ' '),
            telefono: data.telefono,
            sexo: data.sexo,
            grado: data.grado,
            regional: Number(data.regional),
            distrito: Number(data.distrito),
            centro_educativo: Number(data.centro_educativo),
            etapa: currentStudent?.etapa,
            condicion: data.condicion.toUpperCase(),
            img_name: String(currentStudent?.id),
          }).then(() => {
            enqueueSnackbar('Actulizado exitosamente');
            navigate(PATH_DASHBOARD.estudiante.registros);

          }).catch((error) => console.log(error));

          if(currentStudent?.img_name === 'https://localhost:44315/Images/'){
            axios.post('/api/SIGEL_ESTUDIANTES/imagen', 
            {
              Archivo: foto,
              Nombre: String(currentStudent?.id),
            });
          }else{
            axios.put(`/api/SIGEL_ESTUDIANTES/imagen/${currentStudent?.id}`, 
            {
              Archivo: foto,
              Nombre: nombreImage,
            });
          }

        }else{
          axios.put(`/api/SIGEL_ESTUDIANTES/${currentStudent?.id}`, 
          {
            id: currentStudent?.id,
            nombres: data.nombres.toUpperCase().trim().replace(/\s+/g, ' '),
            apellidos: data.apellidos.toUpperCase().trim().replace(/\s+/g, ' '),
            fecha_nacimiento: moment(data.fecha_nacimiento).format('YYYY-MM-DD'),
            correo: data.correo.toUpperCase().trim().replace(/\s+/g, ' '),
            telefono: data.telefono,
            sexo: data.sexo,
            grado: data.grado,
            regional: Number(data.regional),
            distrito: Number(data.distrito),
            centro_educativo: Number(data.centro_educativo),
            etapa: currentStudent?.etapa,
            condicion: data.condicion.toUpperCase(),
          }).then(() => {
            enqueueSnackbar('Actulizado exitosamente');
            navigate(PATH_DASHBOARD.estudiante.registros);
          });
        }

        setFecha(null);
        setReginalEdu('');
        setDistritoEdu('');
        setCentroEdu('');
        setInputValueRegional('');
        setInputValueDistrito('');
        setInputValueCentro('');
        reset();
        
      }catch(e){
        console.log(e)
      }

    } catch (error) {
      console.error(error);
    }
  };

  function generateRandomName() {
    return uuidv4();
  }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file1 = acceptedFiles[0];
      const newFileName = generateRandomName();

      setNombreImagen(newFileName);

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setFileFoto(base64);
      };
      reader.readAsDataURL(file1);

      const newFile = Object.assign(file1, {
        preview: URL.createObjectURL(file1),
      });

      if (file1) {
        setValue('img_url', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const FechaVacia = (condicion) =>{
    if(condicion === true){
      if(fecha === null || '')
      {
        setFecha(null);
      }
    }
  };
  
  const VerficarEstudiante = () => {
    const subscription1 = watch('nombres');
    const subscription2 = watch('apellidos');
    const subscription3 = watch('fecha_nacimiento');
    const subscription4 = watch('regional');

    if(!currentStudent){
      console.log('se ejecuta')
      if(subscription1 && subscription2 && subscription3 && subscription4){
        axios.post('/api/SIGEL_ESTUDIANTES/confirmacion_estudiantes/',
        {
          nombres: subscription1.toUpperCase().trim().replace(/\s+/g, ' '),
          apellidos: subscription2.toUpperCase().trim().replace(/\s+/g, ' '),
          fecha_nacimiento: moment(subscription3.$d).format('YYYY-MM-DD'),
          regional: Number(subscription4),
  
        })
        .then((response) => {
          setValidezEstudiante(response.data);
          setHabilitarCampo(!response.data);
          setHabDistrito(!response.data);
        }).catch(() => {
          setValidezEstudiante(false);
          setHabilitarCampo(false);
          setHabDistrito(false);
        });
      }else{
        setValidezEstudiante(null);
        setHabilitarCampo(false);
        setHabDistrito(false);
      };
    }else{
      setValidezEstudiante(false);
      setHabilitarCampo(true);
      setHabDistrito(true);
    };
  };
  
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: isEdit ? 7 : 5, pb: 5, px: 3 }}>
            <Typography variant="h4" style={{textAlign: 'center', marginBottom: 15}}>Foto del perfil</Typography>
            {isEdit && (
              <div style={{marginBottom: 10}}>
                <Label
                  color={values.etapa === 'REGIONAL' ? 'success' : 'error'}
                  sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 30, left: 30}}
                >
                  Etapa {values.etapa}
                </Label>
              </div>              
            )}
            
            <Box>
              <RHFUploadAvatar
                name="img_url"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Permitido *.jpeg, *.jpg, *.png, *.gif
                    <br /> Tamaño máximo de {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="nombres" label="Nombres" onBlur={()=>VerficarEstudiante()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {ValidezEstudiante 
                        ? <>
                            <Tooltip title='Este estudiante ya está registrado'>
                              <Iconify icon='material-symbols:cancel-rounded' style={{ width: 25, height: 'auto', color: 'red'}}/>
                            </Tooltip>
                          </>
                        : ValidezEstudiante === false && 
                          <>
                            <Tooltip title={!currentStudent?.id ? 'Estudiante no registrado' : 'Estudiante verificado'}>
                              <Iconify icon='material-symbols:check-circle-rounded' style={{ width: 25, height: 'auto', color: 'green'}}/>
                            </Tooltip>
                          </>
                      }
                    </InputAdornment>
                  ),
                }}
              />
              <RHFTextField name="apellidos" label="Apellidos" onBlur={()=>VerficarEstudiante()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {ValidezEstudiante 
                        ? <>
                            <Tooltip title='Este estudiante ya está registrado'>
                              <Iconify icon='material-symbols:cancel-rounded' style={{ width: 25, height: 'auto', color: 'red'}}/>
                            </Tooltip>
                          </>
                        : ValidezEstudiante === false && 
                          <>
                            <Tooltip title={!currentStudent?.id ? 'Estudiante no registrado' : 'Estudiante verificado'}>
                              <Iconify icon='material-symbols:check-circle-rounded' style={{ width: 25, height: 'auto', color: 'green'}}/>
                            </Tooltip>
                          </>
                      }
                    </InputAdornment>
                  ),
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-do">
                <DatePicker
                  openTo="year"
                  views={['year', 'month', 'day']}
                  label="Fecha de nacimiento"
                  value={fecha}
                  onClose={()=>VerficarEstudiante()}
                  onChange={(newValue) => {
                    setFecha(newValue);
                    setValue('fecha_nacimiento', newValue, { shouldValidate: true });
                  }}
                  renderInput={(params) => (
                    <RHFTextField {...params} name="fecha_nacimiento" label="Fecha Nacimiento" onBlur={()=>VerficarEstudiante()}/>
                  )}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {ValidezEstudiante 
                          ? <>
                              <Tooltip title='Este estudiante ya está registrado'>
                                <Iconify icon='material-symbols:cancel-rounded' style={{ width: 25, height: 'auto', color: 'red'}}/>
                              </Tooltip>
                            </>
                          : ValidezEstudiante === false && 
                            <>
                              <Tooltip title='Estudiante no registrado'>
                                <Iconify icon='material-symbols:check-circle-rounded' style={{ width: 25, height: 'auto', color: 'green'}}/>
                              </Tooltip>
                            </>
                        }
                      </InputAdornment>
                    ),
                  }}
                />
              </LocalizationProvider>

              <Autocomplete
                fullWidth
                value={regionalEdu}
                options={Regionales}
                onBlur={()=>VerficarEstudiante()}
                onChange={(event, newValue) => {
                  setReginalEdu(newValue);
                  if(newValue !== regionalEdu) {
                    setDistritoEdu(null);
                    setCentroEdu(null);
                    setHabCentro(false);
                  };
                  if(newValue !== null){
                    setValue('regional', newValue.value, { shouldValidate: true });
                    handleDataDistritos(newValue.value);
                    setHabDistrito(true);
                  }else {
                    setHabDistrito(false);
                    setHabCentro(false);
                    setDistritoEdu(null);
                    setCentroEdu(null);
                  };
                }}
                inputValue={inputValueRegional}
                onInputChange={(event, newInputValue) => {
                  setInputValueRegional(newInputValue);
                }}
                renderInput={(params) => <RHFTextField {...params} name="regional" label="Regional educativa" />}
              />

              <RHFTextField name="correo" label="Correo electrónico"/>
              <RHFTextField name="telefono" label="Teléfono" inputRef={telefonoRef} disabled={habilitarCampo === false}/>

              <RHFSelect name="sexo" label="Sexo" disabled={habilitarCampo === false}>
                <MenuItem value="">Ninguno</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {sexos.map((sexo) => (
                  <MenuItem key={sexo.value} value={sexo.value}>
                    {sexo.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect name="grado" label="Grado académico" disabled={habilitarCampo === false}>
                <MenuItem value="">Ninguno</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {gradosAcad.map((grado) => (
                  <MenuItem key={grado.value} value={grado.value}>
                    {grado.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <Autocomplete
                fullWidth
                disabled={HabDistrito === false}
                value={DistritoEdu}
                options={Distritos}
                onChange={(event, newValue) => {
                  setDistritoEdu(newValue);
                  if(newValue !== DistritoEdu) setCentroEdu(null);
                  if(newValue !== null){
                    setValue('distrito', newValue.value, { shouldValidate: true });
                    handleDataCentros(newValue.value);
                    setHabCentro(true);
                  }else {
                    setHabCentro(false);
                    setCentroEdu(null);
                  };
                }}
                inputValue={inputValueDistrito}
                onInputChange={(event, newInputValue) => {
                  setInputValueDistrito(newInputValue);
                }}
                renderInput={(params) => <RHFTextField {...params} name="distrito" label="Distrito educativo" />}
              />

              <Autocomplete
                fullWidth
                disabled={HabCentro === false}
                value={CentroEdu}
                options={Centros}
                onChange={(event, newValue) => {
                  setCentroEdu(newValue);
                  if(newValue !== null) setValue('centro_educativo', newValue.value, { shouldValidate: true });
                }}
                inputValue={inputValueCentro}
                onInputChange={(event, newInputValue) => {
                  setInputValueCentro(newInputValue);
                }}
                renderInput={(params) => <RHFTextField {...params} name="centro_educativo" label="Centro educativo" />}
              />
            </Box>

            <RHFTextField
                name='condicion'
                variant='outlined'
                fullWidth
                multiline
                placeholder="Ej. Asmática, intolerante a la lactosa"
                label="Condición especial"
                style={{marginTop: 24}}
                disabled={habilitarCampo === false}
              />

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting} onClick={()=>FechaVacia(true)} disabled={habilitarCampo === false}>
                {!isEdit ? 'Registrar estudiante' : 'Editar estudiante'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
