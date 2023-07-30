import PropTypes from 'prop-types';
import { useState, useCallback, memo } from 'react';
import Map from 'react-map-gl';
// components
import { MapControl } from '../../../../../components/map';
//
import ControlPanel from './ControlPanel';

// ----------------------------------------------------------------------

MapChangeTheme.propTypes = {
  themes: PropTypes.object,
  selectTheme: PropTypes.any,
};

function MapChangeTheme({ selectTheme, themes, ...other }) {
  return (
    <>
      <Map
        initialViewState={{
          latitude: 18.851191,
          longitude: -70.372641,
          zoom: 7.5,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle={themes?.[selectTheme]}
        {...other}
      >
        <MapControl />
      </Map>
    </>
  );
}

export default memo(MapChangeTheme);
