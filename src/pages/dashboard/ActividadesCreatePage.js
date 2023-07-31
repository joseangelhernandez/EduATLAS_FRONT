import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import ActividadesNewEditForm from '../../sections/@dashboard/actividades/ActividadesNewEditForm';

// ----------------------------------------------------------------------

export default function ActividadesCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Actividades | EduATLAS</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Registrar nueva actividad"
          links={[
            {
              name: 'Inicio',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Actividades',
              href: PATH_DASHBOARD.actividades.cronograma,
            },
            { name: 'Nueva actividad' },
          ]}
        />
        <ActividadesNewEditForm />
      </Container>
    </>
  );
}
