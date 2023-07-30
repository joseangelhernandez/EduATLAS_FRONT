import { useState, useCallback, useRef, useEffect } from 'react';
import * as Yup from 'yup';
// form
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// animations
import { m } from 'framer-motion';
import Lottie from 'lottie-react';
// read image
import Tesseract  from 'tesseract.js';
// @mui
import { alpha } from '@mui/material/styles';
import { Stack, 
    IconButton, 
    InputAdornment, 
    Alert, 
    Box, 
    Step, 
    Paper, 
    Button, 
    Stepper, 
    StepLabel, 
    Typography 
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
// utils
import axios from 'axios'
// iconsAnimated
import CheckIconAnimated from '../../components/IconsAnimated/checkIcon.json'
import ErrorIconAnimated from '../../components/IconsAnimated/errorIcon.json'
import InfoSentAnimated from '../../components/IconsAnimated/infoSent.json'
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useSnackbar } from '../../components/snackbar';
import DatosPersonales from './secciones/DatosPersonales';
import CentroEstudios from './secciones/CentroEstudios';
import DocIdentidad from './secciones/DocIdentidad'
import { HOST_API_KEY } from '../../config-global';


// ----------------------------------------------------------------------

const steps = ['Datos Personales', 'Centro de Estudios', 'Documentos de identidad'];

const getContent = (stepIndex, handleDrop, handleDelete, loadingValue, workInProgress, 
  handleDate, date, Regionales, Distritos, regionalEdu, DistritoEdu, 
  inputValueRegional, inputValueDistrito, handleInputValueRegional, 
  handleInputValueDistrito, handleRegional, handleDistrito,
  HabDistrito, errorHandle) => {
  switch(stepIndex){
    case 0:
      return <DatosPersonales handleDate={handleDate} date={date}/>
    case 1:
      return <CentroEstudios Regionales={Regionales} Distritos={Distritos}
      regionalEdu={regionalEdu} DistritoEdu={DistritoEdu} inputValueRegional={inputValueRegional}
      handleInputValueRegional={handleInputValueRegional}
      handleInputValueDistrito={handleInputValueDistrito} 
      handleRegional={handleRegional} handleDistrito={handleDistrito}
      HabDistrito={HabDistrito}/>
    case 2:
      return <DocIdentidad handleDrop={handleDrop} handleDelete={handleDelete} 
      loadingValue={loadingValue} workInProgress={workInProgress} errorHandle={errorHandle}/>
    default:
      return null
  }
}

