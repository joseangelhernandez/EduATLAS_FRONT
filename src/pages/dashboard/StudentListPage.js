import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useEffect, useState, useCallback } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Await, Link as RouterLink, useNavigate } from 'react-router-dom';
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
  CircularProgress,
} from '@mui/material';
import { width } from '@mui/system';
import { da } from 'date-fns/locale';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// utils
import axios from '../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _userList } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import { IconButtonAnimate } from '../../components/animate';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import RegistosPDF from '../../sections/@dashboard/estudiantes_registros/RegistosPDF';

//
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
import { StudentTableRow, StudentTableToolbar } from '../../sections/@dashboard/estudiantes_registros/list';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['TODOS', 'REGIONAL', 'DISTRITAL'];

const ROLE_OPTIONS = [
  'TODOS',
  '01 - BARAHONA',
  '02 - SAN JUAN DE LA MAGUANA',
  '03 - AZUA',
  '04 - SAN CRISTOBAL',
  '05 - SAN PEDRO DE MACORIS',
  '06 - LA VEGA',
  '07 - SAN FRANCISCO DE MACORIS',
  '08 - SANTIAGO',
  '09 - MAO',
  '10 - SANTO DOMINGO',
  '11 - PUERTO PLATA',
  '12 - HIGUEY',
  '13 - MONTE CRISTI',
  '14 - NAGUA',
  '15 - SANTO DOMINGO',
  '16 - COTUI',
  '17 - MONTE PLATA',
  '18 - BAHORUCO',
  'DELEGACIÓN INTERNACIONAL',
];

const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'nombres', label: 'Nombres', align: 'left' },
  { id: 'apellidos', label: 'Apellidos', align: 'left' },
  { id: 'sexo', label: 'Sexo', align: 'left' },
  { id: 'etapa', label: 'Etapa', align: 'left' },
  { id: 'grado', label: 'Grado', align: 'left' },
  { id: 'regional', label: 'Regional Educativa', align: 'left' },
  { id: 'distrito', label: 'Distrito Educativo', align: 'left' },
  { id: 'centro_educativo', label: 'Centro Educativo', align: 'left' },
  { id: 'telefono', label: 'Teléfono', align: 'left' },
  { id: 'correo', label: 'Email', align: 'left' },
  { id: 'fecha_nacimiento', label: 'Fecha de Nacimiento', align: 'left'},
  { id: '', label: '', align: 'center' },
];


async function fetchData() {
  const response = await axios.get('/api/SIGEL_ESTUDIANTES/OFICIAL');
  const responseStudents = response.data;
  return responseStudents
};

async function fetchDataDistritos(regional) {
  const response = await axios.get(`/api/DISTRITOS_EDUCATIVOS/${regional}`);
  const Distritos_List = response.data;
  return Distritos_List
};

async function fetchDataCentros(distrito) {
  const response = await axios.get(`/api/CENTROS_EDUCATIVOS/${distrito}`);
  const Centros_List = response.data;
  return Centros_List
};

// ----------------------------------------------------------------------

