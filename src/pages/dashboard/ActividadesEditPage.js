import { useEffect,useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import axios from '../../utils/axios';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import EstudianteNewEditForm from '../../sections/@dashboard/Estudiante/EstudianteNewEditForm';

// ----------------------------------------------------------------------

export default function StudentEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const [currentStudent, setCurrentStudent] = useState(null);
  const [nombreCompleto, setNombreCompleto] = useState('');

  useEffect(()=>{
    axios.get(`/api/SIGEL_ESTUDIANTES/${id}`).then((response)=>{
      setCurrentStudent(response.data);
      // eslint-disable-next-line
      setNombreCompleto(response.data?.nombres + ' ' + response.data?.apellidos);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Helmet>
        <title> Estudiantes: Editar estudiante | SIGEL</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Editar estudiante"
          links={[
            {
              name: 'Inicio',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Estudiantes',
              href: PATH_DASHBOARD.estudiante.registros,
            },
            { name: nombreCompleto},
          ]}
        />

        {currentStudent !== null 
        && <EstudianteNewEditForm isEdit currentStudent={currentStudent} />}
      </Container>
    </>
  );
}
