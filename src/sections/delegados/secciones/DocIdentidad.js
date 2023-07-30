import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Stack,
  Box,
  Typography,
  IconButton, 
  InputAdornment,
  CircularProgress,
  Grid,
} from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import FormProvider, { RHFTextField, RHFUpload } from '../../../components/hook-form';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

export default function DocIdentidad({handleDrop, handleDelete, loadingValue, workInProgress, errorHandle}){
  return(
    <>
    <Stack mt={5} mb={5}>
      <Typography mb={2.45} variant="h5">Acta de Nacimiento para fines escolares</Typography>
      <RHFUpload
        name="acta"
        maxSize={3145728}
        onDrop={handleDrop}
        onDelete={!workInProgress ? handleDelete : undefined}
        disabled={workInProgress}
      />
    </Stack>

    <Grid container spacing={2} columns={16} mr={1} ml={1}>
      <Grid item xs={13}>
      <BorderLinearProgress variant="determinate" value={loadingValue} />
      </Grid>
      <Grid item xs={1} >
        <Box sx={{ minWidth: 5, mt: -0.8,  }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            loadingValue,
          )}%`}</Typography></Box>
      </Grid>
    </Grid>

    {workInProgress && (
        <Typography variant="body2" color="error" ml={2}>
          Por favor espere, cargando
          {Array(Math.floor(Date.now() / 700) % 4 + 1).fill('.').join('')}
        </Typography>
      )}

    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={5} mb={2}>
      <RHFTextField name="numero" label="Número de identidad" disabled/>
    </Stack>
    
    {loadingValue === 100 && errorHandle !== 'MalDoc' && (
        <Typography variant="body3" color="green" ml={2} textAlign="justify" mb={5} mr={2}>
        <strong>Por favor verificar si este número de identidad corresponde al de su Acta de nacimiento </strong> para fines
        escolares, en caso de no corresponder, favor subir el documento en una mejor calidad y en una posición 
        correcta.
      </Typography>
      )}

    {errorHandle === 'MalDoc' && (
        <Typography variant="body3" color="error" ml={2} textAlign="justify" mb={5} mr={2}>
        <strong>Por favor verificar, y subir nuevamente su Acta de nacimiento </strong> para fines
        escolares, puede que haya subido un documento incorrecto o la calidad no es adecuada, intente subir la imagen con mejor calidad y posición.
      </Typography>
      )}
    </>
  )
};

DocIdentidad.propTypes = {
  handleDrop: PropTypes.func,
  handleDelete: PropTypes.func,
  loadingValue: PropTypes.number,
  workInProgress: PropTypes.bool,
  errorHandle: PropTypes.string,
};
  