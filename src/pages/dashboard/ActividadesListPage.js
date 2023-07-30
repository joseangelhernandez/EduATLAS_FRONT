import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useEffect, useState, useCallback } from 'react';
import sumBy from 'lodash/sumBy';
// fecha
import moment from 'moment';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Await, Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Tab,
  Tabs,
  Card,
  Stack,
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
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import { IconButtonAnimate } from '../../components/animate';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import ActividadesPDF from '../../sections/@dashboard/actividades/list/ActividadesPDF';

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
import ActividadesAnalytic from '../../sections/@dashboard/actividades/list/ActividadesAnalytic'
import { ActividadesTableRow, ActividadesTableToolbar } from '../../sections/@dashboard/actividades/list';

// ----------------------------------------------------------------------

const OPCIONES_DE_FILTRO_BUSQUEDA =  [
  'Tipo de actividad',
  'Actividad',
  'Responsable',
];

const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'tipo_actividad', label: 'Tipo de actividad', align: 'left' },
  { id: 'actividad', label: 'Descripción de la actividad', align: 'left' },
  { id: 'presupuesto', label: 'Presupuesto', align: 'left' },
  { id: 'responsable', label: 'Responsable', align: 'left' },
  { id: 'fecha_inicio', label: 'Fecha de inicio', align: 'left' },
  { id: 'fecha_final', label: 'Fecha de finalización', align: 'left' },
  { id: 'ejecutada', label: 'Ejecutada', align: 'left' },
  { id: '', label: '', align: 'center' },
];

async function fetchData() {
  const response = await axios.get('/api/ACTIVIDADES/');
  return response.data
};

// ----------------------------------------------------------------------

export default function ActividadesListPage() {
  const {user}=useAuthContext();

  const theme = useTheme();

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

  const ListaActividades = [
    {
      id:'',
      tipo_actividad:'',
      actividad:'',
      presupuesto:'',
      responsable:'',
      fecha_inicio:'',
      fecha_final:'',
      ejecutada: '',
    },
  ];


  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [currentStudent, setCurrentStudent] = useState(null);

  const [tableData, setTableData] = useState(ListaActividades);

  const [openConfirm, setOpenConfirm] = useState(false);

  // ESTADOS QUE MANEJAN LOS FILTROS DE COLUMNAS
  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const [filterName, setFilterName] = useState('');

  const [filterStatus, setFilterStatus] = useState('TODAS');

  const [filterPor, setFilterPor] = useState('Tipo de actividad');

  // ANALITICAS

  const getLengthByStatus = (status) => {
    if (status === 'PRÓXIMAS') {
      return  tableData.filter((actividad) => moment(actividad.fecha_final).format('DD-MMM-YYYY') > moment(Date.now()).format('DD-MMM-YYYY') 
        || moment(actividad.fecha_final).format('DD-MMM-YYYY') === moment(Date.now()).format('DD-MMM-YYYY')).length;
    };
    
    if(status === 'PASADAS'){
      return tableData.filter((actividad) => moment(actividad.fecha_final).format('DD-MMM-YYYY') < moment(Date.now()).format('DD-MMM-YYYY')).length;
    };

    if(status === 'ejecutada'){
      return tableData.filter((actividad) => actividad.ejecutada === true).length
    }

    if(status === 'NO EJECUTADAS'){
      return tableData.filter((actividad) => actividad.ejecutada === false).length
    }

    return tableData.length;
  };


  const getTotalPriceByStatus = (status) =>
  {
    if (status === 'PRÓXIMAS') {
      return  sumBy(tableData.filter((actividad) => moment(actividad.fecha_final).format('DD-MMM-YYYY') > moment(Date.now()).format('DD-MMM-YYYY') 
        || moment(actividad.fecha_final).format('DD-MMM-YYYY') === moment(Date.now()).format('DD-MMM-YYYY')),
          'presupuesto'
        );
    };
    
    if(status === 'PASADAS'){
      return sumBy(
        tableData.filter((actividad) => moment(actividad.fecha_final).format('DD-MMM-YYYY') < moment(Date.now()).format('DD-MMM-YYYY')),
        'presupuesto'
      );
    };

    if(status === 'ejecutada'){
      return sumBy(
        tableData.filter((actividad) => actividad.ejecutada === true),
        'presupuesto'
      );
    }

    return sumBy(tableData, 'presupuesto');
  }

  const getPercentByStatus = (status) => (getLengthByStatus(status) / tableData.length) * 100;


  async function handleData() {
    const data = await fetchData();
    setTableData(data);
  }

  useEffect(()=>{
    handleData();
    // eslint-disable-next-line
  },[])


  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
    filterPor,
    filterStartDate,
    filterEndDate,
    User_roleId: user?.roleId,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterStatus !== 'TODAS' || filterPor !== 'Tipo de actividad' ||
  (!!filterStartDate && !!filterEndDate);

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus)||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

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
    setFilterPor('Tipo de actividad');
    setFilterStatus('TODAS');
    setFilterEndDate(null);
    setFilterStartDate(null);
  };

  const STATUS_OPTIONS = [
    { value: 'TODAS', label: 'TODAS', color: 'info', count: tableData.length },
    { value: 'PRÓXIMAS', label: 'PRÓXIMAS', color: 'warning', count: getLengthByStatus('PRÓXIMAS') },
    { value: 'PASADAS', label: 'PASADAS', color: 'error', count: getLengthByStatus('PASADAS') },
    { value: 'NO EJECUTADAS', label: 'NO EJECUTADAS', color: 'default', count: getLengthByStatus('NO EJECUTADAS') },
  ];

  const handleEjecutar = () =>{
    handleData();
  };

  return (
    <>
      <Helmet>
        <title> Actividades: Cronograma | SIGEL</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Cronograma de actividades"
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            { name: 'Actividades', href: PATH_DASHBOARD.actividades.cronograma },
            { name: 'Cronograma' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.actividades.nueva}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Nueva Actividad
            </Button>
          }
        />

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <ActividadesAnalytic
                title="Total"
                total={tableData.length}
                percent={100}
                price={parseFloat(sumBy(tableData, 'presupuesto'))}
                icon="material-symbols:calendar-month-rounded"
                color={theme.palette.info.main}
              />

              <ActividadesAnalytic
                title="Ejecutadas"
                total={getLengthByStatus('ejecutada')}
                percent={getPercentByStatus('ejecutada')}
                price={parseFloat(getTotalPriceByStatus('ejecutada'))}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />

              <ActividadesAnalytic
                title="Próximas"
                total={getLengthByStatus('PRÓXIMAS')}
                percent={getPercentByStatus('PRÓXIMAS')}
                price={parseFloat(getTotalPriceByStatus('PRÓXIMAS'))}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />

              <ActividadesAnalytic
                title="Pasadas"
                total={getLengthByStatus('PASADAS')}
                percent={getPercentByStatus('PASADAS')}
                price={parseFloat(getTotalPriceByStatus('PASADAS'))}
                icon="eva:bell-fill"
                color={theme.palette.error.main}
              />
            </Stack>
          </Scrollbar>
        </Card>

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
              <Tab 
                key={tab.value} 
                label={tab.label} 
                value={tab.value} 
                icon={
                  <Label color={tab.color} sx={{ mr: 1 }}>
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <Divider />

          <ActividadesTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
            onFilterPor={handleFilterPor}
            userRole={user?.roleId}
            opcionesFiltrado={OPCIONES_DE_FILTRO_BUSQUEDA}
            filterPor={filterPor}
            filterEndDate={filterEndDate}
            filterStartDate={filterStartDate}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue.$d);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue.$d);
            }}
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
                    document={<ActividadesPDF estudiantes={dataFiltered.filter((row) => selected.includes(row.id))}/>}
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
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 400 }}>
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
                      <ActividadesTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onConfirmar={() => handleEjecutar()}
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
            ¿Desea eliminar <strong> {selected.length} </strong> actividades?
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

