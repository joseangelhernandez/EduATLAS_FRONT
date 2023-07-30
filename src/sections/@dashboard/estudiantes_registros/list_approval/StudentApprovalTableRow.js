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

// ----------------------------------------------------------------------

StudentTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

// Función para extraer las iniciales de los nombres
const getIniciales = (nombres) => {
  const nombreArray = nombres.split(" ");
  if (nombreArray.length === 1) {
    // Si solo hay un nombre, muestra solo la primera letra
    return nombreArray[0][0];
  } 
  // Si hay dos o más nombres, muestra la primera letra de cada uno
  return nombreArray.map((nombre) => nombre[0]).join("");
};

export default function StudentTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { nuid_Solicitud, nombres, apellidos, sexo, fecha_Solicitud, fecha_Nac, regional, distrito, centro, telefono, correo } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

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

  const cedulaMask = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const maskedValue = cleanedValue
      .replace(/^(\d{3})(\d{7})(\d{1})$/, '$1-$2-$3');
    return maskedValue;
  };

  const telefonoMask = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const maskedValue = cleanedValue
      .replace(/^(\d{3})(\d{3})(\d{4})$/, '($1)-$2-$3');
    return maskedValue;
  };

  return (
    <>
      <TableRow key={nuid_Solicitud} hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell align="left" sx={{ whiteSpace: 'nowrap', paddingLeft: 2.5}}>
          {cedulaMask(nuid_Solicitud)}
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={nombres} >{getIniciales(nombres)}</Avatar>

            <Typography variant="subtitle2">
              {nombres}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{apellidos}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {sexo}
        </TableCell>

        <TableCell align="left">{moment(fecha_Solicitud).format('DD-MMM-YYYY')}</TableCell>

        <TableCell align="left">{regional}</TableCell>

        <TableCell align="left">{distrito}</TableCell>

        <TableCell align="left">{centro}</TableCell>

        <TableCell align="left" sx={{ whiteSpace: 'nowrap', paddingLeft: 2.5}}>{telefonoMask(telefono)}</TableCell>

        <TableCell align="left">{correo}</TableCell>

        <TableCell align="left">{moment(fecha_Nac).format('DD-MMM-YYYY')}</TableCell>

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
        content="¿Desea eliminar este registro?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Eliminar
          </Button>
        }
      />
    </>
  );
}
