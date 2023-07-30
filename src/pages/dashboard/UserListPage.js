import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import axios from '../../utils/axios';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../components/table';
// sections
import { UserTableToolbar, UserTableRow } from '../../sections/@dashboard/user/list';
import { useSnackbar } from '../../components/snackbar';

// ----------------------------------------------------------------------

const ROLE_OPTIONS = ['Admins','Voluntarios','Técnico Regional', 'Técnico Distrito', 'Usuarios de Centro'];

const BUSCAR_POR_ADMINS = [
  'Usuario',
  'Nombre',
  'Rol asignado',
  'Cargo',
];

const BUSCAR_POR_GENERAL = [
  'Usuario',
  'Nombre',
  'Rol asignado',
  'Comisión',
  'Cargo',
];

const BUSCAR_POR_REGIONAL = [
  'Usuario',
  'Nombre',
  'Rol asignado',
  'Regional',
  'Cargo',
];

const BUSCAR_POR_DISTRITO = [
  'Usuario',
  'Nombre',
  'Rol asignado',
  'Distrito',
  'Regional',
  'Cargo',
];

const BUSCAR_POR_CENTRO = [
  'Usuario',
  'Nombre',
  'Rol asignado',
  'Centro',
  'Distrito',
  'Regional',
  'Cargo',
];


const TABLE_HEAD_ADMINS = [
  { id: 'usuario', label: 'Usuario', align: 'left' },
  { id: 'nombre', label: 'Nombre', align: 'left' },
  { id: 'roleName', label: 'Rol asignado', align: 'left' },
  { id: 'cargo', label: 'Cargo', align: 'left' },
  { id: '' },
];

const TABLE_HEAD_CENTRO = [
  { id: 'usuario', label: 'Usuario', align: 'left' },
  { id: 'nombre', label: 'Nombre', align: 'left' },
  { id: 'roleName', label: 'Rol asignado', align: 'left' },
  { id: 'regional', label: 'Regional Educativa', align: 'left' },
  { id: 'distrito', label: 'Distrito Educativo', align: 'left' },
  { id: 'centro', label: 'Centro Educativo', align: 'left' },
  { id: 'cargo', label: 'Cargo', align: 'left' },
  { id: '' },
];

const TABLE_HEAD_DISTRITO = [
  { id: 'usuario', label: 'Usuario', align: 'left' },
  { id: 'nombre', label: 'Nombre', align: 'left' },
  { id: 'roleName', label: 'Rol asignado', align: 'left' },
  { id: 'regional', label: 'Regional Educativa', align: 'left' },
  { id: 'distrito', label: 'Distrito Educativo', align: 'left' },
  { id: 'cargo', label: 'Cargo', align: 'left' },
  { id: '' },
];

const TABLE_HEAD_REGIONAL = [
  { id: 'usuario', label: 'Usuario', align: 'left' },
  { id: 'nombre', label: 'Nombre', align: 'left' },
  { id: 'roleName', label: 'Rol asignado', align: 'left' },
  { id: 'regional', label: 'Regional Educativa', align: 'left' },
  { id: 'cargo', label: 'Cargo', align: 'left' },
  { id: '' },
];

const TABLE_HEAD_GENERAL = [
  { id: 'usuario', label: 'Usuario', align: 'left' },
  { id: 'nombre', label: 'Nombre', align: 'left' },
  { id: 'roleName', label: 'Rol asignado', align: 'left' },
  { id: 'comision', label: 'Comisión', align: 'left' },
  { id: 'cargo', label: 'Cargo', align: 'left' },
  { id: '' },
];

const fetchDataTable = async (usuario, rol) => {
  const response = await axios.get(`/api/USUARIOS/gestion/${usuario}/${rol}`);
  return response.data
};
// ----------------------------------------------------------------------

