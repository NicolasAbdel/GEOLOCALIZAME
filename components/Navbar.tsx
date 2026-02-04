import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { LOGO_IMAGE_URL } from '../constants';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { user } = useUser();
  return (
    <nav className="h-16 flex items-center justify-between px-6 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-blue-100/50 dark:border-slate-800 z-50 shadow-sm relative transition-colors duration-300">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-secondary to-primary p-0.5 shadow-neon-blue">
          <div className="h-full w-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center">
            <img 
              alt="Geolocalízame Logo" 
              className="h-full w-full object-cover opacity-90 hover:opacity-100 transition-opacity" 
              src={LOGO_IMAGE_URL} 
            />
          </div>
        </div>
        <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary drop-shadow-sm">
          Geolocalízame
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-slate-500 hover:text-secondary hover:bg-blue-50 dark:text-slate-400 dark:hover:text-primary dark:hover:bg-slate-800 transition-all duration-300"
        >
          <span className="material-symbols-outlined">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none">
              {user?.fullName || user?.firstName || 'Usuario'}
            </p>
            <p className="text-xs text-secondary font-medium mt-1">Quito, EC</p>
          </div>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "h-9 w-9 rounded-full shadow-lg shadow-blue-500/30 ring-2 ring-white dark:ring-slate-700"
              }
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;