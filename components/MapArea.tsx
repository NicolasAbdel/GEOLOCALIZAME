import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, MAP_CENTER, MAP_ZOOM, HISTORY_DATA } from '../constants';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [{ color: '#242f3e' }]
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#242f3e' }]
    },
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#746855' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }]
    }
  ]
};

// Coordenadas de ejemplo para los marcadores (Quito)
const markerPositions = [
  { lat: -0.209111, lng: -78.486999, label: 'Ubicación Actual', isCurrent: true }, // Centro de Quito
  { lat: -0.337971, lng: -78.540670, label: 'Hace 20 min - Guamaní' }, // Guamaní
  { lat: -0.289631, lng: -78.538518, label: 'Hace 45 min - Av. Maldonado' }, // Sur de Quito
];

const MapArea: React.FC = () => {
  const [map, setMap] = useState<any>(null);
  const [zoom, setZoom] = useState(MAP_ZOOM);

  const onLoad = useCallback((map: any) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleZoomIn = () => {
    if (map) {
      const currentZoom = map.getZoom() || MAP_ZOOM;
      map.setZoom(currentZoom + 1);
      setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      const currentZoom = map.getZoom() || MAP_ZOOM;
      map.setZoom(currentZoom - 1);
      setZoom(currentZoom - 1);
    }
  };

  const handleMyLocation = () => {
    if (map) {
      map.panTo(MAP_CENTER);
      map.setZoom(MAP_ZOOM);
    }
  };

  return (
    <section className="absolute inset-0 z-0 bg-slate-900 overflow-hidden">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={MAP_CENTER}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {/* Marcadores */}
          {markerPositions.map((position, index) => (
            <Marker
              key={index}
              position={{ lat: position.lat, lng: position.lng }}
              title={position.label}
              icon={{
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="${position.isCurrent ? '10' : '7'}" 
                            fill="${position.isCurrent ? '#2D5BFF' : '#FF2D5B'}" 
                            stroke="#ffffff" stroke-width="2"/>
                  </svg>
                `)}`,
                scaledSize: position.isCurrent ? { width: 24, height: 24 } : { width: 16, height: 16 }
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Overlay gradient for better integration */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-slate-900/20 via-transparent to-transparent z-10"></div>

      {/* Map Controls */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-3 z-30">
        <button 
          onClick={handleMyLocation}
          className="w-12 h-12 glass-panel rounded-xl shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-secondary hover:shadow-neon-blue transition-all duration-300 bg-white/80 dark:bg-slate-900/80"
        >
          <span className="material-symbols-outlined text-xl">my_location</span>
        </button>
        <div className="flex flex-col glass-panel rounded-xl shadow-lg overflow-hidden bg-white/80 dark:bg-slate-900/80">
          <button 
            onClick={handleZoomIn}
            className="w-12 h-12 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 hover:text-secondary transition-colors border-b border-slate-200/50 dark:border-slate-700/50"
          >
            <span className="material-symbols-outlined text-xl">add</span>
          </button>
          <button 
            onClick={handleZoomOut}
            className="w-12 h-12 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 hover:text-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-xl">remove</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MapArea;