import { Helmet } from 'react-helmet-async';
// sections
import Delegado from '../../sections/inscripciones/Delegado';

// ----------------------------------------------------------------------

export default function DelegadoPage() {
  return (
    <>
      <Helmet>
        <title> Inscribir estudiante | EduATLAS</title>
      </Helmet>

      <Delegado />
    </>
  );
}