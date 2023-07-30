import { Helmet } from 'react-helmet-async';
// sections
import Voluntario from '../../sections/inscripciones/Voluntario';

// ----------------------------------------------------------------------

export default function VoluntarioPage() {
  return (
    <>
      <Helmet>
        <title> Colaborar como voluntario | SIGEL</title>
      </Helmet>

      <Voluntario />
    </>
  );
}
