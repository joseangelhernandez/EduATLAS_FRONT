import _mock from '../_mock';

// ----------------------------------------------------------------------

export const countriesReformado = 
  {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "timezones": ['America/Aruba'],
          "name": 'Aruba',
          "country_code": 'AW',
          "capital": 'Oranjestad',
          "photo": 'https://example.com/image1.jpg',
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-70.372641, 18.851191]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "timezones": ['Asia/Kabul'],
          "name": 'Afghanistan',
          "country_code": 'AF',
          "capital": 'Kabul',
          "photo": 'https://example.com/image2.jpg',
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-70.352662, 18.837220]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "timezones": ['Africa/Luanda'],
          "name": 'Angola',
          "country_code": 'AO',
          "capital": 'Luanda',
          "photo": 'https://example.com/image3.jpg',
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-70.442673, 18.841769]
        }
      },
    ]
  }
