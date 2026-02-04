import React from 'react';
import { MARKERS, MAP_IMAGE_URL } from '../constants';
import MapMarker from './MapMarker';

const MapArea: React.FC = () => {
  return (
    <section className="absolute inset-0 z-0 bg-slate-900 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Satellite Map" 
          className="w-full h-full object-cover scale-[1.3] origin-center object-center" 
          src={MAP_IMAGE_URL} 
        />
        {/* Overlays for readability and mood */}
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-slate-900/30 via-transparent to-transparent"></div>
      </div>

      {/* Markers Layer */}
      {MARKERS.map(marker => (
        <MapMarker key={marker.id} data={marker} />
      ))}

      {/* Map Controls */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-3 z-30">
        <button className="w-12 h-12 glass-panel rounded-xl shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-secondary hover:shadow-neon-blue transition-all duration-300 bg-white/80 dark:bg-slate-900/80">
          <span className="material-symbols-outlined text-xl">my_location</span>
        </button>
        <div className="flex flex-col glass-panel rounded-xl shadow-lg overflow-hidden bg-white/80 dark:bg-slate-900/80">
          <button className="w-12 h-12 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 hover:text-secondary transition-colors border-b border-slate-200/50 dark:border-slate-700/50">
            <span className="material-symbols-outlined text-xl">add</span>
          </button>
          <button className="w-12 h-12 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 hover:text-secondary transition-colors">
            <span className="material-symbols-outlined text-xl">remove</span>
          </button>
        </div>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-2 right-2 text-[10px] text-white/80 bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/10 shadow-sm">
        © Satellite Imagery Data contributors
      </div>
    </section>
  );
};

export default MapArea;