import PropTypes from 'prop-types';
// @mui
import { Stack } from '@mui/material';
//
import NavList from './NavList';

// ----------------------------------------------------------------------

NavDesktop.propTypes = {
  data: PropTypes.array,
  isOffset: PropTypes.bool,
  offset: PropTypes.number,
};

export default function NavDesktop({ isOffset, data, offset }) {
  return (
    <Stack component="nav" direction="row" spacing={5} sx={{ mr: 5, height: 1 }}>
      {data.map((link) => (
        <NavList key={link.title} item={link} isOffset={isOffset} offset={offset}/>
      ))}
    </Stack>
  );
}
