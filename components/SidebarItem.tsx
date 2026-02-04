import React from 'react';
import { HistoryItem } from '../types';

interface SidebarItemProps {
  item: HistoryItem;
  onLocationClick?: (lat: number, lng: number) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, onLocationClick }) => {
  // Styles change slightly if it's the most recent one (mock logic based on ID)
  const isMostRecent = item.id === '1' || item.id === '2';

  const handleClick = () => {
    if (onLocationClick) {
      onLocationClick(item.lat, item.lng);
    }
  };

  if (!isMostRecent) {
    return (
      <div 
        onClick={handleClick}
        className="group p-3 md:p-4 rounded-xl bg-slate-50/30 dark:bg-slate-800/20 border border-transparent opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
        <div className="flex items-start gap-2 md:gap-3">
          <div className="mt-1.5 h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-0.5">{item.timestamp}</p>
            <p className="text-xs md:text-sm font-medium leading-snug text-slate-600 dark:text-slate-400">{item.locationName}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{item.address}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="group p-3 md:p-4 rounded-xl bg-white/40 dark:bg-slate-900/40 border border-white/40 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-neon-blue relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex items-start gap-2 md:gap-3 relative z-10">
        <div className="mt-1.5 relative">
          <div className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-slate-400 group-hover:bg-primary transition-colors duration-300 shadow-[0_0_8px_rgba(0,0,0,0.1)]"></div>
          <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
        </div>
        <div>
          <p className="text-xs font-bold text-secondary dark:text-primary mb-0.5">{item.timestamp}</p>
          <p className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug group-hover:text-secondary dark:group-hover:text-primary transition-colors">
            {item.locationName}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{item.address}</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarItem;