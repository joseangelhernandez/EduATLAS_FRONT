import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Stack, Button, Typography, IconButton, InputAdornment } from '@mui/material';
// hooks
import useCountdown from '../../../../hooks/useCountdown';
// _mock
import { _socials } from '../../../../_mock/arrays';
// components
import Iconify from '../../../../components/iconify';
import { CustomTextField } from '../../../../components/custom-input';
// assets
import { ComingSoonIllustration } from '../../../../assets/illustrations';

// ----------------------------------------------------------------------

export default function HistorialAcademico() {
  const { days, hours, minutes, seconds } = useCountdown(new Date('07/07/2024 08:00'));

  return (
    <Stack pt={10} pl={5} pr={5}>
      <Helmet>
        <title> Muy pronto | EduATLAS</title>
      </Helmet>

      <Typography variant="h3" paragraph>
        ¡Estamos trabajando arduamente para acercarles la educación!
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        Muy pronto vivirás lo que es verdaderamente educación calidad, personalizada e inclusiva, el motor del desarrollo de la República Dominicana.
      </Typography>

      <ComingSoonIllustration sx={{ my: 10, height: 240 }} />

      <Stack
        direction="row"
        justifyContent="center"
        divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
        sx={{ typography: 'h2' }}
      >
        <TimeBlock label="Días" value={days} />

        <TimeBlock label="Horas" value={hours} />

        <TimeBlock label="Minutos" value={minutes} />

        <TimeBlock label="Segundos" value={seconds} />
      </Stack>

      <CustomTextField
        fullWidth
        placeholder="Introduce tu correo electrónico"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" size="large">
                Avísame
              </Button>
            </InputAdornment>
          ),
          sx: { pr: 0.5 },
        }}
        sx={{ my: 5 }}
      />

      <Stack spacing={1} alignItems="center" justifyContent="center" direction="row">
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              '&:hover': {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

TimeBlock.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

function TimeBlock({ label, value }) {
  return (
    <div>
      <Box> {value} </Box>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  );
}