import PropTypes from 'prop-types';
import { useState, useCallback, memo, useRef, useEffect } from 'react';
import Map, {Layer, Source} from 'react-map-gl';
// @mui
import { Box, Typography } from '@mui/material';
// components
import Image from '../../../../../components/image';
import { MapControl, MapPopup, MapMarker, } from '../../../../../components/map';
//
import ControlPanel from './ControlPanel';
import { clusterLayer, clusterCountLayer } from '../clusters/layers';
import { countriesReformado } from '../../../../../_mock/map/countriesReformado'
import { centros } from '../../../../../_mock/map/centrosEducativos'

// ----------------------------------------------------------------------

MapChangeTheme.propTypes = {
  themes: PropTypes.object,
  selectTheme: PropTypes.any,
  data: PropTypes.array,
};

function MapChangeTheme({ data, selectTheme, themes, ...other }) {
  const [VisibleMarkers, setVisibleMarkers] = useState('');
  const [popupInfo, setPopupInfo] = useState(null);
  const [activarMarks, setActivarMarks] = useState(false);
  const [nuevaDataCentros, setNuevaDataCentros] = useState({});

  const mapRef = useRef(null);


  useEffect(()=>{
    setNuevaDataCentros({
      "type": "FeatureCollection",
      "features": centros.map((centro) => ({
        "type": "Feature",
        "properties": {
          "Regional": centro.Regional,
          "Distrito": centro.Distrito,
          "Centros": centro.Centros,
          "Sector": centro.Sector,
          "Nivel": centro.Nivel,
          "Matricula": centro.Matricula,
          "Planta": centro.Planta,
          "Provincia": centro.Provincia,
          "Municipio": centro.Municipio,
        },
        "geometry": {
          "type": "Point",
          "coordinates": [Number(centro.Longitud), Number(centro.Latitud)]
        }
      }))
    })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  };

  return (
    <>
      <Map
        initialViewState={{
          latitude: 18.851191,
          longitude: -70.372641,
          zoom: 7.5,
          bearing: 0,
          pitch: 0,
          minZoom: 7.5,
          maxZoom: 15,
        }}
        dragRotate={false}
        doubleClickZoom={false}
        onZoom={(e)=>{
          if(e.viewState.zoom > 12){
            setActivarMarks(true)
          }else{
            setActivarMarks(false)
          }
        }}
        onMove={(e) => {
          const { latitude, longitude, zoom } = e.viewState;
          const radius = 3.5;
          const visibleMarkers = nuevaDataCentros.features.filter((Feature) => {
            const [markerLon, markerLat] = Feature.geometry.coordinates;
            const distance = getDistance(latitude, longitude, markerLat, markerLon);
            return distance <= radius;
          });
          setVisibleMarkers(visibleMarkers);
        }}
        mapStyle={themes?.[selectTheme]}
        interactiveLayerIds={[clusterLayer.id || '']}
        ref={mapRef}
        {...other}
      >
        <MapControl />

        <Source
          id="earthquakes"
          type="geojson"
          data={nuevaDataCentros}
          cluster
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          
        </Source>

        
        {activarMarks && VisibleMarkers?.map((Feature, index) => {
          if (!Number.isNaN(Feature.geometry?.coordinates[1]) && !Number.isNaN(Feature.geometry?.coordinates[0])) {
            return (
              <MapMarker
                key={`marker-${index}`}
                latitude={Feature.geometry.coordinates[1]}
                longitude={Feature.geometry.coordinates[0]}
                onClick={(event) => {
                  event.originalEvent.stopPropagation();
                  setPopupInfo(Feature);
                }}
              />
            );
          } 
            console.warn(`Coordinates are NaN at index: ${index}, Centro: ${Feature.properties.Centros}`);
          return null;
        })}



        {popupInfo && (
          <MapPopup
            latitude={popupInfo.geometry.coordinates[1]}
            longitude={popupInfo.geometry.coordinates[0]}
            onClose={() => setPopupInfo(null)}
          >
            <Box sx={{ color: 'common.white' }}>
              <Box
                sx={{
                  mb: 1,
                  display: 'flex',
                  mr: 2
                }}
              >
                <Box
                  sx={{
                    height: '18px',
                    borderRadius: '4px',
                  }}
                />
                <Typography variant="subtitle2">{popupInfo.properties.Centros}</Typography>
              </Box>

              <Typography component="div" variant="caption">
                Matricula: {popupInfo.properties.Matricula}
              </Typography>

            </Box>
          </MapPopup>
        )}
      </Map>
    </>
  );
}

export default memo(MapChangeTheme);
