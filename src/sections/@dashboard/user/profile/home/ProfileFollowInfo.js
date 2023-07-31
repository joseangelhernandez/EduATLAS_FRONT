import PropTypes from 'prop-types';
// @mui
import { Card, Stack, Typography, Divider } from '@mui/material';
// utils
import { fNumber } from '../../../../../utils/formatNumber';

// ----------------------------------------------------------------------

ProfileFollowInfo.propTypes = {
  follower: PropTypes.number,
  following: PropTypes.number,
  liderazgo: PropTypes.number,
};

export default function ProfileFollowInfo({ follower, following, liderazgo }) {
  return (
    <>
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(follower)}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Compañeros
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(following)}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Amigos
          </Typography>
        </Stack>
      </Stack>
    </Card>
    <Card sx={{ py: 3 }}>
    <Stack direction="row">
      <Stack width={1} textAlign="center">
        <Typography variant="h3" color="#29C300">{fNumber(liderazgo)}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ÍNDICE DE LIDERAZGO
        </Typography>
      </Stack>
    </Stack>
  </Card>
  </>
  );
}
