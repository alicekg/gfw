import basemaps, { labels } from './components/basemaps/basemaps-schema';

export default {
  hidePanels: false,
  center: {
    lat: 27,
    lng: 12
  },
  zoom: 3,
  zoomControl: false,
  maxZoom: 19,
  minZoom: 2,
  basemap: basemaps.default,
  label: labels.default,
  attributionControl: false,
  layers: [
    {
      dataset: '70e2549c-d722-44a6-a8d7-4a385d78565e',
      layers: ['3b22a574-2507-4b4a-a247-80057c1a1ad4'],
      opacity: 1,
      visibility: true
    },
    {
      dataset: '897ecc76-2308-4c51-aeb3-495de0bdca79',
      layers: ['c3075c5a-5567-4b09-bc0d-96ed1673f8b6'],
      opacity: 1,
      visibility: true
    },
    {
      dataset: '044f4af8-be72-4999-b7dd-13434fc4a394',
      layers: ['78747ea1-34a9-4aa7-b099-bdb8948200f4'],
      opacity: 1,
      visibility: true
    }
  ]
};
