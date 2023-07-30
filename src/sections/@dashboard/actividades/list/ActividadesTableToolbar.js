import PropTypes from 'prop-types';
import 'dayjs/locale/es-do';
// @mui
import { Stack, InputAdornment, TextField, MenuItem, Button, CircularProgress, Tooltip, IconButton} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
// fecha formato
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// components
import Iconify from '../../../../components/iconify';
import { IconButtonAnimate } from '../../../../components/animate';

// ----------------------------------------------------------------------

const INPUT_WIDTH = 180;


ActividadesTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  userRole: PropTypes.string,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onResetFilter: PropTypes.func,
  filterPor: PropTypes.string,
  onFilterPor: PropTypes.func,
  onFilterEndDate: PropTypes.func,
  onFilterStartDate: PropTypes.func,
  filterEndDate: PropTypes.instanceOf(Date),
  filterStartDate: PropTypes.instanceOf(Date),
  opcionesFiltrado: PropTypes.arrayOf(PropTypes.string),
};

export default function ActividadesTableToolbar({
  isFiltered,
  filterName,
  filterPor,
  onFilterName,
  onFilterPor,
  onResetFilter,
  userRole,
  opcionesFiltrado,
  filterEndDate,
  filterStartDate,
  onFilterEndDate,
  onFilterStartDate,
}) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <TextField
        fullWidth
        select
        label="Buscar por"
        value={filterPor}
        onChange={onFilterPor}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 260,
              },
            },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {opcionesFiltrado.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-do">
        <DatePicker
          label="Fecha de inicio"
          value={filterStartDate}
          onChange={onFilterStartDate}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              sx={{
                maxWidth: { md: INPUT_WIDTH },
              }}
            />
          )}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-do">
        <DatePicker
          label="Fecha final"
          value={filterEndDate}
          onChange={onFilterEndDate}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              sx={{
                maxWidth: { md: INPUT_WIDTH },
              }}
            />
          )}
        />
      </LocalizationProvider>

      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder={`Introducir ${filterPor}...`}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Limpiar
        </Button>
      )}
    </Stack>
  );
}
