import { useLocation, Outlet } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, AppBar, Toolbar,Container } from '@mui/material';
// utils
import { bgBlur } from '../../utils/cssStyles';
//
import Footer from './Footer';
import Header from './Header';
import EducationHeader from './EducationHeader';
// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();

  const isHome = pathname === '/';

  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>

      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 30, md: 30 },
          }),
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