function applyFilter({ 
  inputData, 
  comparator, 
  filterName, 
  filterStatus, 
  filterPor, 
  User_roleId,   
  filterStartDate, 
  filterEndDate
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if(filterPor === 'Tipo de actividad'){
    if (filterName) {
      inputData = inputData.filter(
        (actividad) => actividad.tipo_actividad.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    }
  }else if(filterPor === 'Actividad'){
    if (filterName) {
      inputData = inputData.filter(
        (actividad) => actividad.actividad.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    };
  }else if(filterPor === 'Responsable'){
    if (filterName) {
      inputData = inputData.filter(
        (actividad) => actividad.responsable.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    }
  }

  if (filterStatus === 'PRÓXIMAS') {
    inputData = inputData.filter((actividad) => moment(actividad.fecha_final).format('DD-MMM-YYYY') > moment(Date.now()).format('DD-MMM-YYYY') 
    || moment(actividad.fecha_final).format('DD-MMM-YYYY') === moment(Date.now()).format('DD-MMM-YYYY'));
  }else if(filterStatus === 'PASADAS'){
    inputData = inputData.filter((actividad) => moment(actividad.fecha_final).format('DD-MMM-YYYY') < moment(Date.now()).format('DD-MMM-YYYY'));
  }else if(filterStatus === 'NO EJECUTADAS'){
    inputData = inputData.filter((actividad) => actividad.ejecutada === false)
  };

  if (filterStartDate && filterEndDate) {
    inputData = inputData.filter(
      (actividad) =>
        moment(actividad.fecha_inicio).format('DD-MM-YYYY') >= moment(filterStartDate).format('DD-MM-YYYY') &&
        moment(actividad.fecha_final).format('DD-MM-YYYY') <= moment(filterEndDate).format('DD-MM-YYYY')
    );
  }

  return inputData;
}
