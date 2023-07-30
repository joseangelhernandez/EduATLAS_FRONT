import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
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

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onSelectRow, onDeleteRow }) {
  const { usuario, nombre, roleName, regional, distrito, centro, comision, cargo } = row;

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

  function cedulaMask(value) {
    const cleanedValue = value.replace(/\D/g, '');
    const maskedValue = cleanedValue
      .replace(/^(\d{3})(\d{7})(\d{1})$/, '$1-$2-$3');
    return maskedValue;
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {cedulaMask(usuario)}
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={nombre} src="/broken-image.jpg"/>

            <Typography variant="subtitle2" noWrap>
              {nombre}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color='success'
            sx={{ textTransform: 'capitalize' }}
          >
            {roleName}
          </Label>
        </TableCell>

        {roleName === 'Docente Centro' &&
          <>
            <TableCell align="left">{regional}</TableCell>

            <TableCell align="left">{distrito}</TableCell>
    
            <TableCell align="left">{centro}</TableCell>
          </>
        }

        {roleName === 'Tecnico Regional' &&
          <>
            <TableCell align="left">{regional}</TableCell>
          </>
        }

        {roleName === 'Tecnico Distrito' &&
          <>
            <TableCell align="left">{distrito}</TableCell>
        
            <TableCell align="left">{centro}</TableCell>
          </>
        }

        {roleName === 'Voluntario' &&
          <>
            <TableCell align="left">{comision}</TableCell>
          </>
        }

        <TableCell align="left">{cargo}</TableCell>
        

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
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Eliminar"
        content={<span>¿Desea eliminar el usuario de <strong>{nombre}</strong>?</span>}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Eliminar
          </Button>
        }
      />
    </>
  );
}
