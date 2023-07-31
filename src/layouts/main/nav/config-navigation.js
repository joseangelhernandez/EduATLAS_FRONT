// routes
import { PATH_AUTH, PATH_PAGE } from '../../../routes/paths';
// config
import { PATH_AFTER_LOGIN } from '../../../config-global';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Inicio',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'Escuelas',
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_PAGE.escuelas,
  },
  {
    title: 'Sobre EduATLAS',
    path: '/pages',
    icon: <Iconify icon="eva:file-fill" />,
    children: [
      {
        items: [
          { title: 'Sobre EduATLAS', path: PATH_PAGE.comingSoon },
          { title: 'Contáctanos', path: PATH_PAGE.comingSoon },
          { title: 'Preguntas Frecuentes', path: PATH_PAGE.comingSoon },
        ],
      }
    ],
  },
  {
    title: 'Ministerio de Educación',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: 'https://ministeriodeeducacion.gob.do/',
  },
];

export default navConfig;
