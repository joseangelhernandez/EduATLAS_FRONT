// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  student: icon('student-duotone'),
  actividad: icon('ic_actividad'),
  volunteer: icon('ic_volunteer'),
  addStudent: icon('ic_addStudent'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'Inicio', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'Análisis de Educación', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'Ocupaciones escolares', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
      { title: 'Análisis de Documentos', path: PATH_DASHBOARD.general.file, icon: ICONS.file },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'gestión',
    items: [
      // USER
      {
        title: 'usuarios',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'perfil', path: PATH_DASHBOARD.user.perfil },
          { title: 'perfiles', path: PATH_DASHBOARD.user.cards },
          { title: 'registros', path: PATH_DASHBOARD.user.registros },
          { title: 'crear', path: PATH_DASHBOARD.user.nuevo },
          { title: 'cuenta', path: PATH_DASHBOARD.user.cuenta },
        ],
      },

      // ESTUDIANTES
      {
        title: 'estudiantes',
        path: PATH_DASHBOARD.estudiante.root,
        icon: ICONS.student,
        children: [
          { title: 'registrar', path: PATH_DASHBOARD.estudiante.nuevo },
          { title: 'registros', path: PATH_DASHBOARD.estudiante.registros },
          { title: 'solicitudes', path: PATH_DASHBOARD.estudiante.solicitudes },
        ],
      },

      // ACTIVIDADES
      {
        title: 'actividades',
        path: PATH_DASHBOARD.actividades.root,
        icon: ICONS.actividad,
        children: [
          { title: 'crear', path: PATH_DASHBOARD.actividades.nueva },
          { title: 'cronograma', path: PATH_DASHBOARD.actividades.cronograma },
        ],
      },

      // E-COMMERCE
      {
        title: 'Gestión Inteligente',
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.cart,
        children: [
          { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
          { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
          { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
          { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
          { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
          { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
        ],
      },

      // BLOG
      {
        title: 'Entradas',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'post', path: PATH_DASHBOARD.blog.demoView },
          { title: 'create', path: PATH_DASHBOARD.blog.new },
        ],
      },
      {
        title: 'Gestión de Documentos educativos',
        path: PATH_DASHBOARD.fileManager,
        icon: ICONS.folder,
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      {
        title: 'Bandeja de entrada',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        info: <Label color="error">+32</Label>,
      },
      {
        title: 'Chat',
        path: PATH_DASHBOARD.chat.root,
        icon: ICONS.chat,
      },
      {
        title: 'Calendario escolar',
        path: PATH_DASHBOARD.calendar,
        icon: ICONS.calendar,
      },
      {
        title: 'Lista de pendientes',
        path: PATH_DASHBOARD.kanban,
        icon: ICONS.kanban,
      },
    ],
  },
];

export default navConfig;
