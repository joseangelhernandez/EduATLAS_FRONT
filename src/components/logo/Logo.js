import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, Tooltip } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 60,
        height: 'auto',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <Tooltip title='EduATLAS' placement="left">
        <svg id="a" width='100%' height='100%' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <defs>
          <style>
          {`
            .ww{fill:#f9ac06;}
            .zz{fill:#5dd9d7;}
            .nn{fill:#f3533d;}
            .mm{fill:#3145ff;}

          `}
          </style>
        </defs>
        <rect className="ww" x="72.33391" y="173.17239" width="94.48735" height="294.89814"/>
        <rect className="nn" x="208.75633" y="-94.11136" width="94.48735" height="370.56899" transform="translate(347.17314 -164.82686) rotate(90)"/>
        <rect className="zz" x="209.56553" y="173.17239" width="94.48735" height="294.89814"/>
        <rect className="mm" x="346.79715" y="173.17239" width="94.48735" height="294.89814"/>
        </svg>
      </Tooltip>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} to="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
