import PropTypes from 'prop-types';
// @mui
import { Box, Switch, TablePagination, FormControlLabel } from '@mui/material';

// ----------------------------------------------------------------------

TablePaginationCustom.propTypes = {
  dense: PropTypes.bool,
  onChangeDense: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  sx: PropTypes.object,
};

export default function TablePaginationCustom({
  dense,
  onChangeDense,
  rowsPerPageOptions = [15, 25, 50],
  sx,
  ...other
}) {
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <TablePagination  labelRowsPerPage='Filas por página' rowsPerPageOptions={rowsPerPageOptions} component="div" {...other} />

      {onChangeDense && (
        <FormControlLabel
          label="Comprimir filas"
          control={<Switch checked={dense} onChange={onChangeDense} />}
          sx={{
            pl: 2,
            py: 1.5,
            top: 0,
            position: {
              sm: 'absolute',
            },
          }}
        />
      )}
    </Box>
  );
}
