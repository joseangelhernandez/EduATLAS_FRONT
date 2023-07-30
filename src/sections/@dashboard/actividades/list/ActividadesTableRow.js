import PropTypes from 'prop-types';
import { useState } from 'react';
// fecha formato
import moment from 'moment';
import 'moment/locale/es-do';
// @mui
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
import { useSnackbar } from '../../../../components/snackbar';
// utils
import axios from '../../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

ActividadesTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onConfirmar: PropTypes.func,
};

export default function ActividadesTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, onConfirmar }) {
  const { id, tipo_actividad, actividad, presupuesto, responsable, fecha_inicio, fecha_final, ejecutada } = row;
  
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleInsctrito = (e, ActID) => {
    if(e.target.checked)
    {
      axios.post(`/api/ACTIVIDADES/ejecutar/${ActID}`)
      .then(()=>{
        enqueueSnackbar(
          <span>
            La actividad con el ID <strong>{ActID}</strong> ha sido ejecutada satisfactoriamente.
          </span>,
        );
        onConfirmar();
      }).catch((error)=> console.log(error));
      
    };
  };


  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {id}
        </TableCell>

        <TableCell align="left" sx={{ whiteSpace: 'nowrap'}}>{tipo_actividad}</TableCell>

        <TableCell align="left">{actividad}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
          <strong>
            RD$ {presupuesto.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
          </strong>
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {responsable}
        </TableCell>

        <TableCell align="left" sx={{ whiteSpace: 'nowrap'}}>{moment(fecha_inicio).format('DD-MMM-YYYY')}</TableCell>

        <TableCell align="left" sx={{ whiteSpace: 'nowrap'}}>{moment(fecha_final).format('DD-MMM-YYYY')}</TableCell>

        <TableCell align="center">
          {ejecutada ? (
            <Iconify
              icon="eva:checkmark-circle-fill"
              sx={{
                width: 20,
                height: 20,
                color: 'success.main',
              }}
            />
          ) : null}
          {!ejecutada && (
            <Checkbox onChange={(e) => handleInsctrito(e, id)} />
          )}      
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Borrar
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Editar
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Eliminar"
        content="¿Desea eliminar esta actividad?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Eliminar
          </Button>
        }
      />
    </>
  );
}
