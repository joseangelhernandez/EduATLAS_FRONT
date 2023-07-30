import PropTypes from 'prop-types';
import { Stack, 
  IconButton, 
  InputAdornment,
  Autocomplete,
} from '@mui/material';
import FormProvider, { RHFTextField } from '../../../components/hook-form';

CentroEstudios.propTypes = {
  Regionales: PropTypes.array,
  Distritos: PropTypes.array,
  regionalEdu: PropTypes.any,
  DistritoEdu: PropTypes.any,
  inputValueRegional: PropTypes.any,
  inputValueDistrito: PropTypes.any,
  handleInputValueRegional: PropTypes.func,
  handleInputValueDistrito: PropTypes.func,
  handleRegional: PropTypes.func,
  handleDistrito: PropTypes.func,
  HabDistrito: PropTypes.bool,
}

export default function CentroEstudios({Regionales, Distritos, 
  regionalEdu, DistritoEdu, inputValueRegional, inputValueDistrito, 
  handleInputValueRegional, handleInputValueDistrito, 
  handleRegional, handleDistrito, 
  HabDistrito}){
  return(
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={5} mt={5} mb={5}>
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
          renderInput={(params) => <RHFTextField {...params} name="regional" label="Regional educativa" />}
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
          renderInput={(params) => <RHFTextField {...params} name="distrito" label="Distrito educativo" />}
        />
      </Stack>
    </>
  )
};