import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { 
  Box, 
  Card, 
  Grid, 
  Stack,
  Container,
  CardHeader,
  Switch, 
  Typography, 
  FormControlLabel, 
  Autocomplete, 
  TextField,
  MenuItem,
  Divider,
  InputAdornment,
  Tooltip,
  IconButton,
} from '@mui/material';
// masks
import Inputmask from 'inputmask';
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

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

const ROLE_OPTIONS = [
  {value: 1,	label:'Super User'},
  {value: 2,	label:'Admin'},
  {value: 3,	label:'Docente Centro'},
  {value: 4,	label:'Tecnico Distrito'},
  {value: 5,	label:'Tecnico Regional'},
  {value: 6,	label:'Delegado'},
  {value: 7,	label:'Voluntario'},
];

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

export default function UserNewEditForm({ isEdit = false, currentUser }) {
  const navigate = useNavigate();

  const [modifExitosa, setModifExitosa] = useState(false);
  const cedulaRef = useRef(null);
  const [inputRef, setInputRef] = useState();

  const [ValidezCedula, setValidezCedula] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRep, setShowPasswordRep] = useState(false);

  useEffect(() => {
    const mask2 = new Inputmask({
      placeholder: "",
      mask: "999-9999999-9",
      autoUnmask: true,
      jitMasking: true,
      showMaskOnFocus: false,
      showMaskOnHover: false
    });
    mask2.mask(cedulaRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const [rolUsuario, setRolUsuario] = useState('');

  const [Regionales, setRegionales] = useState([{value: 0, label: 'Cargando...'}]);
  const [Distritos, setDistritos] = useState([{value: 0, label: 'Cargando...'}]);
  const [Centros, setCentros] = useState([{value: 0, label: 'Cargando...'}]);

  const [habilitarCampo, setHabilitarCampo] = useState(false);

  const [HabDistrito, setHabDistrito] = useState(false);
  const [HabCentro, setHabCentro] = useState(false);

  async function handleDataRegionales() {
    const response = await fetchDataRegionales();
    if(currentUser?.regional !== undefined){
      setReginalEdu(response.find((regional) => regional.value === currentUser.regional));
      handleDataDistritos(currentUser?.regional);
      handleDataCentros(currentUser?.distrito);
      setHabDistrito(true);
      setHabCentro(true);
    };
    setRegionales(response);
  };

  async function handleDataDistritos(regional) {
    const response = await fetchDataDistritos(regional);
    if(currentUser?.distrito !== undefined){
      setDistritoEdu(response.find((distrito) => distrito.value === currentUser.distrito));
    };
    if(regional !== null){
      setDistritos(response);
    };
  };

  async function handleDataCentros(distrito) {
    const response = await fetchDataCentros(distrito);
    if(currentUser?.centro_educativo !== undefined){
      setCentroEdu(response.find((centro) => centro.value === currentUser.centro_educativo));
    };
    setCentros(response);
  };

  const [inputValueRegional, setInputValueRegional] = useState('');
  const [inputValueDistrito, setInputValueDistrito] = useState('');
  const [inputValueCentro, setInputValueCentro] = useState('');

  const [regionalEdu, setReginalEdu] = useState(null);
  const [DistritoEdu, setDistritoEdu] = useState(null);
  const [CentroEdu, setCentroEdu] = useState(null);


  const NewUserSchema = Yup.object().shape({
    usuario: Yup.string().required('Usuario es requerido.'),
    nombre: Yup.string().required('Nombre es requerido.'),
    apellido: Yup.string().required('Apellido es requerido.'),
    rol: Yup.string().required('Rol es requerido.'),
    regional: Yup.string().required('Regional Educativa es requerido.'),
    email: Yup.string().required('Email es requerido.').email('El email introducido debe ser válido.'),
    comision: Yup.string().required('Comisión es requerido.'),
    contraseña: Yup.string().required('Contraseña es requerido.').min(8, 'La contraseña debe tener al menos 8 caracteres.'),
    confrimarContraseña: Yup.string().oneOf([Yup.ref('contraseña'), null], 'Las contraseñas no coinciden').required('Repetir contraseña es requerida'),
    tipo_mesa: Yup.string().required('Tipo de mesa es requerido.'),
    distrito: Yup.string().required('Distrito educativo es requerido.'),
    centro: Yup.string().required('Centro educativo es requerido.'),
  });

  const defaultValues = useMemo(
    () => ({
      usuario: currentUser?.usuario || '',
      nombre: currentUser?.nombre || '',
      apellido: currentUser?.apellido || '',
      regional: currentUser?.regional || '',
      rol: currentUser?.rol || '',
      email: currentUser?.email || '',
      comision: currentUser?.comision || '',
      tipo_mesa: currentUser?.tipo_mesa || '',
      contraseña: '',
      confrimarContraseña: '',
      distrito: currentUser?.distrito || '',
      centro: currentUser?.centro || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
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
    if (isEdit && currentUser) {
      reset(defaultValues);
    }

    handleDataRegionales();
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    try {
      await await axios.post('/api/USUARIOS', 
      {
        usuario: data.usuario,
        contraseña: data.contraseña,
        nombre: data.nombre.toUpperCase(),
        apellido: data.apellido.toUpperCase(),
        email: data.email.toUpperCase(),
        RoleId: Number(data.rol),
        regional: Number(data.regional),
        distrito: Number(data.distrito),
        centro: Number(data.centro),
        comision: Number(data.comision),
        tipo_mesa: data.tipo_mesa.toUpperCase(),
      }).catch((error) => console.log(error));

      reset();
      enqueueSnackbar(!isEdit ? 'Creación exitosa' : 'Actualización exitosa');
      navigate(PATH_DASHBOARD.user.registros);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (rolUsuario === 7) {
      setValue('distrito', 0, { shouldValidate: true });
      setValue('centro', 0, { shouldValidate: true });
    }else if(rolUsuario === 4){
      setValue('centro', 0, { shouldValidate: true });
      setValue('comision', 0, { shouldValidate: true });
    }else if(rolUsuario === 3){
      setValue('comision', 0, { shouldValidate: true });
    }else if(rolUsuario === 5){
      setValue('comision', 0, { shouldValidate: true });
      setValue('distrito', 0, { shouldValidate: true });
      setValue('centro', 0, { shouldValidate: true });
    }else{
      setValue('comision', 0, { shouldValidate: true });
      setValue('distrito', 0, { shouldValidate: true });
      setValue('centro', 0, { shouldValidate: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolUsuario]);

  useEffect(() => {
    const subscription = watch('rol');
    setRolUsuario(subscription);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('rol')]);

  useEffect(() => {
    const subscription = watch('usuario');
    if(subscription?.length === 11){
      axios.get(`/api/USUARIOS/verficar/${subscription}`)
      .then((response) => {
        setValidezCedula(response.data);
        setHabilitarCampo(!response.data);
      }).catch(() => {
        setValidezCedula(false);
        setHabilitarCampo(false);
      });
    }else{
      setValidezCedula(null);
      setHabilitarCampo(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('usuario')?.length === 11, watch('usuario')?.length=== 0]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12}>
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
              <RHFTextField name="usuario" label="Cédula del usuario" inputRef={cedulaRef}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {ValidezCedula 
                        ? <>
                            <Tooltip title='Este usuario ya está registrado'>
                              <Iconify icon='material-symbols:cancel-rounded' style={{ width: 25, height: 'auto', color: 'red'}}/>
                            </Tooltip>
                          </>
                        : ValidezCedula === false && 
                          <>
                            <Tooltip title='Usuario no registrado'>
                              <Iconify icon='material-symbols:check-circle-rounded' style={{ width: 25, height: 'auto', color: 'green'}}/>
                            </Tooltip>
                          </>
                      }
                    </InputAdornment>
                  ),
                }}
                helperText={
                  <Stack component="span" direction="row" alignItems="center" color="warning">
                    <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} color="warning"/> Debe primero llenar este campo para validar el ID del usuario a crear.
                  </Stack>
                }
              />
              <RHFTextField name="nombre" label="Nombre" disabled={habilitarCampo === false}/>
              <RHFTextField name="apellido" label="Apellido" disabled={habilitarCampo === false}/>
              <RHFTextField name="email" label="Correo electrónico" disabled={habilitarCampo === false}/>

              <Autocomplete
                fullWidth
                value={regionalEdu}
                options={Regionales}
                disabled={habilitarCampo === false}
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

              <RHFSelect name="rol" label="Rol del usuario" disabled={habilitarCampo === false}>
                <MenuItem value="">Ninguno</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {ROLE_OPTIONS.map((rol) => (
                  <MenuItem key={rol.value} value={rol.value}>
                    {rol.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            
              <RHFTextField name="tipo_mesa" label="Cargo" disabled={habilitarCampo === false}/>

              {rolUsuario === 7 &&
                <>
                  <RHFTextField name="comision" label="Comisión" />
                </>
              }

              {rolUsuario === 3 && 
                <>
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
                      if(newValue !== null) setValue('centro', newValue.value, { shouldValidate: true });
                    }}
                    inputValue={inputValueCentro}
                    onInputChange={(event, newInputValue) => {
                      setInputValueCentro(newInputValue);
                    }}
                    renderInput={(params) => <RHFTextField {...params} name="centro" label="Centro educativo" />}
                  />
                </>
              }

              {rolUsuario === 4 && 
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
              }
              
              <RHFTextField name="contraseña" label="Contraseña" disabled={habilitarCampo === false}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <RHFTextField name="confrimarContraseña" label="Confrimar Contraseña" disabled={habilitarCampo === false}
                type={showPasswordRep ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPasswordRep(!showPasswordRep)} edge="end">
                        <Iconify icon={showPasswordRep ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear usuario' : 'Guardar cambios'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
