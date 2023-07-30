import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Radio, Typography, RadioGroup, FormControlLabel, Stack } from '@mui/material';
// components
import { StyledControlPanel } from '../../../../../components/map';

// ----------------------------------------------------------------------

ControlPanel.propTypes = {
  themes: PropTypes.object,
  selectTheme: PropTypes.string,
  onChangeTheme: PropTypes.func,
};

function ControlPanel({ themes, selectTheme, onChangeTheme }) {
  return (
    <StyledControlPanel>
      <Typography gutterBottom variant="subtitle2" sx={{ color: 'common.white' }}>
        Seleccionar tema:
      </Typography>

      
        <RadioGroup value={selectTheme} onChange={(event, value) => onChangeTheme(value)}>
        <Stack direction={{ xs: 'column', sm: 'row' }}>
          {Object.keys(themes).map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={<Radio size="small" />}
              label={item}
              sx={{ color: 'common.white', textTransform: 'capitalize' }}
            />
          ))}
        </Stack>
        </RadioGroup>

    </StyledControlPanel>
  );
}

export default memo(ControlPanel);