export default function UserListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { user } = useAuthContext();

  const { themeStretch } = useSettingsContext();
 
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([{usuario: '',  nombre: ''}]);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('Usuario');

  const [filterStatus, setFilterStatus] = useState('Admins');

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  function cedulaMask(value) {
    const cleanedValue = value.replace(/\D/g, '');
    const maskedValue = cleanedValue
      .replace(/^(\d{3})(\d{7})(\d{1})$/, '$1-$2-$3');
    return maskedValue;
  };

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterRole !== 'Usuario' || filterStatus !== 'Admins';

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.usuario !== id);
    setSelected([]);
    setTableData(deleteRow);

    axios.delete(`/api/USUARIOS/${id}`)
    .then(()=>{
      enqueueSnackbar(
        <span>
          El usuario <strong>{cedulaMask(id)}</strong> ha sido eliminado satisfactoriamente.
        </span>,
      );
    }).catch((error)=> console.log(error));

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.usuario));

    const data = selectedRows.map((row) => ({usuarios: row}));

    console.log(data);

    axios.delete('/api/USUARIOS/eliminarRegistros', {
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
    .then(()=>{
      enqueueSnackbar(
        <span>
          Se han eliminado los <strong>{selectedRows.length}</strong> usuarios seleccionados satisfactoriamente.
        </span>,
      );
      setSelected([]);
      setTableData(deleteRows);
    }).catch((error)=> console.log(error));

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };


  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('Usuario');
    setFilterStatus('Admins');
  };

  useEffect(() => {
    setFilterName('');
    setFilterRole('Usuario');
    fetchDataTable(user?.usuario, filterStatus).then((data) => {setTableData(data);});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  return (
    <>
      <Helmet>
        <title> Usuarios: Lista | SIGEL</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Registros de usuarios"
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            { name: 'Usuario', href: PATH_DASHBOARD.user.root },
            { name: 'Registros' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.user.nuevo}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Nuevo usuario
            </Button>
          }
        />

        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {ROLE_OPTIONS.map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            optionsRole={/* eslint-disable */
                          filterStatus === 'Admins' ? BUSCAR_POR_ADMINS 
                          : filterStatus === 'Voluntarios' ? BUSCAR_POR_GENERAL
                          : filterStatus === 'Técnico Regional' ? BUSCAR_POR_REGIONAL 
                          : filterStatus === 'Técnico Distrito' ? BUSCAR_POR_DISTRITO
                          : filterStatus === 'Usuarios de Centro' && BUSCAR_POR_CENTRO
                          /* eslint-enable */
                        }
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.usuario)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={/* eslint-disable */
                              filterStatus === 'Admins' ? TABLE_HEAD_ADMINS 
                              : filterStatus === 'Voluntarios' ? TABLE_HEAD_GENERAL
                              : filterStatus === 'Técnico Regional' ? TABLE_HEAD_REGIONAL 
                              : filterStatus === 'Técnico Distrito' ? TABLE_HEAD_DISTRITO
                              : filterStatus === 'Usuarios de Centro' && TABLE_HEAD_CENTRO
                              /* eslint-enable */
                            }
                  rowCount={dataFiltered.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.usuario)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row.usuario}
                        row={row}
                        selected={selected.includes(row.usuario)}
                        onSelectRow={() => onSelectRow(row.usuario)}
                        onDeleteRow={() => handleDeleteRow(row.usuario)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Borrar"
        content={
          <>
            ¿Está seguro que quiere eliminar estos <strong> {selected.length} </strong> usuarios?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Borrar
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterRole }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterRole === 'Usuario') 
  {
    inputData = inputData.filter(
      (user) => user.usuario.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }else if (filterRole === 'Nombre') 
  {
    inputData = inputData.filter(
      (user) => user.nombre.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }else if (filterRole === 'Rol asignado') 
  {
    inputData = inputData.filter(
      (user) => user.roleName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }else if (filterRole === 'Comisión') 
  {
    inputData = inputData.filter(
      (user) => user.comision.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }else if (filterRole === 'Cargo') 
  {
    inputData = inputData.filter(
      (user) => user.cargo.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }else if (filterRole === 'centro') 
  {
    inputData = inputData.filter(
      (user) => user.centro.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }else if (filterRole === 'distrito') 
  {
    inputData = inputData.filter(
      (user) => user.distrito.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }else
  {
    inputData = inputData.filter(
      (user) => user.regional.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  };

  return inputData;
}
