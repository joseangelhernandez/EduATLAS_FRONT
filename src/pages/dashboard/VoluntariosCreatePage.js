import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import EstudianteNewEditForm from '../../sections/@dashboard/Estudiante/EstudianteNewEditForm';

// ----------------------------------------------------------------------

export default function StudentCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Estudiantes: Registrar nuevo estudiante | SIGEL</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Registrar nuevo estudiante"
          links={[
            {
              name: 'Inicio',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Estudiantes',
              href: PATH_DASHBOARD.estudiante.registros,
            },
            { name: 'Nuevo estudiante' },
          ]}
        />
        <EstudianteNewEditForm />
      </Container>
    </>
  );
}
