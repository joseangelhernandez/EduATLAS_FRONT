import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  company: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string,
  quote: PropTypes.string,
  role: PropTypes.string,
  school: PropTypes.string,
};

export default function ProfileAbout({ quote, country, email, role, company, school }) {
  return (
    <Card>
      <CardHeader title="Información general" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{quote}</Typography>

        <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />

          <Typography variant="body2">
            Estudia en &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              INSTITUTO POLITÉCNICO LOYOLA
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:email-fill" />
          <Typography variant="body2">usuario@correo.com.do</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:round-business-center" />

          <Typography variant="body2">
            Última participación en &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              Olimpiada de Programación 2023 MINERD
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:round-business-center" />

          <Typography variant="body2">
            Fortaleza &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              STEM
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