export default function DelegadoRegister() {
  const RegisterSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre es requerido.'),
    apellido: Yup.string().required('Apellido requerido.'),
    regional: Yup.string().required('Regional es requerido'),
    distrito: Yup.string().required('Distrito es requerido'),
    acta: Yup.mixed().required('Acta de Nacimiento es requerido'),
    numero: Yup.string().required('Numero es requerido'),
    fecha_nacimiento: Yup.string().required('Campo fecha de nacimiento es requerido.').nullable(''),
    telefono: Yup.string().required('Campo teléfono es requerido.'),
    sexo: Yup.string().required('Campo sexo es requerido.'),
    correo: Yup.string().required('Campo correo es requerido.').email('Debe colocar un correo válido.'),
    confirmacionCorreo: Yup.string().oneOf([Yup.ref('correo'), null], 'Los correos electrónicos deben coincidir.').required('Campo de confirmación de correo es obligatorio.'),
    
  });

  const defaultValues = {
    nombre: '',
    apellido: '',
    regional: '',
    distrito: '',
    numero: '',
    fecha_nacimiento: '',
    correo: '',
    sexo: '',
    telefono: '',
    confirmacionCorreo: '',
    condicion: '',
    acta: null,
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    trigger,
    reset,
    setError,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const [solicitudExistente, setSolicitudExistente] = useState(false);

  const [errorHandle, setErrorHandle] = useState('');

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const checkIconRef = useRef();
  const infoIconRef = useRef();

  const[fotoBase64, setfotoBase64] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const isStepOptional = (step) => step === -1;

  const isStepSkipped = (step) => skipped.has(step);

  const [fecha, setFecha] = useState(null);

  const[loadingProgress, setLoadingProgress] = useState(0);
  
  const [workInProgress, setWorkInProgress] = useState(false);

  const [loadingStatusForm, setLoadingStatusForm] = useState('idle');
  const spinnerVariants = {
    loading: { opacity: 1, scale: 1 },
    success: { opacity: 0, scale: 0.5 },
    existente: {opacity: 0, scale: 0},
    error: { opacity: 0, scale: 0.5 },
  };
  
  const checkmarkVariants = {
    loading: { opacity: 0, scale: 0 },
    success: { opacity: 1, scale: 1 },
    existente: {opacity: 0, scale: 0},
    error: { opacity: 0, scale: 0 },
  };

  const errormarkVariants = {
    loading: { opacity: 0, scale: 0 },
    success: { opacity: 0, scale: 0 },
    existente: {opacity: 0, scale: 0},
    error: { opacity: 1, scale: 1 },
  };

  const infoMarkVariants = {
    loading: { opacity: 0, scale: 0.5 },
    success: { opacity: 0, scale: 0 },
    existente: {opacity: 1, scale: 1},
    error: { opacity: 0, scale: 0 },
  };

  const [Regionales, setRegionales] = useState([{value: 0, label: 'Cargando...'}]);
  const [Distritos, setDistritos] = useState([{value: 0, label: 'Cargando...'}]);

  const [HabDistrito, setHabDistrito] = useState(false);

  const [inputValueRegional, setInputValueRegional] = useState('');
  const [inputValueDistrito, setInputValueDistrito] = useState('');

  const [regionalEdu, setReginalEdu] = useState(null);
  const [DistritoEdu, setDistritoEdu] = useState(null);

  const handleRegional = (newValue) => {
    setReginalEdu(newValue);
    if(newValue !== regionalEdu) {
      setDistritoEdu(null);
    };
    if(newValue !== null){
      setValue('regional', newValue.value, { shouldValidate: true });
      // handleDataDistritos(newValue.value);
      setHabDistrito(true);
    }else {
      setHabDistrito(false);
      setDistritoEdu(null);
    };
  }

  const handleDistrito = (newValue) => {
    setDistritoEdu(newValue);
    if(newValue !== null){
      setValue('distrito', newValue.value, { shouldValidate: true });
    }
  }


  const handleInputValueRegional = (newInputValue) =>{
    setInputValueRegional(newInputValue);
  }

  const handleInputValueDistrito = (newInputValue) => {
    setInputValueDistrito(newInputValue);
  }



  const handleDelete = () => setValue('acta', null, { shouldValidate: true });

  const handleProcessBack = () => 
  {
    if(activeStep === 0)
    {
      return true

    }
    
    if(!workInProgress){

      return false
    }

    return true
  }

  const handleDate = (newValue) => {
    if(newValue !== ''){
      setValue("fecha_nacimiento", newValue, {shouldValidate: true})
      setFecha(newValue);
    }else{
      setValue("fecha_nacimiento", null, {shouldValidate: false})
      setFecha(null);
    }
    
  }

  const handleDropSingleFile = useCallback(
    (acceptedFiles) => {
      setErrorHandle('');
      const file = acceptedFiles[0];

      // CREAMOS EL OBJETO QUE LEERA EL CONTENIDO DE LA IMAGEN CON TERSSERACT.JS
      Tesseract.recognize(
        file,'spa',
        { 
          logger: x => {
            setWorkInProgress(true);
            if(x.status === 'recognizing text'){
              setLoadingProgress(x.progress * 100)
            } 
        
          }
        }
      )
      .catch (err => {
        console.error(err);
        setWorkInProgress(false);
      })
      .then(result => {
        const text = result.data.text;

        const regex = /\d{3}-\d{7}-\d/;

        const match = text.match(regex);
      
        if(match === null){
          setErrorHandle('MalDoc');
          setWorkInProgress(false);
        }
        else
        {
          setValue('numero', match[0], {shouldValidate: true});

          setWorkInProgress(false);
          setErrorHandle('');
        }
        
      })


      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setfotoBase64(base64);
      }
      reader.readAsDataURL(file);

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });


      if (newFile) {
        setValue('acta', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("No puedes saltar un paso si no es opcional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    reset();
    setValue("fecha_nacimiento", null, {shouldValidate: false});
    setFecha(null);
    setfotoBase64(null);
    setReginalEdu('');
    setDistritoEdu('');
    setInputValueRegional('');
    setInputValueDistrito('');
    setLoadingProgress(0);
    setWorkInProgress(false);
  };

  const onSubmit = async (data) => {
    handlenext();
    try {
      setLoadingStatusForm('loading');
      console.log(data);
    
      setTimeout(() => {
        setLoadingStatusForm('success'); 
        enqueueSnackbar('Inscripción realizada satisfactoriamente.',
        {
          autoHideDuration: 7000,
        });
      }, 3000); 
  
        reset();
        setValue("fecha_nacimiento", null, {shouldValidate: false});
        setFecha(null);
        setfotoBase64(null);
        setReginalEdu('');
        setDistritoEdu('');
        setInputValueRegional('');
        setInputValueDistrito('');
        setLoadingProgress(0);
        setWorkInProgress(false);


    } catch (error) {
      
      setTimeout(() => {
        setLoadingStatusForm('error');
      }, 3000);  // 3000 milisegundos son igual a 3 segundos
      
      console.error(error);

      enqueueSnackbar('Error, intentelo nuevamente. Si persiste contacte a mesa de ayuda.',
      {
        variant: 'error',
        autoHideDuration: 7000,
      });

      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  const handlenext = async() => {
    let isValid = false;
    let newSkipped = skipped;

    switch(activeStep){
      case 0:
        isValid = await trigger(["nombre", "apellido", "correo", "fecha_nacimiento", "sexo", "telefono", "confirmacionCorreo", "condicion"]);
        break;
      case 1:
        isValid = await trigger(["regional", "distrito"]);
        break;
      case 2:
        isValid = await trigger(["acta", "numero"]);
        break;
      default:
        isValid = false;
        break;
    }

    if(isValid){
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  }

  return (
    <FormProvider methods={methods}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <Stack mt={2.5}>
          
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
          
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper> 
          {activeStep === steps.length ? (
            <>
              <Box
                sx={{
                  p: 3,
                  my: 3,
                  minHeight: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
              {loadingStatusForm === 'loading' 
                && <><m.div
                    variants={spinnerVariants}
                    initial="loading"
                    animate={loadingStatusForm}
                  >
                    <Box 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        height: '230px'
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        sx={{
                          color: (theme) =>
                            theme.palette.grey[theme.palette.mode === 'light' ? 400 : 600],
                        }}
                        size={80}
                        thickness={4}
                        value={100}
                      />
                      <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        sx={{
                          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                          animationDuration: '1000ms',
                          position: 'absolute',
                          transform: 'translate(-50%, -50%)',
                          [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                          },
                        }}
                        size={80}
                        thickness={4}
                      />
                    </Box>
                  </m.div>
                  <Typography variant="h5" color="#0293b0"
                      sx={{ 
                        textAlign: 'center',
                      }}>
                    Por favor espere, enviando información...
                  </Typography></>
              }
              {loadingStatusForm === 'success' 
                &&  <><m.div
                      variants={checkmarkVariants}
                      initial="loading"
                      animate={loadingStatusForm}
                    >
                      <Lottie 
                        style={{height: 230, width: "auto"}}
                        animationData={CheckIconAnimated} 
                        lottieRef={checkIconRef}
                        loop={false}
                      />
                    </m.div>
                    <Typography variant="h5" color="#19c25f"
                      sx={{ 
                        textAlign: 'center',
                      }}
                    >
                      Correo de inscripción de solicitud enviado satisfactoriamente, revise su bandeja de entrada principal, en su defecto, en Spam. Su estudiante fue asignado al <strong>Centro Educativo INSTITUTO POLITECNICO LOYOLA de la Regional 
                      04-SAN CRISTOBAL, Distrito 0403-SAN CRISTOBAL</strong>, acérquese al departamento de Registro de dicho centro educativo para concluir con su proceso de inscripción. <strong>Guardé el número único de identidad (NUID) de su estudiante</strong>, será solicitado en 
                      el centro para concluir el proceso.
                    </Typography></>
              }
              {loadingStatusForm === 'error' 
                &&  <><m.div
                      variants={errormarkVariants}
                      initial="loading"
                      animate={loadingStatusForm}
                    >
                      <Lottie 
                        style={{ height: 230, width: "auto", padding: 60}}
                        animationData={ErrorIconAnimated} 
                        lottieRef={checkIconRef}
                        loop={false}
                      />
                    </m.div>
                    <Typography variant="h5" color="error"
                      sx={{ 
                        textAlign: 'center',
                      }}
                    >
                      Hubo error al enviar la solicitud de inscripción, favor intentarlo nuevamente, si el error persiste comuníquese con mesa de ayuda.
                    </Typography></>
              }
              {loadingStatusForm === 'existente' 
                &&  <><m.div
                      variants={infoMarkVariants}
                      initial="loading"
                      animate={loadingStatusForm}
                    >
                      <Lottie 
                        style={{ height: 230, width: "auto"}}
                        animationData={InfoSentAnimated}
                        lottieRef={infoIconRef}
                        onComplete={()=>infoIconRef.current?.goToAndPlay(77, true)}
                        loop={false}
                      />
                    </m.div>
                    <Typography variant="h5" color="info"
                      sx={{ 
                        textAlign: 'center',
                      }}
                    >
                     Su inscripción ya está registrada, favor revisar su correo o contactar a su docente encargado, o comunicarse con el PLERD.
                    </Typography></>
              }
              </Box>
            
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ flexGrow: 1 }} />
                <Button onClick={handleReset}>Reiniciar</Button>
              </Box>
            </>
          ) : (
            <>
              {getContent(activeStep, handleDropSingleFile, handleDelete, loadingProgress, workInProgress, handleDate, fecha,
                Regionales, Distritos, regionalEdu, DistritoEdu, inputValueRegional, inputValueDistrito, 
                handleInputValueRegional, handleInputValueDistrito, handleRegional, 
                handleDistrito, HabDistrito, errorHandle)}
              <Box sx={{ display: 'flex' }}>
                <Button color="inherit" disabled={handleProcessBack()} onClick={handleBack} sx={{ mr: 1 }}>
                  Volver
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Saltar
                  </Button>
                )}
                {activeStep === steps.length - 1? 
                  <Button
                    color="inherit"
                    size="large"
                    variant="contained"
                    disabled={workInProgress}
                    onClick={handleSubmit(onSubmit)}
                    sx={{
                      bgcolor: 'text.primary',
                      color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                      '&:hover': {
                        bgcolor: 'text.primary',
                        color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                      },
                    }}
                  >
                    Enviar
                  </Button>
                :  
                  <Button
                    color="inherit"
                    size="large"
                    variant="contained"
                    onClick={handlenext}
                    
                    sx={{
                      bgcolor: 'text.primary',
                      color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                      '&:hover': {
                        bgcolor: 'text.primary',
                        color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                      },
                    }}
                  >
                    Siguiente
                  </Button>
                }
                
              </Box>
            </>
          )}
        </Stack>
      </Stack>
    </FormProvider>
  );
}
