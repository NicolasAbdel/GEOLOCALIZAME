import React from 'react';
import { HISTORY_DATA } from '../constants';
import SidebarItem from './SidebarItem';

const Sidebar: React.FC = () => {
  return (
    <aside className="absolute left-4 top-4 bottom-4 w-80 z-40 flex flex-col perspective-1000 pointer-events-none">
      <div className="h-full w-full glass-panel rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 pointer-events-auto ring-1 ring-white/20 dark:ring-white/10">
        
        {/* Header */}
        <div className="p-5 border-b border-blue-100/50 dark:border-slate-700/50 bg-gradient-to-r from-white/40 to-transparent dark:from-slate-800/40">
          <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <span className="material-symbols-outlined text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
              history
            </span>
            Historial
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-300 mt-1 font-medium">Rastreo satelital en vivo</p>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
          {HISTORY_DATA.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </div>

        {/* Footer / CTA */}
        <div className="p-4 border-t border-blue-100/50 dark:border-slate-700/50 bg-gradient-to-b from-transparent to-white/50 dark:to-slate-900/50">
          <button className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-accent to-secondary shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 animate-subtle-pulse border border-white/20">
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 ease-in-out -skew-x-12"></div>
            <div className="relative py-4 px-6 flex items-center justify-center gap-3 text-white">
              <span className="material-symbols-outlined text-2xl drop-shadow-md">security</span>
              <div className="text-left">
                <p className="text-sm font-extrabold uppercase tracking-wider text-shadow-sm">Viaja Seguro</p>
                <p className="text-[10px] font-medium opacity-90">Compartir ubicación en vivo</p>
              </div>
              <span className="material-symbols-outlined text-lg opacity-80 group-hover:opacity-100 group-hover:rotate-45 transition-all">share</span>
            </div>
          </button>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;