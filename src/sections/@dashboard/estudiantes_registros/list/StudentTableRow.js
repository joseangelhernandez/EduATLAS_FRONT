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

export default function StudentTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { id, nombres, apellidos, sexo, etapa, fecha_nacimiento, grado, regional, distrito, centro_educativo, telefono, correo, img_url } = row;

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

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {id}
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={nombres} src={img_url} />

            <Typography variant="subtitle2" noWrap>
              {nombres}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{apellidos}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {sexo}
        </TableCell>

        <TableCell align="center">
          <Tooltip title={etapa}>
            <Iconify
              icon={etapa === 'REGIONAL' ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
              sx={{
                width: 20,
                height: 20,
                color: 'success.main',
                ...(etapa === 'DISTRITAL' && { color: 'error.main' }),
                ...(etapa !== 'REGIONAL' && { color: 'error.main' }),
              }}
            />
          </Tooltip>
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={(grado === 'banned' && 'error') || 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {grado}
          </Label>
        </TableCell>

        <TableCell align="left">{regional}</TableCell>

        <TableCell align="left">{distrito}</TableCell>

        <TableCell align="left">{centro_educativo}</TableCell>

        <TableCell align="left">{telefono}</TableCell>

        <TableCell align="left">{correo}</TableCell>

        <TableCell align="left">{moment(fecha_nacimiento).format('DD-MMM-YYYY')}</TableCell>

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
