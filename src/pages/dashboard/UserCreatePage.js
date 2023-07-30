import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Usuario: Crear un nuevo usuario | SIGEL</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Crear nuevo usuario"
          links={[
            {
              name: 'Inicio',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Usuario',
              href: PATH_DASHBOARD.user.registros,
            },
            { name: 'Nuevo usuario' },
          ]}
        />
        <UserNewEditForm />
      </Container>
    </>
  );
}
