import React, { useState } from 'react';
import { HISTORY_DATA, MAP_CENTER } from '../constants';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  onLocationClick?: (lat: number, lng: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLocationClick }) => {
  const [showCopied, setShowCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleShareLocation = async () => {
    const currentLocation = HISTORY_DATA[0]; // Ubicación más reciente
    const shareUrl = `${window.location.origin}?lat=${currentLocation.lat}&lng=${currentLocation.lng}&name=${encodeURIComponent(currentLocation.locationName)}`;
    
    // Intentar usar Web Share API si está disponible
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi ubicación en vivo',
          text: `Estoy en ${currentLocation.locationName}`,
          url: shareUrl
        });
      } catch (err) {
        // Usuario canceló o error
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copiar al portapapeles
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.error('Error al copiar:', err);
      }
    }
  };
  return (
    <>
      {/* Botón toggle para móviles */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-16 left-4 z-50 p-3 rounded-full glass-panel shadow-lg ring-1 ring-white/20"
      >
        <span className="material-symbols-outlined text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>

      <aside className={`fixed left-0 md:left-4 top-0 md:top-4 bottom-0 md:bottom-4 w-[85%] max-w-sm md:w-80 z-40 flex flex-col perspective-1000 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-full w-full glass-panel md:rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ring-1 ring-white/20 dark:ring-white/10">
        
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-blue-100/50 dark:border-slate-700/50 bg-gradient-to-r from-white/40 to-transparent dark:from-slate-800/40">
          <h2 className="text-base md:text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <span className="material-symbols-outlined text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
              history
            </span>
            Historial
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-300 mt-1 font-medium">Rastreo satelital en vivo</p>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 md:p-3 space-y-2 md:space-y-3">
          {HISTORY_DATA.map((item) => (
            <SidebarItem key={item.id} item={item} onLocationClick={onLocationClick} />
          ))}
        </div>

        {/* Footer / CTA */}
        <div className="p-3 md:p-4 border-t border-blue-100/50 dark:border-slate-700/50 bg-gradient-to-b from-transparent to-white/50 dark:to-slate-900/50">
          {showCopied && (
            <div className="mb-2 p-2 bg-green-500 text-white text-xs text-center rounded-lg animate-pulse">
              ✓ Link copiado al portapapeles
            </div>
          )}
          <button 
            onClick={handleShareLocation}
            className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-accent to-secondary shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 animate-subtle-pulse border border-white/20">
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 ease-in-out -skew-x-12"></div>
            <div className="relative py-3 md:py-4 px-4 md:px-6 flex items-center justify-center gap-2 md:gap-3 text-white">
              <span className="material-symbols-outlined text-xl md:text-2xl drop-shadow-md">security</span>
              <div className="text-left">
                <p className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-shadow-sm">Viaja Seguro</p>
                <p className="text-[9px] md:text-[10px] font-medium opacity-90">Compartir ubicación en vivo</p>
              </div>
              <span className="material-symbols-outlined text-base md:text-lg opacity-80 group-hover:opacity-100 group-hover:rotate-45 transition-all">share</span>
            </div>
          </button>
        </div>

      </div>
    </aside>

    {/* Overlay para cerrar el sidebar en móviles */}
    {isOpen && (
      <div 
        className="md:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
    )}
    </>
  );
};

export default Sidebar;