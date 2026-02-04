import React from 'react';
import { MapMarkerData } from '../types';

interface MapMarkerProps {
  data: MapMarkerData;
}

const MapMarker: React.FC<MapMarkerProps> = ({ data }) => {
  if (data.isCurrent) {
    return (
      <div 
        className="absolute flex flex-col items-center cursor-pointer z-30 group"
        style={{ top: data.top, left: data.left, transform: 'translate(-50%, -50%)' }}
      >
        <div className="mb-3 px-3 py-1.5 bg-slate-900/90 dark:bg-black/80 backdrop-blur-md text-white text-xs font-bold rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.5)] whitespace-nowrap border border-primary/40 transform transition-transform group-hover:scale-110 origin-bottom">
          {data.label}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-b border-r border-primary/40"></div>
        </div>
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-secondary border-[3px] border-white shadow-[0_0_20px_rgba(45,91,255,0.8)] pulse-ring z-10">
          <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="absolute flex flex-col items-center cursor-pointer group z-20 hover:z-50"
      style={{ top: data.top, left: data.left }}
    >
      <div className="mb-2 px-3 py-1 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md text-slate-900 dark:text-white text-[11px] font-bold rounded-md shadow-xl border border-secondary/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap z-50">
        {data.label}
      </div>
      <div className="relative">
        <span 
          className="material-symbols-outlined text-4xl drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110 filled" 
          style={{ color: data.color }}
        >
          location_on
        </span>
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-5 h-2 bg-black/40 rounded-full blur-[3px] group-hover:scale-75 transition-transform"></div>
      </div>
    </div>
  );
};

export default MapMarker;