export default function StudentListPage() {
  const {user}=useAuthContext();

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

  const [ROLE_OPTIONS_TECNICOS, setROLE_OPTIONS_TECNICOS] = useState([
    'TODOS',
  ]);

  const ListaEstudiantes = [
    {
      id:'',
      nombres:'',
      apellidos:'',
      sexo:'',
      etapa:'',
      fecha_nacimiento:'',
      grado:'',
      regional:'',
      distrito:'',
      centro_educativo:'',
      telefono:'',
      correo:'',
      img_url:'' 
    },
  ];


  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [currentStudent, setCurrentStudent] = useState(null);

  const [tableData, setTableData] = useState(ListaEstudiantes);

  const [openConfirm, setOpenConfirm] = useState(false);

  // ESTADOS QUE MANEJAN LOS FILTROS DE COLUMNAS
  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('TODOS');

  const [filterStatus, setFilterStatus] = useState('TODOS');

  const [filterPor, setFilterPor] = useState('Nombres');

  const OPCIONES_DE_FILTRO_BUSQUEDA = user?.roleId === 'Super User' || user?.roleId === 'Admin' || user?.roleId === 'Tecnico Regional' ? [
    'Nombres',
    'Apellidos',
    'Grado académico',
    'Distrito', 
    'Centro educativo',
  ] : [
    'Nombres',
    'Apellidos',
    'Grado académico',
  ];


  async function handleData() {
    const data = await fetchData();
    setTableData(data);
  }

  const handleOpcionesdistritos = async()=>{
    const dataDistritos = await fetchDataDistritos(user?.user.regional);
    setROLE_OPTIONS_TECNICOS(dataDistritos);
  };

  const handleOpcionesCentros = async()=>{
    const dataCentros = await fetchDataDistritos(user?.user.regional);
    setROLE_OPTIONS_TECNICOS(dataCentros);
  };
  
  useEffect(()=>{
    handleData();

    if(user?.roleId === 'Tecnico Regional'){
      handleOpcionesdistritos();
    }else if(user?.roleId === 'Tecnico Distrito'){
      handleOpcionesCentros();
    };
  
    // eslint-disable-next-line
  },[])


  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
    filterPor,
    User_roleId: user?.roleId,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterRole !== 'TODOS' || filterStatus !== 'TODOS' || filterPor !== 'Nombres';

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

  const handleFilterPor = (event) => {
    setPage(0);
    setFilterPor(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows) => {
    console.log(tableData.filter((row) => selectedRows.includes(row.id)));

    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);

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

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.estudiante.editar(id));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('TODOS');
    setFilterStatus('TODOS');
  };

  return (
    <>
      <Helmet>
        <title> Estudiantes: Registros | SIGEL</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Registros de estudiantes"
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            { name: 'Estudiantes', href: PATH_DASHBOARD.estudiante.registros },
            { name: 'Registro' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.estudiante.nuevo}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Nuevo Estudiante
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
            {STATUS_OPTIONS.map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <StudentTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            optionsRole={ROLE_OPTIONS}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
            onFilterPor={handleFilterPor}
            userRole={user?.roleId}
            opcionesFiltrado={OPCIONES_DE_FILTRO_BUSQUEDA}
            filterPor={filterPor}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <>
                  <PDFDownloadLink
                    document={<RegistosPDF estudiantes={dataFiltered.filter((row) => selected.includes(row.id))}/>}
                    fileName="EXPORTACION PDF"
                    options={{
                      orientation: 'landscape',
                    }}
                    style={{ textDecoration: 'none' }}
                  >
                    {({ loading }) => (
                      <Tooltip title="Descargar PDF">
                        <IconButtonAnimate 
                          size="large" 
                          color="primary"
                        >
                          {loading ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : (
                            <Iconify fontSize="inherit" icon="ic:round-picture-as-pdf"  />
                          )}
                        </IconButtonAnimate>
                      </Tooltip>
                    )}
                  </PDFDownloadLink>
                  <Tooltip title="Eliminar">
                    <IconButton color="error" onClick={handleOpenConfirm}>
                      <Iconify icon="eva:trash-2-outline" />
                    </IconButton>
                  </Tooltip>
                </>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 1800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <StudentTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
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
        title="Eliminar"
        content={
          <>
            ¿Desea eliminar <strong> {selected.length} </strong> registros?
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
            Eliminar
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterStatus, filterRole, filterPor, User_roleId }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if(filterPor === 'Nombres'){
    if (filterName) {
      inputData = inputData.filter(
        (estudiante) => estudiante.nombres.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    }
  }else if(filterPor === 'Apellidos'){
    if (filterName) {
      inputData = inputData.filter(
        (estudiante) => estudiante.apellidos.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    };
  }else if(filterPor === 'Grado académico'){
    if (filterName) {
      inputData = inputData.filter(
        (estudiante) => estudiante.grado.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    }
  }else if(filterPor === 'Distrito'){
    if (filterName) {
      inputData = inputData.filter(
        (estudiante) => estudiante.distrito.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    }
  }else if(filterPor === 'Centro educativo'){
    if (filterName) {
      inputData = inputData.filter(
        (estudiante) => estudiante.centro_educativo.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    };
  };

  if (filterStatus !== 'TODOS') {
    inputData = inputData.filter((estudiante) => estudiante.etapa === filterStatus);
  };

  if (filterRole !== 'TODOS') {
    inputData = inputData.filter((estudiante) => estudiante.regional === filterRole);
  };

  return inputData;
}
