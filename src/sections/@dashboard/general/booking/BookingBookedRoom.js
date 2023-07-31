import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Card, CardHeader, Typography, Stack, LinearProgress, Box } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

BookingBookedRoom.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function BookingBookedRoom({ title, subheader, data, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ px: 3, my: 5 }}>
        {data.map((progress) => (
          <LinearProgress
            variant="determinate"
            key={progress.status}
            value={progress.value}
            color={
              (progress.status === 'En proceso' && 'warning') ||
              (progress.status === 'Cambios' && 'error') ||
              'success'
            }
            sx={{ height: 8, bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16) }}
          />
        ))}
      </Stack>

      <Stack direction="row" justifyContent="space-between" sx={{ px: 3, pb: 3 }}>
        {data.map((progress) => (
          <Stack key={progress.status} alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: 0.5,
                  bgcolor: 'success.main',
                  ...(progress.status === 'En proceso' && { bgcolor: 'warning.main' }),
                  ...(progress.status === 'Cambios' && { bgcolor: 'error.main' }),
                }}
              />

              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                {progress.status}
              </Typography>
            </Stack>

            <Typography variant="h6">{fShortenNumber(progress.quantity)}</Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
